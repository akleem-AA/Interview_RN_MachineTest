import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'


const AllProduct = (props) => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllData()
    }, [])

    const getAllData = () => {
        let url = 'https://dummyjson.com/products'
        fetch(url).then((res) => res.json()).then((res) => {
            console.log("api response", res)

            // const reversedArray = [...res.message].reverse();
            setData(res.products)
            setIsLoading(false)
        }).catch((err) => {
            setIsLoading(false)
        })
    }
    const productClick = (item) => {
        props.navigation.navigate('product', { data: item })
    }
    const renderEmptyComponent = () => (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 400 }}>
            <Text style={{ fontSize: 18, color: 'black' }}>No items to display</Text>
        </View>
    );


    if (isLoading) {

    }
    return (
        <View style={{ flex: 1 }}>
            {isLoading ?
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="blue" />
                </View> :
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => {
                        return (<>
                            <TouchableOpacity onPress={() => productClick(item)}>
                                <View key={index} style={styles.mainImageBox}>
                                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }}>
                                        <View style={{ width: '100%', height: 600, elevation: 15, shadowColor: 'blue', }}>
                                            <Image source={{ uri: item?.images[0] }} style={{ width: '100%', height: '100%', borderTopRightRadius: 10, borderTopLeftRadius: 10, }} resizeMode='contain' />
                                        </View>
                                        <View style={styles.detailsContainer}>
                                            <View style={styles.header}>
                                                <Text style={styles.title}>{item?.title}</Text>
                                                <Text style={styles.brand}>Brand Name :- {item?.brand}</Text>
                                                <View style={styles.row}>
                                                    <View style={styles.priceContainer}>
                                                        <Text style={[styles.priceLabe]}>Price: { }</Text>
                                                        <Text style={styles.price}> {item?.price}</Text>
                                                    </View>

                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </>)
                    }}
                    ListEmptyComponent={renderEmptyComponent}
                />
            }

        </View>
    )
}

export default AllProduct

const styles = StyleSheet.create({
    imageBox: {
        width: 90,
        height: 90,
        borderRadius: 50,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainImageBox: {

        margin: 10,
        borderRadius: 15,
        elevation: 5,
        shadowColor: '#171717',
        backgroundColor: 'white',



    },
    text: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: '600',
        padding: 10,
        fontFamily: 'Poppinse',
        color: 'black'

    },
    loaderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailsContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        // justifyContent: 'space-around',
        margin: 10,
        width: '100%',
        alignItems: 'center',
        marginLeft: 40,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        // alignSelf: 'center',
        margin: 5

    },
    brand: {
        fontSize: 18,
        color: '#777',
        margin: 5
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        margin: 5

    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // alignSelf: 'flex-start',

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
    }
})