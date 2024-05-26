import { Text, View, Pressable, TextInput } from "react-native";
import { loginUser } from "../store/userSlice";
import { setOrders } from "../store/OrdersSlice";
import { setCart } from "../store/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Styles from "../components/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	retrieveOrders,
	signinUser,
	retrieveCart,
} from "../service/authService";

export default function ExistingUser({ route, navigation }) {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	useEffect(() => {}, []);
	const navToNewUser = () => {
		navigation.navigate("NewUser");
	};
	const clearAll = () => {
		setEmail("");
		setPassword("");
	};
	const loginUserAccount = async (email, password) => {
		try {
			const userData = await signinUser({ email, password });
			if (userData.token) {
				dispatch(
					loginUser({
						email: userData.email,
						token: userData.token,
						name: userData.name,
					})
				);
				const orderData = await retrieveOrders({
					token: userData.token,
				});
				if (orderData.status === "OK") {
					dispatch(setOrders(orderData)); // Ensure you're passing the correct structure
				} else {
					console.error(
						"Failed to retrieve orders:",
						orderData.message
					);
				}
				const cartData = await retrieveCart({
					token: userData.token,
				});
				if (cartData.status === "OK") {
					dispatch(setCart(cartData));
				} else {
					console.error(
						"Failed to retrieve orders:",
						orderData.message
					);
				}
			} else {
				alert(userData.message);
			}
		} catch (error) {
			console.error("Failed to login user:", error);
			throw new Error("Failed to login user: " + error.message);
		}
	};

	return (
		<SafeAreaView style={Styles.container}>
			<View style={Styles.header}>
				<Text style={Styles.categoryText}>Account Login</Text>
			</View>

			<View style={Styles.body}>
				<Text style={[Styles.categoryText, { marginBottom: 25 }]}>
					Sign in with your{"\n"}email and password
				</Text>

				<Text style={Styles.titleBar}>E-mail</Text>
				<TextInput
					style={[Styles.textBox]}
					placeholder="Enter e-mail address..."
					onChangeText={(text) => setEmail(text)}
					value={email}
				/>
				<Text style={Styles.titleBar}>Password</Text>
				<TextInput
					style={[Styles.textBox]}
					placeholder="Enter a password..."
					onChangeText={(text) => setPassword(text)}
					value={password}
					secureTextEntry={true}
				/>
				<Pressable
					style={[
						Styles.navButton,
						{ marginLeft: 10, marginTop: 30 },
					]}
					onPress={() => navToNewUser()}
				>
					<Text>New User?</Text>
				</Pressable>
				<Pressable
					style={Styles.navButton}
					onPress={() => loginUserAccount("yes@ok.com", "Password1!")}
				>
					<Text>Test user</Text>
				</Pressable>
			</View>

			<View style={Styles.footer}>
				<Pressable style={Styles.navButton} onPress={() => clearAll()}>
					<Text>Clear</Text>
				</Pressable>
				<Pressable
					style={Styles.navButton}
					onPress={() => loginUserAccount(email, password)}
				>
					<Text>Log in</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
}
