import { tintColorLight } from "@/constants/Colors";
import { Image } from "expo-image";
import { SplashScreen, useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";

export default function Splash() {
	const router = useRouter();

	useFocusEffect(
		useCallback(() => {
			setTimeout(() => {
				router.replace("/(tabs)");
			}, 1000);
		}, [router]),
	);

	return (
		<View style={styles.container}>
			<Image
				onLoad={() => SplashScreen.hideAsync()}
				source={require("../../assets/images/splash.png")}
				contentFit="contain"
				style={{ flex: 1 }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: tintColorLight,
	},
});
