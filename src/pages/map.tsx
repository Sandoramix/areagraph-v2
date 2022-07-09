import { NextPageContext } from "next";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Station } from "../utils/types";

import { getBaseUrl } from "./_app";


type MapPageProps = {
	allStations: Station[],
	workingStations: Station[],
}
export default function MapPage({ allStations, workingStations }: MapPageProps) {

	const { theme } = useTheme();




	const Map = dynamic(() => import("../components/Map"), { ssr: false });



	return (
		<>
			<div className="h-innerpage w-innerpage">

				<Map

					allStations={allStations || []}
					workingStations={workingStations || []}
					tilesStyle={theme === `dark` ? `jawg-dark` : `jawg-light`}
				/>
			</div>
		</>

	)
}
MapPage.getInitialProps = async (ctx: NextPageContext) => {
	var req = await fetch(`${getBaseUrl()}/api/stations`);
	var data = await req.json();

	req = await fetch(`${getBaseUrl()}/api/stations/working`);
	var w_data = await req.json();

	return { allStations: data, workingStations: w_data };
}