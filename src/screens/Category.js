import { Text, View, Pressable, Alert, styles, FlatList, StatusBar, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Styles from "../components/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";

export default function Category({ route, navigation }) {

    const navToProduct = (id) => {
        navigation.navigate("Product", { id: id });
    };



    const category = route.params.category
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const navToHome = () => {
        navigation.navigate("Home");
    };
    useEffect(() => {
        async function getProducts() {
            try {
                const data = await fetch("https://fakestoreapi.com/products/category/" + category)
                const productsData = await data.json()
                console.log(productsData)
                setProducts(productsData)
            }
            catch (e) {
                const createTwoButtonAlert = () =>
                    Alert.alert('Error', 'Failed to fetch products');
                console.error('error fetching products', e)
            }
            finally {
                setLoading(false)
            }
        }
        getProducts()
    }, []);

    const renderProducts = ({ item }) => {
        return (
            <Pressable onPress={() => navToProduct(item.id)}>
                <View style={Styles.productDisplay}>

                    <View style={Styles.imageContainer}>

                        <Image source={{ uri: item.image }} style={Styles.productImage} />
                    </View>
                    <View style={Styles.infoContainer}>

                        <Text style={Styles.title}>{item.title}</Text>

                        <Text style={Styles.price}>${item.price.toFixed(2)}</Text>
                    </View>

                </View>
            </Pressable>
        );
    };




    return (
        <SafeAreaView style={Styles.container}>


            <View style={Styles.header}>
                <Text style={Styles.categoryText}>
                    {category.replace(/\b(?!s\b)\w/g, (c) => c.toUpperCase())}
                </Text>
            </View>

            <View style={Styles.body}>
                {loading == true ? (
                    <ActivityIndicator size="large" color="red" />
                ) : (
                    <FlatList
                        data={products}
                        renderItem={renderProducts}
                        keyExtractor={(item) => item.id.toString()}
                    />
                )}
            </View>

            <View style={Styles.footer}>
                <Pressable style={Styles.navButton} onPress={navToHome}>

                    <Ionicons
                        name="home"
                        color={"black"}
                        size={20}
                    />


                    <Text>Home</Text>
                </Pressable>
            </View>




        </SafeAreaView>
    );

};