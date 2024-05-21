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
import { useRoute } from "@react-navigation/native";

export default function Home({ route, navigation }) {
	const [loading, setLoading] = useState(true);
	const [categories, setCategories] = useState();
	const author = ["Made by Brandon Garard"];

	const navToCategory = (category) => {
		navigation.navigate("Category", { category: category });
	};

	const renderCategories = ({ item }) => {
		return (
			<View style={Styles.categoryDisplay}>
				<Pressable
					onPress={() => {
						item != author ? navToCategory(item) : null;
					}}
				>
					<Text style={Styles.categoryText}>
						{item.replace(/\b(?!s\b)\w/g, (c) => c.toUpperCase())}
					</Text>
				</Pressable>
			</View>
		);
	};

	useEffect(() => {
		async function getCategories() {
			try {
				const data = await fetch(
					"http://10.0.2.2:3000/products/categories"
				);
				const categories = await data.json();
				setCategories(categories.concat(author));
				console.log(categories.concat(author));
			} catch (e) {
				console.log(
					"Error fetching from local, is the server running?",
					e
				);
				try {
					const data = await fetch(
						"https://fakestoreapi.com/products/categories"
					);
					const categories = await data.json();
					setCategories(categories);
				} catch (e) {
					console.log(
						"Error fetching from FakeStoreAPI, is the website down?",
						e
					);
				}
			} finally {
				setLoading(false);
			}
		}
		getCategories();
	}, []);

	return (
		<SafeAreaView style={Styles.container}>
			<View style={Styles.header}>
				<Text style={Styles.categoryText}>Product Categories</Text>
			</View>

			<View style={Styles.body}>
				{loading ? (
					<ActivityIndicator size="large" color="red" />
				) : (
					<View>
						{!categories == true ? (
							<ActivityIndicator size="large" color="red" />
						) : (
							<FlatList
								data={categories}
								renderItem={renderCategories}
								keyExtractor={(item, index) => index.toString()}
							/>
						)}
					</View>
				)}
			</View>

			<View style={Styles.footer}></View>
		</SafeAreaView>
	);
}
