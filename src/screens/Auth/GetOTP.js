import React, { PureComponent } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import base from '../../base';
import Button from '../../components/common/Button';
import { connect } from 'react-redux';
import { onOTPChangeText, GenerateOTP } from '../../actions';
import { GlobalStyle } from '../../components/common/GlobalStyle';
import CountryPicker,
{
  getAllCountries,
} from 'react-native-country-picker-modal';
import Validation from '../../components/common/Validation';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
import ProgressLoader from '../../components/common/ProgressLoader'

class GetOTP extends PureComponent {
  constructor(props) {
    super(props);

    let mappedCountries = [];
    getAllCountries().then(data => {
      data.map(countries => {
        mappedCountries.push(countries.cca2);
      });
    });


    this.state = {
      cca2: 'IN',
      callingCode: '91',
      phoneNumber: '',
      countryList: mappedCountries,
    };
  }

  checkPhno(propStr, valueStr) {
    //onOTPChangeText({prop: propStr, value: valueStr})
    console.log(">>> ", propStr, valueStr);

    let check = /^[0-9]*$/;
    //let check = myValidation.singleNumber;
    console.log("check-> ", check.test(valueStr[valueStr.length - 1]), valueStr.length === 0);
    if (check.test(valueStr[valueStr.length - 1]) || valueStr.length === 0) {
      onOTPChangeText({ prop: propStr, value: valueStr })
    }

  }

  render() {
    const { MobileNumber, onOTPChangeText } = this.props;
    console.log("getotp..........", this.state)
    return (
      <View>
        {/* <ProgressLoader visible={this.state.visible} /> */}
        <Image
          style={{ width: '100%' }}
          source={require('../../icons/login_img.png')}
        />
        <View style={GlobalStyle.overLayText}>
          <Text style={{ color: base.theme.colors.white, fontSize: 18 }}>

            <Text> </Text>Login/Sign Up
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: '20%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <CountryPicker
            // countryList={this.state.countryList}
            // onClose={() => {}}
            onSelect={value => {
              // alert(JSON.stringify(value))
              this.setState({
                cca2: value.cca2,
                callingCode: value.callingCode,
              });
            }}
            // withCountryNameButton
            // visible
            countryCode={this.state.cca2}
            withCallingCode
            // withAlphaFilter={false}
            translation="eng"
            // renderFlagButton={"d"}
            // withFilter
            withFlagButton={false}
            visible={this.state.visible}
            onClose={() => this.setState({ visible: false })}

          />


          <TouchableOpacity style={{ flexDirection: 'row', flex: 0.2 }}

            onPress={() => {

              this.setState({ visible: true })
            }}>
            <Text style={{ marginTop: '30%', fontSize: 16 }}>+{this.state.callingCode}</Text>
            <Image source={require('../../icons/images.png')} style={{ width: 15, height: 15, transform: [{ rotate: '180deg' }], marginTop: '34%', marginLeft: '10%' }} />
          </TouchableOpacity>
          <View style={{ flex: 0.7 }}>
            <TextField
              // style={{
              //   borderBottomWidth: 1,
              //   marginBottom: 10,
              //   borderColor: '#ddd',
              //   color:base.theme.colors.black,padding:5,marginLeft:'2%'
              // }}

              maxLength={10}
              label="Enter Mobile Number"
              keyboardType="number-pad"
              value={MobileNumber}
              onChangeText={MobileNumber => {
                let check = /^[0-9]*$/;
                if (check.test(MobileNumber[MobileNumber.length - 1]) || MobileNumber.length === 0)
                  onOTPChangeText({ prop: 'MobileNumber', value: MobileNumber })
              }

              }
            // onChangeText={ (MobileNumber) => {
            //     console.log("onChangeText");
            //     this.checkPhno('MobileNumber', MobileNumber)
            // }
            //     }
            />
          </View>
        </View>
        {/* <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: '10%' }}> */}
        <TouchableOpacity
          style={{ alignSelf: 'center', marginTop: '10%' }}
          // title="GET OTP"
          
          onPress={() => {
            this.MobileNumberCheck(this.state.callingCode);
          }} >
          <Text style={{ color: base.theme.colors.orange }}>GET OTP</Text>
        </TouchableOpacity>
        {/* </View> */}
      </View>
    );
  }

  MobileNumberCheck = country => {
    console.log(country);
    const { MobileNumber } = this.props;
    if (
      Validation.Mobileregex.test(MobileNumber) === false ||
      MobileNumber.length < 10
    ) {
      alert('Enter Valid Mobile Number');
    } else {
      this.props.GenerateOTP(
        '+' + country,
        MobileNumber,
        this.props.navigation,
      ).then(response=>{
      })
    }
  };
}

const mapStateToProps = state => {
  return {
    MobileNumber: state.OTPReducer.MobileNumber,
  }
};

export default connect(
  mapStateToProps,
  { onOTPChangeText, GenerateOTP },
)(GetOTP);

