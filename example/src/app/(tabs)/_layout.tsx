import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			initialRouteName="lineChart"
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="lineChart"
				options={{
					title: "Line Charts",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "linechart" : "linechart"}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
