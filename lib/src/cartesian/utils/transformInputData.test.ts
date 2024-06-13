import { describe, expect, it } from "vitest";
import { transformInputData } from "./transformInputData";

const DATA = [
	{ x: 1, y: 10, z: 5 },
	{ x: 2, y: 20, z: 10 },
	{ x: 3, y: 30, z: 15 },
	{ x: 4, y: 40 },
	{ x: 5, y: 50, z: 25 },
];

const CANVAS_SIZE = {
	width: 400,
	height: 300,
};

describe("transformInputData", () => {
	it("transforms data into internal data foramt", () => {
		const { ix, ox, y } = transformInputData({
			data: DATA,
			xKey: "x",
			yKeys: ["y", "z"],
			canvasSize: CANVAS_SIZE,
		});

		expect(ix).toEqual([1, 2, 3, 4, 5]);
	});
});
