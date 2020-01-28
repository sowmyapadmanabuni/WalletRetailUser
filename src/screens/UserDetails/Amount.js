import React,{Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    Image,
    Alert,
    BackHandler,TouchableOpacity
} from 'react-native';
import base from '../../base';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/common/Button';
import { CardDStyle } from '../PaymentGateWay/CardDSytle';
import { Style } from './Style';
import colors from "../../base/theme/colors";
//import { TouchableOpacity } from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scrollview";



class Amount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            amount: '0.00',
            payee: '',
            purposeOfPay:""
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
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
        return (
            <View style={{height:'100%',width:'100%',backgroundColor:'orange'}}>

            <KeyboardAwareScrollView>
                <View style={{height:'100%'}}>

                 <TouchableOpacity style={{ marginLeft: '3%', marginTop: '5%',width:'8%',}} onPress={()=> {this.props.navigation.navigate('QR')}}>
                        <Icon
                            name="ios-arrow-back"
                            type="font-awesome"
                            size={25}
                            onPress={() => { this.props.navigation.navigate('QR') }}

                        />

                    </TouchableOpacity>

                <Text style={{color: base.theme.colors.white,
                        marginTop :'5%',
                        textAlign: 'center',
                        fontSize: 18,}}>You are paying to ''</Text>
                    <Text style={styles.textInput1}>Enter Amount</Text>
                    <View
                       // pointerEvents="none"
                        style={styles.SectionStyle}>
                        <Image source={require('../../icons/rupee_black.png')} />
                        {/*<TextInput style={{...CardDStyle.borderContainer,...Style.inputContainer}}*/}
                        <TextInput
                            value={this.state.amount}
                            style={styles.amountStyle}
                            onChangeText={(value) =>{
                                let num = value.replace(/[^0-9].[^0-9]{2}/g,  '');
                                if (isNaN(num)) {
                                    // Its not a number
                                } else {
                                    this.setState({amount:num})
                                }}}
                            keyboardType={'numeric'}
                            autoFocus={true}

                        />
                    </View>
                    <View style={{ width: '60%', alignSelf: 'center', }}>
                        <Text style={{ textAlign: 'center', color: base.theme.colors.black, fontSize:18 }}>Purpose of payment</Text>

{/*
                        <View style={{ color: base.theme.colors.black, borderWidth: 0.5, marginTop: '3%' }}></View>

*/}
                        <TextInput
                            style={{height:30, borderBottomWidth: 1, borderColor: base.theme.colors.lightgrey,paddingBottom:5
                            }}
                            value={this.state.purposeOfPay}
                            placeholder="Purpose of Payment"
                            placeholderTextColor={base.theme.colors.white}
                            onChangeText={(value) =>{
                                let num = value.replace(/^[a-zA-Z0-9 ]+$/g,  '');
                                if (isNaN(num)) {
                                    // Its not a number
                                } else {
                                    this.setState({purposeOfPay:value})
                                }}}
                            keyboardType={Platform.OS === 'ios'? 'ascii-capable':'visible-password'}
                            maxLength={50}
                            style={{fontSize:14,borderBottomWidth:1,borderColor: base.theme.colors.white}}
                        />
                    </View>
                    <TouchableOpacity style={{alignSelf:'center',marginTop:20, height:40,backgroundColor:'white',width:'40%',
                        borderRadius: 20,alignItems: 'center',justifyContent:'center'}} onPress={() =>
                    {if (parseInt(this.state.amount) < 1)
                        Alert.alert("", "Enter some amount !!!");
                    else{
                        //PaymentWeb
                        //CardDetails
                        //this.props.navigation.navigate("PaymentWeb", { data: this.state.amount })
                        this.props.navigation.navigate("CardDetails", { data: this.state.amount })
                    }}}>
                        <Text style={{color:base.theme.colors.orange,fontSize:16}}>PAY</Text>
                    </TouchableOpacity>
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
