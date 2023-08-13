import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ name, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} >
            <View style={{ alignItems: 'center', borderRadius: 15, backgroundColor: 'lightblue' }}>
                <Text style={{ padding: 15, color: 'black', fontWeight: '600', fontSize: 18 }}>{name}</Text>
            </View>
        </TouchableOpacity>

    )
}

export default CustomButton

const styles = StyleSheet.create({

})