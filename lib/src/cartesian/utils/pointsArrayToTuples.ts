import type { CartesianPoint } from "../../types";

export const pointsArrayToTuples = (
	points: CartesianPoint[],
): [number, number][] => {
	return points.reduce(
		(acc, { ox, oy }) => {
			if (typeof oy === "number") acc.push([ox, oy]);
			return acc;
		},
		[] as [number, number][],
	);
};
