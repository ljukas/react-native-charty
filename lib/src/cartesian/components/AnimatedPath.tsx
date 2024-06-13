import {
	Path,
	type PathProps,
	type SkPath,
	type SkiaDefaultProps,
} from "@shopify/react-native-skia";
import { memo } from "react";
import {
	useAnimatedPath,
	type AnimatedPathConfig,
} from "../../hooks/useAnimatedPath";

type AnimatedPathProps = {
	path: SkPath;
	animate?: AnimatedPathConfig;
} & SkiaDefaultProps<PathProps, "start" | "end">;

export const AnimatedPath = memo<AnimatedPathProps>(
	({ path, animate, children, ...rest }) => {
		const p = useAnimatedPath(path, animate);

		return (
			<Path path={p} {...rest}>
				{children}
			</Path>
		);
	},
);
