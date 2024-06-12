import { Image, StyleSheet, View, useWindowDimensions } from "react-native";

export default function SplashScreen() {
	const { height, width } = useWindowDimensions();

	return (
		<View style={{ width, height }}>
			<Image
				source={require("../../assets/images/splash.png")}
				resizeMode="center"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ffffff",
		width: 200,
		height: 300,
	},
});
