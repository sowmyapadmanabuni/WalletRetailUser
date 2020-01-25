import React,{Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    Dimensions,
    BackHandler,
    Platform,
    Alert,
    TouchableOpacity,
    AsyncStorage,
    ToastAndroid
} from "react-native";
import base from "../../../base";
import Start from "../../Start";
//import storage from "../../../utils/storage";
import Button from '../../../components/common/Button';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CardView from "react-native-cardview";
import Icon from 'react-native-vector-icons/FontAwesome';
import PayMerchant from "../../UserDetails/PayMerchant";

class DefaultOrCustom extends Component{
    constructor(props){
        super(props);
        this.state={
            pressStatus: false ,
            isButton: true,
            pp: '',
            toggle:true,
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    async componentDidMount() {
        console.log("componentDidMount>>> ", this.props.navigation.state.params)
        let authenticationType =  await base.utils.storage.retrieveData('authenticationType');
        let customAuthenticationType =  await base.utils.storage.retrieveData('customAuthenticationType');
        this.authenticationType =  await base.utils.storage.retrieveData('authenticationType');
        this.customAuthenticationType =  await base.utils.storage.retrieveData('customAuthenticationType');

        console.log("componentDidMount ",this.props.navigation.state.params);
        console.log("componentDidMount>>>Type ",this.authenticationType, this.customAuthenticationType);

        if (this.customAuthenticationType  === "PIN"){
            this.setState({pp:'pin'})
        }
        if(this.customAuthenticationType  === "Passcode") {
            this.setState({pp:'passcode/password'})
        }

        if (this.props.navigation.state.params === undefined){
            if(authenticationType === 'Custom'){
                console.log("componentDidMount>>>IF ");
                if(customAuthenticationType === 'Passcode'){
                    let customPasscode =  await base.utils.storage.retrieveData('customPasscode');
                    if(customPasscode === null){
                        this.props.navigation.navigate('CreatePassword')
                    }
                    else{
                        this.props.navigation.navigate('EnterPassCode')
                    }
                }
                else if(customAuthenticationType === 'PIN'){
                    let customPIN =  await base.utils.storage.retrieveData('customPin');
                    if(customPIN === null){
                        this.props.navigation.navigate('CreatePin')
                    }
                    else{
                        this.props.navigation.navigate('EnterPin')
                    }
                }
            }
            else if(authenticationType === 'Default'){
                console.log("componentDidMount>>>ELSE IF ")
                if(this.props.navigation.state.params.data !== 'change'){
                    this.props.navigation.navigate('Launch')
                }

                //this.props.navigation.navigate('Launch')
            }
        }
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        //this.props.navigation.goBack(null);
        console.log("this.props.navigation ", this.props.navigation, );
        if (Platform.OS === 'android' && this.props.navigation.state.params !== undefined) {
            //BackHandler.exitApp()
            this.props.navigation.navigate('PayMerchant')
        }
        return true;
    }



    selectAuthentication(type){
        //base.utils.storage.storeData('authenticationType',type);

        console.log("selectAuthentication ",this.authenticationType)
        if(type === 'Custom'){
            // base.utils.storage.storeData('customPin',null);
            // base.utils.storage.storeData('customPasscode',null);
            if (this.props.navigation.state.params !== undefined){
                this.props.navigation.navigate('PassCodeOrPin', {data:'change'})
            }
            else{
                this.props.navigation.navigate('PassCodeOrPin')
            }
            //this.props.navigation.navigate('PassCodeOrPin')
        }
        else{
            base.utils.storage.storeData('customPin',null);
            base.utils.storage.storeData('customPasscode',null);
            base.utils.storage.storeData('authenticationType',type);
            // if(this.props.navigation.state.params !== undefined){
            //     this.props.navigation.navigate("PayMerchant")
            // }
            // else{
            //     this.props.navigation.navigate('Start')
            // }
            this.props.navigation.navigate("PayMerchant")
        }
    }

    changeTo(){
        console.log("customAuthenticationType ",this.customAuthenticationType)
        if(this.customAuthenticationType === "PIN"){
            this.props.navigation.navigate('CreatePin', {data:'change'})
        }
        else{
            this.props.navigation.navigate('CreatePassword', {data:'change'})
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.customizedText}>
                    <Icon
                        name="chevron-left"
                        type="font-awesome"
                        size={20}
                        onPress={() => {
                            if (this.props.navigation.state.params !== undefined){
                                this.props.navigation.navigate('PayMerchant');
                            }
                            //this.props.navigation.navigate('Otp');
                        }}
                    />
                    <Text style={styles.customValidation}>Security</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 0, bottom: hp('-1') }}>
                    <Image resizeMode={"cover"} style={{ width: wp('90'), height: hp('0.1'), tintColor: '#333333', top: hp('1'), right: hp('3') }} source={require('../../../icons/line.png')} />
                    <Image resizeMode={"contain"} style={styles.lockLogo} source={require('../../../icons/lock.png')} />
                </View>
                <View style={styles.lockIcon}>
                    <View style={styles.defaultCustomView}>
                        <View style={{ width: wp('90%'), height: hp('15'), borderWidth: 0 }}>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    toggle : !this.state.toggle
                                })
                                this.selectAuthentication('Default')}
                            } >
                                <View style={{ flexDirection: 'row', right: hp('1') }}>
                                    <View
                                        style={{ height: hp('3'), width: hp('3'), borderRadius: hp('1.5'), borderWidth: 1,
                                            backgroundColor: (this.authenticationType === 'Default' ? base.theme.colors.orange : 'transparent')
                                        }}
                                    />
                                    <Text style={{ fontSize: 17, color: "#333333" }}> Use Screen Lock </Text>
                                </View>
                                <Text style={{ fontSize: 17, top: hp('2'), color: "#666666", marginLeft: hp('3') }}>Pattern, Pin or Password set in your phone's settings. </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: wp('90%'), height: hp('15'), borderWidth: 0 }}>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    toggle : !this.state.toggle
                                })
                                this.selectAuthentication('Custom')}
                            } >
                                <View style={{ flexDirection: 'row', right: hp('1') }}>
                                    <View
                                        style={{ height: hp('3'), width: hp('3'), borderRadius: hp('1.5'), borderWidth: 1 ,
                                            backgroundColor: (this.authenticationType === 'Custom' ? base.theme.colors.orange : 'transparent')
                                        }}
                                    />
                                    <Text style={{ fontSize: 17, color: "#333333" }}> Use Oyewallet Passcode/PIN </Text>
                                </View>
                                <Text style={{ fontSize: 17, top: hp('2'), color: "#666666", marginLeft: hp('3') }}>4 digit online pin or passcode protecting your Oyewallet Account</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            this.authenticationType !== 'Default' && this.authenticationType !== null && this.state.pp !== '' &&
                            <View style={{width:wp(100)}}>
                                <TouchableOpacity onPress={()=>this.changeTo()}>
                                    <Text style={{
                                        left:wp(4),
                                        fontSize: 17,
                                        color: base.theme.colors.lavender,
                                        fontWeight:'bold'
                                    }}>Change {this.state.pp}</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>

                </View>

            </View>
        )
    };
}

/*
const styles = StyleSheet.create({
    defaultAndCustom: {
        width: 12, height: 12, borderRadius: 12 / 2,borderWidth:1,borderColor:base.theme.colors.black
    },
    defaultCustomView: {
        justifyContent:'space-between',flexDirection:'row',width:wp('80%'),
        alignSelf:'center',alignItems:'center',marginTop:hp('8%')
    },
    lockIcon: {
        alignItems:'center',alignSelf:'center',justifyContent:'center',flexDirection:'column',flex:1
    },
    lockLogo: {
        width:90,height:90
    },
    default:{
        width:wp('5%'),marginLeft:wp('15%')
    },
    customValidation: {
        fontSize:16,color:base.theme.colors.black,
    },
    container: {
        width:wp('100%'),height:hp('100%')
    },
    signUpIcon: {
        alignSelf:'flex-end',marginTop:0
    },
    customizedText: {
        position:'absolute',marginTop:hp('2%'),marginLeft:wp('7%')
    }
});
*/

const styles = StyleSheet.create({
    defaultAndCustom: {
        width: 12, height: 12, borderRadius: 12 / 2, borderWidth: 1, borderColor: base.theme.colors.black
    },
    defaultCustomView: {
        justifyContent: 'center', flexDirection: 'column', width: wp('80%'),
        alignSelf: 'center', alignItems: 'center', marginTop: hp('3%')
    },
    lockIcon: {
        alignItems: 'center', flexDirection: 'column', flex: 1, borderWidth: 0
    },
    lockLogo: {
        width: 80, height: 80, right: hp('7')
    },
    default: {
        width: wp('5%'), marginLeft: wp('15%')
    },
    customValidation: {
        fontSize: 16, color: base.theme.colors.black,left:hp('2')
    },
    container: {
        width: wp('100%'), height: hp('100%')
    },
    signUpIcon: {
        alignSelf: 'flex-end', marginTop: 0
    },
    customizedText: {
        position: 'absolute', marginTop: hp('2%'), marginLeft: wp('3%'), flexDirection: 'row'
    }
});



export default DefaultOrCustom;
