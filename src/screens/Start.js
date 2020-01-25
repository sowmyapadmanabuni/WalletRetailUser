import React,{Component} from "react";
import {View,Text,StyleSheet,Image,TouchableHighlight, Dimensions, BackHandler, Alert} from "react-native";
import base from "../base";
import Button from '../components/common/Button';
import {connect} from "react-redux";
import TouchID from "react-native-touch-id";
// import Carousel from "react-native-snap-carousel";
import LocalAuth from 'react-native-local-auth';
//import AndroidOpenSettings from "react-native-android-open-settings";
import OpenSecuritySettings from 'react-native-open-security-settings';
// const height=Dimensions.get('window').height;
// const width = Dimensions.get('window').width;

class Start extends Component{
    constructor(props){
        super(props);
        console.log("lockkk",this.props.navigation.state.params);
        let params = this.props.navigation.state.params ? this.props.navigation.state.params.authState : '';
        console.log("Start>>>constructor ",params);
        this.state={
            bodyText:'OyeWallet is your personal cashback app.\n'+
                'Earn cashback for every purchase that you make in the stores near you.'+
                'Make the most of\ntop cashback offers from the wallet app.',
            images: [ '../icons/login_img.png','../icons/Bills.png'],
            pressStatus: false ,
            isButton: params !== 'authenticated',
            propsParam:params,
        }
    }

    /*
    componentDidMount() {
        //this.props.navigation.navigate('QR');
        if (this.props.registrationId !== null){
            this.props.navigation.navigate('PayMerchant');
        }
        else{
            this.props.navigation.navigate('EnterOTP');
        }
    }
    */


    async caller(){
        console.log("Start>>>componentDidMount>>>param",this.props.navigation.state.params)
        let authenticationType =  await base.utils.storage.retrieveData('authenticationType');
        let defaultAuthenticationType =  await base.utils.storage.retrieveData('defaultAuthenticationType');
        let customAuthenticationType =  await base.utils.storage.retrieveData('customAuthenticationType');

        console.log("Start>>>componentDidMount ",authenticationType, defaultAuthenticationType, customAuthenticationType, this.state.propsParam);

        let self = this;
        const optionalConfigObject = {
            title: 'Authentication Required', // Android
            imageColor: '#e00606', // Android
            imageErrorColor: '#ff0000', // Android
            sensorDescription: 'Touch sensor', // Android
            sensorErrorDescription: 'Failed', // Android
            cancelText: 'Cancel', // Android
            fallbackLabel: '',
            unifiedErrors: false,
            passcodeFallback: true,
        };
        if((authenticationType === 'Default') && defaultAuthenticationType === null && customAuthenticationType === null) {
            console.log('Start>>>componentDidMount>>>IF');
            TouchID.isSupported(optionalConfigObject).then(biometryType => {
                console.log("111111",biometryType);
                // Success code
                if (biometryType === 'FaceID') {
                    this._pressHandler(this);
                    console.log('FaceID is supported.');
                } else if (biometryType === 'TouchID'){
                    this._pressHandler(this);
                    //this.androidPassCode();
                    //this.showAlert();
                    console.log('TouchID is supported.');
                } else if (biometryType === true) {
                    console.log('vvvvvv.');
                    //this.showAlert();
                    this.androidPassCode();
                }
            })
                .catch(error => {
                    if(Platform.OS === 'android'){
                        // this.androidPassCode();
                        this.passCodeField();
                    }
                    else{
                        this.passCodeFail();
                    }
                    console.log("hello",error);

                    // this.showAlert();
                });
        }
        else{
            console.log("Start>>>componentDidMount>>>ELSE ");
            if(authenticationType === 'Default') {
                console.log("Start>>>componentDidMount>>>ELSE>>>IF ");
                if (defaultAuthenticationType === 'TouchId') {
                    this.androidPassCode()
                } else if (defaultAuthenticationType === 'Password') {
                    this.passCodeField()
                }
            }
                else if(authenticationType === 'Custom'){
                    console.log(":::Start>>>componentDidMount>>>Custom",customAuthenticationType);
                    if(customAuthenticationType === 'Passcode'){
                        let customPasscode =  await base.utils.storage.retrieveData('customPasscode');
                        console.log(":::Start>>>componentDidMount>>>Custom>>>customPasscode", customPasscode)
                        if(customPasscode === null){
                            this.props.navigation.navigate('CreatePassword')
                        }
                        else{
                            this.props.navigation.navigate('EnterPassCode')
                        }
                    }
                    else if(customAuthenticationType === 'PIN'){
                        // let customPIN =  await base.utils.storage.retrieveData('customPIN');
                        let customPIN =  await base.utils.storage.retrieveData('customPin');
                        console.log(":::Start>>>componentDidMount>>>Custom>>>customPIN", customPIN)
                        if(customPIN === null){
                            this.props.navigation.navigate('CreatePin')
                        }
                        else{
                            this.props.navigation.navigate('EnterPin')
                        }
                    }


            }else if(this.state.propsParam === 'authenticated'){
                console.log("Start>>>componentDidMount>>>ELSE>>>ELSE ")
                this.setState({isButton:false});
            }
        }

        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', () => {
                BackHandler.exitApp();
                return true;
            });
        }
    }


    async componentDidMount(){
        //this.props.navigation.navigate('EnterOTP');
        let auth = await base.utils.storage.retrieveData('authenticationType')
        console.log("Start>>>componentDidMount>>>registrationId ",this.props.registrationId);
        if (this.props.registrationId !== null){
            this.caller()
        }
        else{
            this.props.navigation.navigate('EnterOTP');
        }
    }


    _pressHandler(self) {

        //let self = this;
        const optionalConfigObject = {
            title: 'Authentication Required', // Android
            imageColor: '#e00606', // Android
            imageErrorColor: '#ff0000', // Android
            sensorDescription: 'Touch sensor', // Android
            sensorErrorDescription: 'Failed', // Android
            cancelText: 'Cancel', // Android
            fallbackLabel: '',
            unifiedErrors: false,
            passcodeFallback: true,

        };
        TouchID.authenticate('OyeWallet', optionalConfigObject)
            .then(success => {
                alert('Authenticated Successfully');
                self.setState({isButton:false});
                //self.props.navigation.navigate('Launch');
                self.props.navigation.navigate('PayMerchant');
            })
            .catch(error => {
                if(Platform.OS === 'android') {
                    BackHandler.exitApp() ;
                }
                else{
                    Alert.alert(
                        '',
                        'Authentication failed',
                        [{text: 'Retry' ,onPress:() => self._pressHandler(self)}],
                        {cancelable: false}
                    )
                }
                console.log("aaaaaaa",error);

            });
    };

    androidPassCode() {
        base.utils.storage.storeData('defaultAuthenticationType','TouchId');
        let self = this;
        console.log("Hitting");
        try {
            TouchID.authenticate('', {passcodeFallback: true})
                .then(success => {
                    console.log("successsss", success);
                    self.setState({isButton:false});
                    //self.props.navigation.navigate('Launch');
                    self.props.navigation.navigate('PayMerchant');
                    //alert('Authenticated Successfully')
                })
                .catch(error => {
                    console.log("Errror:", error);
                    // Failure code
                    LocalAuth.authenticate({
                        reason: 'this is a secure area, please authenticate yourself',
                        fallbackToPasscode: true,    // fallback to passcode on cancel
                        suppressEnterPassword: true // disallow Enter Password fallback
                    })
                        .then(success => {
                            console.log("Success:",success);
                            self.setState({isButton:false});
                            //self.props.navigation.navigate('Launch');
                            self.props.navigation.navigate('PayMerchant');
                            //alert('Authenticated Successfully')
                        })
                        .catch(error => {
                            this.passCodeFail();
                            console.log("pass error ");
                            //alert('Authentication Failed', error.message)

                        })

                });
        }catch (e) {
            console.log(e)
        }
    }

    passCodeField(){
        console.log("rrrrrrrrr");
        let self = this;
        base.utils.storage.storeData('defaultAuthenticationType','Password');
        LocalAuth.authenticate({
            reason: 'this is a secure area, please authenticate yourself',
            fallbackToPasscode: true,    // fallback to passcode on cancel
            suppressEnterPassword: true // disallow Enter Password fallback
        })
            .then(success => {
                self.setState({isButton:false});
                //self.props.navigation.navigate('Launch');
                self.props.navigation.navigate('PayMerchant');
                //alert('Authenticated Successfully')
            })
            .catch(error => {
                this.passCodeFail();
                console.log("error",error);
                // alert('Authentication Failed', error.message)
            })
    }

    passCodeFail(){
        Alert.alert(
            '',
            'Fingerprint or Password is not enabled. If you want to continue with the app,Please enable the Fingerprint or Password in settings ',
            [
                {
                    text: 'No',
                    onPress: () => {
                        //base.utils.storage.storeData('authenticationType',"Custom");
                        base.utils.storage.storeData('authenticationType',"Default");
                        this.props.navigation.navigate('PassCodeOrPin')
                    },
                    //onPress: () => this.props.navigation.navigate('DefaultOrCustom'),
                    style: 'cancel',
                },
                {text: 'Yes', onPress: () => {
                        if(Platform.OS === 'ios'){
                            //Linking.canOpenURL('app-settings:')
                            Linking.openURL('app-settings:')
                        }else {
                            this.showAndroidAlert();
                        }
                    }},
            ],
            {cancelable: false},
        );
    }

    showAndroidAlert(){        
        OpenSecuritySettings.openSecuritySettings()
    }

    onShowUnderlay() {
        let params = this.props.navigation.state.params ? this.props.navigation.state.params.authState : '';
        console.log("Start>>>onShowUnderlay ",params);

        const { loggedIn } = this.props;
        console.log("Is User Logged in:",loggedIn)
        if(loggedIn || this.props.registrationId !== null){
            this.props.navigation.navigate("DefaultOrCustom");
        }
        else{
            this.props.navigation.navigate("Otp");
        }
    }

    render(){
        return(
            <View style ={styles.backgroundcontainer}>
                <Image resizeMode={"contain"} style={{}} source={require('../icons/login_img.png')} />
                <Text style={{padding:'10%',fontSize:28 }}>
                    <Text style={{color:base.theme.colors.white}}>Welcome!</Text>{'\n'}<Text>To The OyeWallet</Text>{'\n'}{'\n'}
                    <Text style={{fontSize:14,color:base.theme.colors.white}}>{this.state.bodyText}</Text>
                </Text>

                <Button  style ={styles.ButtonContainer}
                         title="GET STARTED"
                         onPress={()=>{
                             this.onShowUnderlay();                            
                             //this.props.navigation.navigate("Otp");
                             //this.props.navigation.navigate("Signup");
                         }}
                />
            </View>

        )
    };
};

const styles = StyleSheet.create(
    {
        backgroundcontainer:
            {
                flex:1,
                backgroundColor:'#FFB81A',
                resizeMode:'cover' ,
                position: 'relative'
            },
        ButtonContainer:
            {
                width:Platform.OS==='ios'?'40%':'30%',
                backgroundColor:'#FFD16B',
                marginLeft:'30%'
            }

    }
)


const mapStateToProps = state => {
    return {
        registrationId: state.UserReducer.registrationId,
    };
};

export default connect(
    mapStateToProps,
)(Start);


//export default Start;
