import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput, DeviceEventEmitter, FlatList } from 'react-native';
import Button from '../../components/common/Button';
import CardView from 'react-native-cardview';
import base from '../../base';
import { connect } from 'react-redux';

class Debit extends Component {
    constructor(props) {
        super(props); 
    }

    render() {
        return (
            <View>
                <CardView
                    cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={5}
                    margin={'5%'}
                    marginTop={'10%'}
                    padding={10}
                >
                    <FlatList
                        showsVerticalScrollIndicator={false}

                        data={[
                            { transaction: 'Electric Bill Paid', amount: '₹200', To: 'abcd', date: '01/01/2019' },
                            { transaction: 'Electric Bill Paid', amount: '₹200', To: 'abcd', date: '02/01/2019' },
                            { transaction: 'Electric Bill Paid', amount: '₹200', To: 'abcd', date: '03/01/2019' },
                            { transaction: 'Electric Bill Paid', amount: '₹200', To: 'abcd', date: '04/01/2019' },

                        ]}
                        renderItem={({ item }) =>
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{flex:1,fontSize:16}}>{item.transaction}</Text>
                                    <Text style={{alignItems:'flex-end',fontSize:16}}>- {item.amount}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{flex:1,fontSize:12}}>To: {item.To}</Text>
                                    <Text style={{alignItems:'flex-end',fontSize:12}}>{item.date}</Text>
                                </View>
                                <View style={{borderWidth:0.3,marginTop:'3%',marginBottom:'3%'}}></View>
                            </View>
                        }

                    />
                </CardView>
            </View>
        )
    };
}

export default Debit;