import {
	Text,
	View,
	Pressable,
	Alert,
	Image,
	FlatList,
	StyleSheet,
	Button,
	ScrollView,
	SectionList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Styles from "../components/Styles";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, addToCart } from "../store/CartSlice";
import { retrieveOrders, updateOrders } from "../service/authService";
import { updateUserOrders } from "../store/OrdersSlice";
import { setOrders } from "../store/OrdersSlice";
export default function MyOrders({ navigation }) {
	const token = useSelector((state) => state.user.token);
	const newOrders = useSelector((state) => state.orders.new);
	const paidOrders = useSelector((state) => state.orders.paid);
	const deliveredOrders = useSelector((state) => state.orders.delivered);
	const [expandedOrderId, setExpandedOrderId] = useState([]);
	const [expandedOrderType, setExpandedOrderType] = useState([]);
	const dispatch = useDispatch();
	const toggleExpanded = (orderID) => {
		setExpandedOrderId((prevExpandedOrderIds) => {
			if (prevExpandedOrderIds.includes(orderID)) {
				return prevExpandedOrderIds.filter((id) => id !== orderID);
			} else {
				return [...prevExpandedOrderIds, orderID];
			}
		});
	};
	useEffect(() => {
		async function getUserOrders(token) {
			const orderData = await retrieveOrders({
				token: token,
			});
			if (orderData.status === "OK") {
				console.log("Dispatching orders");
				dispatch(setOrders(orderData)); // Ensure you're passing the correct structure
			}
			console.log("got orders");
		}
		getUserOrders(token);
	}, [token]);

	const sections = [
		{ title: "New Orders", data: newOrders || [] },
		{ title: "Paid Orders", data: paidOrders || [] },
		{ title: "Delivered Orders", data: deliveredOrders || [] },
	];
	const progressOrder = async (token, item) => {
		const updateOrder = {
			token: token,
			orderID: item.id,
			is_paid: item.is_paid,
		};
		console.log(item);
		const res = await updateOrders(updateOrder);
		if (res.status === "OK") {
			alert(
				updateOrder.is_paid === 1
					? "Your order is Delivered"
					: "Your order is Paid"
			);
			toggleExpanded(item.id);
			dispatch(updateUserOrders(item));
		}
	};
	// useEffect(() => {
	// 	async function getOrders() {
	// 		try {
	// 			//console.log("Loading orders");
	// 			const userData = await retrieveOrders({ token });
	// 			if (userData.status === "OK") {
	// 				setOrders(userData);
	// 			}
	// 		} catch (e) {
	// 			console.log(
	// 				"Error fetching product from local, is the server running?",
	// 				e
	// 			);
	// 		}
	// 	}
	// 	getOrders();
	// }, []);

	const renderOrders = ({ item }) => {
		const orderItems = JSON.parse(item.order_items);
		const totalQuantity = orderItems.reduce(
			(sum, orderItem) => sum + orderItem.quantity,
			0
		);
		const totalPrice = orderItems.reduce(
			(sum, orderItem) => sum + orderItem.price * orderItem.quantity,
			0
		);
		const isShown =
			(expandedOrderId.includes("New Orders") && item.is_paid === 0) ||
			(expandedOrderId.includes("Paid Orders") &&
				item.is_paid === 1 &&
				item.is_delivered === 0) ||
			(expandedOrderId.includes("Delivered Orders") &&
				item.is_paid === 1 &&
				item.is_delivered === 1);
		const isExpanded = expandedOrderId.includes(item.id);
		const progressOrderText = item.is_paid === 0 ? "Pay" : "Receive";
		return (
			<View>
				{isShown && (
					<View
						style={[
							Styles.orderDisplay,
							{
								flexDirection: "row",
								justifyContent: "space-around",
							},
						]}
					>
						<Text style={Styles.title}>ID: {item.id}</Text>
						<Text style={Styles.title}>
							Item Qty: {totalQuantity}
						</Text>
						<Text style={Styles.title}>
							Total: ${totalPrice.toFixed(2)}
						</Text>
						<Ionicons
							name={
								isExpanded
									? "caret-up-outline"
									: "caret-down-outline"
							}
							color={"green"}
							size={20}
							onPress={() => toggleExpanded(item.id)}
						/>
					</View>
				)}
				{isExpanded && (
					<View
						style={[
							Styles.productDisplay,
							{
								flexDirection: "column",
								alignItems: "flex-end",
							},
						]}
					>
						<ScrollView>
							{orderItems.map((orderItem, index) => (
								<View
									key={index}
									style={{
										flexDirection: "row",
										justifyContent: "space-evenly",
										marginVertical: 2,
										width: 340,
									}}
								>
									<Text style={Styles.title}>
										ProdID: {orderItem.prodID}
									</Text>
									<Text style={Styles.title}>
										Quantity: {orderItem.quantity}
									</Text>
									<Text style={Styles.title}>
										Total: $
										{(
											orderItem.price * orderItem.quantity
										).toFixed(2)}
									</Text>
								</View>
							))}
						</ScrollView>
						<Pressable
							style={[
								Styles.navButton,
								{ height: 25, width: 75 },
							]}
							onPress={() => progressOrder(token, item)}
						>
							<Text>{progressOrderText}</Text>
						</Pressable>
					</View>
				)}
			</View>
		);
	};

	return (
		<SafeAreaView style={Styles.container}>
			<View style={Styles.header}>
				<Text style={Styles.categoryText}>Orders</Text>
			</View>
			<View style={Styles.body}>
				<SectionList
					sections={sections}
					keyExtractor={(item, index) => item.id.toString()}
					renderItem={({ item }) => renderOrders({ item })}
					renderSectionHeader={({ section: { title, data } }) => (
						<View
							style={[
								{
									flexDirection: "row",
									justifyContent: "space-between",
									width: "90%",
								},
							]}
						>
							<Text style={Styles.categoryText}>{title}</Text>
							<Pressable onPress={() => toggleExpanded(title)}>
								<Ionicons
									name={
										data.length > 0
											? expandedOrderId.includes(title)
												? "caret-down-outline"
												: "caret-up-outline"
											: null
									}
									color={"black"}
									size={30}
									marginVertical={10}
								/>
							</Pressable>
						</View>
					)}
				/>
			</View>

			<View style={Styles.footer}>
				<Pressable
					style={Styles.navButton}
					onPress={() => console.log(orders)}
				>
					<Ionicons
						name="file-tray-full-outline"
						color={"black"}
						size={20}
					/>

					<Text>Log</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
}

// Body was originally 3 flatlists inside a scrollview,
// giving error VirtualizedLists should never be nested inside plain ScrollViews
// discovered sectionlist as a solution
