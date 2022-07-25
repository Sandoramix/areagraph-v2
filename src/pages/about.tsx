import Head from "next/head";
import Link from "next/link";

const AboutPage = () => {
	return (
		<>
			<Head>
				<title>AreaGraph v2 - About</title>
			</Head>
			<div className="h-innerpage w-innerpage select-none overflow-y-auto">
				<div className="flex flex-col p-2 bg-zinc-600 dark:bg-zinc-700 text-center h-28">
					<span className="text-4xl text-white font-semibold">AreaGraph <span className="text-red-300 font-bold">v2</span></span>
					<span className="text-white">made for educational purposes</span>
					<span className="text-gray-300">Remake of&nbsp;
						<Link href={"https://github.com/Sandoramix/AreaGraph"} target={"_blank"} referrerPolicy="no-referrer" className="">
							<span className="text-indigo-200 cursor-pointer hover:text-lg hover:underline transition-all ">AreaGraph</span>
						</Link>
					</span>
				</div>

				<div className="w-full h-[calc(100%_-_112px)] flex flex-col items-center justify-between gap-2">
					<div className="dark:text-white text-center min-w-[300px] w-1/2 max-w-[800px] min-h-[200px] h-2/3 max-h-[600px]  flex flex-col justify-center items-center gap-2">
						<span className="text-3xl font-bold">Objective</span>
						<span className="text-xl font-semibold">View data received from a database <br />of IOT sensor stations,<br /> in the form of a graph.
						</span>
						<hr className="w-3/4" />
						<span className="text-3xl font-bold">Used Tools</span>
						<ul className="text-xl font-semibold">
							<li>Frontend & Backend : <Link href={"https://nextjs.org/"} target={"_blank"} referrerPolicy={"no-referrer"} ><span className="text-indigo-700 hover:text-indigo-800 dark:text-indigo-200 curosr-pointer dark:hover:text-indigo-400 hover:underline transition-all cursor-pointer">NextJS</span></Link></li>
							<li>Hosting: <Link href={"https://vercel.com"} target={"_blank"} referrerPolicy={"no-referrer"} ><span className="text-indigo-700 hover:text-indigo-800 dark:text-indigo-200 curosr-pointer dark:hover:text-indigo-400 hover:underline transition-all cursor-pointer">Vercel</span></Link></li>
						</ul>

					</div>
					<footer className="bg-gray-900 w-full text-center text-white">©2022 <Link href={"https://github.com/Sandoramix"} target={"_blank"} referrerPolicy={"no-referrer"} ><span className="text-indigo-200 hover:text-indigo-400 hover:underline transition-all cursor-pointer">D.Oleksandr/@Sandoramix</span></Link></footer>
				</div>

			</div>
		</>
	);
}
export default AboutPage;