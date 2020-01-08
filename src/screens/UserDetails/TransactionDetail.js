import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput, DeviceEventEmitter, FlatList, ImageBackground } from 'react-native';
import Button from '../../components/common/Button';
import CardView from 'react-native-cardview';
import base from '../../base';
import { connect } from 'react-redux';

class TransactionDetail extends Component {
    constructor(props) {
        super(props);

    }

    render() {
console.log("t...................")
        return (
            <View>

                <ImageBackground source={require('../../icons/transaction_details.png')} style={{ width: '100%', height: "70%" }} >
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    {/* <Image
                                    style={{ transform: [{ rotate: '90deg' }], width: 15, height: 15 }}
                                    source={require('../../icons/images.png')} /> */}
                        <Text style={{ marginTop: '5%', marginLeft: '5%', fontWeight: 'bold', fontSize: 16, color: 'white' }}>Transaction Details</Text>
                    </TouchableOpacity>
                </ImageBackground>

                <View style={{ position: 'absolute', width: '90%', marginTop: '25%', alignSelf: 'center' }}>

                    <CardView
                        cardElevation={2}
                        cardMaxElevation={2}
                        cornerRadius={5}
                        padding={10}
                    >
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={[
                                { transaction: 'Money Recieved', amount: '₹200', From: 'abcd', date: '01/01/2019' },
                                { transaction: 'Money Recieved', amount: '₹200', From: 'abcd', date: '02/01/2019' },
                                { transaction: 'Money Recieved', amount: '₹200', From: 'abcd', date: '03/01/2019' },
                                { transaction: 'Money Recieved', amount: '₹200', From: 'abcd', date: '04/01/2019' },
                                { transaction: 'Money Recieved', amount: '₹200', From: 'abcd', date: '05/01/2019' },
                                { transaction: 'Money Recieved', amount: '₹200', From: 'abcd', date: '06/01/2019' },
                                { transaction: 'Money Recieved', amount: '₹200', From: 'abcd', date: '07/01/2019' },
                                { transaction: 'Money Recieved', amount: '₹200', From: 'abcd', date: '08/01/2019' },
                            ]}
                            renderItem={({ item }) =>
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 16 }}>{item.transaction}</Text>
                                        <Text style={{ alignItems: 'flex-end', fontWeight: 'bold', fontSize: 16 }}>+ {item.amount}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ flex: 1, fontSize: 12 }}>From: {item.From}</Text>
                                        <Text style={{ alignItems: 'flex-end', fontSize: 12 }}>{item.date}</Text>
                                    </View>
                                    <View style={{ borderWidth: 0.3, marginTop: '3%', marginBottom: '3%' }}></View>
                                </View>
                            }

                        />
                    </CardView>
                </View>
            </View>
        )
    };
}

export default TransactionDetail;