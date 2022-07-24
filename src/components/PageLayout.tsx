import { ReactNode } from "react";
import Header from "./Header";

type PageLayoutProps = {
	children: ReactNode,

}

const PageLayout = ({ children }: PageLayoutProps) => {
	return (
		<>
			<Header />
			<div className="fixed w-full h-full mt-20 bg-gray-400 dark:bg-zinc-900">
				{children}
			</div>
		</>

	)
}


export default PageLayout;