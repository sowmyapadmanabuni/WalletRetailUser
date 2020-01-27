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
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DatePicker from "react-native-datepicker";
import moment from "moment";
import Dropdown from "react-native-material-dropdown/src/components/dropdown";

let dateOfBirthD;



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

            fName:'',
            lName:'',
            mobile:'',
            email:'',
            genderProps: [{label: 'Male', value: 0},
            {label: 'Female', value: 1}],
            isGenderSelected:0,
            marriedProps: [{label: 'Yes', value: 0},
                {label: 'No', value: 1}],
            isMarriedSelected:0,
            anniversaryDate:moment().format('DD-MM-YYYY'),
            todayDate:moment().format('DD-MM-YYYY'),
            childList:[{value:0,details:"KID0"},{value:1,details:"KID1"},{value:2,details:"KID2"},{value:3,details:"KID3"},{value:4,details:"KID4"},{value:5,details:"KID5"}],
            dateOfBirth:moment().format('DD-MM-YYYY'),
            selectedChild:0
        };
    }

    componentDidMount(){
        console.log(this.firstname)
        this.firstname.inputRef.focus()
    }

    render() {
        const { FirstName, LastName, Email, MobileNumber, onSignupFieldChange, Register, SignUpReducer } = this.props;
        console.log("#####SignUpReducer#######: ", this.props);
        return (
            <View style={{ flex: 1 }}>
                <Image style={{ width: "45%", alignSelf: 'flex-end' }} source={require('../../icons/signup.png')} />
                <View style={GlobalStyle.overLayText}>
                    <Text style={{ marginTop: 5, fontSize: 18 }}>
                        <Text>  </Text>Complete Sign Up</Text>
                </View>

                <ScrollView>
                    <View style={{ marginTop: 70, marginLeft: 20, marginRight: 20, flex: 1, }}>
                        <TextField
                            ref={(firstname)=>this.firstname=firstname}
                            label='First Name'
                            value={FirstName}
                            onChangeText={FirstName =>
                                this.setState({
                                    fName:FirstName
                                })
                                //onSignupFieldChange({ prop: "FirstName", value: FirstName })
                            }
                        />
                        <TextField
                            label="Last Name"
                            value={LastName}
                            onChangeText={LastName =>
                                this.setState({
                                    lName:LastName
                                })
                                //onSignupFieldChange({ prop: "LastName", value: LastName })
                            }
                        />
                        <View style={{
                            flexDirection: 'row',
                            height: '6%',
                            width: '90%',
                            justifyContent: 'flex-start',
                            marginTop: 25,
                        }}>
                            <Text style={{fontSize: 16, color: base.theme.colors.black}}>Gender</Text>
                            <RadioForm formHorizontal={true} animation={true}>
                                {this.state.genderProps.map((obj, i) => {
                                    let onPress = (value, index) => {
                                        this.setState({
                                            isGenderSelected : value,
                                        })
                                    };
                                    return (
                                        <RadioButton labelHorizontal={true} key={i.toString()}>
                                            <RadioButtonInput
                                                obj={obj}
                                                index={i.toString()}
                                                isSelected={this.state.isGenderSelected === i}
                                                onPress={onPress}
                                                buttonInnerColor={base.theme.colors.primary}
                                                buttonOuterColor={base.theme.colors.primary}
                                                buttonSize={10}
                                                buttonStyle={{borderWidth: 0.7}}
                                                buttonWrapStyle={{marginLeft: 40}}
                                            />
                                            <RadioButtonLabel
                                                obj={obj}
                                                index={i.toString()}
                                                onPress={onPress}
                                                labelStyle={{color: base.theme.colors.grey}}
                                                labelWrapStyle={{marginLeft: 10}}
                                            />
                                        </RadioButton>
                                    )
                                })}
                            </RadioForm>
                        </View>
                        <View>
                            <Text style={{color:base.theme.colors.grey}}>DOB</Text>
                        <DatePicker
                            style={{width: '100%',borderBottomWidth :1,borderBottomColor: base.theme.colors.grey}}
                            date={this.state.dateOfBirth}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            //minDate={new Date(moment().subtract(18, 'years').calendar())}
                            maxDate={new Date(moment().subtract(18, 'years').calendar())}
                            iconSource={require('../../icons/cal.png')}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={true}
                            customStyles={{
                                dateIcon: {
                                    left: 2,
                                    alignSelf: 'flex-end',
                                    marginLeft: 0,
                                    marginBottom:2


                                },
                                dateInput: {
                                    borderWidth: 0,
                                    color: base.theme.colors.black,
                                    height: 30,
                                    width: 30,
                                    alignItems:'flex-start',

                                }
                            }}
                            onDateChange={(date) => {
                                this.setState({dateOfBirth:date})
                            }}
                        />
                        </View>
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
                                        onChangeText={MobileNumber =>
                                            this.setState({
                                                mobile:MobileNumber
                                            })
                                            //onSignupFieldChange({ prop: "MobileNumber", value: MobileNumber })
                                        }
                                       // disabled={true}
                                       // textColor={base.theme.colors.black}
                                       // disabledLineType={"solid"}
                                        //disabledLineWidth={0.5}
                                        editable={false}
                                    />
                                    </View>
                            </View>
                        </View>
                        <TextField
                            label="Email ID"
                            value={Email}
                            onChangeText={Email =>
                                this.setState({
                                    email:Email
                                })
                                //onSignupFieldChange({ prop: "Email", value: Email })
                            }
                        />

                        <View style={{marginTop:60, marginLeft:1 }}>
                            <Text style={{color:base.theme.colors.black,fontSize:18}}>(Optional)</Text>
                            <Text style={{fontSize:16,color:base.theme.colors.grey,marginTop:3}}>To get notification for tailored offers please update the following - </Text>

                        </View>
                        <View style={{width:'100%',borderWidth:1,
                            borderColor:base.theme.colors.black,marginTop:20,borderRadius:5,alignItems:'flex-start',justifyContent:'center',paddingBottom:20}}>
                            <View style={{
                                flexDirection: 'row',
                                //height: '6%',
                                //width: '90%',
                                justifyContent: 'flex-start',
                                marginTop: 25,
                            }}>
                                <Text style={{fontSize: 16, color: base.theme.colors.black, }}>Married</Text>
                                <RadioForm formHorizontal={true} animation={true}>
                                    {this.state.marriedProps.map((obj, i) => {
                                        let onPress = (value, index) => {
                                            this.setState({
                                                isMarriedSelected : value,
                                            })
                                        };
                                        return (
                                            <RadioButton labelHorizontal={true} key={i.toString()}>
                                                <RadioButtonInput
                                                    obj={obj}
                                                    index={i.toString()}
                                                    isSelected={this.state.isMarriedSelected === i}
                                                    onPress={onPress}
                                                    buttonInnerColor={base.theme.colors.primary}
                                                    buttonOuterColor={base.theme.colors.primary}
                                                    buttonSize={10}
                                                    buttonStyle={{borderWidth: 0.7}}
                                                    buttonWrapStyle={{marginLeft: 40}}
                                                />
                                                <RadioButtonLabel
                                                    obj={obj}
                                                    index={i.toString()}
                                                    onPress={onPress}
                                                    labelStyle={{color: base.theme.colors.grey}}
                                                    labelWrapStyle={{marginLeft:5}}
                                                />
                                            </RadioButton>
                                        )
                                    })}
                                </RadioForm>
                            </View>
                            {this.state.isMarriedSelected==0 ?
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                <Text style={{marginRight:20}}>No of Kids</Text>
                                <Dropdown
                                    value={this.state.selectedChild}
                                    labelFontSize={18}
                                    labelPadding={-5}
                                    placeHolder={'Select Bank'}
                                    baseColor="rgba(0, 0, 0, 1)"
                                    data={this.state.childList}
                                    containerStyle={{
                                        width: '20%',
                                    }}
                                    textColor={base.theme.colors.black}
                                    inputContainerStyle={{
                                        borderColor:base.theme.colors.lightgrey,
                                    }}
                                    dropdownOffset={{ top: 10, left: 0 }}
                                    dropdownPosition={-5}
                                    rippleOpacity={0}
                                    onChangeText={(value, index) => {
                                        this.setState({
                                            selectedChild:value
                                        })
                                    }}
                                />

                            </View>
                                :
                            <View/>}
                            {this.state.isMarriedSelected==0 ?
                                <View style={{flexDirection:'row',width:'100%',alignItems: 'center',justifyContent:'center'}}>
                                <Text style={{fontSize:14,marginRight:10}}>Anniversary Date</Text>
                            <View style={{flexDirection:'row',width:'50%'}}>
                            <DatePicker
                                style={{width: '80%',borderBottomWidth :1,borderBottomColor: base.theme.colors.grey}}
                                date={this.state.anniversaryDate}
                                mode="date"
                                placeholder="select date"
                                format="DD-MM-YYYY"
                              //minDate={this.state.todayDate}
                                 maxDate={this.state.todayDate}
                                iconSource={require('../../icons/cal.png')}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={true}
                                customStyles={{
                                    dateIcon: {
                                        left: 2,
                                        alignSelf: 'flex-end',
                                        marginLeft: 0,
                                        marginBottom:2


                                    },
                                    dateInput: {
                                        borderWidth: 0,
                                        color: base.theme.colors.black,
                                        height: 30,
                                        width: 30,
                                        alignItems:'flex-start',

                                    }
                                }}
                                onDateChange={(date) => {
                                    this.setState({anniversaryDate:date})
                                }}
                            />
                            </View>

                            </View>
                                :
                                <View/>}


                        </View>


                        <Button style={{ marginTop: 30,marginBottom:100, width: "80%", color: base.theme.colors.white,alignSelf:'center'}}
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

    /* Original
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
    */

    // modified
    signUpValidations = () => {
        //const { FirstName, LastName, Email, MobileNumber } = this.props;
       /* if (Validation.Alphabets.test(this.state.fName) === false) {
            alert("Enter Valid FirstName");
        }
        else if (Validation.Alphabets.test(this.state.lName) === false) {
            alert("Enter Valid LastName");
        }
        else if (Validation.emailRegex.test(this.state.email) === false) {
            alert("Enter Valid Email");
        }
        else if (Validation.Mobileregex.test(this.state.mobile) === false) {
            alert("Enter Valid MobileNumber");
        } else {
            //this.props.navigation.navigate("viewas");
            this.props.Register(this.state.fName, this.state.lName, this.state.mobile, this.state.email, "+91", this.props.navigation);
        }*/
        const { MobileNumber } = this.props;

        this.props.Register(this.state.fName, this.state.lName,  "+91" + this.props.MobileNumber, this.state.email,
            "+91", this.props.navigation, this.state.isGenderSelected,moment(this.state.dateOfBirth,'DD-MM-YYYY').format('YYYY-MM-DD'),this.state.isMarriedSelected,
            this.state.selectedChild,moment(this.state.anniversaryDate,'DD-MM-YYYY').format('YYYY-MM-DD'));

    };

    RegisterMobileNumberCheck = () => {
       /* console.log("this.state.mobile ", this.state);
        const { MobileNumber } = this.props;
        axios.post(api.oyeWalletUrl + "RegisteredMobileNumberCheck", {
            //  axios.post("https://uatwalletapi.azurewebsites.net/wallet/api/v1/RegisteredMobileNumberCheck",{
            //mobileNumber: "+91" + this.props.MobileNumber
            mobileNumber: "+91" + this.props.MobileNumber,
            role:"Retail User"

        }).then(res => {
            console.log("Registernumber", res);
            let registernumber = res.data.success;
            /!*if (registernumber === true) {
                alert("Number is already registered.");
            }
            else {*!/
           // }
            this.signUpValidations();

        })
            .catch(error => {
                console.log("error", error);
            });*/
        this.signUpValidations();

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
        //MobileNumber: state.SignUpReducer.MobileNumber,
        MobileNumber: state.OTPReducer.MobileNumber,
        Email: state.SignUpReducer.Email,
        SignUpReducer: state.SignUpReducer,
    }
}

export default connect(mapStateToProps, { onSignupFieldChange, Register })(SignUp);
