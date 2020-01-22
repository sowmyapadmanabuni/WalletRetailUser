import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback, Image, Alert } from 'react-native';
import base from '../../base';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/common/Button';
import { CardDStyle } from '../PaymentGateWay/CardDSytle';
import { Style } from './Style';
import colors from "../../base/theme/colors";
import { TouchableOpacity } from 'react-native-gesture-handler';



class Amount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            amount: '0.00',
            payee: ''
        }
    }

    componentDidMount(){
        
    }

    // updateInput(evt){

    //   this.setState={value:evt}
    //   alert(
    //     "vvvvvv "+this.state.value)
    // }
    updateInput = (amt) => {
        console.log('>>>> ', this.state.amount, amt)
        if (parseInt(this.state.amount) < 1) {
            console.log("----");
            this.setState({ amount: amt });
        }
        else {
            console.log("+++++");
            this.setState({ amount: this.state.amount + amt })
        }

    };

    render() {
        //alert({value:this.state.value})
        return (

            <View style={styles.container}>


                <View style={{ backgroundColor: 'orange', height: '100%' }}>
                    <View style={{ marginLeft: '3%', marginTop: '5%', }}>
                        <Icon
                            name="ios-arrow-back"
                            type="font-awesome"
                            size={20}
                            onPress={() => { this.props.navigation.navigate('QR') }}

                        />


                    </View>

                    <Text style={styles.textInput}>You are paying to ''</Text>
                    <Text style={styles.textInput1}>Enter Amount</Text>
                    <View
                        pointerEvents="none"
                        style={styles.SectionStyle}>
                        <Image source={require('../../icons/rupee_black.png')} />
                        {/*<TextInput style={{...CardDStyle.borderContainer,...Style.inputContainer}}*/}
                        <TextInput
                            value={this.state.amount}
                            style={styles.amountStyle}
                        //editable = {false}
                        />
                    </View>
                    <View style={{ width: '50%', alignSelf: 'center' }}>
                        <Text style={{ textAlign: 'center', color: base.theme.colors.black }}>Purpose of payment</Text>
                        <View style={{ color: base.theme.colors.black, borderWidth: 0.5, marginTop: '3%' }}></View>
                    </View>
                    <TouchableOpacity style={{backgroundColor:'#ffbf00',borderRadius:20,alignSelf:'center',paddingLeft:'10%',paddingRight:'10%',paddingTop:'2%',paddingBottom:'2%',marginTop:'5%'}}>
                        <Text style={{color:'white',textAlign:'center'}}>Pay</Text>
                    </TouchableOpacity>
                    {/*
                    <View style={{
                        marginTop:'4%',
                        //backgroundColor: 'yellow',
                        width:'60%',
                        alignSelf:'center',
                        justifyContent: 'center',
                        alignItems:'center',
                        borderBottomWidth:1,
                        borderBottomColor: base.theme.colors.black,
                    }}>
                        <TextInput
                            //value={this.state.payee}
                            placeholderTextColor = {base.theme.colors.black}
                            placeholder={'Purpose of payment'}
                            style={{
                                padding:0
                            }}
                        />
                    </View>
                    */}
                </View>

                <View style={{ ...Style.amountButtonStyle }}>

                    <Button style={{ backgroundColor: base.theme.colors.white }}
                        onPress={() => { this.updateInput('1') }}
                        shadow
                        textStyle={Style.buttonTextColor}
                        title='1' />
                    <Button style={Style.buttonVisibilityStyle}
                        onPress={() => { this.updateInput('2') }}
                        shadow
                        textStyle={Style.buttonTextColor}
                        title='2' />
                    <Button style={Style.buttonVisibilityStyle}
                        onPress={() => { this.updateInput('3') }}
                        shadow
                        textStyle={Style.buttonTextColor}
                        title='3' />
                </View>
                <View style={{ ...Style.amountButtonStyle, ...{ marginLeft: '7%', marginTop: -80 } }}>
                    <Button style={Style.buttonVisibilityStyle}
                        onPress={() => { this.updateInput('4') }}
                        shadow
                        textStyle={Style.buttonTextColor}
                        title='4' />
                    <Button style={Style.buttonVisibilityStyle}
                        onPress={() => { this.updateInput('5') }}
                        shadow
                        textStyle={Style.buttonTextColor}
                        title='5' />
                    <Button style={Style.buttonVisibilityStyle}
                        onPress={() => { this.updateInput('6') }}
                        shadow
                        textStyle={Style.buttonTextColor}
                        title='6' />
                </View>
                <View style={{ ...Style.amountButtonStyle, ...{ marginLeft: '7%', marginTop: -80 } }}>
                    <Button style={Style.buttonVisibilityStyle}
                        onPress={() => { this.updateInput('7') }}
                        shadow
                        textStyle={Style.buttonTextColor}
                        title='7' />
                    <Button style={Style.buttonVisibilityStyle}
                        onPress={() => { this.updateInput('8') }}
                        shadow
                        textStyle={Style.buttonTextColor}
                        title='8' />
                    <Button style={Style.buttonVisibilityStyle}
                        onPress={() => { this.updateInput('9') }}
                        shadow
                        textStyle={Style.buttonTextColor}
                        title='9' />
                </View>
                <View style={{ ...Style.amountButtonStyle, ...Style.amountButton23Style }}>

                    <Button style={Style.buttonVisibilityStyle}
                        onPress={() => { this.updateInput('0') }}
                        shadow
                        textStyle={Style.buttonTextColor}
                        title='0' />

                    <View style={{ marginTop: '40%', marginLeft: '50%' }}>
                        <Button style={{ marginLeft: '30%', marginTop: -20, width: 45, height: 45 }}
                            onChangeText={(value) => this.setState({ text })}
                            onPress={() => {
                                // if (this.state.amount === "0.00" || this.state.amount === "0.00")
                                if (parseInt(this.state.amount) < 1)
                                    Alert.alert("", "Enter some amount !!!");
                                else{
                                    //PaymentWeb
                                    //CardDetails
                                    //this.props.navigation.navigate("PaymentWeb", { data: this.state.amount })
                                    this.props.navigation.navigate("CardDetails", { data: this.state.amount })
                                }

                            }}
                            title={
                                <Icon
                                    name="ios-checkmark"
                                    size={55}
                                    color="white"
                                />
                            }
                        />
                    </View>

                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#FFB81A',
        flex: 1,
        height: '45%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',

    },
    textInput: {
        color: base.theme.colors.white,
        //marginTop :'5%',
        textAlign: 'center',
        fontSize: 15,

    },
    textInput1: {
        color: base.theme.colors.black,
        fontSize: 15,
        textAlign: 'center',
        marginTop: '5%'
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: .5,
        borderColor: 'white',
        height: '20%',
        borderRadius: 7,
        width: '80%',
        margin: 20,
        marginLeft: '10%'
    },
    amountStyle: {
        flex: 1,
        fontSize: 30,
        textAlign: 'center'
        //backgroundColor:'yellow',
    },

});


export default Amount;