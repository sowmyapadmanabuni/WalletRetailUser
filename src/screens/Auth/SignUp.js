import React, { Component } from "react";
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from "react-native";
import Button from '../../components/common/Button';
import { GlobalStyle } from '../../components/common/GlobalStyle';
import Validation from "../../components/common/Validation";
import { connect } from "react-redux";
import { onSignupFieldChange, Register } from "../../actions";
import base from "../../base";
import axios from "axios";
import CountryPicker,
{
    getAllCountries,
} from 'react-native-country-picker-modal';
import api from '../../base/utils/strings';
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
} from 'react-native-material-textfield';
import { ScrollView } from "react-native-gesture-handler";

class SignUp extends Component {
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
            countryList: mappedCountries,
        };
    }

    render() {
        const { FirstName, LastName, Email, MobileNumber, onSignupFieldChange, Register } = this.props;
        
        return (
            <View style={{ flex: 1 }}>
                <Image style={{ width: "45%", alignSelf: 'flex-end' }} source={require('../../icons/signup.png')} />

                <View style={GlobalStyle.overLayText}>
                    <Text style={{ marginTop: 5, fontSize: 18 }}>
                        <Text>  </Text>Complete Sign Up</Text>
                </View>

                <ScrollView>
                    <View style={{ marginTop: 70, marginLeft: 20, marginRight: 20, flex: 1 }}>
                        <TextField
                            label='First Name'
                            value={FirstName}
                            onChangeText={FirstName => onSignupFieldChange({ prop: "FirstName", value: FirstName })}
                        />
                        <TextField
                            label="Last Name"
                            value={LastName}
                            onChangeText={LastName => onSignupFieldChange({ prop: "LastName", value: LastName })}
                        />
                        <View>
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
                            {/* <Text style={{ marginTop: 15 }}>Mobile Number</Text> */}
                            <View style={{ flexDirection: 'row' }}>

                                    <View style={{  borderBottomWidth: 0.5, borderBottomColor: '#B5B5B5',width:'20%' ,justifyContent:'center',marginBottom:'2.3%'}}>
                                    <TouchableOpacity 
                                        onPress={() => {
                                            this.setState({ visible: true })
                                        }}>
                                        <Text style={{marginTop:'30%',fontSize:16}}>+{this.state.callingCode}</Text>
                                    </TouchableOpacity>
                                    </View>
                                    <View style={{width:'80%',justifyContent:'flex-start'}}>
                                    <TextField

                                        label="Mobile Number"
                                        value={MobileNumber}
                                        onChangeText={MobileNumber => onSignupFieldChange({ prop: "MobileNumber", value: MobileNumber })}
                                    />
                                    </View>
                            </View>
                        </View>
                        <TextField
                            label="Email ID"
                            value={Email}
                            onChangeText={Email => onSignupFieldChange({ prop: "Email", value: Email })}

                        />


                        <Button style={{ marginTop: 30, width: "80%", color: base.theme.colors.white,alignSelf:'center'}}
                            title="SIGN UP"
                            onPress={() => {


                                this.RegisterMobileNumberCheck();
                                // this.props.navigation.navigate("PayMerchant");
                            }}

                        />
                    </View>
                </ScrollView>
            </View>

        )
    };
    signUpValidations = () => {
        const { FirstName, LastName, Email, MobileNumber } = this.props;
        if (Validation.Alphabets.test(FirstName) === false) {
            alert("Enter Valid FirstName");
        }
        else if (Validation.Alphabets.test(LastName) === false) {
            alert("Enter Valid LastName");
        }
        else if (Validation.emailRegex.test(Email) === false) {
            alert("Enter Valid Email");
        }
        else if (Validation.Mobileregex.test(MobileNumber) === false) {
            alert("Enter Valid MobileNumber");
        } else {
            //this.props.navigation.navigate("viewas");
            this.props.Register(FirstName, LastName, MobileNumber, Email, "+91", this.props.navigation);
        }
    }

    RegisterMobileNumberCheck = () => {

        const { MobileNumber } = this.props;
        axios.post(api.oyeWalletUrl + "RegisteredMobileNumberCheck", {
            //  axios.post("https://uatwalletapi.azurewebsites.net/wallet/api/v1/RegisteredMobileNumberCheck",{
            mobileNumber: "+91" + this.props.MobileNumber

        }).then(res => {
            console.log("Registernumber", res.data.success);
            let registernumber = res.data.success;
            if (registernumber === true) {
                alert("Number is already registered.");
            }
            else {
                this.signUpValidations();
            }
        })
            .catch(error => {
                console.log("error", error);
            });
    };
};

const styles = StyleSheet.create(
    {
        TextInputStyle: {
            borderBottomWidth: 1, width: "80%", borderBottomColor: '#B5B5B5', color: base.theme.colors.black
        }
    }
)

const mapStateToProps = state => {
    return {
        FirstName: state.SignUpReducer.FirstName,
        LastName: state.SignUpReducer.LastName,
        MobileNumber: state.SignUpReducer.MobileNumber,
        Email: state.SignUpReducer.Email,
    }
}
export default connect(mapStateToProps, { onSignupFieldChange, Register })(SignUp);