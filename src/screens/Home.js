import { Text, View, Pressable, Alert, styles, FlatList, StatusBar, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Styles from "../components/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from '@react-navigation/native';


export default function Home({ route, navigation }) {

    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState()

    const navToCategory = (category) => {
        navigation.navigate("Category", { category: category });
    };

    const renderCategories = ({ item }) => {
        return (
            <View style={Styles.categoryDisplay}>
                <Pressable onPress={() => navToCategory(item)}>
                    <Text style={Styles.categoryText}>
                        {item.replace(/\b(?!s\b)\w/g, (c) => c.toUpperCase())}
                    </Text>

                </Pressable>
            </View>
        );
    };

    useEffect(() => {
        async function getCategories() {
            setCategories(route.params.categories);
            if (route.params.categories != null) {
                setCategories(route.params.categories)
                setLoading(false)
                console.log("loaded cateogies from splash")
            } else {
                try {
                    const data = await fetch("https://fakestoreapi.com/products/categories")
                    const categories = await data.json()
                    console.log("categories loaded in the try")
                    setCategories(categories)
                }
                catch (e) {
                    const createTwoButtonAlert = () =>
                        Alert.alert('Error', 'Failed to fetch categories');
                    console.error('error fetching address', e)
                }
                finally {
                    setLoading(false)
                }
            }
        }
        getCategories()
    }, [categories]);

    console.log("These categories")
    console.log(categories)


    return (
        <SafeAreaView style={Styles.container}>




            <View style={Styles.header}>
                <Text style={Styles.categoryText}>
                    CATEGORIES
                </Text>
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



            <View style={Styles.footer}>
            </View>



        </SafeAreaView>
    );

};