import { FC } from "react";

type ArrowDownProps = {
	className?: string
}
const ArrowDown: FC<ArrowDownProps> = ({ className }) => {
	return (
		<>
			<svg className={className || "w-full h-full"}
				xmlns="http://www.w3.org/2000/svg"
				shapeRendering="geometricPrecision"
				textRendering="geometricPrecision"
				imageRendering="optimizeQuality"
				fillRule="evenodd" clipRule="evenodd"
				viewBox="0 0 512 312.36">
				<path fillRule="nonzero" d="m32.66 5.71 220.49 241.11L479.35 0 512 29.87 253.12 312.36 0 35.58z" />
			</svg>
		</>
	)
}
export default ArrowDown;