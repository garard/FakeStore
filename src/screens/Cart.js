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
	selectCartTotalCount,
	clearCart,
} from "../store/CartSlice";
import { NavigationContainer } from "@react-navigation/native";
import { createNewOrder, retrieveOrders } from "../service/authService";
import { setOrders } from "../store/OrdersSlice";
export default function Cart({ navigation }) {
	const accountDetails = useSelector((state) => state.user);
	const token = accountDetails.token;
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);
	const [total, setTotal] = useState("0");
	const dispatch = useDispatch();
	const totalCount = useSelector(selectCartTotalCount);
	const addToCart = (id) => {
		dispatch(increment({ id }));
	};
	const transformCartToOrder = (cart) => {
		return {
			items: cart.map((item) => ({
				prodID: item.id,
				price: item.price,
				quantity: item.count,
			})),
		};
	};

	const removeFromCart = (id) => {
		dispatch(decrement({ id }));
	};
	const sendOrder = async (token, cart) => {
		try {
			const order = transformCartToOrder(cart);
			console.log(order);
			const userData = await createNewOrder({ token, order });
			if (userData.status === "OK") {
				//dispatch()
			} else {
				alert(userData.message);
			}
		} catch (error) {
			console.error("Failed to create order:", error);
			throw new Error("Failed to create order: " + error.message);
		} finally {
			alert("Succfully created order");
			dispatch(clearCart());
			const orderData = await retrieveOrders({
				token,
			});
			if (orderData.status === "OK") {
				console.log("Dispatching orders");
				dispatch(setOrders(orderData));
			}
		}
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
		console.log("cart: ");
		console.log(cart);
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
							{totalCount} Items{"\n"}Total Cost: ${total}
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
					<Pressable
						style={Styles.navButton}
						onPress={() => sendOrder(token, cart)}
					>
						<Ionicons name="home" color={"black"} size={20} />

						<Text>Checkout</Text>
					</Pressable>
				)}
			</View>
		</SafeAreaView>
	);
}
