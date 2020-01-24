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
import Button from '../../../components/common/Button';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ElevatedView from "react-native-elevated-view";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
//import {styles} from "../../Merchant/ContactDetails";


class EnterPin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide:true,
            pin:''

        }
    }
    componentDidMount() {
        this.setState({pin:''})
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

    async enterPin(){
        let authenticatePasscode =  await base.utils.storage.retrieveData('customPin');
        if(authenticatePasscode === this.state.pin){
            //this.props.navigation.navigate('Launch',{authState:'authenticated'});
            this.props.navigation.navigate('PayMerchant');
        }
        else{
            alert('PIN is not matching please try again later')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView style={[styles.container,{marginBottom:hp('15%')}]}>
                <Image style={styles.signUpLock} source={require('../../../icons/signup.png')}/>
                <ElevatedView elevation={5} style={styles.enterPin}>
                    <View style={{
                        alignItems: 'center', alignSelf: 'center',}}>
                        <View style={styles.enterPinText}>
                            <View style={{width:wp('37%')}}>
                                <Image resizeMode={"contain"} style={styles.lockIcon}
                                       source={require('../../../icons/lock.png')}/>
                            </View>
                            <View style={{width:wp('48%')}}>
                                <Text style={styles.pinEnter}>PIN </Text>
                            </View>

                        </View>
                        <View style={styles.enterDigit}>
                            <View style={styles.digitPin}>
                                <Text style={styles.digitText}>Enter 4 digit PIN</Text>
                            </View>
                            <View style={styles.hidePin}>
                                <TouchableOpacity onPress={() => this.setState({hide: !this.state.hide})}>
                                    <Image resizeMode={"center"} style={styles.showPin}
                                           source={ this.state.hide ? require('../../../icons/hide.png') : require('../../../icons/view.png')}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.codeCreation}>
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
                                onFulfill={(code) => this.setState(({pin:code}))}
                               // onChangeText={(password) => this.setState(({pin: password}))}

                            />
                        </View>
                    </View>
                </ElevatedView>
                <View style={styles.startButton}>
                   <TouchableOpacity onPress={() => this.enterPin()}>

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
        alignSelf: 'flex-end', marginTop: 0,width:wp('50%')
    },
    enterPin: {
        width: wp('90%'), height: hp('30%'),
        borderRadius: 25, marginTop: hp('30%'),backgroundColor:base.theme.colors.white,
        alignItems: 'center', alignSelf: 'center',
    },
    enterPinText: {
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width:wp('85%')
    },
    lockIcon: {
        width: 80, height: 80, bottom: 45
    },
    pinEnter: {
        marginTop: hp('1%',), fontSize: 16,
    },
    enterDigit: {
        flexDirection:'row',width:Platform.OS === 'ios' ? wp('50%') : wp('43%'),
        marginRight:Platform.OS === 'ios' ? wp('7%') : 0
    },
    digitPin: {
        width:Platform.OS === 'ios' ? wp('45%') : wp('35%'),alignItems:'center'
    },
    digitText: {
        fontSize:14,color:base.theme.colors.grey
    },
    hidePin: {
        width:Platform.OS === 'ios' ? wp('5%') : wp('6%'),alignItems:'center',justifyContent:'center',marginLeft:wp('1%')
    },
    showPin: {
        bottom:32,tintColor:base.theme.colors.primart1
    },
    codeCreation: {
        justifyContent:'flex-start',bottom:Platform.OS === 'ios' ? 70 : 55,
    },
    startButton: {
        alignSelf:'center',justifyContent:'center',marginTop:hp('10%')
    },
    startText: {
        fontSize:18,color:base.theme.colors.primart1,alignItems:'center',
        justifyContent:'center',alignSelf:'center',
    }







});



export default EnterPin;
