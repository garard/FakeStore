import { createStackNavigator } from "@react-navigation/stack";
import { ExistingUser, NewUser, UserProfile } from "../Index";
import { useSelector } from "react-redux";
const Stack = createStackNavigator();
export default function ShopStack() {
	const user = useSelector((state) => state.user);
	return (
		<Stack.Navigator initialRouteName="Login">
			<Stack.Screen
				name="Login"
				component={user.token === null ? ExistingUser : UserProfile}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="NewUser"
				component={NewUser}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}
