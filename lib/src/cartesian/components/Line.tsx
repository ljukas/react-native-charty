import {
	Path,
	type PathProps,
	type SkiaDefaultProps,
} from "@shopify/react-native-skia";
import type { AnimatedPathConfig } from "../../hooks/useAnimatedPath";

import { typedMemo, type CartesianPoint } from "../../types";
import { useLinePath } from "../hooks/useLinePath";
import { AnimatedPath } from "./AnimatedPath";

export type CartesianLinePathProps = {
	points: CartesianPoint[];
	animate?: AnimatedPathConfig | false;
} & SkiaDefaultProps<
	Pick<
		PathProps,
		| "color"
		| "strokeWidth"
		| "strokeJoin"
		| "strokeCap"
		| "blendMode"
		| "strokeMiter"
		| "opacity"
		| "start"
		| "antiAlias"
		| "end"
	>,
	"start" | "end"
>;

const LineComp = ({ points, animate, ...rest }: CartesianLinePathProps) => {
	const path = useLinePath(points);

	if (animate === false) {
		return <Path path={path} style={"stroke"} {...rest} />;
	}

	return (
		<AnimatedPath path={path} style={"stroke"} animate={animate} {...rest} />
	);
};

export const Line = typedMemo(LineComp);
