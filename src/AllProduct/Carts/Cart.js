import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomButton from '../../../Component/CustomButton'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

const Cart = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        getStoreData()
    }, [])
    const getStoreData = async () => {
        try {
            const storedValue = await AsyncStorage.getItem("cartData");
            if (storedValue !== null) {
                console.log('Retrieved data:', storedValue);
                setData(JSON.parse(storedValue))
            }
        } catch (error) {
            console.log('Error retrieving data:', error);
        }
    }

    const removeItemFromCart = (id) => {
        let newItems = []
        data.filter((item) => {
            if (item.id !== id) {
                newItems.push(item)
            }
        })
        setStoreDate(newItems)
        setData(newItems)
        console.log('newItem', newItems)
    }
    const setStoreDate = async (data) => {
        try {
            const stringifiedData = JSON.stringify(data);
            await AsyncStorage.setItem("cartData", stringifiedData);
            console.log('Data stored successfully!');
        } catch (error) {
            console.log('Error storing data:', error);
        }
    }
    console.log('cart data', data)
    const renderItem = ({ item, index }) => {
        console.log("item", item)
        return (
            <>
                < View style={{}} >
                    <View style={[styles.mainImageBox, { width: width / 2.5, margin: 20, borderRadius: 5, }]}>
                        <TouchableOpacity onPress={() => removeItemFromCart(item.id)}>
                            <View style={{ position: 'absolute', right: -5, top: -10, borderWidth: 2, borderRadius: 50, backgroundColor: 'black', }}>
                                <Icon name='close' size={20} color="white" />
                            </View>
                        </TouchableOpacity>
                        <View style={{ height: 170 }}>
                            <Image source={{ uri: item?.images[0] }} style={{ width: '100%', height: '100%', borderRadius: 20, zIndex: -1 }} resizeMode="cover" />
                        </View>
                        <View style={{ margin: 5, white: '90%', }} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 2 }}>
                                <Text style={[styles.priceLabe]}>Price: { }</Text>
                                <Text style={styles.price}>
                                    {item?.price}* {item?.qty}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', }}>
                                <Text numberOfLines={1} style={[styles.priceLabe, { width: "50%" }]}>{item.title}</Text>
                                <Text numberOfLines={1} style={{ width: '30%', }} >
                                    <Icon name='star-circle' />  {item?.rating}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View >
            </>
        )

    }
    const renderEmptyComponent = () => (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 400 }}>
            <Text style={{ fontSize: 18, color: 'black' }}>No items to display</Text>
        </View>
    );
    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
            <FlatList
                data={data}
                renderItem={renderItem}
                numColumns={2}
                ListEmptyComponent={renderEmptyComponent}
            />

            <View style={{ margin: 10, width: '90%' }}>
                <CustomButton
                    name={"Purchase"}
                    onPress={() => alert("ready to purchase")}
                />
            </View>
        </View>
    )
}

export default Cart

const styles = StyleSheet.create({
    mainImageBox: {
        elevation: 5,
        shadowColor: '#171717',
        backgroundColor: 'white',
        borderRadius: 15,

    },
    priceLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 5,
    },
    price: {
        fontSize: 18,
        color: 'black',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',


    },
})