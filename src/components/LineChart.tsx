
import ReactECharts from 'echarts-for-react';  // or var ReactECharts = require('echarts-for-react');
import { useTheme } from 'next-themes';
import { FC } from 'react';
import { FetchBetweenDates } from '../utils/types';


type LineChartProps = {
	data: FetchBetweenDates | null
}
const LineChart: FC<LineChartProps> = ({ data }) => {
	const { theme } = useTheme();


	if (!data) return null



	// const options: EChartsOption = {
	// 	grid: { top: 8, right: 8, bottom: 24, left: 36 },
	// 	xAxis: {
	// 		type: "category",
	// 		boundaryGap: ["0%", "100%"],
	// 		data: x,
	// 		name: "Data",
	// 		axisLine: {
	// 			show: true,
	// 		},
	// 	},
	// 	yAxis: {
	// 		type: "value",

	// 		name: unit,
	// 		nameTextStyle: {
	// 			fontWeight: "bold",
	// 			align: "right",
	// 		},

	// 		position: "left",
	// 		boundaryGap: ["0%", "100%"],

	// 		max: (val) => {
	// 			return unit === "%" ? 100 : Math.floor(val.max) + 1;
	// 		},

	// 		maxInterval: 25,
	// 		minInterval: 0,
	// 	},
	// 	series: [
	// 		{
	// 			data: [820, 932, 901, 934, 1290, 1330, 1320],
	// 			type: 'line',
	// 			smooth: true,
	// 		},
	// 	],
	// 	tooltip: {
	// 		trigger: 'axis',
	// 	},
	// };


	return (<>
		{/* <ReactECharts
			className={`w-full h-full`}
			option={options}
			notMerge={true}
			theme={theme === `dark` ? 'dark' : 'blue'}
		// onChartReady={this.onChartReadyCallback}
		// onEvents={EventsDict}
		// opts={ }
		/> */}
		{data.sensor_id}
	</>)
}

export default LineChart