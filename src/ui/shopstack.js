import { createStackNavigator } from "@react-navigation/stack";
import { Home, Category, Product, Splash, Styles, Cart } from "../Index";

const Stack = createStackNavigator();

export default function ShopStack() {
	return (
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen
				name="Home"
				component={Home}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Category"
				component={Category}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Product"
				component={Product}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}
