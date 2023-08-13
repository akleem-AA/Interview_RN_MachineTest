import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../CustomButton'

const HomeScreen = (props) => {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <View style={{ margin: 10, width: '90%' }}>
                <CustomButton name={"My Cart"}
                    onPress={() => props.navigation.navigate('cart')}
                />
            </View>

            <View style={{ margin: 10, width: '90%' }}>
                <CustomButton name={"All Products"}
                    // onPress={() => props.navigation.navigate('ViewAll')}
                    onPress={() => props.navigation.navigate('allProduct')}

                />
            </View>

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    heading: {
        padding: 10

    },
    table: { flexDirection: 'row', justifyContent: 'space-between', margin: 10, borderWidth: .9, borderColor: 'gray' }
})