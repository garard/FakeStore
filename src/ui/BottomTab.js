import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Category, Product, Splash, Styles, Cart, ShopStack } from "../Index";
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import CartBadge from '../store/CartBadge';
import { Provider } from "react-redux";
import store from "../store/store"

const Tabs = createBottomTabNavigator();

export default function BottomTab() {
    return (
        <Provider store={store}>
            <Tabs.Navigator initialRouteName='ShopStack'>
                <Tabs.Screen
                    name="Shop"
                    component={ShopStack}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, size, color }) => (
                            focused ?
                                <Ionicons name="home" color={color} size={size} /> :
                                <Ionicons name="home-outline" color={color} size={size} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="Cart"
                    component={Cart}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, size, color }) => (
                            focused ?
                                <Ionicons name="cart" color={color} size={size} /> :
                                <Ionicons name="cart-outline" color={color} size={size} />
                        ),
                        tabBarBadge: <CartBadge />,
                    }}
                />
            </Tabs.Navigator>
        </Provider>
    );
}