import { Canvas, Group, rect } from "@shopify/react-native-skia";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet, type LayoutChangeEvent } from "react-native";
import {
	typedMemo,
	type CartesianChartRenderArg,
	type CartesianDomain,
	type InputFields,
	type NumericalFields,
	type RawData,
	type SidedNumber,
} from "../types";
import { transformInputData } from "./utils/transformInputData";

type CartesianChartProps<
	Data extends RawData,
	XK extends keyof InputFields<Data>,
	YK extends keyof NumericalFields<Omit<Data, XK>>,
> = {
	data: Data[];
	xKey: XK;
	yKeys: YK[];
	/**
	 * Domain of the chart, used to set the x-axis and y-axis limits
	 *
	 * Default: automatically calculated based on the data
	 */
	domain?: CartesianDomain;

	/**
	 * Padding around the chart, used to push chart away from the edges of
	 * the canvas to make room for e.g. labels and axes
	 */
	chartPadding?: SidedNumber;

	children: (arg: CartesianChartRenderArg<Data, XK, YK>) => React.ReactNode;
};

const CartesianChartComp = <
	Data extends RawData,
	XK extends keyof InputFields<Data>,
	YK extends keyof NumericalFields<Omit<Data, XK>>,
>({
	data,
	xKey,
	yKeys,
	domain,
	chartPadding,
	children,
}: CartesianChartProps<Data, XK, YK>) => {
	const [size, setSize] = useState({ width: 0, height: 0 });
	const [hasMeasuredSize, setHasMeasuredSize] = useState(false);

	const onLayout = useCallback((event: LayoutChangeEvent) => {
		const { width, height } = event.nativeEvent.layout;
		setSize({ width, height });
		setHasMeasuredSize(true);
	}, []);

	const { xScale, yScale, isNumericalData, chartBounds, tData } =
		useMemo(() => {
			const { xScale, yScale, isNumericalData, ...tData } = transformInputData({
				data,
				xKey,
				yKeys,
				domain,
				chartPadding,
				canvasSize: size,
			});

			const chartBounds = {
				left: xScale(xScale.domain().at(0) ?? 0),
				right: xScale(xScale.domain().at(-1) ?? 0),
				top: yScale(yScale.domain().at(0) ?? 0),
				bottom: yScale(yScale.domain().at(-1) ?? 0),
			};

			return { xScale, yScale, isNumericalData, chartBounds, tData };
		}, [data, xKey, yKeys, domain, chartPadding, size]);

	type PointsArg = CartesianChartRenderArg<Data, XK, YK>["points"];
	const points = useMemo<PointsArg>(() => {
		const cache = {} as Record<YK, PointsArg[keyof PointsArg]>;

		return new Proxy(
			{},
			{
				get: (_, property: string): PointsArg[keyof PointsArg] | undefined => {
					const key = property as YK;
					if (!yKeys.includes(key)) return undefined;
					if (cache[key]) return cache[key];

					cache[key] = tData.ix.map((ix, i) => ({
						ix,
						ox: tData.ox[i],
						iy: tData.y[key].i[i],
						oy: tData.y[key].o[i],
					}));

					return cache[key];
				},
			},
		) as PointsArg;
	}, [yKeys, tData]);

	// const renderArg: CartesianChartRenderArg<Data, XK, YK> = useMemo(
	// 	() => ({
	// 		xScale,
	// 		yScale,
	// 		chartBounds,
	// 		canvasSize: size,
	// 		points,
	// 	}),
	// 	[xScale, yScale, chartBounds, size, points],
	// );
	const renderArg: CartesianChartRenderArg<Data, XK, YK> = {
		xScale,
		yScale,
		chartBounds,
		canvasSize: size,
		points,
	};

	const clipRect = rect(
		chartBounds.left,
		chartBounds.top,
		chartBounds.right,
		chartBounds.bottom,
	);

	return (
		<Canvas style={styles.canvas} onLayout={onLayout}>
			<Group clip={clipRect}>{hasMeasuredSize && children(renderArg)}</Group>
		</Canvas>
	);
};

const styles = StyleSheet.create({
	canvas: {
		flex: 1,
	},
});

export const CartesianChart = typedMemo(CartesianChartComp);
