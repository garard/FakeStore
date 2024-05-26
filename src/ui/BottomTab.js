import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Cart, ShopStack, MyOrders, UserAccountStack } from "../Index";
import { selectCartTotalCount } from "../store/CartSlice";
import { newOrderTotal } from "../store/OrdersSlice";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { logoutUser } from "../store/userSlice";
import { clearCart } from "../store/CartSlice";
import { clearOrders } from "../store/OrdersSlice";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
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
	const dispatch = useDispatch();
	const token = useSelector((state) => state.user.token);
	const loginTime = useSelector((state) => state.user.loginTime);
	// from documentation
	const handleTabPress = (e, navigation, routeName) => {
		if (!token) {
			e.preventDefault();
			alert("You need to log in to access this feature.");
		} else {
			navigation.navigate(routeName);
		}
	};
	const nav = useNavigation();
	const logout = () => {
		alert("Session has expired");
		nav.navigate("User");
		dispatch(clearCart());
		dispatch(logoutUser());
		dispatch(clearOrders());
	};
	useEffect(() => {
		const timerInterval = setInterval(() => {
			const currentTime = Math.floor(Date.now() / 1000);
			const loginDuration = currentTime - loginTime;
			if (token) {
				console.log(`logged in for ${loginDuration} minutes`);
				if (loginDuration >= 3600) {
					clearInterval(timerInterval);
					logout();
				}
			} else {
				clearInterval(timerInterval);
			}
		}, 60000);
		return () => clearInterval(timerInterval);
	}, [token, loginTime, dispatch]);

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
