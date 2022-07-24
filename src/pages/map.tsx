import { NextPageContext } from "next";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import Loading from "../components/Loading";
import { getBaseUrl } from "../utils/baseUrl";
import { Station } from "../utils/types";



export default function MapPage() {


	const [allStations, setAllStations] = useState<Station[]>([]);
	const [workingStations, setWorkingStations] = useState<Station[]>([]);
	const isLoading = !allStations.length && !workingStations.length;


	useEffect(() => {
		const initialFetch = async () => {
			var req = await fetch(`${getBaseUrl()}/api/stations`);
			setAllStations(await req.json());

			req = await fetch(`${getBaseUrl()}/api/stations/working`);
			setWorkingStations(await req.json());
		}
		initialFetch()
	}, [])



	const Map = dynamic(() => import("../components/MapNoSSR"), { ssr: false });

	if (isLoading) return (
		<>
			<div className="h-innerpage w-innerpage relative">
				<Loading></Loading>
			</div>
		</>
	)


	return (
		<>
			<Head>
				<title>AreaGraph v2 - Map</title>
			</Head>
			<div className="h-innerpage w-innerpage relative transition-colors duration-300">

				<Map

					allStations={allStations || []}
					workingStations={workingStations || []}

				/>

			</div>
		</>

	)
}
