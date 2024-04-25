import { Text, View, Pressable, Alert, styles, FlatList, StatusBar, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Styles from "../components/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from '@react-navigation/native';


export default function Splash({ navigation }) {

    const navToHome = (categories) => {
        console.log("sending")
        console.log(categories)
        navigation.navigate("Home", { categories: categories });
    };


    useEffect(() => {
        async function getCategories() {
            try {
                const data = await fetch("https://fakestoreapi.com/products/categories")
                const categories = await data.json()
                navToHome(categories)
            }
            catch (e) {
                const createTwoButtonAlert = () =>
                    Alert.alert('Error', 'Failed to fetch categories');
                console.error('error fetching address', e)
            }
        }
        getCategories()
    }, []);

    return (
        <SafeAreaView style={Styles.container}>
            <View style={Styles.splash}>
                <Image
                    source={require("../assets/images/logo.png")}
                    style={Styles.logo}
                    resizeMode="contain"
                />
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        </SafeAreaView>
    );

};