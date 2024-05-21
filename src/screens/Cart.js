import { Text, View, Pressable, Alert, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Styles from "../components/Styles";
import { useSelector, useDispatch } from "react-redux";
import {
	increment,
	decrement,
	addToCart,
	displayCart,
} from "../store/CartSlice";
import CartBadge from "../store/CartBadge";
import { NavigationContainer } from "@react-navigation/native";

export default function Cart({ navigation }) {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);
	const [total, setTotal] = useState("0");
	const dispatch = useDispatch();

	const addToCart = (id) => {
		dispatch(increment({ id }));
	};

	const removeFromCart = (id) => {
		dispatch(decrement({ id }));
	};

	const userCart = useSelector((state) => state.cart);

	useEffect(() => {
		let totalCost = 0;
		cart.forEach((product) => (totalCost += product.price * product.count));
		setTotal(totalCost.toFixed(2));
	}, [cart]);

	useEffect(() => {
		const productsData = products.filter((product) => userCart[product.id]);
		const cartProductsQuantity = productsData.map((product) => ({
			...product,
			count: userCart[product.id].count,
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

	// useEffect(() => {
	//     async function getProducts() {
	//         try {
	//             const data = await fetch("https://fakestoreapi.com/products/")
	//             const productsData = await data.json()
	//             setProducts(productsData)
	//         }
	//         catch (e) {
	//             const createTwoButtonAlert = () =>
	//                 Alert.alert('Error', 'Failed to fetch products');
	//             console.error('error fetching products', e)
	//         }
	//     }
	//     getProducts()
	// }, []);

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
						<Text style={Styles.quantity}>{item.count}</Text>
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
				<Text style={Styles.categoryText}>Shopping Cart</Text>
			</View>

			<View style={Styles.body}>
				<Pressable
					style={Styles.navButton}
					onPress={() => dispatch(displayCart())}
				>
					<Ionicons name="home" color={"black"} size={20} />

					<Text>Home</Text>
				</Pressable>
				{Object.entries(cart).length === 0 ? (
					<Text>Your shopping cart is empty.</Text>
				) : (
					<View>
						<Text style={[Styles.categoryText, { paddingTop: 0 }]}>
							<CartBadge /> Items{"\n"}Total Cost: ${total}
						</Text>
						<FlatList
							data={cart}
							renderItem={renderProducts}
							keyExtractor={(item) => item.id.toString()}
						/>
					</View>
				)}
			</View>

			<View style={Styles.footer}>
				{Object.entries(cart).length === 0 ? null : (
					<Pressable style={Styles.navButton}>
						<Ionicons name="home" color={"black"} size={20} />

						<Text>Checkout</Text>
					</Pressable>
				)}
			</View>
		</SafeAreaView>
	);
}
