import { Canvas, Rect } from "@shopify/react-native-skia";
import { memo } from "react";
import { StyleSheet } from "react-native";
import type { InputFields, NumericalFields, RawData } from "../types";

type CartesianChartProps<
	Data extends RawData,
	XK extends keyof InputFields<Data>,
	YK extends keyof NumericalFields<Data>,
> = {
	data: Data[];
	xKey: XK;
	yKeys: Exclude<YK, XK>[];
};

const typedMemo: <T>(c: T) => T = memo;

const CartesianChartComp = <
	Data extends RawData,
	XK extends keyof InputFields<Data>,
	YK extends keyof NumericalFields<Data>,
>(
	props: CartesianChartProps<Data, XK, YK>,
) => {
	const { data, xKey, yKeys } = props;

	console.log({
		data,
		xKey,
		yKeys,
	});

	return (
		<Canvas style={styles.canvas}>
			<Rect x={50} y={50} width={200} height={200} color="red" />
		</Canvas>
	);
};

const styles = StyleSheet.create({
	canvas: {
		flex: 1,
	},
});

export const CartesianChart = typedMemo(CartesianChartComp);
