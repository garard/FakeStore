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
	NotLoggedIn,
} from "../Index";
import { selectCartTotalCount } from "../store/CartSlice";
import { newOrderTotal } from "../store/OrdersSlice";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
const Tabs = createBottomTabNavigator();

const cartBadge = () => {
	const totalCount = useSelector(selectCartTotalCount);
	return totalCount === 0 ? null : totalCount;
};
const ordersBadge = () => {
	const totalCount = useSelector(newOrderTotal);
	if (totalCount === null) {
		return null;
	} else {
		return totalCount === 0 ? null : totalCount;
	}
};
export default function BottomTab() {
	const token = useSelector((state) => state.user.token);

	// from documentation
	const handleTabPress = (e, navigation, routeName) => {
		if (!token) {
			e.preventDefault();
			alert("You need to log in to access this feature.");
		} else {
			navigation.navigate(routeName);
		}
	};
	return (
		<Tabs.Navigator initialRouteName="User">
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
				}} // from documentation
				listeners={({ navigation }) => ({
					tabPress: (e) => handleTabPress(e, navigation, "Shop"),
				})}
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
					tabBarBadge: cartBadge(),
				}}
				listeners={({ navigation }) => ({
					tabPress: (e) => handleTabPress(e, navigation, "Cart"),
				})}
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
					tabBarBadge: ordersBadge(),
				}}
				listeners={({ navigation }) => ({
					tabPress: (e) => handleTabPress(e, navigation, "My Orders"),
				})}
			/>
			<Tabs.Screen
				name="User"
				component={UserAccountStack}
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
