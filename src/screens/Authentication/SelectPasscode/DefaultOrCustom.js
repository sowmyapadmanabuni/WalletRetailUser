import React, { Component } from "react";
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
    AsyncStorage
} from "react-native";
import base from "../../../base";
//import storage from "../../../utils/storage";
import Button from '../../../components/common/Button';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CardView from "react-native-cardview";
import { updateUserInfo } from "../../../actions";
import { connect } from "react-redux";

class DefaultOrCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressStatus: false,
            isButton: true,
            pp: ''

        }
    }

    /* handleBackPress = () => {
         if (this.props.navigation.state.params !== undefined) {
             this.props.navigation.navigate('Dashboard')
         } else {
             BackHandler.exitApp()
         }
         return true;
     }*/






    render() {

        return (
            <View style={styles.container}>

                <View style={styles.customizedText}>
                    {/* <Icon
                            name="chevron-left"
                            type="font-awesome"
                            size={20}
                            onPress={() => {
                                if (this.props.navigation.state.params !== undefined) {
                                    this.props.navigation.navigate('Dashboard')
                                } else {
                                    BackHandler.exitApp()
                                }
                            }}
                        />*/}
                    <Text style={styles.customValidation}>Secure Your Wallet</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 0, bottom: hp('-1') }}>
                    <Image resizeMode={"cover"} style={{ width: wp('90'), height: hp('0.1'), tintColor: '#333333', top: hp('1'), right: hp('3') }} source={require('../../../icons/line.png')} />
                    <Image resizeMode={"center"} style={styles.lockLogo} source={require('../../../icons/lock.png')} />
                </View>
                <View>
                    <View style={{justifyContent:'center'}}>
                        <Text style={{marginLeft:wp('7%'),fontSize:16,fontWeight:'bold'}}>Setup your mobile phone's Screen lock</Text>
                        <Text style={{marginLeft:wp('7%'),marginRight:wp('7%'),marginTop:hp('1%')}}>To secure your data, you will beasked to unlock OyeWallet using your phone lock </Text>
                    </View>
                    <View style={{alignSelf:'center',marginTop:hp('5%')}}>
                        <Image resizeMode={"contain"}  source={require('../../../icons/security.png')} />
                    </View>
                </View>
                <View style={{alignSelf:'center',marginTop:hp('7%')}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Security")}>
                        <Text style={{color:base.theme.colors.primart1}}>NEXT</Text>
                    </TouchableOpacity>
                </View>




            </View>

        )
    };
}

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
        fontSize: 16, color: base.theme.colors.black, left: hp('2')
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

const mapStateToProps = state => {
    return {
        loggedIn: state.UserReducer.loggedIn,
    };
};




export default connect(mapStateToProps, { updateUserInfo })(DefaultOrCustom);
