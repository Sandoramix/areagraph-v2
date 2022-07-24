import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ArrowDown from "../components/ArrowDown";

const Home: NextPage = () => {
	const topContent = useRef<HTMLDivElement | null>(null);
	const [pageLoaded, setPageLoaded] = useState(false);
	useEffect(() => {
		if (!pageLoaded) {
			topContent.current?.classList.remove(`bottom-1/2`);
			topContent.current?.classList.add(`-bottom-0`)
			setPageLoaded(true);
		}
	}, [pageLoaded])


	return (
		<>
			<div className="h-innerpage w-innerpage select-none overflow-y-auto">
				<div className="min-h-[180px] mb-2 w-full text-center relative text-black dark:text-white bg-inherit">
					<div className="text-5xl font-bold font-serif min-h[60px] w-full z-10 transition-colors pt-6">AreaGraph</div>
					<div ref={topContent} className="w-full min-h[120px] absolute left-1/2 -translate-x-1/2 bottom-1/2 transition-all duration-700 -z-10 break-words px-4">
						<span className="text-2xl font-semibold font-mono text-zinc-800 dark:text-gray-300">View pollutant values in the air in a graph by choosing a date range</span>
						<br />
						<span className="animate-pulse text-indigo-700 dark:text-emerald-400 text-2xl font-bold font-mono"> In just a few clicks!</span>
					</div>
				</div>
				<div className="w-full min-h-[40px]">
					<hr className="w-full  dark:border-white border-black" />
					<div className="w-full py-4 flex justify-center">
						<Link href={"/map"}><button className="w-60 h-32 bg-zinc-700 dark:bg-gray-800 hover:bg-zinc-600 dark:hover:bg-gray-700 text-white rounded-2xl text-xl font-semibold">Get Started</button></Link>
					</div>
					<hr className="w-full  dark:border-white border-black" />
				</div>


				<div className="min-h-[260px] flex flex-col gap-4 mt-8 items-center justify-center w-full overflow-y-auto">

					<p className="text-3xl min-h-[20px] font-bold uppercase font-serif">How it works:</p>

					<div className="flex flex-col text-lg gap-1 items-center w-full">
						<span className={`w-11/12 px-2 h-12 max-w-4xl bg-slate-800 dark:bg-emerald-800 font-bold text-center rounded-md text-white flex justify-between`}><span className="border-r border-white h-full flex justify-center items-center pr-2">1</span><span className="py-2">Choose station</span><span></span></span>
						<ArrowDown className="w-6 h-6  fill-black dark:fill-white" />
						<span className={`w-9/12 px-2 h-12 max-w-3xl bg-slate-800 dark:bg-emerald-800 font-bold text-center rounded-md text-white flex justify-between`}><span className="border-r border-white h-full flex justify-center items-center pr-2">2</span><span className="py-2">Choose date range</span><span></span></span>
						<ArrowDown className="w-6 h-6 fill-black dark:fill-white" />
						<span className={`w-8/12 px-2 h-12 max-w-2xl bg-slate-800 dark:bg-emerald-800 font-bold text-center rounded-md text-white flex justify-between`}><span className="border-r border-white h-full flex justify-center items-center pr-2">3</span><span className="py-2">Select pollutant</span><span></span></span>
						<ArrowDown className="w-6 h-6 fill-black dark:fill-white" />
						<span className={`w-7/12 px-2 h-12  max-w-xl bg-slate-800 dark:bg-emerald-800 font-bold text-center rounded-md text-white flex justify-between`}><span className="border-r border-white h-full flex justify-center items-center pr-2">4</span><span className="py-2">Interact with the graph</span><span></span></span>
					</div>
				</div>


			</div>
		</>
	);
};

export default Home;
