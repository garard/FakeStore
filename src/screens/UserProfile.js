import {
	Text,
	View,
	TextInput,
	Pressable,
	Alert,
	Image,
	FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Styles from "../components/Styles";
import { useSelector, useDispatch } from "react-redux";
import {
	logUserState,
	loginUser,
	checkAccount,
	logoutUser,
} from "../store/userSlice";
import { clearCart } from "../store/CartSlice";

export default function UserProfile({ navigation }) {
	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const dispatch = useDispatch();

	const logout = () => {
		dispatch(clearCart());
		dispatch(logoutUser());
	};

	return (
		<SafeAreaView style={Styles.container}>
			<View style={Styles.header}>
				<Text style={Styles.categoryText}>User Profile</Text>
			</View>

			<View style={Styles.body}>
				<Text style={Styles.titleBar}>Name</Text>
				<TextInput
					style={[Styles.textBox]}
					placeholder="Enter full name..."
					onChangeText={(text) => setUserName(text)}
					value={userName}
					autoCapitalize={"words"}
				/>
				<Text style={Styles.titleBar}>E-mail</Text>
				<TextInput
					style={[Styles.textBox]}
					placeholder="Enter e-mail address..."
					onChangeText={(text) => userEmail(text)}
					value={userEmail}
				/>
				{/* <Text style={Styles.titleBar}>Password</Text>
				<TextInput
					style={[Styles.textBox]}
					placeholder="Enter a password..."
					onChangeText={(text) => setPassword(text)}
					value={password}
					secureTextEntry={true}
				/> */}
				<Pressable
					style={[
						Styles.navButton,
						{ marginLeft: 10, marginTop: 30 },
					]}
					onPress={() => console.log("Update Details")}
				>
					<Text>Update Details</Text>
				</Pressable>
			</View>

			<View style={Styles.footer}>
				<Pressable style={Styles.navButton} onPress={() => logout()}>
					<Text>Log out</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
}
