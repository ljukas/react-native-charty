import { Rect } from "@shopify/react-native-skia";
import { StyleSheet, View } from "react-native";
import { CartesianChart } from "react-native-charty";

/**
 * Generate some fake data for a graph, with x and y values, the names dont have to be x and y
 */
const data = [
	{ x: 1, y: 10, z: 5 },
	{ x: 2, y: 20, z: 10 },
	{ x: 3, y: 30, z: 15 },
	{ x: 4, y: 40 },
	{ x: 5, y: 50, z: 25 },
];

export default function LineChartScreen() {
	return (
		<View style={[{ width: "100%", height: 300 }, styles.scrollView]}>
			<CartesianChart data={data} xKey={"x"} yKeys={["y"]}>
				{({ points }) => (
					<>
						<Rect
							x={chartBounds.left}
							y={chartBounds.top}
							width={chartBounds.right - chartBounds.left}
							height={chartBounds.bottom - chartBounds.top}
							color="red"
						/>
					</>
				)}
			</CartesianChart>
		</View>
	);
}

const styles = StyleSheet.create({
	scrollView: {
		backgroundColor: "white",
	},
});
