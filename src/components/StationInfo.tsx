import { FC, memo, useMemo, useState } from "react";
import { FetchBetweenDates, Station } from "../utils/types";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Loading from "./Loading";
import { getBaseUrl } from "../utils/baseUrl";
import LineChart from "./LineChart";

function addDays(date: Date, days: number) {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}
function formatDate(date: Date) {
	return date?.toISOString().slice(0, 10) || "";
}


type StationInfoProps = {
	station: Station | null,
	resetStation: () => void,
}
const StationInfo: FC<StationInfoProps> = ({ station, resetStation }) => {
	const [stationData, setStationData] = useState<{ [key: string]: FetchBetweenDates } | null>(null);
	const [selectedStationData, setSelectedStationData] = useState<FetchBetweenDates | null>(null);

	const [startDate, setStartDate] = useState<Date>(new Date());
	const [endDate, setEndDate] = useState<Date>(new Date());

	const [startDateString, setStartDateString] = useState<string>(formatDate(new Date()));
	const [endDateString, setEndDateString] = useState<string>(formatDate(new Date()));

	const [isLoading, setIsLoading] = useState<boolean>(false);

	if (!station) return null;



	return (
		<>

			<div className="select-none flex flex-col p-2 bg-gray-400  dark:bg-zinc-700 z-[100] fixed bottom-0 left-0 w-full h-1/2  
						sm:min-w-[400px] sm:max-w-[600px] sm:left-auto sm:right-0 sm:top-20 sm:w-2/4 sm:h-innerpage " >
				{isLoading && <Loading></Loading>}
				<div
					className="z-[100] cursor-pointer absolute right-1.5 top-1.5 w-9 h-9 fill-slate-50 hover:fill-slate-200 bg-rose-700 hover:bg-rose-800 dark:bg-red-600 dark:hover:bg-red-800 p-1 rounded-md"
					onClick={() => {
						resetStation();
						setIsLoading(false)
						setStationData(null);
					}}
				>


					<svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" /></svg>
				</div>
				<div
					className="w-full h-full p-2 bg-gray-500 dark:bg-zinc-800 flex flex-col rounded-lg items-center">

					<h3 className="z-50 text-lg w-full text-center font-semibold text-gray-100 dark:text-white">Station: <span className="text-amber-400 dark:text-orange-500 font-bold">{station.name}</span></h3>
					<hr className="w-3/4" />

					<div className="flex gap-4 mt-4">
						<div className="w-1/2 flex flex-col text-center ">
							<h4 className="text-lg text-white font-semibold">Start date</h4>
							<DatePicker
								className={`w-full text-center rounded-md font-mono ${!startDate ? `bg-red-300 dark:bg-red-500` : ``}`}
								value={startDateString}
								minDate={addDays(new Date(), -60)}
								maxDate={endDate || new Date()}
								selected={startDate}
								onChange={
									(date: Date) => {
										setStartDate(date)
										setStartDateString(formatDate(date))
									}}
								dateFormat={"yyyy-MM-dd"}
								allowSameDay={true}
							/>


						</div>
						<div className="w-1/2 flex flex-col text-center ">
							<h4 className="text-lg text-white font-semibold">End date</h4>
							<DatePicker
								className={`w-full  text-center rounded-md font-mono ${!endDate ? `bg-red-300 dark:bg-red-500` : ``}`}
								value={endDateString}
								minDate={startDate} maxDate={new Date()}
								selected={endDate}
								onChange={(date: Date) => {
									setEndDate(date)
									setEndDateString(formatDate(date))
								}}
								dateFormat={"yyyy-MM-dd"}
								allowSameDay={true}
							/>


						</div>
					</div>

					<button
						onClick={async () => {
							setIsLoading(true);
							const request = await fetch(`${getBaseUrl()}/api/stations/${station.id}?start=${startDateString}&end=${endDateString}`);
							const data = await request.json();
							setStationData(data);
							setIsLoading(false);
						}}
						disabled={!startDate || !endDate}
						className={`${!startDate || !endDate ? `cursor-not-allowed ` : `cursor-pointer `} font-semibold text-lg text-zinc-900 dark:text-white hover:text-slate-900 dark:hover:text-gray-200 bg-indigo-200 dark:bg-indigo-700 hover:bg-indigo-300 dark:hover:bg-indigo-900   mt-2 p-1.5 w-1/5 rounded-md`}
					>Search</button>

					<ul className=" mt-4 sm:mt-8 flex gap-2 w-full h-4 justify-center items-center">
						{stationData && Object.entries(stationData).map(([key, sensor]) => {
							return (
								<li onClick={() => {
									setSelectedStationData(prev => {
										if (prev?.sensor_id === sensor.sensor_id) return null
										return sensor
									})
								}} key={key} className={`text-center min-w-[50px] cursor-pointer  rounded-md p-1 ${selectedStationData?.sensor_id === sensor.sensor_id ? `bg-blue-600 hover:bg-blue-800 text-white` : `bg-cyan-200 dark:bg-slate-100 hover:bg-teal-500 dark:hover:bg-slate-400`}`}>{sensor.sensor_type}</li>
							)
						})}
					</ul>

					{/* <LineChart data={selectedStationData} /> */}
				</div>
			</div>
		</>
	)
}



export default memo(StationInfo);