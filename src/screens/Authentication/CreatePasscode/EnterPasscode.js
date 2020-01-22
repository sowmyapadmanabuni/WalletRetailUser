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
    KeyboardAvoidingView, AsyncStorage
} from "react-native";
import base from "../../../base";
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../../components/common/Button';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ElevatedView from "react-native-elevated-view";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
//import {styles} from "../../Merchant/ContactDetails";


class EnterPassCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide:true,
            password:''
        }
    }
    componentDidMount() {
        this.setState({password:''})
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', () => {
                BackHandler.exitApp();
                return true;
            });
        }
    }

    componentWillUnmount() {
        let self = this;
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', () => {
                BackHandler.exitApp();
                return true;
            });
        }
    }

   async enterPasscode(){
      let authenticatePasscode =  await base.utils.storage.retrieveData('customPasscode');
      if(authenticatePasscode === this.state.password){
          //this.props.navigation.navigate('Launch',{authState:'authenticated'});
          this.props.navigation.navigate('PayMerchant');
      }
      else{
          //this.props.navigation.navigate('CreatePassword');
          alert('Password is not matching please try again later')
      }
    }




    render() {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView style={[styles.container,{marginBottom:hp('15%')}]}>
                <Image style={styles.signUpLock} source={require('../../../icons/signup.png')}/>

                <ElevatedView elevation={5} style={styles.passCodeOrPassword}>
                    <View style={{
                        alignItems: 'center', alignSelf: 'center',}}>
                        <View style={styles.enterPassword}>
                            <View style={{width:wp('25%')}}>
                                <Image resizeMode={"contain"} style={styles.lockIcon}
                                       source={require('../../../icons/lock.png')}/>
                            </View>
                            <View style={{width:wp('48%')}}>
                                <Text style={styles.passCodeText}>Passcode/Password </Text>
                            </View>

                        </View>

                        <View style={styles.enterPassCodeOrPassWord}>
                            <View style={styles.enterText}>
                                <Text style={styles.passCodeEnter}>Enter Passcode/Password</Text>
                            </View>
                            <View style={styles.showPassCode}>
                                <TouchableOpacity onPress={() => this.setState({hide: !this.state.hide})}>
                                    <Image resizeMode={"center"} style={styles.hidePassCode}
                                           source={ this.state.hide ? require('../../../icons/hide.png') : require('../../../icons/view.png')}/>
                                </TouchableOpacity>
                            </View>

                        </View>

                        <View style={styles.passwordPlaceHolder}>
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
                <View style={styles.startButton}>
                    <TouchableOpacity onPress={() => this.enterPasscode()}>

                        <Text style={styles.startText}>START</Text>
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
    passCodeOrPassword: {
        width: wp('90%'), height: hp('30%'),
        borderRadius: 25, marginTop: hp('30%'),backgroundColor:base.theme.colors.white,
        alignItems: 'center', alignSelf: 'center',
    },
    enterPassword: {
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width:wp('85%')
    },
    lockIcon: {
        width: 80, height: 80, bottom: 45
    },
    passCodeText: {
        marginTop: hp('1%',), fontSize: 16,
    },
    enterPassCodeOrPassWord: {
        flexDirection:'row',width:Platform.OS === 'ios' ? wp('70%') : wp('60%'),
    },
    enterText: {
        width:Platform.OS === 'ios' ? wp('60%') : wp('56%'),alignItems:'center'
    },
    passCodeEnter: {
        fontSize:14,color:base.theme.colors.grey
    },
    showPassCode: {
        width:Platform.OS === 'ios' ? wp('10%') : wp('4%'),alignItems:'center',justifyContent:'center'
    },
    hidePassCode: {
        bottom:32,tintColor:base.theme.colors.primart1,marginLeft:wp('1%')
    },
    passwordPlaceHolder: {
        justifyContent:'flex-start',bottom:35,borderBottomColor:base.theme.colors.black,
        borderBottomWidth: 1,width:wp('58%')
    },
    startButton: {
        alignSelf:'center',justifyContent:'center',marginTop:hp('10%')
    },
    startText: {
        fontSize:18,color:base.theme.colors.primart1,alignItems:'center',
        justifyContent:'center',alignSelf:'center',
    }







});



export default EnterPassCode;
