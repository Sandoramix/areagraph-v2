import { FC } from "react";

type ArrowDownProps = {
	className?: string
}
const ArrowDown: FC<ArrowDownProps> = ({ className }) => {
	return (
		<>
			<svg className={className || "w-full h-full"} xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 312.36"><path fill-rule="nonzero" d="m32.66 5.71 220.49 241.11L479.35 0 512 29.87 253.12 312.36 0 35.58z" /></svg>
		</>
	)
}
export default ArrowDown;