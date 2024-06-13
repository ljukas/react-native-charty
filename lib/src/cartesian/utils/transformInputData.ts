import { scaleLinear, type ScaleLinear } from "d3-scale";
import type {
	CartesianDomain,
	InputFields,
	NumericalFields,
	RawData,
	SidedNumber,
	TransformedCartesianData,
} from "../../types";

type TransformInputDataParams<
	Data extends RawData,
	XK extends keyof InputFields<Data>,
	YK extends keyof NumericalFields<Omit<Data, XK>>,
> = {
	data: Data[];
	xKey: XK;
	yKeys: YK[];
	domain?: CartesianDomain;
	chartPadding?: SidedNumber;
	canvasSize: { width: number; height: number };
};

export const transformInputData = <
	Data extends RawData,
	XK extends keyof InputFields<Data>,
	YK extends keyof NumericalFields<Omit<Data, XK>>,
>({
	data: _data,
	xKey,
	yKeys,
	domain,
	chartPadding,
	canvasSize,
}: TransformInputDataParams<Data, XK, YK>): TransformedCartesianData<
	Data,
	XK,
	YK
> & {
	xScale: ScaleLinear<number, number>;
	yScale: ScaleLinear<number, number>;
	isNumericalData: boolean;
} => {
	const data = [..._data];
	const isNumericalData = data.every(
		(datum) => typeof datum[xKey as keyof Data] === "number",
	);

	if (isNumericalData) {
		data.sort((a, b) => +a[xKey as keyof Data] - +b[xKey as keyof Data]);
	}

	const ix = data.map(
		(datum) => datum[xKey as keyof Data],
	) as InputFields<Data>[XK][];

	const yMin =
		domain?.y?.[0] ??
		Math.min(
			...yKeys.map((key) => {
				return data.reduce((min, cur) => {
					if (typeof cur[key] !== "number") return min;
					return Math.min(min, cur[key] as number);
				}, Number.POSITIVE_INFINITY);
			}),
		);

	const yMax =
		domain?.y?.[1] ??
		Math.max(
			...yKeys.map((key) => {
				return data.reduce((max, cur) => {
					if (typeof cur[key] !== "number") return max;
					return Math.max(max, cur[key] as number);
				}, Number.NEGATIVE_INFINITY);
			}),
		);

	const y = yKeys.reduce(
		(acc, key) => {
			acc[key] = { i: [], o: [] };
			return acc;
		},
		{} as TransformedCartesianData<Data, XK, YK>["y"],
	);

	/**
	 * We add 1 to the domain if the min and max are the same, to avoid a flat domain
	 * which causes issues with rendering the chart.
	 * Domain is flipped since we are working with a canvas where the origin is at the top left
	 */
	const yScaleDomain = yMax === yMin ? [yMax + 1, yMin - 1] : [yMax, yMin];

	const bottomPadding =
		typeof chartPadding === "number" ? chartPadding : chartPadding?.bottom ?? 0;
	const topPadding =
		typeof chartPadding === "number" ? chartPadding : chartPadding?.top ?? 0;
	const leftPadding =
		typeof chartPadding === "number" ? chartPadding : chartPadding?.left ?? 0;
	const rightPadding =
		typeof chartPadding === "number" ? chartPadding : chartPadding?.right ?? 0;

	const yScaleRange = [topPadding, canvasSize.height - bottomPadding];

	const yScale = scaleLinear().domain(yScaleDomain).range(yScaleRange).nice();

	for (const yKey of yKeys) {
		y[yKey].i = data.map((datum) => datum[yKey] as number);
		y[yKey].o = data.map((datum) => yScale(datum[yKey] as number));
	}

	const ixNum = ix.map((val, i) => (typeof val === "number" ? val : i));
	const xMin = domain?.x?.[0] ?? ixNum.at(0) ?? 0;
	const xMax = domain?.x?.[1] ?? ixNum.at(-1) ?? 0;

	const xScaleDomain = xMax === xMin ? [xMin - 1, xMax + 1] : [xMin, xMax];
	const xScaleRange = [leftPadding, canvasSize.width - rightPadding];

	const xScale = scaleLinear().domain(xScaleDomain).range(xScaleRange).nice();

	const ox = ixNum.map((val) => xScale(val));

	return {
		ix,
		ox,
		y,
		xScale,
		yScale,
		isNumericalData,
	};
};
