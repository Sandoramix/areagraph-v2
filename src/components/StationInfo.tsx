import { FC } from "react";
import { Station } from "../utils/types";

type StationInfoProps = {
	station: Station | null,
}


const StationInfo: FC<StationInfoProps> = ({ station }) => {

	if (!station) return null;

	return (
		<>
			<div className="z-[5000] fixed bottom-0 left-0 w-full h-1/2  || sm:max-h-max sm:left-auto sm:right-0 sm:top-20 sm:w-1/3 sm:h-full flex sm:flex-col bg-red-500">
				{station.name}
			</div>
		</>
	)
}


export default StationInfo;