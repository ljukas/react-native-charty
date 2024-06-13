import type { SkPath } from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
import {
	useDerivedValue,
	useSharedValue,
	withDecay,
	withSpring,
	withTiming,
	type WithDecayConfig,
	type WithSpringConfig,
	type WithTimingConfig,
} from "react-native-reanimated";

export type AnimatedPathConfig =
	| ({ type: "spring" } & WithSpringConfig)
	| ({ type: "timing" } & WithTimingConfig)
	| ({ type: "decay" } & WithDecayConfig);

const BASE_SPRING_CONFIG: WithSpringConfig = {
	duration: 1000,
	dampingRatio: 0.5,
	stiffness: 100,
	restDisplacementThreshold: 0.01,
	restSpeedThreshold: 0.1,
};

export const useAnimatedPath = (path: SkPath, config?: AnimatedPathConfig) => {
	const progress = useSharedValue(0);
	const [prevPath, setPrevPath] = useState(path);

	useEffect(() => {
		progress.value = 0;

		switch (config?.type) {
			case "spring":
				progress.value = withSpring(1, config);
				break;
			case "timing":
				progress.value = withTiming(1, config);
				break;
			case "decay":
				progress.value = withDecay(config);
				break;
			default:
				progress.value = withSpring(1, BASE_SPRING_CONFIG);
		}
	});

	const currentPath = useDerivedValue(() => {
		if (progress.value !== 1 && path.isInterpolatable(prevPath)) {
			return path.interpolate(prevPath, progress.value) || path;
		}
		return path;
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setPrevPath(currentPath.value);
	}, [currentPath, path]);

	return currentPath;
};
