import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllProduct from '../../src/AllProduct/AllProduct';
import IndividualProduct from '../../src/AllProduct/IndividualProduct';
import Cart from '../../src/AllProduct/Carts/Cart';
import HomeScreen from './HomeScreen';



const NavigationScreen = () => {
    const Stack = createNativeStackNavigator()
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator >
                    <Stack.Screen name='Home' component={HomeScreen} />
                    <Stack.Screen name='allProduct' options={{ title: 'All Product List' }} component={AllProduct} />
                    <Stack.Screen name='product' options={{ title: 'Product Details' }} component={IndividualProduct} />
                    <Stack.Screen name='cart' options={{ title: 'My Cart' }} component={Cart} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}

export default NavigationScreen

const styles = StyleSheet.create({})