import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import { useTheme } from "next-themes"
import Link from "next/link"


const Header = () => {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);

	const { systemTheme, theme, setTheme } = useTheme();

	const themeToggler = () => {
		const currentTheme = theme === `system` ? systemTheme : theme;
		return (
			<button onClick={() => {
				setTheme(currentTheme === `light` ? `dark` : `light`)
			}}
				className={`bg-slate-800 dark:bg-white p-2 rounded-full `}
			>
				<svg width={16} height={16} viewBox="0 0 24 24" >
					<path className="fill-white dark:fill-black" d="M7.5,2C5.71,3.15 4.5,5.18 4.5,7.5C4.5,9.82 5.71,11.85 7.53,13C4.46,13 2,10.54 2,7.5A5.5,5.5 0 0,1 7.5,2M19.07,3.5L20.5,4.93L4.93,20.5L3.5,19.07L19.07,3.5M12.89,5.93L11.41,5L9.97,6L10.39,4.3L9,3.24L10.75,3.12L11.33,1.47L12,3.1L13.73,3.13L12.38,4.26L12.89,5.93M9.59,9.54L8.43,8.81L7.31,9.59L7.65,8.27L6.56,7.44L7.92,7.35L8.37,6.06L8.88,7.33L10.24,7.36L9.19,8.23L9.59,9.54M19,13.5A5.5,5.5 0 0,1 13.5,19C12.28,19 11.15,18.6 10.24,17.93L17.93,10.24C18.6,11.15 19,12.28 19,13.5M14.6,20.08L17.37,18.93L17.13,22.28L14.6,20.08M18.93,17.38L20.08,14.61L22.28,17.15L18.93,17.38M20.08,12.42L18.94,9.64L22.28,9.88L20.08,12.42M9.63,18.93L12.4,20.08L9.87,22.27L9.63,18.93Z" />
				</svg>
			</button>
		)
	}
	return (
		<>
			<nav className={`${isOpen ? `z-50` : `z-30`} drop-shadow-md fixed top-0 left-0 h-20 w-full bg-slate-100  dark:bg-zinc-800 border-gray-500 px-1 sm:px-3 py-2  flex flex-wrap justify-between items-center`}>

				<Link href="/" className="flex flex-nowrap justify-start items-center w-1/4">
					<a className="flex items-center gap-1 hover:cursor-pointer text-zinc-900 dark:text-indigo-100 hover:text-indigo-800 dark:hover:text-indigo-400">
						<Image src="/images/logo.png" alt="Areagraph logo" height={50} width={50} className={``} />
						<span className=" self-center text-xl font-semibold whitespace-nowrap ">Areagraph</span>
					</a>
				</Link>




				<div className="flex items-center sm:order-2 justify-end gap-2">
					{themeToggler()}
					<button
						type="button"
						className="select-none mr-3 text-sm rounded-full focus:ring-2 focus:ring-indigo-800 dark:focus:ring-indigo-400"
					>
						<Link href="https://github.com/Sandoramix" >
							<a target={`_blank`} rel="noopener" ><Image className="rounded-full aspect-square " src="/images/avatar.png" width={50} height={50} alt="Creator's avatar" /></a>
						</Link>
					</button>

					<button

						type="button"
						className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"

						onClick={() => setIsOpen(prev => !prev)}
					>

						{/* @TODO OPEN BUTTON */}
						<svg className={`${isOpen ? `hidden` : ``} w-6 h-6`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
						{/*@TODO CLOSE BUTTON */}
						<svg className={`${isOpen ? `` : `hidden`} w-6 h-6`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
					</button>
				</div>
				<div className={` ${isOpen ? `sm:border-0 border-t border-slate-900 dark:border-white fixed left-0 top-20 flex z-40 ` : `hidden`} drop-shadow-md w-full bg-gray-300 dark:bg-zinc-900 sm:bg-transparent sm:dark:bg-transparent text-center justify-center sm:justify-between items-center sm:relative sm:top-0 sm:flex sm:w-auto sm:order-1 w-2/4" `} id="mobile-menu-2">
					<ul className="flex flex-col mt-4 sm:flex-row sm:gap-12 px-4 sm:mt-0 sm:text-sm sm:font-medium w-full">
						{[["Home", "/"], ["Map", "/map"], ["About", "/about"]].map(([text, href], index) => (
							<li key={`p-${index}`} className={`font-bold ${index != 2 ? `border-b border-slate-900 dark:border-indigo-50` : ``} sm:border-0 text-lg hover:cursor-pointer py-2 pr-4 pl-3 ${router.pathname === href ? `text-amber-700 dark:text-orange-600 hover:text-amber-600 dark:hover:text-orange-400` : `text-zinc-900 dark:text-slate-200 hover:text-indigo-900 dark:hover:text-indigo-400`} sm:bg-transparent sm:p-0`}>
								<Link href={href || "/"}><a >{text}</a></Link>
							</li>
						))
						}

					</ul>
				</div>

			</nav >

		</>
	)
}


export default Header