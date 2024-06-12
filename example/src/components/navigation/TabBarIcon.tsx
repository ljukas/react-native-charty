// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import AntDesignIcons from "@expo/vector-icons/AntDesign";
import type { IconProps } from "@expo/vector-icons/build/createIconSet";
import type { ComponentProps } from "react";

export function TabBarIcon({
	style,
	...rest
}: IconProps<ComponentProps<typeof AntDesignIcons>["name"]>) {
	return <AntDesignIcons size={24} style={style} {...rest} />;
}
