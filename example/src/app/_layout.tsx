import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
	});

	if (!loaded) {
		return null;
	}

	return (
		<GestureHandlerRootView>
			<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
				<Stack>
					<Stack.Screen
						name="index"
						options={{
							headerShown: false,
							animation: "fade",
						}}
					/>

					<Stack.Screen
						name="(tabs)"
						options={{ headerShown: false, animation: "fade" }}
					/>
					<Stack.Screen name="+not-found" />
				</Stack>
			</ThemeProvider>
		</GestureHandlerRootView>
	);
}

export const unstable_settings = {
	initialRouteName: "splash",
};
