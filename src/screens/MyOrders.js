import { Text, View, Pressable, Alert, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Styles from "../components/Styles";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, addToCart } from "../store/CartSlice";

export default function MyOrders({ navigation }) {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);
	const [total, setTotal] = useState("0");
	const dispatch = useDispatch();

	const navToCart = () => {
		navigation.navigate("Cart");
	};
	const addToCart = (id) => {
		dispatch(increment({ id }));
	};

	const removeFromCart = (id) => {
		dispatch(decrement({ id }));
	};

	const userCart = useSelector((state) => state.cart);

	useEffect(() => {
		let totalCost = 0;
		cart.forEach(
			(product) => (totalCost += product.price * product.quantity)
		);
		setTotal(totalCost.toFixed(2));
	}, [cart]);

	useEffect(() => {
		const productsData = products.filter((product) => userCart[product.id]);
		const cartProductsQuantity = productsData.map((product) => ({
			...product,
			quantity: userCart[product.id],
		}));
		setCart(cartProductsQuantity);
	}, [userCart, products]);

	useEffect(() => {
		async function getProducts() {
			try {
				const data = await fetch("http://10.0.2.2:3000/products/");
				const productsData = await data.json();
				setProducts(productsData);
			} catch (e) {
				console.log(
					"Error fetching product from local, is the server running?",
					e
				);
				try {
					const data = await fetch(
						"https://fakestoreapi.com/products/"
					);
					const productData = await data.json();
					setProducts(productsData);
				} catch (e) {
					console.log(
						"Error fetching product from FakeStoreAPI, is the website down?",
						e
					);
				}
			}
		}
		getProducts();
	}, []);

	const renderProducts = ({ item }) => {
		return (
			<View style={Styles.productDisplay}>
				<View style={Styles.imageContainer}>
					<Image
						source={{ uri: item.image }}
						style={Styles.productImage}
					/>
				</View>
				<View style={Styles.infoContainer}>
					<Pressable>
						<Text style={Styles.title}>{item.title}</Text>
					</Pressable>
					<View
						style={[
							{
								flexDirection: "row",
								justifyContent: "space-around",
							},
						]}
					>
						<Text style={Styles.price}>
							${item.price.toFixed(2)}
						</Text>
						<Pressable onPress={() => removeFromCart(item.id)}>
							<Ionicons name="remove-circle-outline" size={25} />
						</Pressable>
						<Text style={Styles.quantity}>{item.quantity}</Text>
						<Pressable onPress={() => addToCart(item.id)}>
							<Ionicons name="add-circle-outline" size={25} />
						</Pressable>
					</View>
				</View>
			</View>
		);
	};

	return (
		<SafeAreaView style={Styles.container}>
			<View style={Styles.header}>
				<Text style={Styles.categoryText}>Orders</Text>
			</View>

			<View style={Styles.body}>
				<Text>My Orders.</Text>
			</View>

			<View style={Styles.footer}>
				<Pressable
					style={Styles.navButton}
					onPress={() => console.log("Test")}
				>
					<Ionicons
						name="file-tray-full-outline"
						color={"black"}
						size={20}
					/>

					<Text>Test</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
}
