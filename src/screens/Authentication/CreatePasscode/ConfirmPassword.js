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
import Button from '../../../components/common/Button';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ElevatedView from "react-native-elevated-view";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
//import {styles} from "../../Merchant/ContactDetails";


class ConfirmPassWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide:true,
            //password:this.props.navigation.state.params,
            password:  this.props.navigation.state.params.data === undefined ? this.props.navigation.state.params.data2 : this.props.navigation.state.params.data2,
            confirm:''
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    confirmPassword(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        if (this.state.confirm === this.state.password){
            base.utils.storage.storeData('authenticationType',"Custom");
            base.utils.storage.storeData('customPasscode',this.state.confirm);
            base.utils.storage.storeData('customAuthenticationType', "Password");
            //this.props.navigation.navigate('EnterPassCode');
            //this.props.navigation.navigate('Launch',{authState:'authenticated'})

            // if (this.data === undefined){
            //     this.props.navigation.navigate('PayMerchant');
            // }
            // else{
            //     this.props.navigation.navigate('EnterPassCode')
            // }
            this.props.navigation.navigate('PayMerchant');
        }
        else{
            alert('Password and Confirm password are not matching')
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        //this.props.navigation.goBack(null);
        console.log("handleBackButtonClick>>>ConfirmPassword");
        if (Platform.OS === 'android') {
            //BackHandler.exitApp()
            this.props.navigation.navigate('CreatePassWord')
        }
        return true;
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
                <View style={styles.backButton}>
                    <View style={styles.backIcon}>
                        <Icon
                            name="chevron-left"
                            type="font-awesome"
                            size={14}
                            onPress={() => {
                                this.props.navigation.navigate('CreatePassword');
                            }}
                        />
                    </View>
                    <View style={styles.customizedText}>
                        <Text style={styles.customizedValidation}>
                            Secure Your Wallet</Text>
                    </View>
                </View>
                <ElevatedView elevation={5} style={styles.passCodeOrPassword}>
                    <View style={{
                        alignItems: 'center', alignSelf: 'center',}}>
                        <View style={styles.passCodeText}>
                            <View style={{width:wp('25%')}}>
                                <Image resizeMode={"contain"} style={styles.lockIcon}
                                       source={require('../../../icons/lock.png')}/>
                            </View>
                            <View style={{width:wp('48%')}}>
                                <Text style={styles.passwordText}>Passcode/Password </Text>
                            </View>

                        </View>

                        <View style={styles.confirmPassword}>
                            <View style={styles.confirmText}>
                                <Text style={styles.passwordConfirm}>Confirm Passcode/Password</Text>
                            </View>
                            <View style={styles.hideIcon}>
                                <TouchableOpacity onPress={() => this.setState({hide: !this.state.hide})}>
                                    <Image resizeMode={"center"} style={styles.hideAndView}
                                           source={ this.state.hide ? require('../../../icons/hide.png') : require('../../../icons/view.png')}/>
                                </TouchableOpacity>
                            </View>

                        </View>

                        <View style={styles.enterPassword}>
                            <TextInput style={{paddingTop:0,paddingBottom:0,}}
                                       placeholder="Password"
                                       placeholderTextColor={base.theme.colors.black}
                                       ref="Password"
                                       onChangeText={(password) => this.setState(({confirm: password}))}
                                       autoCapitalize="none"
                                       textContentType='password'
                                       maxLength={5}
                                       autoCorrect={false}
                                       autoCompleteType="off"
                                       secureTextEntry={this.state.hide}
                            />
                        </View>

                    </View>
                </ElevatedView>
                    <View style={styles.okButton}>
                        <TouchableOpacity onPress={() => this.confirmPassword()}>


                            <Text style={styles.okConfirm}>OK</Text>
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
    backButton: {
        position: 'absolute', marginTop: hp('1%'), marginLeft: wp('5%'),
        flexDirection:'row',width:wp('70%')
    },
    backIcon: {
        width:wp('3%'),paddingTop:5
    },
    customizedText:{
        width:wp('55%'),marginLeft:wp('5%'),
    },
    customizedValidation: {
        fontSize: 16, color: base.theme.colors.black,
    },
    passCodeOrPassword: {
        width: wp('90%'), height: hp('30%'),
        borderRadius: 25, marginTop: hp('30%'),backgroundColor:base.theme.colors.white,
        alignItems: 'center', alignSelf: 'center',
    },
    passCodeText: {
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width:wp('85%')
    },
    lockIcon: {
        width: 80, height: 80, bottom: 45
    },
    passwordText: {
        marginTop: hp('1%',), fontSize: 16,
    },
    confirmPassword: {
        flexDirection:'row',width:Platform.OS === 'ios' ? wp('75%') : wp('60%'),
    },
    confirmText: {
        width:Platform.OS === 'ios' ? wp('60%') : wp('56%'),alignItems:'center'
    },
    passwordConfirm: {
        fontSize:14,color:base.theme.colors.grey,
        marginLeft:Platform.OS === 'ios' ? wp('5%') : 0
    },
    hideIcon: {
        width:Platform.OS === 'ios' ? wp('12%') : wp('4%'),alignItems:'center',justifyContent:'center',marginLeft:wp('1%')
    },
    hideAndView: {
        bottom:32,tintColor:base.theme.colors.primart1
    },
    enterPassword: {
        justifyContent:'flex-start',bottom:35,borderBottomColor:base.theme.colors.black,
        borderBottomWidth: 1,width:wp('58%')
    },
    okButton: {
        alignSelf:'center',justifyContent:'center',marginTop:hp('10%')
    },
    okConfirm: {
        fontSize:18,color:base.theme.colors.primart1,alignItems:'center',
        justifyContent:'center',alignSelf:'center',
    }








});



export default ConfirmPassWord;
