import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    Image,
    Alert,
    BackHandler, TouchableOpacity, ScrollView, Platform
} from 'react-native';
import base from '../../base';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/common/Button';
import { CardDStyle } from '../PaymentGateWay/CardDSytle';
import { Style } from './Style';
import colors from "../../base/theme/colors";
//import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import Validation from "../../components/common/Validation";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



class Amount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            amount: '',
            amount2: '',
            payee: '',
            purposeOfPay: "",
            maxLen: ''
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

   async componentDidMount() {
        await base.utils.storage.removeData("QR_SCAN");
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        if (Platform.OS === 'android') {
            this.props.navigation.navigate('QR')
        }
        return true;

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
        //   console.log('GET THE DATA',this.props.navigation.state.params.storeName,this.props.navigation.state.params.mobileNumber)
        return (
            <View style={{ height: '100%', width: '100%', backgroundColor: 'orange' }}>

                <KeyboardAwareScrollView>
                    <View style={{ height: '100%' }}>

                        <TouchableOpacity style={{ marginLeft: '3%', marginTop: '2%', width: '8%', }} onPress={() => { this.props.navigation.navigate('QR') }}>
                            <Icon
                                name="ios-arrow-back"
                                type="font-awesome"
                                size={25}
                                onPress={() => { this.props.navigation.navigate('QR') }}

                            />
                        </TouchableOpacity>
                        {this.props.navigation.state.params !== undefined ?
                            <Text style={{
                                color: base.theme.colors.white,
                                marginTop: '3%',
                                textAlign: 'center',
                                fontSize: 18,
                            }}>You are paying to '{this.props.navigation.state.params.storeName}'
                        </Text> :
                            <View />}

                        {this.props.navigation.state.params !== undefined ?
                            <Text style={{
                                color: base.theme.colors.white,
                                fontSize: 18,
                                textAlign: 'center',
                            }}>{this.props.navigation.state.params.mobileNumber}</Text>
                            :
                            <View />}

                        <Text style={styles.textInput1}>Enter Amount</Text>
                        <View
                            // pointerEvents="none"
                            style={styles.SectionStyle}>
                            <Image source={require('../../icons/rupee_black.png')} />
                            {/*<TextInput style={{...CardDStyle.borderContainer,...Style.inputContainer}}*/}
                            <TextInput
                                value={this.state.amount}
                                style={{
                                    fontSize: 30,
                                    textAlign: 'center', width: '50%',
                                    //opacity:0
                                }}
                                placeholder="0"
                                onChangeText={(value) => {
                                    let num = value.replace(/[^0-9].[^0-9]{2}/g, '');
                                    if (isNaN(num)) {
                                        // Its not a number
                                    } else {
                                        let amountLength = num.length;
                                        console.log("Current: ", num)
                                        console.log(amountLength)
                                        if (num.indexOf(".") != -1) {
                                            console.log("Found at ", num.indexOf("."))
                                            let decimalPosition = num.indexOf(".");
                                            console.log("Number of decimals = ", (amountLength - decimalPosition) - 1)
                                            let decimalsCount = (amountLength - decimalPosition) - 1;
                                            console.log('Number Length::', num)
                                            if (decimalsCount <= 2) {
                                                this.setState({ amount: num, })
                                            }

                                        } else {
                                            this.setState({ amount: num })
                                        }
                                    }
                                }}
                                keyboardType={'numeric'}
                                autoFocus={true}
                                maxLength={9}
                            />
                            {/* <TouchableOpacity>
                        <Text style={{fontSize: 30,
                            textAlign: 'center',width:'50%',position: 'absolute',}} numberOfLines={1}>{this.state.amount}</Text>
                        </TouchableOpacity>*/}

                        </View>
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={{ textAlign: 'center', color: base.theme.colors.black, fontSize: 18 }}>Purpose of payment</Text>

                            {/*
 <View style={{ color: base.theme.colors.black, borderWidth: 0.5, marginTop: '3%' }}></View>

*/}
                            <TextInput
                                style={{
                                    height: 30, borderBottomWidth: 1, borderColor: base.theme.colors.white, paddingBottom: 5,fontSize: 14,margin:Platform.OS==='ios'?hp('2%'):0
                                }}
                                value={this.state.purposeOfPay}
                                placeholder="Purpose of Payment"
                                placeholderTextColor={base.theme.colors.white}
                                onChangeText={(value) => {
                                    let num = value.replace(/^[a-zA-Z0-9 ]+$/g, '');
                                    if (isNaN(num)) {
                                        // Its not a number
                                    } else {
                                        this.setState({ purposeOfPay: value })
                                    }
                                }}
                                keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                maxLength={50}
                                // style={{  borderBottomWidth: 1, borderColor: base.theme.colors.white }}
                            />
                            <TouchableOpacity style={{
                                alignSelf: 'center', backgroundColor: 'white', paddingLeft: '10%', paddingRight: '10%', paddingTop: '2%', paddingBottom: '2%', margin: '5%',
                                borderRadius: 20
                            }} onPress={() => {
                                if ((parseInt(this.state.amount) < 1) || this.state.amount == '')
                                    Alert.alert("", "Enter some amount !!!")
                                else if (this.state.purposeOfPay == "") {
                                    Alert.alert('', 'Enter the Purpose of Payment')
                                }
                                else {
                                    //PaymentWeb
                                    //CardDetails
                                    //this.props.navigation.navigate("PaymentWeb", { data: this.state.amount })
                                    this.props.navigation.navigate("CardDetails", { data: this.state.amount,store:this.props.navigation.state.params.storeName,purposeOfPay:this.state.purposeOfPay })
                                }
                            }}>
                                <Text style={{ color: base.theme.colors.orange, fontSize: 16 }}>PAY</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </KeyboardAwareScrollView>
            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFB81A',
        //flex: 1,
        // height: '45%',
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
        fontSize: 18,
        textAlign: 'center',
        marginTop: '8%'
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
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
