import { Text, View, Pressable, Alert, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Styles from "../components/Styles";
import { useSelector, useDispatch } from "react-redux";

export default function UserProfile({ navigation }) {
	return <SafeAreaView style={Styles.container}></SafeAreaView>;
}
