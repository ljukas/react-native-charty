import type { ExpoConfig } from "expo/config";
import "ts-node/register";

const config: ExpoConfig = {
	name: "Charty",
	slug: "react-native-charty",
	version: "1.0.0",
	orientation: "portrait",
	icon: "./assets/images/icon.png",
	scheme: "react-native-charty",
	userInterfaceStyle: "automatic",
	splash: {
		image: "./assets/images/splash.png",
		resizeMode: "contain",
		backgroundColor: "#ff9486",
	},
	ios: {
		bundleIdentifier: "com.ljukas.reactnativecharty",
		supportsTablet: true,
	},
	android: {
		package: "com.ljukas.reactnativecharty",
		adaptiveIcon: {
			foregroundImage: "./assets/images/adaptive-icon.png",
			backgroundColor: "#ff9486",
		},
	},
	plugins: [
		[
			"expo-dev-launcher",
			{
				launchMode: "most-recent",
			},
		],
		"expo-router",
	],
	experiments: {
		typedRoutes: true,
	},
	extra: {
		eas: {
			projectId: "e3f7c6f8-33f7-46d4-8c73-deda5f6bfc82",
		},
	},
};

export default config;
