import '../styles/leaflet.css'
import "../styles/globals.css";

import Head from "next/head";
import PageLayout from "../components/PageLayout";

import { ThemeProvider } from 'next-themes'

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
	if (process.env.NODE_ENV === 'production') console.warn = function () { };
	return (
		<>
			<ThemeProvider attribute="class">
				<Head>
					<title>AreaGraph v2</title>
					<meta name="keywords" content="mapbox,map,CO2,PM2.5,PM10,RH,T,temperature,humidity,interactive,areagraph" />
					<meta name="description" content="AreaGraph -> check air quality with interactive Map. Made by @sandoramix" />
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<PageLayout><Component {...pageProps} /></PageLayout>
			</ThemeProvider>

		</>
	);
}

export default MyApp;



