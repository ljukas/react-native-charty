import type { ExpoConfig } from "expo/config";
import "ts-node/register";

const config: ExpoConfig = {
	name: "react-native-charty",
	slug: "react-native-charty",
	version: "1.0.0",
	orientation: "portrait",
	icon: "./assets/images/icon.png",
	scheme: "myapp",
	userInterfaceStyle: "automatic",
	splash: {
		image: "./assets/images/splash.png",
		resizeMode: "contain",
		backgroundColor: "#ffffff",
	},
	ios: {
		supportsTablet: true,
	},
	android: {
		adaptiveIcon: {
			foregroundImage: "./assets/images/adaptive-icon.png",
			backgroundColor: "#ffffff",
		},
	},
	web: {
		bundler: "metro",
		output: "static",
		favicon: "./assets/images/favicon.png",
	},
	plugins: ["expo-router"],
	experiments: {
		typedRoutes: true,
	},
};

export default config;
