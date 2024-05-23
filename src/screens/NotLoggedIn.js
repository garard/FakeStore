import {
	Text,
	View,
	Pressable,
	Alert,
	styles,
	FlatList,
	StatusBar,
	Image,
	ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Styles from "../components/Styles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotLoggedIn({ route, navigation }) {
	return (
		<SafeAreaView style={Styles.container}>
			<View style={Styles.header}>
				<Text style={Styles.categoryText}>User Not Logged-in</Text>
			</View>

			<View style={Styles.body}>
				<Text style={Styles.categoryText}>
					Please log-in using the User menu.
				</Text>
			</View>

			<View style={Styles.footer}></View>
		</SafeAreaView>
	);
}
