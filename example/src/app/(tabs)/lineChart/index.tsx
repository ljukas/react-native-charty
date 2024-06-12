import { StyleSheet, Text } from "react-native";

import { ScrollView } from "react-native-gesture-handler";

export default function LineChartScreen() {
	return (
		<ScrollView style={styles.scrollView}>
			<Text>Line Charts</Text>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scrollView: {
		backgroundColor: "white",
	},
});
