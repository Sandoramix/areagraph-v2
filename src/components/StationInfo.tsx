import { FC, memo, useState } from "react";
import { Station } from "../utils/types";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

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
	// const stationData = useMemo(async() => {
	// 	if (!station) {
	// 		return null;
	// 	}

	// }, [station]);

	const [startDate, setStartDate] = useState<Date>(new Date());
	const [endDate, setEndDate] = useState<Date>(new Date());

	const [startDateString, setStartDateString] = useState<string>(formatDate(new Date()));
	const [endDateString, setEndDateString] = useState<string>(formatDate(new Date()));
	if (!station) return null;


	return (
		<>
			<div className="select-none flex flex-col p-2 bg-gray-400  dark:bg-zinc-700 z-[100] fixed bottom-0 left-0 w-full h-1/2  
						sm:min-w-[400px] sm:max-w-[600px] sm:left-auto sm:right-0 sm:top-20 sm:w-2/4 sm:h-innerpage " >
				<div
					className="cursor-pointer absolute right-1.5 top-1.5 w-9 h-9 fill-slate-50 hover:fill-slate-200 bg-gray-600 hover:bg-gray-800 dark:bg-red-600 dark:hover:bg-red-800 p-1 rounded-md"
					onClick={resetStation}
				>

					<svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" /></svg>
				</div>
				<div
					className="w-full h-full p-2 bg-gray-500 dark:bg-zinc-800 flex flex-col rounded-lg items-center">

					<h3 className="text-lg w-full text-center font-semibold">Station: <span className="text-white dark:text-orange-500 font-bold">{station.name}</span></h3>
					<hr className="w-3/4" />

					<div className="flex gap-4 mt-4">
						<div className="w-1/2 flex flex-col text-center ">
							<h4 className="text-lg font-semibold">Start date</h4>
							<DatePicker
								className="w-full text-center rounded-md font-mono"
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
							<h4 className="text-lg font-semibold">End date</h4>
							<DatePicker
								className="w-full text-center rounded-md font-mono"
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
				</div>
			</div>
		</>
	)
}


export default memo(StationInfo);