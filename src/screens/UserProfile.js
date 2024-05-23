import { Text, View, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Styles from "../components/Styles";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../store/userSlice";
import { clearCart } from "../store/CartSlice";
import { clearOrders } from "../store/OrdersSlice";
import { updateUserProfile } from "../service/authService";
export default function UserProfile({ navigation }) {
	const accountDetails = useSelector((state) => state.user);
	const userName = accountDetails.name;
	const userEmail = accountDetails.email;
	const [updateName, setUpdateName] = useState("");
	const [updatePassword, setUpdatePassword] = useState("");
	const dispatch = useDispatch();
	const [update, setUpdate] = useState(0);
	const userToken = accountDetails.token;
	const logout = () => {
		dispatch(clearCart());
		dispatch(logoutUser());
		dispatch(clearOrders());
	};

	const cancelUpdate = () => {
		setUpdateName("");
		setUpdatePassword("");
		setUpdate(0);
	};

	const updateAccount = async (token, name, password) => {
		try {
			console.log(userToken);
			const userData = await updateUserProfile({ token, name, password });
			if (userData.status === "OK") {
				alert("Account updated successfully");
				dispatch(
					loginUser({
						email: userEmail,
						token: userToken,
						name: updateName,
					})
				);
			} else {
				alert(userData.message);
			}
		} catch (error) {
			console.error("Failed to create user:", error);
			throw new Error("Failed to create user: " + error.message);
		} finally {
			cancelUpdate();
		}
	};

	return (
		<SafeAreaView style={Styles.container}>
			<View style={Styles.header}>
				<Text style={Styles.categoryText}>User Profile</Text>
			</View>

			<View style={Styles.body}>
				{update === 0 ? (
					<View style={Styles.body}>
						<Text style={Styles.titleBar}>Name: {userName}</Text>

						<Text style={Styles.titleBar}>E-mail: {userEmail}</Text>
						<Pressable
							style={[
								Styles.navButton,
								{ marginLeft: 10, marginTop: 30 },
							]}
							onPress={() => setUpdate(1)}
						>
							<Text>Update Details</Text>
						</Pressable>
					</View>
				) : (
					<View style={Styles.body}>
						<Text style={Styles.titleBar}>Enter new details </Text>
						<Text style={Styles.titleBar}>Name: </Text>
						<TextInput
							style={[Styles.textBox]}
							placeholder="Enter new Name..."
							onChangeText={(text) => setUpdateName(text)}
							value={updateName}
						/>
						<Text style={Styles.titleBar}>Password: </Text>
						<TextInput
							style={[Styles.textBox]}
							placeholder="Enter new Password..."
							onChangeText={(text) => setUpdatePassword(text)}
							value={updatePassword}
							secureTextEntry={true}
						/>
						<View
							style={[{ flexDirection: "row", marginRight: 30 }]}
						>
							<Pressable
								style={Styles.navButton}
								onPress={() => cancelUpdate()}
							>
								<Text>Cancel</Text>
							</Pressable>
							<Pressable
								style={Styles.navButton}
								onPress={() =>
									updateAccount(
										userToken,
										updateName,
										updatePassword
									)
								}
							>
								<Text>Subimt</Text>
							</Pressable>
						</View>
					</View>
				)}
			</View>

			<View style={Styles.footer}>
				<Pressable style={Styles.navButton} onPress={() => logout()}>
					<Text>Log out</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
}
