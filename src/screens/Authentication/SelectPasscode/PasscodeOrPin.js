import React, {Component} from "react";
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
    TouchableOpacity
} from "react-native";
import base from "../../../base";
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../../components/common/Button';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ElevatedView from "react-native-elevated-view";

class PassCodeOrPin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cusTyp:'',
            defTyp:'',
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    async componentDidMount() {
        console.log("componentDidMount ",)
        this.setState({
            defTyp : await base.utils.storage.retrieveData('authenticationType'),
            cusTyp : await base.utils.storage.retrieveData('customAuthenticationType')
        });
        //console.log(":::componentDidMount>>>customAuthenticationType ",this.cusTyp, this.cusTyp === "PIN")
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        let authenticationType =  await base.utils.storage.retrieveData('customAuthenticationType');
        console.log("authenticationType ",authenticationType)
        console.log("PorP>>>componentDidMount ", this.props.navigation.state.params);
        if (this.props.navigation.state.params === undefined){
            if(authenticationType === 'Passcode'){
                this.props.navigation.navigate('CreatePassword')
            }
            else if(authenticationType === 'PIN'){
                this.props.navigation.navigate('CreatePin')
            }
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        //this.props.navigation.goBack(null);
        console.log("this.props.navigation ", this.props.navigation, );
        if (Platform.OS === 'android') {
            //BackHandler.exitApp()
            this.props.navigation.navigate('DefaultOrCustom')
        }
        return true;
    }

    selectAuthentication(type){
        console.log("typeee",type);
        base.utils.storage.storeData('customAuthenticationType',type);
        if(type === 'Passcode'){
            if(this.props.navigation.state.params === undefined)
                this.props.navigation.navigate('CreatePassword');
            else
                this.props.navigation.navigate('CreatePassword', {data:'change'})
        }
        else{
            if(this.props.navigation.state.params === undefined)
                this.props.navigation.navigate('CreatePin');
            else
                this.props.navigation.navigate('CreatePin', {data:'change'})
        }

    }

    render() {
        console.log(":::jfbhsdvfhdvjhvhf", this.state.cusTyp)
        return (
            <View style={styles.contain}>
                <Image style={styles.signUpLock} source={require('../../../icons/signup.png')}/>
                <View style={styles.backButton}>
                    <View style={styles.backIcon}>
                        <TouchableOpacity
                            style={{width:wp(5), height:hp(3)}}
                            onPress={() => {
                                this.props.navigation.navigate('DefaultOrCustom');
                            }}
                        >
                        <Icon
                            name="chevron-left"
                            type="font-awesome"
                            size={14}
                        />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.customizedText}>
                        <Text style={styles.customizedValidation}>
                            Secure Your Wallet</Text>
                    </View>
                </View>
                <ElevatedView elevation={5} style={styles.chooseOption}>
                    <View style={styles.passcodePin}>
                        <View style={styles.chooseText}>
                            <View style={{width:wp('30%')}}>
                                <Image resizeMode={"contain"} style={styles.lockIcon}
                                       source={require('../../../icons/lock.png')}/>
                            </View>
                            <View style={{width:wp('48%')}}>
                                <Text style={styles.optionText}>Choose Option </Text>
                            </View>

                        </View>

                        <View style={styles.choosePin}>
                            <View style={styles.choosePassCode}>
                                <View style={{width:wp('5%'),}}>
                                    <Text style={styles.passwordDot}></Text>
                                </View>
                                <View style={{width:wp('50%')}}>
                                    <TouchableOpacity
                                        disabled = {
                                            this.state.defTyp === "Custom"?
                                            this.state.cusTyp === "Passcode" ? true : false
                                                :
                                                false
                                        }
                                        onPress={() => this.selectAuthentication('Passcode')}
                                    >

                                        <Text style={{
                                            fontSize: 15,
                                            color:
                                                this.state.defTyp === "Custom"?
                                                this.state.cusTyp === "Passcode" ? "grey" : "black"
                                                    :
                                                    "black"
                                        }}>Passcode/Password </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={[styles.choosePassCode,{marginTop:hp('2%')}]}>
                                <View style={{width:wp('5%'),}}>
                                    <Text style={styles.passwordDot}></Text>
                                </View>
                                <View style={{width:wp('50%')}}>
                                    <TouchableOpacity
                                        disabled = {
                                            this.state.defTyp === "Custom"?
                                            this.state.cusTyp === "PIN" ? true : false
                                                :
                                                false
                                        }
                                        onPress={() => this.selectAuthentication('PIN')}
                                    >

                                        <Text
                                            style={{
                                                fontSize: 15,
                                                color:
                                                    this.state.defTyp === "Custom"?
                                                    this.state.cusTyp === "PIN" ? "grey" : "black"
                                                        :
                                                        "black"
                                        }}>PIN </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </View>
                </ElevatedView>



            </View>

        )
    };
}

const styles = StyleSheet.create({
    contain: {
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
    customizedText: {
        width:wp('55%'),marginLeft:wp('5%'),
    },
    customizedValidation: {
        fontSize: 16, color: base.theme.colors.black,
    },
    chooseOption: {
        width: wp('90%'), height: hp('30%'),
        borderRadius: 25, marginTop: hp('30%'),backgroundColor:base.theme.colors.white,
        alignItems: 'center', alignSelf: 'center',
    },
    chooseText: {
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width:wp('85%')
    },
    lockIcon: {
        width: 80, height: 80, bottom: 45
    },
    optionText: {
        marginTop: hp('1%',), fontSize: 16,
    },
    passwordDot: {
        width: 7, height: 7, borderRadius: 7 / 2, backgroundColor:base.theme.colors.primart1,
    },
    choosePassCode: {
        flexDirection: 'row', alignItems: 'center',width:wp('40%'),marginLeft:wp('7%')
    },
    choosePin: {
        alignSelf: 'center', flexDirection: 'column',
    },
    passcodePin: {
        alignItems: 'center', alignSelf: 'center',
    }








});
export default PassCodeOrPin;
