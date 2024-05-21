import {
	Text,
	View,
	Pressable,
	Alert,
	styles,
	FlatList,
	StatusBar,
	TextInput,
	Image,
	ActivityIndicator,
} from "react-native";
import { logUserState, loginUser, checkAccount } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Styles from "../components/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { signupUser } from "../service/authService";

export default function NewUser({ route, navigation }) {
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const createUser = async (name, email, password) => {
		try {
			const userData = await signupUser({ name, email, password });
			if (userData.token) {
				alert("Account created successfully");
				dispatch(
					loginUser({ email: userData.email, token: userData.token })
				);
				// nav to User Profile Screen
			} else {
				alert(userData.message);
			}
		} catch (error) {
			console.error("Failed to create user:", error);
			throw new Error("Failed to create user: " + error.message);
		}
	};
	const handleCheckAccount = () => {
		dispatch(checkAccount());
	};
	const navToExistingUser = () => {
		navigation.navigate("Login");
	};
	const clearAll = () => {
		setName("");
		setEmail("");
		setPassword("");
		console.log("all fields cleared");
	};
	return (
		<SafeAreaView style={Styles.container}>
			<View style={Styles.header}>
				<Text style={Styles.categoryText}>New User</Text>
			</View>

			<View style={Styles.body}>
				<Text style={Styles.titleBar}>Name</Text>
				<TextInput
					style={[Styles.textBox]}
					placeholder="Enter full name..."
					onChangeText={(text) => setName(text)}
					value={name}
					autoCapitalize={"words"}
				/>
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
					onPress={() => navToExistingUser()}
				>
					<Text>Have an account?</Text>
				</Pressable>
			</View>

			<View style={Styles.footer}>
				<Pressable style={Styles.navButton} onPress={() => clearAll()}>
					<Text>Clear</Text>
				</Pressable>
				<Pressable
					style={Styles.navButton}
					onPress={() => createUser(name, email, password)}
				>
					<Text>Sign-up</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
}
