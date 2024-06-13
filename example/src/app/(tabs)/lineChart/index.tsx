import { tintColorLight } from "@/constants/Colors";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CartesianChart, Line } from "react-native-charty";
import { RectButton } from "react-native-gesture-handler";

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

const data2 = [
	{ x: 1, y: 10, z: 5 },
	{ x: 2, y: 30, z: 10 },
	{ x: 3, y: 20, z: 15 },
	{ x: 4, y: 50 },
	{ x: 5, y: 40, z: 25 },
	{ x: 6, y: 30, z: 25 },
];

export default function LineChartScreen() {
	const [_data, setData] = useState(data);

	return (
		<View style={styles.container}>
			<View style={{ width: "100%", height: 300 }}>
				<CartesianChart data={_data} xKey={"x"} yKeys={["y"]} chartPadding={20}>
					{({ points, chartBounds }) => (
						<>
							<Line
								points={points.y}
								strokeWidth={3}
								color={tintColorLight}
								strokeCap={"round"}
							/>
						</>
					)}
				</CartesianChart>
			</View>

			<View
				style={{
					gap: 4,
					marginHorizontal: 16,
					marginTop: 24,
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<RectButton onPress={() => setData(data)} style={styles.button}>
					<Text style={styles.buttonText}>Data 1</Text>
				</RectButton>
				<RectButton onPress={() => setData(data2)} style={styles.button}>
					<Text style={styles.buttonText}>Data 2</Text>
				</RectButton>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		flex: 1,
	},
	button: {
		flex: 1,
		padding: 16,
		backgroundColor: tintColorLight,
		borderRadius: 12,
	},
	buttonText: {
		fontFamily: "SpaceMono-Regular",
		fontSize: 24,
		textAlign: "center",
	},
});
