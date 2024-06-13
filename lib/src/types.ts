import type { ScaleLinear } from "d3-scale";
import { memo } from "react";

export type MaybeNumber = number | null | undefined;

/**
 * Incoming data for charts
 */
export type RawData = Record<string, unknown>;

export type InputFieldType = number | string;
export type InputFields<T> = {
	[K in keyof T as T[K] extends InputFieldType
		? K
		: never]: T[K] extends InputFieldType ? T[K] : never;
};

export type NumericalFields<T> = {
	[K in keyof T as T[K] extends MaybeNumber ? K : never]: T[K];
};

export type SidedNumber =
	| number
	| { top?: number; right?: number; bottom?: number; left?: number };

export type ChartBounds = {
	left: number;
	right: number;
	top: number;
	bottom: number;
};

export type CartesianDomain = {
	x?: [number, number] | [number];
	y?: [number, number] | [number];
};

export type CartesianPoint = {
	ix: InputFieldType;
	ox: number;
	iy: MaybeNumber;
	oy: MaybeNumber;
};

export type TransformedCartesianData<
	Data extends RawData,
	XK extends keyof InputFields<Data>,
	YK extends keyof NumericalFields<Omit<Data, XK>>,
> = {
	ix: InputFields<Data>[XK][];
	ox: number[];
	y: { [K in YK]: { i: MaybeNumber[]; o: MaybeNumber[] } };
};

export type CartesianChartRenderArg<
	Data extends Record<string, unknown>,
	XK extends keyof InputFields<Data>,
	YK extends keyof NumericalFields<Omit<Data, XK>>,
> = {
	xScale: ScaleLinear<number, number>;
	yScale: ScaleLinear<number, number>;
	chartBounds: ChartBounds;
	canvasSize: { width: number; height: number };
	points: {
		[K in YK]: CartesianPoint[];
	};
};

export const typedMemo: <T>(c: T) => T = memo;
