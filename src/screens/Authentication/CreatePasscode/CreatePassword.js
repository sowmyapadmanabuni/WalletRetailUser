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


class CreatePassWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide:true,
            password:''
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        if(this.props.navigation.state.params === undefined){
            this.data = undefined
        }
        else{
            this.data = this.props.navigation.state.params.data
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        console.log("this.props.navigation ", this.props.navigation );
        if (Platform.OS === 'android') {
            this.props.navigation.navigate('PassCodeOrPin')
        }
        return true;
    }

    passwordLength(){
        if(this.state.password.length === 5){
            if (this.data === 'change') {
                this.props.navigation.navigate('ConfirmPassWord',{data:'change', data2:this.state.password});
            }
            else{
                this.props.navigation.navigate('ConfirmPassWord', {data2:this.state.password})
            }
        }
        else{
            alert('Password length should be 5 characters ')
        }
    }

    render() {
        return (
            <View style={styles.contain}>
                <KeyboardAwareScrollView style={[styles.contain,{marginBottom:hp('15%')}]}>
                    <Image style={styles.signUpIcon} source={require('../../../icons/signup.png')}/>
                    <View style={styles.validationButton}>
                        <View style={styles.backIcon}>
                            <Icon
                                name="chevron-left"
                                type="font-awesome"
                                size={14}
                                onPress={() => {
                                    if (this.data === undefined) {
                                        base.utils.storage.removeData('customAuthenticationType');
                                        this.props.navigation.navigate('PassCodeOrPin');
                                    }
                                    else{
                                        this.props.navigation.navigate('DefaultOrCustom');
                                    }
                                }}
                            />
                        </View>
                        <View style={styles.customizedView}>
                            <Text style={styles.customizedText}>
                                Secure Your Wallet</Text>
                        </View>
                    </View>
                    <ElevatedView elevation={5} style={styles.passCodeView}>
                        <View style={{
                            alignItems: 'center', alignSelf: 'center',}}>
                            <View style={styles.lockPassword}>
                                <View style={{width:wp('25%')}}>
                                    <Image resizeMode={"contain"} style={styles.lockIcon}
                                           source={require('../../../icons/lock.png')}/>
                                </View>
                                <View>
                                    <Text style={styles.passCode}>Passcode/Password </Text>
                                </View>

                            </View>

                            <View style={styles.createPassword}>
                                <View style={styles.createPasswordView}>
                                    <Text style={{fontSize:14,color:base.theme.colors.grey}}>Create Passcode/Password</Text>
                                </View>
                                <View style={styles.viewIcon}>
                                    <TouchableOpacity onPress={() => this.setState({hide: !this.state.hide})}>
                                        <Image resizeMode={"center"} style={styles.hideView}
                                               source={ this.state.hide ? require('../../../icons/hide.png') : require('../../../icons/view.png')}/>
                                    </TouchableOpacity>
                                </View>

                            </View>

                            <View style={styles.passwordText}>
                                <TextInput style={{paddingTop:0,paddingBottom:0,}}
                                           placeholder="Password"
                                           placeholderTextColor={base.theme.colors.black}
                                           ref="Password"
                                           onChangeText={(password) => this.setState(({password: password}))}
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
                    <View style={styles.nextText}>
                        <TouchableOpacity onPress={() => this.passwordLength()}>

                            <Text style={styles.nextButton}>NEXT</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>

            </View>

        )
    };
}

const styles = StyleSheet.create({
    contain: {
        width: wp('100%'),
        height: hp('100%')
    },
    signUpIcon: {
        alignSelf: 'flex-end',
        marginTop: 0
    },
    validationButton: {
        position: 'absolute', marginTop: hp('1%'), marginLeft: wp('5%'),
        flexDirection:'row',width:wp('70%')
    },
    backIcon: {
        width:wp('3%'),paddingTop:5
    },
    customizedView: {
        width:wp('55%'),marginLeft:wp('5%'),
    },
    customizedText: {
        fontSize: 16, color: base.theme.colors.black,
    },
    passCodeView: {
        width: wp('90%'), height: hp('30%'),
        borderRadius: 25, marginTop: hp('30%'),backgroundColor:base.theme.colors.white,
        alignItems: 'center', alignSelf: 'center'
    },
    lockPassword: {
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width:wp('85%')
    },
    lockIcon: {
        width: 80, height: 80, bottom: 45
    },
    passCode: {
        marginTop: hp('1%',), fontSize: 16,
    },
    createPassword: {
        flexDirection:'row',width: Platform.OS === 'ios' ? wp('70%') : wp('60%'),
    },
    createPasswordView: {
        width:Platform.OS === 'ios' ? wp('60%') : wp('52%'),alignItems:'center'
    },
    viewIcon: {
        width:Platform.OS === 'ios' ? wp('10%') : wp('8%'),alignItems:'center',justifyContent:'center'
    },
    hideView: {
        bottom:32,tintColor:base.theme.colors.primart1,marginLeft:wp('2%')
    },
    passwordText: {
        justifyContent:'flex-start',bottom:35,borderBottomColor:base.theme.colors.black,
        borderBottomWidth: 1,width:wp('58%')
    },
    nextText: {
        alignSelf:'center',justifyContent:'center',marginTop:hp('10%')
    },
    nextButton: {
        fontSize:18,color:base.theme.colors.primart1,alignItems:'center',
        justifyContent:'center',alignSelf:'center',
    }



});



export default CreatePassWord;
