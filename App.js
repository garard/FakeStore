import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTab } from './src/Index'
// import { createStackNavigator } from '@react-navigation/stack';
// import { Home, Category, Product, Splash, Styles, Cart, ShopStack, BottomTab } from "./src/Index";
// import SplashScreen from 'react-native-splash-screen'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons } from "@expo/vector-icons";
// import { useState, useEffect } from 'react';

// const Stack = createStackNavigator();
// const Tabs = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <BottomTab />
    </NavigationContainer>
  );
}

// const ShopStack = () => {
//   return (
//     <Stack.Navigator initialRouteName='Home'>
//       <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
//       <Stack.Screen name="Category" component={Category} options={{ headerShown: false }} />
//       <Stack.Screen name="Product" component={Product} options={{ headerShown: false }} />
//     </Stack.Navigator>
//   )
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tabs.Navigator initialRouteName='ShopStack'>
//         <Tabs.Screen
//           name="ShopStack"
//           component={ShopStack}
//           options={{
//             headerShown: false,
//             tabBarIcon: ({ size, color }) => (
//               <Ionicons name="home" color={color} size={size} />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="Cart"
//           component={Cart}
//           options={{
//             headerShown: false,
//             tabBarIcon: ({ size, color }) => (
//               <Ionicons name="cart-outline" color={color} size={size} />
//             ),
//             tabBarBadge: 3,
//           }}
//         />
//       </Tabs.Navigator>
//     </NavigationContainer>
//   );
// }


