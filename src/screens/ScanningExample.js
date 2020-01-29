import React, { Component } from 'react';
import { View, Text,Dimensions, TouchableOpacity,TextInput, Linking, Image, PermissionsAndroid, BackHandler, Alert} from 'react-native';
//import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import CardView from 'react-native-cardview';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../components/common/Button';
import ProgressLoader from 'rn-progress-loader'
//import QRScan from "./UserDetails/QRScan";
import base from '../base'
import CountryPicker,
{
    getAllCountries,
} from 'react-native-country-picker-modal';
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
  } from 'react-native-material-textfield';
import Validation from "../components/common/Validation";
import {connect} from "react-redux";


const {width,height} = Dimensions.get('window')
class DefaultScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cca2: 'IN',
            callingCode: '91',
            isLoading:false,
            showMob:false,
            showCamera:true,
            message:'Merchant '
        }
    }

    onSuccess = (e) => {
        let self = this
        console.log(e.data)

        if(e.data != "" && e.data != undefined && e.data!="" && e.data.indexOf("oyewallet.com/qrcode/id") != -1){
            let qrData = e.data;
            var idString = qrData.match(/(id=)\w+/g);
            if(idString.length > 0){
                idString = idString[0]
                console.log(idString)
                if(idString.indexOf("id=") != -1){
                    idString = idString.replace("id=","");

                    this.processMerchant(idString)
                }else{
                    alert("No Merchant Found")
                    this.showQRError('Invalid QR Code')
                }
            }else{
                alert("No Merchant Found")
                this.showQRError('Invalid QR Code')
            }

        }else{
            alert("Invalid QR Code")
            this.showQRError('Invalid QR Code')
            //this.reactivateScanner()
        }


    }

    async processMerchant(merchantId){
        this.setState({isLoading:true})
        let merchResp = await base.service.api.getMerchant(merchantId);
        this.setState({isLoading:false})
        console.log(merchResp)
        if(merchResp.data != undefined && merchResp.data.errorMessage == undefined){

            let merchant = merchResp.data;
            let mobMerchant = merchant.mobileNumber;
            let storeName = merchant.brandName;
            if(mobMerchant != undefined){
                //console.log(merchant.mobileNumber)
                this.props.navigation.navigate('Amount',{storeName:storeName,mobileNumber:mobMerchant})
            }else{
                this.showQRError('Merchant Not Found')
                //this.reactivateScanner();
            }
        }else{
            this.showQRError('Merchant Not Found')

        }
    }

    showQRError(msg){
        let self = this;
        this.setState({showCamera:false,message:msg},()=>{
            self.reactivateScanner();
        })
    }

    componentWillUnmount(){

    }

    reactivateScanner(){
        let self = this;
        setTimeout(function(){
            try{
                self.setState({showCamera:true},()=>{
                    self.scanner.reactivate()
                })

            }catch(e){
                console.log(e)
            }
        },3000);
    }

    render() {
        return (
            <KeyboardAwareScrollView
                scrollEnabled={true} bounces={false} showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false} contentContainerStyle={[{flex:1,backgroundColor:'grey'}]}
            >


                <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                    <Image style={{width:12,height:12,marginTop:16,marginLeft:4,padding:12}} source={require('../icons/ico_back.png')}/>
                </TouchableOpacity>

                {
                    this.state.showCamera?
                <QRCodeScanner
                    ref={(scanner)=>this.scanner = scanner}
                    //style={{position:'absolute'}}
                    showMarker
                    onRead={this.onSuccess}
                    //flashMode={RNCamera.Constants.FlashMode.torch}
                    //cameraProps={{ratio: "1:1"}}
                    cameraStyle={{ height: '60%',width:'60%',alignSelf:'center',overflow:'hidden'}}
                    customMarker={
                        <View style={{
                            flex: 1,width:'100%',height:'100%',
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "transparent"
                        }}>
                            <Image resizeMode={'stretch'} style={{ height: '100%',width:'100%',marginLeft:0.5}} source={require('../icons/scan.png')}/>
                        </View>

                    }
                />:<View style={{alignSelf:'center',alignItems:'center',justifyContent:'center',position:'absolute',top:'40%'}}>
                    <Text style={{alignSelf:'center',fontSize:20,color:'#fff',fontWeight:'bold'}} numberOfLines={1}>{this.state.message}</Text>
                </View>
                }
                <View style={{position:'absolute',flex:1,top:'70%', alignSelf:'center',justifyContent:'center',alignItems:'center'}}>

                    <Text style={{alignSelf:'center',justifyContent:'center',color:'white',marginBottom:20}}>not able to scan? <Text style={{color:'orange'}} onPress={()=>this.setState({showMob:!this.state.showMob})}> Tap to enter mobile number</Text></Text>
                    {
                        this.state.showMob?
                    <CardView
                        style={{width:width-32,backgroundColor:'#fff',height:64,justifyContent:'center'}}

                        cardElevation={3}
                        cardMaxElevation={3}
                        cornerRadius={7}
                    >
                        <View style={{ flexDirection: 'row',justifyContent:'center',alignItems:'center' }}>

                            <View
                                style={{flex:0.2,flexDirection:'row',marginLeft:'5%',}}
                                >
                                <Text style={{fontSize:16}}>+{this.state.callingCode}</Text>
                                {/* <View style={{width:15,height:15, transform: [{ rotate: '180deg' }],marginLeft:'10%',marginTop:'5%'}}/> */}
                            </View>
                            <View style={{ flex: 0.7}}>
                                <TextInput
                                    value={this.state.number}
                                    label='Enter Mobile Number'
                                    placeholder={"Enter Mobile Number"}
                                    style={{borderBottomColor:'grey',borderBottomWidth:0.5,paddingBottom:4,marginRight:8}}
                                    maxLength={10}
                                    keyboardType={"number-pad"}
                                    onChangeText={(val) => {
                                        let check = base.regex.num;
                                        if (check.test(val)) {
                                            this.setState({
                                                number: val
                                            })
                                        }
                                    }
                                    }
                                />
                            </View>
                            <Button style={{ width: 45, height: 45,alignItems:'center',marginLeft:4}}
                            onPress={() => {
                                if (this.checkNumber())
                                    this.props.navigation.navigate("Amount")
                            }
                            }
                            title={
                                <Icon
                                name="ios-checkmark"
                                style={{alignSelf:'center',justifyContent:'center',alignItems:'center'}}
                                size={40}
                                color="white"
                                />
                            }
                            />
                        </View>
                </CardView>:<View/>
            }
                </View>
                <ProgressLoader
                    visible={this.state.isLoading}
                    isModal={true} isHUD={true}
                    hudColor={'white'}
                    color={'orange'} />
            </KeyboardAwareScrollView>
        )
    }

    checkNumber(){
        console.log('GET MOB @@@@@',this.props)
        if ( !Validation.Mobileregex.test(this.state.number) || this.state.number.length !== 10 ){
            Alert.alert("Alert", "Enter Valid Mobile Number");
            return false
        }
        else if(this.props.MobileNumber==this.state.number){
            Alert.alert("Alert", "You can't pay for your number");

        }
        else{
            return true
        }
    }

}
const mapStateToProps = state => {
    return {
        MobileNumber: state.OTPReducer.MobileNumber,
        // otp          : state.OTPReducer.otp,
    };
};
export default connect(
    mapStateToProps)(DefaultScreen);
