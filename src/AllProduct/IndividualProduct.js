import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../../Component/CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Swiper from 'react-native-swiper'


const IndividualProduct = (props) => {
    console.log('props data', props)
    const productDetails = props.route?.params?.data
    console.log("product details", productDetails)

    const [productData, setProductData] = useState([])
    const [localData, setLocalData] = useState([])


    useEffect(() => {
        getStoreData()
        getProductDetails()
    }, [])

    const getStoreData = async () => {
        try {
            const storedValue = await AsyncStorage.getItem("cartData") || [];
            // if (storedValue !== null) {
            //     console.log('Retrieved data:', storedValue);
            setLocalData(JSON.parse(storedValue))
            // }

        } catch (error) {
            console.log('Error retrieving data:', error);
        }
    }
    const getProductDetails = () => {
        let url = `https://dummyjson.com/products/${productDetails.id}`
        fetch(url).then((res) => res.json()).then((res) => {
            console.log("api response", res)
            // const reversedArray = [...res.message].reverse();
            setProductData(res)

        })
    }
    const setStoreData = async (data) => {
        try {
            const stringifiedData = JSON.stringify(data);
            await AsyncStorage.setItem("cartData", stringifiedData);

            console.log('Data stored successfully!');
            // props?.navigation.reset({
            //     index: 0,
            //     routes: [{ name: 'cart' }]
            // })
            // props.navigation.navigate('cart')
        } catch (error) {
            console.log('Error storing data:', error);
        }
    }

    const AddToCart = () => {
        console.log("local", localData)

        let obj = localData || [];
        let item = localData.find(item => item.id == productDetails.id);

        if (item) {

            item.qty = (item.qty || 0) + 1
            alert("Product Quantity Updated succssfully",)
            setStoreData(obj)


        } else {
            productDetails.qty = 1;
            obj.push(productDetails)
            console.log("new item added ", obj)
            alert("Product Added sucussfully")
            setStoreData(obj)
        }
    }
    return (
        <>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Swiper style={styles.wrapper} showsButtons loop={false}>
                        {productDetails?.images.map((image, index) => (
                            <View key={index} style={styles.slide}>
                                <Image
                                    source={{ uri: image }}
                                    style={styles.image}
                                    resizeMode='stretch'
                                />
                            </View>
                        ))}
                    </Swiper>
                    <View style={styles.detailsContainer}>
                        <View style={styles.header}>
                            <Text style={styles.title}>{productDetails?.title}</Text>
                            <Text style={styles.brand}>{productDetails?.brand}</Text>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.priceContainer}>
                                <Text style={styles.priceLabel}>Price:</Text>
                                <Text style={styles.price}>{productDetails?.price}</Text>
                            </View>
                            <View style={styles.ratingContainer}>
                                <Text style={styles.ratingLabel}>Rating:</Text>
                                <Text style={styles.rating}>{productDetails?.rating}</Text>
                            </View>
                        </View>
                        <Text style={styles.description}>{productDetails?.description}</Text>
                    </View>
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <CustomButton onPress={AddToCart} name='Add to Cart' />
                </View>
            </View>
        </>
    )
}

export default IndividualProduct

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    wrapper: {},
    slide: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    detailItem: {
        flex: 1,
        marginLeft: 10,
    },
    detailLabel: {
        color: 'black',
        fontSize: 20,
    },
    detailValue: {
        color: 'black',
    },
    descriptionContainer: {
        margin: 10,
    },
    detailsContainer: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    header: {
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    brand: {
        fontSize: 18,
        color: '#777',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 5,
    },
    rating: {
        fontSize: 18,
        color: 'black',
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        color: 'black',
    },
    buttonContainer: {
        margin: 10,
        // alignItems: 'center',
    },
})