import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    Dimensions,
    TouchableOpacity,
    BackHandler,
    Platform,
    Alert,
    TextInput,
    KeyboardAvoidingView
} from "react-native";
import base from "../../../base";
import Icon from 'react-native-vector-icons/FontAwesome';
import CodeInput from 'react-native-code-input';
import ElevatedView from 'react-native-elevated-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';


import Button from '../../../components/common/Button';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
//import {styles} from "../../Merchant/ContactDetails";

class ConfirmPin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide:true,
            pin:  this.props.navigation.state.params === undefined ? this.props.navigation.state.params.data2 : this.props.navigation.state.params.data2,
            confirm:''
        }
    }

    confirmPin(){
        console.log("PIN", this.state.confirm, this.state.pin, this.data);
        console.log("confirmPin>>>this.data ", this.data)
        if (this.state.confirm === this.state.pin){
            base.utils.storage.storeData('authenticationType',"Custom");
            base.utils.storage.storeData('customPin',this.state.confirm);
            base.utils.storage.storeData('customAuthenticationType', "PIN");

            // if (this.data === undefined){
            //     this.props.navigation.navigate('PayMerchant');
            // }
            // else{
            //     this.props.navigation.navigate('EnterPin')
            // }
            this.props.navigation.navigate('PayMerchant');
        }
        else{
            alert('Pin and Confirm Pin are not matching')
        }
    }

    componentDidMount() {
        console.log("componentDidMount>>>pin", this.props.navigation.state.params.data)
        this.data = this.props.navigation.state.params.data
    }


    render() {
        console.log('props',this.props.navigation.state.params);
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView style={[styles.container,{marginBottom:hp('15%')}]}>
                    <Image style={styles.signUpLock} source={require('../../../icons/signup.png')}/>
                    <View style={styles.backArrow}>
                        <View style={styles.backButton}>
                            <Icon
                                name="chevron-left"
                                type="font-awesome"
                                size={14}
                                onPress={() => {
                                    this.props.navigation.navigate('CreatePin');
                                }}
                            />
                        </View>
                        <View style={styles.customized}>
                            <Text style={styles.customizedText}>
                                Select Your Wallet</Text>
                        </View>
                    </View>
                    <ElevatedView elevation={5} style={styles.confirmPin}>
                        <View style={{
                            alignItems: 'center', alignSelf: 'center',}}>
                            <View style={styles.confirmView}>
                                <View style={{width:wp('37%')}}>
                                    <Image resizeMode={"contain"} style={styles.lockButton}
                                           source={require('../../../icons/lock.png')}/>
                                </View>
                                <View style={{width:wp('48%')}}>
                                    <Text style={styles.lockPin}>PIN </Text>
                                </View>

                            </View>
                            <View style={styles.confirmLock}>
                                <View style={styles.lockScreen}>
                                    <Text style={styles.digitPin}>Confirm 4 digit PIN</Text>
                                </View>
                                <View style={styles.hideAndShowPassword}>
                                    <TouchableOpacity onPress={() => this.setState({hide: !this.state.hide})}>
                                        <Image resizeMode={"center"} style={styles.showView}
                                               source={ this.state.hide ? require('../../../icons/hide.png') : require('../../../icons/view.png')}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.pinCreation}>
                                <CodeInput
                                    activeColor={base.theme.colors.black}
                                    inactiveColor={base.theme.colors.black}
                                    autoFocus={true}
                                    ref='pin'
                                    inputPosition='center'
                                    borderType='circle'
                                    keyboardType="numeric"
                                    secureTextEntry={this.state.hide}
                                    size={40}
                                    codeLength={4}
                                    codeInputStyle={{
                                        fontSize: 25,

                                    }}
                                    onFulfill={(code) => this.setState(({confirm:code}))}
                                    // onChangeText={(password) => this.setState(({confirm: password}))}

                                />
                            </View>
                        </View>
                    </ElevatedView>

                    <View style={styles.okButton}>
                        <TouchableOpacity onPress={() => this.confirmPin()}>

                            <Text style={styles.okText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>

            </View>

        )
    };
}

const styles = StyleSheet.create({
    container: {
        width: wp('100%'), height: hp('100%')
    },
    signUpLock: {
        alignSelf: 'flex-end', marginTop: 0
    },
    backArrow: {
        position: 'absolute', marginTop: hp('1%'), marginLeft: wp('5%'),
        flexDirection:'row',width:wp('70%')
    },
    backButton: {
        width:wp('3%'),paddingTop:5
    },
    customized: {
        width:wp('55%'),marginLeft:wp('5%'),
    },
    customizedText: {
        fontSize: 16, color: base.theme.colors.black,
    },
    confirmPin: {
        width: wp('90%'), height: hp('30%'),
        borderRadius: 25, marginTop: hp('30%'),backgroundColor:base.theme.colors.white,
        alignItems: 'center', alignSelf: 'center',
    },
    confirmView: {
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width:wp('85%')
    },
    lockButton: {
        width: 80, height: 80, bottom: 45
    },
    lockPin: {
        marginTop: hp('1%',), fontSize: 16,
    },
    confirmLock: {
        flexDirection:'row',width:Platform.OS === 'ios' ? wp('55%') : wp('43%'),
        marginRight:Platform.OS === 'ios' ? wp('5%') : 0
    },
    lockScreen: {
        width:Platform.OS === 'ios' ? wp('50%') : wp('35%'),alignItems:'center'
    },
    digitPin: {
        fontSize:14,color:base.theme.colors.grey
    },
    hideAndShowPassword: {
        width:Platform.OS === 'ios' ? wp('2%') : wp('6%'),alignItems:'center',justifyContent:'center',
        marginLeft:Platform.OS === 'ios' ? 0 : wp('2%')
    },
    showView: {
        bottom:32,tintColor:base.theme.colors.primart1
    },
    pinCreation: {
        justifyContent:'flex-start',bottom: Platform.OS === 'ios' ? 70 : 55,
    },
    okButton: {
        alignSelf:'center',justifyContent:'center',marginTop:hp('10%')
    },
    okText: {
        fontSize:18,color:base.theme.colors.primart1,alignItems:'center',
        justifyContent:'center',alignSelf:'center',
    },




});


export default ConfirmPin;
