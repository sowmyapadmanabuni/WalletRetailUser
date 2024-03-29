import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Alert, PermissionsAndroid, BackHandler, ToastAndroid, Dimensions, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
// import Icon from 'react-native-vector-icons/FontAwesome';

import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/common/Button';
import base from '../../base';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { TextInput, ScrollView, } from 'react-native-gesture-handler';
import CardView from 'react-native-cardview';
import { Style } from './Style';
import Validation from "../../components/common/Validation";
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

import CountryPicker,
{
  getAllCountries,
} from 'react-native-country-picker-modal';

import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
import { connect } from "react-redux";
import { GenerateOTP, onOTPChangeText, VerifyOTP } from "../../actions";

class QRScan extends Component {
  constructor(props) {
    super(props);
    let mappedCountries = [];
    getAllCountries().then(data => {
      data.map(countries => {
        mappedCountries.push(countries.cca2);
      });
    });
    this.state = {
      text1: 'Not able to scan? ',
      text2: 'Tap to enter mobile number',

      content: false, // to show the mobilenumber cardview
      cca2: 'IN',
      callingCode: '91',
      countryList: mappedCountries,
        enableOR:false,
        number:''

    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

  }


  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    if (Platform.OS === 'android') {
      this.props.navigation.navigate('PayMerchant')
    }
      return true;
  }
    checkPermissions(){
      let self = this;
      console.log("checkPermissions")
      Promise.all([
        check( Platform.OS==='ios'? PERMISSIONS.IOS.CAMERA:PERMISSIONS.ANDROID.CAMERA)
      ]).then(([result]) => {
        console.log("RESULT",result)
        switch (result) {
          case RESULTS.UNAVAILABLE:
            alert("No Camera Permission available")
            break;
          case RESULTS.DENIED:
            self.requestPermissions()
            break;
          case RESULTS.GRANTED:
            self.openQRScreen()
            break;
          case RESULTS.BLOCKED:
            alert("Please enable camera permission from settings")
            break;
        }
      });
    }

  async requestPermissions() {

    const cameraStatus = await request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA);
    if (cameraStatus == RESULTS.GRANTED) {
      this.openQRScreen()
    }
  }

  onSuccess = (e) => {
    Linking
      .openURL(e.data)
      .catch(err => console.error('An error occured', err));
  }
  s
  ComponentHideAndShow = () => {
    this.setState(previousState => ({ content: !previousState.content }))
  }

  checkNumber() {
    console.log('GET MOB @@@@@', this.props)
    if (!Validation.Mobileregex.test(this.state.number) || this.state.number.length !== 10) {
      Alert.alert("Alert", "Enter Valid Mobile Number");
      return false
    }
    else if (this.props.MobileNumber == this.state.number) {
      Alert.alert("Alert", "You can't pay for your number");

    }
    else {
      return true
    }
  }



  imageTouched = () => {
    console.log("Pressed")
  }

  scanning() {
    this.setState({ enableOR: true })
  }



  openQRScreen() {
    this.props.navigation.navigate("Scanned");
  }

  onPress = () => {
    var that = this;
    console.log("ONPRESS")
    this.checkPermissions()
  };

  render() {
    console.log("PROPRRRRR@@@@@@", this.props)
    const { width } = Dimensions.get('screen');
    const leftTop = {
      borderLeftWidth: 3,
      borderTopWidth: 3,
      borderColor: 'white'
    };
    const leftBottom = {
      borderLeftWidth: 3,
      borderBottomWidth: 3,
      borderColor: 'white'
    };
    const rightTop = {
      borderRightWidth: 3,
      borderTopWidth: 3,
      borderColor: 'white'
    };
    const rightBottom = {
      borderRightWidth: 3,
      borderBottomWidth: 3,
      borderColor: 'white'
    };
    return (

      <KeyboardAwareScrollView
      scrollEnabled={true} bounces={false} showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false} contentContainerStyle={[{flex:1}]}
  >
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={()=>this.props.navigation.navigate('PayMerchant')}>
        <Image source={require('../../icons/images.png')} style={{ width: 10, height: 20, marginTop: '5%', marginLeft: '5%',transform: [{ rotate: '270deg' }] }} />

         <View style={{marginTop:'6%'}}>
         <Text style={{ height: 20,alignSelf:'center',justifyContent:'center' }}> Pay</Text>
         </View>
        </TouchableOpacity>

        {
          (this.state.enableOR) ?
            <View style={{ flex: 1 }}>

            </View>
            :
            <View
              style={{ alignItems: 'center', justifyContent: 'center', marginTop: hp('5%') }}
            >
              <Image
                source={require('../../icons/qr.png')}
              />
              <Button style={Style.buttonOverLay}
                title='TAP TO SCAN QR'
                onPress={() => {
                  // alert("Camera interface");
                  this.onPress()
                  //this.props.navigation.navigate("Scanned");


                }}
              />
            </View>
        }

        {/* <View style={Style.textStyle}> */}

        {/*<Text> {this.state.text1}*/}
        {/*</Text>*/}
        {/*<Button style={Style.textButtonPosition}*/}
        {/*  title={this.state.text2}*/}

        {/*  textStyle={{ color: base.theme.colors.primary }}*/}
        {/*  onPress={() => {*/}
        {/*    { this.ComponentHideAndShow() }*/}
        {/*  }}*/}
        {/*/>*/}

        <View style={{
          flexDirection: 'row',
          marginTop:'2%',
          alignSelf:'center'
        }}>
          <Text style={{height:30}}> {this.state.text1}</Text>
          <TouchableOpacity
            style={{}}
            onPress={() => this.ComponentHideAndShow()}
          >
            <Text style={{ color: base.theme.colors.primary, height:30}}>{this.state.text2}</Text>
          </TouchableOpacity>
        </View>

        {/* </View> */}
        {
          this.state.content ?
            <CardView
              // marginLeft={'5%'}
              // marginRight={'5%'}
              // marginBottom={'5%'}
              cardElevation={3}
              cardMaxElevation={3}
              cornerRadius={7}
              style={{ backgroundColor: 'white', margin: '5%' }}
            >
              <View style={{ flexDirection: 'row' }}>
                <CountryPicker
                  onSelect={value => {
                    this.setState({
                      cca2: value.cca2,
                      callingCode: value.callingCode,
                    });
                  }}
                  countryCode={this.state.cca2}
                  withCallingCode
                  translation="eng"
                  withFlagButton={false}
                  visible={this.state.visible}
                  onClose={() => this.setState({ visible: false })}
                />
                {/*<TouchableOpacity
                style={{flex:0.3,flexDirection:'row',marginLeft:'5%',marginTop:'10%'}}
                  onPress={() => {
                    this.setState({ visible: true })
                  }}>*/}
                <View style={{ flex: 0.2, flexDirection: 'row', marginLeft: wp('5%'),alignItems:'center',marginTop:hp('3%')}}>
                  <Text style={{ fontSize: 16 }}>+{this.state.callingCode}</Text>
                  {/* <Image source={require('../../icons/images.png')} style={{width:15,height:15, transform: [{ rotate: '180deg' }],marginLeft:'10%',marginTop:'5%'}}/>
                </TouchableOpacity>*/}
                </View>
                <View style={{ flex: 0.8 }}>
                  <TextField
                    value={this.state.number}
                    label='Enter Mobile Number'
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
                <Button style={{ width: 45, height: 45, margin: 10 }}
                  onPress={() => {
                      if (this.checkNumber())
                          this.getMerchantData();
                  }
                  }
                  title={
                    <Icon
                      name="ios-checkmark"
                      size={35}
                      color="white"
                      
                      style={{alignItems:'center',justifyContent:'center'}}
                    />
                  }
                />
              </View>
            </CardView>
            :
            <View>
            </View>
        }
        {/* <CardView
          style={Style.cardViewStyle}
          cardElevation={3}
          cardMaxElevation={3}
          cornerRadius={7}
        >
          {
            this.state.content ?
              <View style={{ ...Style.headerText, flexDirection: 'row' }}>

                <CountryPicker

                  onSelect={value => {

                    this.setState({
                      cca2: value.cca2,
                      callingCode: value.callingCode,
                    });
                  }}

                  countryCode={this.state.cca2}
                  withCallingCode

                  translation="eng"
                  withFlagButton={false}
                  visible={this.state.visible}
                  onClose={() => this.setState({ visible: false })}

                />

                <TouchableOpacity
                  style={{ marginTop: '13%' }}
                  onPress={() => {

                    this.setState({ visible: true })
                  }}>
                  <Text>+{this.state.callingCode}</Text>
                </TouchableOpacity>

                <TextInput placeholder="Enter Mobile Number"></TextInput></View> : <View></View>
          }
          {this.state.content ?
            <View>
              <Button style={{ marginLeft: '30%', marginTop: '5%', width: 45, height: 45 }}
                onPress={() => { this.props.navigation.navigate("Amount") }}
                title={
                  <Icon
                    name="ios-checkmark"
                    size={60}
                    color="white"
                  />
                }
              />
            </View> : <View></View>
          }
        </CardView> */}

      </KeyboardAwareScrollView>
    )
  }

  async getMerchantData() {
      //http://devapi.oyewallet.com/wallet/api/v1/GetMerchantPayeeDetailsByMobileNumber/9490791523
      let dataMer = await base.service.api.getMerchantByMobNum(this.state.number);
      console.log('DATA IN MERCHANT', dataMer)

      //  this.props.navigation.navigate("Amount")

        if(dataMer.success==false){
            Alert.alert('Alert','Store Not Exit with this number')
          } else if(dataMer.success && dataMer.data.length !==0){

    let mobileNum=dataMer.data[0].mobileNumber;
     let storeName=dataMer.data[0].brandName
      this.props.navigation.navigate('Amount',{storeName:storeName,mobileNumber:mobileNum})
        }

  }

};

const mapStateToProps = state => {
  return {
    MobileNumber: state.OTPReducer.MobileNumber,
    // otp          : state.OTPReducer.otp,
  };
};
export default connect(
  mapStateToProps)(QRScan);


//export default QRScan;
