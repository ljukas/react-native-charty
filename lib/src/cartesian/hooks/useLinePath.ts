import { Skia } from "@shopify/react-native-skia";
import { curveLinear, line } from "d3-shape";
import { useMemo } from "react";
import type { CartesianPoint } from "../../types";
import { pointsArrayToTuples } from "../utils/pointsArrayToTuples";

type LinePathOptions = {
	curve: "linear";
};

export const useLinePath = (
	points: CartesianPoint[],
	options?: LinePathOptions,
) => {
	const path = useMemo(() => {
		const p = Skia.Path.Make();

		const svgPath = line().curve(curveLinear)(pointsArrayToTuples(points));

		if (svgPath) {
			p.addPath(Skia.Path.MakeFromSVGString(svgPath) ?? Skia.Path.Make());
		}

		return p;
	}, [points]);

	return path;
};
