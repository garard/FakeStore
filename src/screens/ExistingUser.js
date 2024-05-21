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
import { signinUser, signupUser } from "../service/authService";

export default function ExistingUser({ route, navigation }) {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navToNewUser = () => {
		navigation.navigate("NewUser");
	};
	const navToUserProfile = () => {
		navigation.navigate("UserProfile");
	};
	const clearAll = () => {
		setEmail("");
		setPassword("");
		console.log("all fields cleared");
	};
	const loginUserAccount = async (email, password) => {
		try {
			const userData = await signinUser({ email, password });
			console.log(userData);
			if (userData.token) {
				//alert("Account created successfully");
				console.log("recieved");
				console.log(userData);
				dispatch(
					loginUser({ email: userData.email, token: userData.token })
				);
				//navToUserProfile();
				// nav to User Profile Screen
			} else {
				alert(userData.message);
			}
		} catch (error) {
			console.error("Failed to create user:", error);
			throw new Error("Failed to create user: " + error.message);
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
