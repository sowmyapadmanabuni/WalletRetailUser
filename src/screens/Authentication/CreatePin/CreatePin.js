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

class CreatePin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide:true,
            pin:''
        }
    }
    pinLength(){
        if(this.state.pin.length === 4){
            if (this.data === 'change')
                this.props.navigation.navigate('ConfirmPin',{data:'change', data2:this.state.pin});
            else
                this.props.navigation.navigate('ConfirmPin',{data2:this.state.pin});
        }
        else
            alert('Password length should be 4 digits ')
    }

    componentDidMount() {
        if(this.props.navigation.state.params === undefined)
            this.data = undefined
        else
            this.data = this.props.navigation.state.params.data
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView style={[styles.container,{marginBottom:hp('15%')}]}>
                <Image style={styles.signUpButton} source={require('../../../icons/signup.png')}/>
                <View style={styles.backArrow}>
                   <View style={styles.backIcon}>
                       <Icon
                           name="chevron-left"
                           type="font-awesome"
                           size={14}
                           onPress={() => {
                               if (this.data === undefined){
                                   base.utils.storage.removeData('customAuthenticationType');
                                   this.props.navigation.navigate('PassCodeOrPin');
                               }
                               else{
                                   this.props.navigation.navigate('DefaultOrCustom');
                               }
                           }}
                       />
                   </View>
                    <View style={styles.validation}>
                    <Text style={styles.validationText}>
                        Secure Your Wallet</Text>
                    </View>
                </View>
                <ElevatedView elevation={5} style={styles.pinLock}>
                    <View style={{
                        alignItems: 'center', alignSelf: 'center',}}>
                        <View style={styles.choosePin}>
                            <View style={{width:wp('37%')}}>
                                <Image resizeMode={"contain"} style={styles.lockButton}
                                       source={require('../../../icons/lock.png')}/>
                            </View>
                            <View style={{width:wp('48%')}}>
                                <Text style={styles.pinText}>PIN </Text>
                            </View>

                        </View>
                        <View style={styles.createPin}>
                            <View style={styles.digitPin}>
                                <Text style={styles.digitText}>Create 4 digit PIN</Text>
                            </View>
                            <View style={styles.hideAndShow}>
                                <TouchableOpacity onPress={() => this.setState({hide: !this.state.hide})}>
                                    <Image resizeMode={"center"} style={styles.hideButton}
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
                                onFulfill={(code) => this.setState(({pin:code}))}
                                //onChangeText={(password) => this.setState(({pin: password}))}

                            />
                        </View>
                    </View>
                </ElevatedView>
                <View style={styles.nextButton}>
                    <TouchableOpacity onPress={() => this.pinLength()}>

                        <Text style={styles.nextText}>NEXT</Text>
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
    signUpButton: {
        alignSelf: 'flex-end', marginTop: 0,width:wp('50%')
    },
    backArrow: {
        position: 'absolute', marginTop: hp('1%'), marginLeft: wp('5%'),
        flexDirection:'row',width:wp('70%')
    },
    backIcon: {
        width:wp('3%'),paddingTop:5
    },
    validation: {
        width:wp('55%'),marginLeft:wp('5%'),
    },
    validationText: {
        fontSize: 16, color: base.theme.colors.black,
    },
    pinLock: {
        width: wp('90%'), height: hp('30%'),
        borderRadius: 25, marginTop: hp('30%'),backgroundColor:base.theme.colors.white,
        alignItems: 'center', alignSelf: 'center',
    },
    choosePin: {
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width:wp('85%')
    },
    lockButton: {
        width: 80, height: 80, bottom: 45
    },
    pinText: {
        marginTop: hp('1%',), fontSize: 16,
    },
    createPin: {
        flexDirection:'row',width: Platform.OS === 'ios' ? wp('50%') : wp('43%'),
        marginRight: Platform.OS === 'ios' ? wp('5%') : 0
    },
    digitPin: {
        width:Platform.OS === 'ios' ? wp('45%') : wp('33%'),alignItems:'center'
    },
    digitText: {
        fontSize:14,color:base.theme.colors.grey
    },
    hideAndShow: {
        width:Platform.OS === 'ios' ? wp('5%') : wp('6%'),alignItems:'center',justifyContent:'center',
        marginLeft: Platform.OS === 'ios' ? 0 : wp('1%')
    },
    hideButton: {
        bottom:32,tintColor:base.theme.colors.primart1,
    },
    pinCreation: {
        justifyContent:'flex-start',bottom:Platform.OS === 'ios' ? 70 : 55,
    },
    nextButton: {
        alignSelf:'center',justifyContent:'center',marginTop:hp('10%')
    },
    nextText: {
        fontSize:18,color:base.theme.colors.primart1,alignItems:'center',
        justifyContent:'center',alignSelf:'center',
    }










});



export default CreatePin;
