import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	Home,
	Category,
	Product,
	Splash,
	Styles,
	Cart,
	ShopStack,
	MyOrders,
	NewUser,
	ExistingUser,
	UserAccountStack,
	UserProfile,
} from "../Index";
import { selectCartTotalCount } from "../store/CartSlice";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import CartBadge from "../store/CartBadge.js";

import { useSelector, useDispatch } from "react-redux";

const Tabs = createBottomTabNavigator();
const Badge = () => {
	const totalCount = useSelector(selectCartTotalCount);
	return totalCount === 0 ? null : totalCount;
};
export default function BottomTab() {
	const dispatch = useDispatch();
	return (
		<Tabs.Navigator initialRouteName="ShopStack">
			<Tabs.Screen
				name="Shop"
				component={ShopStack}
				options={{
					headerShown: false,
					tabBarIcon: ({ focused, size, color }) =>
						focused ? (
							<Ionicons name="home" color={color} size={size} />
						) : (
							<Ionicons
								name="home-outline"
								color={color}
								size={size}
							/>
						),
				}}
			/>
			<Tabs.Screen
				name="Cart"
				component={Cart}
				options={{
					headerShown: false,
					tabBarIcon: ({ focused, size, color }) =>
						focused ? (
							<Ionicons name="cart" color={color} size={size} />
						) : (
							<Ionicons
								name="cart-outline"
								color={color}
								size={size}
							/>
						),
					tabBarBadge: Badge(),
				}}
			/>
			<Tabs.Screen
				name="My Orders"
				component={MyOrders}
				options={{
					headerShown: false,
					tabBarIcon: ({ focused, size, color }) =>
						focused ? (
							<Ionicons
								name="file-tray-full"
								color={color}
								size={size}
							/>
						) : (
							<Ionicons
								name="file-tray-full-outline"
								color={color}
								size={size}
							/>
						),
				}}
			/>
			<Tabs.Screen
				name="User"
				component={UserAccountStack} // Conditional if user is logged in
				options={{
					headerShown: false,
					tabBarIcon: ({ focused, size, color }) =>
						focused ? (
							<Ionicons
								name="person-circle"
								color={color}
								size={size}
							/>
						) : (
							<Ionicons
								name="person-circle-outline"
								color={color}
								size={size}
							/>
						),
				}}
			/>
		</Tabs.Navigator>
	);
}
