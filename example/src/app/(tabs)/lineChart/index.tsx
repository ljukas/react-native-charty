import { StyleSheet, View } from "react-native";
import { CartesianChart } from "react-native-charty";

import { ScrollView } from "react-native-gesture-handler";

/**
 * Generate some fake data for a graph, with x and y values, the names dont have to be x and y
 */
const data = [
	{ x: 1, y: 10 },
	{ x: 2, y: 20 },
	{ x: 3, y: 30 },
	{ x: 4, y: 40 },
	{ x: 5, y: 50 },
];

export default function LineChartScreen() {
	return (
		<ScrollView style={styles.scrollView}>
			<View style={{ width: "100%", height: 300 }}>
				<CartesianChart data={data} xKey={"x"} yKeys={["y"]} />
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scrollView: {
		backgroundColor: "white",
	},
});
