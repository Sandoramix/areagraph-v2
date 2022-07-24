
import type { EChartsOption, Color, MarkLineComponentOption } from 'echarts';
import ReactECharts from 'echarts-for-react';  // or var ReactECharts = require('echarts-for-react');
import { useTheme } from 'next-themes';
import { FC } from 'react';
import { fixDate, formatDate } from '../utils/dates';
import { FetchBetweenDates } from '../utils/types';

const sensorInformations = new Map<string, string>([
	[
		`T`,
		`<h2 class="text-2xl font-bold">Average temperature</h2>`],
	[
		`RH`,
		`<span>
		<h2 class="font-bold text-xl">Relative humidity</h2> <br/>
		Is the ratio of the current absolute humidity to the maximum possible absolute humidity <span class="text-base font-light">(which depends on the current air temperature)</span>.<br/><br/>
		With 100% relative humidity, the possibility of rain is created.<br/><br/>
		P.s. for it to rain, <b>it must be 100% at the point where clouds are forming</b>, but the relative humidity near the ground could be much lower.
		</span>`,
	],
	[
		`PM2.5`,
		`<span><h2 class="font-bold text-xl">Fine dust</h2> <br/>
		Referred as <b>PM2.5</b> (diameter less than 2.5 µm), <br/>
		Is a collection of solid and liquid particles with a wide variety of physical, chemical, geometric, and morphological characteristics.<br/><br/>
		Sources can be either <b>organic or inorganic</b>.
		</span>`,
	],


	[
		`PM10`,
		`<span><h2 class="font-bold text-xl">Fine dust</h2> <br/>
		Referred as <b>PM10</b> (diameter less than 10 µm), <br/>
		Is a collection of solid and liquid particles with a wide variety of physical, chemical, geometric, and morphological characteristics.<br/><br/>
		Sources can be either <b>organic or inorganic</b>.
		</span>`,
	],
	[
		`CO2`,
		`<span>
		<h2 class="font-bold text-xl">Carbon dioxide (CO2)</h2> <br/>
		Is an odorless & colorless gas and is among the greenhouse gases that contribute most to global warming.<br/><br/>
		Such gases in the Earth's atmosphere capture heat from the sun, preventing it from returning to space.<br/><br/>
		The global increase in CO2 concentration is due to the use of <b>fossil fuels</b> and <b>changes in land use</b>.
		</span>`
	],
])

const limits = new Map<string, number>([
	[`PM2.5`, 25],
	[`PM10`, 40],
	[`CO2`, 400]
])

type LineChartProps = {
	input: FetchBetweenDates | null
}
const LineChart: FC<LineChartProps> = ({ input }) => {
	const { theme } = useTheme();

	const bgColor = theme === `dark` ? `bg-zinc-900` : `bg-indigo-900`
	const lineColor: Color = theme === `dark` ? `orange` : `white`


	if (!input) return null

	const dangerLineValue = limits.get(input?.sensor_type) || -100


	const options: EChartsOption = {
		grid: { top: 32, left: 33, right: 12, bottom: 64 },
		xAxis: {
			type: 'category',
			name: 'Date',
			boundaryGap: ["0%", "100%"],
			data: input?.data.map(d => formatDate(fixDate(new Date(d.created_at)), true)),
			axisLine: { show: true, symbol: ['none', 'arrow'], symbolSize: [6, 12], symbolOffset: [0, 10] },

		},
		yAxis: {
			type: 'value',
			name: input.sensor_unit,

			nameTextStyle: {
				fontWeight: 'bold',
				align: 'right',
			},
			position: 'left',
			boundaryGap: ["0%", "100%"],
			max: (val) => input.sensor_type === 'RH' ? 100 : Math.floor(val.max) + (val.max > 200 ? Math.ceil(50 - (val.max % 50)) : 1),
			maxInterval: input.sensor_type === "CO2" ? 100 : 25,
			minInterval: 5,
			axisLine: { show: true, symbol: ['none', 'arrow'], symbolSize: [6, 12], symbolOffset: [0, 10] },
			splitLine: { show: true, lineStyle: { color: '#fff', opacity: 0.2 } },
		},
		legend: {
			show: true,
			data: [input.sensor_type],
		},
		textStyle: {
			color: '#fff',
		},
		series: [
			{
				data: input.data.map((data) => {
					let avg = data.average;
					if (input.sensor_type != "RH" && input.sensor_type != "T") {
						return avg;
					}
					if (input.sensor_type == "T") {
						avg = avg < 60 ? avg : avg >= 600 ? avg / 100 : avg / 10;
						return avg;
					}
					return avg >= 0 && avg <= 100 ? avg : avg <= 1000 ? avg / 10 : avg / 100;
				}),
				type: 'line',
				smooth: true,
				color: lineColor,
				areaStyle: {
					opacity: 0.05,
				},
				showSymbol: true,

				markLine: {
					name: "Limit",
					data: [{
						yAxis: dangerLineValue,
					}],
					label: {
						position: "insideStartBottom",
						formatter: function (params) {
							return `Limit: ${params.value}`;
						},
						fontWeight: "bold",

						color: "yellow",
					},
					lineStyle: {
						color: "red",
						type: "solid",
						shadowBlur: 2,
					}
				}
			}
		],
		tooltip: {
			trigger: 'axis',
			showDelay: 0,
			transitionDuration: 0.2,
			position: function (pos, params, dom, rect, size) {
				return ["20%", "5%"];
			},
			formatter: function (params: any) {
				let data = params[0];
				return `<div className="text-center w-fit p-[5px]">
						<b>${data.name}</b>
						<br>
						${Math.round(data.value * 100) / 100} ${input.sensor_unit}
					</div>`;
			},
		},
		toolbox: {
			borderColor: "#fff",

			show: true,
			orient: "horizontal",
			left: "right",
			top: "top",
			feature: {
				saveAsImage: {
					show: true,
					type: 'png',
				},
				dataView: {
					show: true,
					readOnly: true,
					lang: [`Records per ${input.sensor_unit}`, 'Back'],
				},
				restore: { show: false },
				dataZoom: {
					yAxisIndex: `none`,

				}
			},

		},
		dataZoom: [
			{
				type: 'inside',
				start: 0,
				end: 100,

			},
			{
				start: 0,
				end: 100,
				orient: 'horizontal',

			}
		],


	}



	return (<>
		<div className='w-full h-full flex flex-col justify-between'>
			<ReactECharts className={`w-full sm:h-full rounded-lg ${bgColor}`} option={options} notMerge={true} />
			<div className='hidden sm:flex flex-col w-full h-auto font-serif mt-10 text-center p-2 bg-indigo-200 dark:bg-zinc-900 bg-opacity-75 rounded-md ' dangerouslySetInnerHTML={{ __html: sensorInformations.get(input.sensor_type) || "" }} />
		</div>
	</>)
}

export default LineChart