import { Text, View, Pressable, Alert, ActivityIndicator, StyleSheet, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Styles from "../components/Styles";

export default function Product({ route, navigation }) {
    const { id } = route.params;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const navToCategory = () => {
        navigation.navigate("Category", { category: product.category });
    };

    useEffect(() => {
        async function getProduct() {
            try {
                const data = await fetch(`https://fakestoreapi.com/products/` + id);
                const productData = await data.json();
                console.log(productData);
                setProduct(productData);
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch product details');
                console.error('Error fetching product details', error);
            } finally {
                setLoading(false);
            }
        }
        getProduct();
    }, [id]);

    return (
        <SafeAreaView style={Styles.container}>

            <View style={Styles.header}>
                <Text style={Styles.categoryText}>
                    Product Details
                </Text>
            </View>
            <View style={[Styles.body, { height: "92%" }]}>
                {loading ? (
                    <ActivityIndicator size="large" color="red" />
                ) : (
                    <View style={[Styles.body, { height: "100%" }]}>
                        <Image source={{ uri: product.image }} style={Styles.image} />
                        <Text>{product.title}</Text>
                        <View style={Styles.rating}>
                            <Text>Rate: {product.rating.rate}</Text>
                            <Text>Sales: {product.rating.count}</Text>
                            <Text style={Styles.price}>Price: ${product.price.toFixed(2)}</Text>
                        </View>
                        <View style={Styles.productFooter}>
                            <Pressable style={Styles.productButton} onPress={() => navToCategory(product)}>
                                <Ionicons name="arrow-back-circle" color={"black"} size={20} />
                                <Text>Back</Text>
                            </Pressable>
                            <Pressable style={Styles.productButton} onPress={() => console.log("added to cart")}>
                                <Ionicons name="cart" color={"black"} size={20} />
                                <Text>Add to cart</Text>
                            </Pressable>
                        </View>
                        <Text style={{ fontSize: 15, fontWeight: "bold", alignSelf: "flex-start", marginHorizontal: 20, marginBottom: 3 }}>Description: </Text>
                        <View style={Styles.productDescription}>
                            <ScrollView>
                                <Text>{product.description}</Text>
                            </ScrollView>
                        </View>
                    </View>
                )}
            </View>
        </SafeAreaView >
    );
};