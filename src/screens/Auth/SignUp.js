import React, { Component } from "react";
import {View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert,Platform,BackHandler} from "react-native";
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
import TouchID from "react-native-touch-id";
import OpenSecuritySettings from 'react-native-open-security-settings';
import LocalAuth from 'react-native-local-auth';




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
            isGenderSelected:2,
            marriedProps: [{label: 'Yes', value: 0},
                {label: 'No', value: 1}],
            isMarriedSelected:0,
            anniversaryDate:moment().format('DD-MM-YYYY'),
            todayDate:moment().format('DD-MM-YYYY'),
            childList:[{value:0,details:"KID0"},{value:1,details:"KID1"},{value:2,details:"KID2"},{value:3,details:"KID3"},{value:4,details:"KID4"},{value:5,details:"KID5"}],
            dateOfBirth:'',
            selectedChild:0,
        };
    }
    componentWillMount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        if (Platform.OS === 'android') {
            var doubleClick = BackHandler.addEventListener('hardwareBackPress', () => {
                    BackHandler.exitApp()
                });
                setTimeout(
                    () => {
                        doubleClick.remove()
                    },
                    1500
                );
                //console.log("TIME: ",new Date().getTime())
                //this.showExitAlert();
            }
        }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    formatText = (text) => {
        return text.replace(/^[a-zA-Z ]+$/g,  '');
    };

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
                    <View style={{ width:'70%',alignSelf:'center'}}>
                        <TextField
                            label='First Name'
                           // value={this.state.fName}
                           //formatText={this.formatText}
                            onChangeText={(value) =>{
                               let num = value.replace(/^[a-zA-Z ]+$/g,  '');
                                if (isNaN(num)) {
                                    console.log('IT IS NOT VALID !!!!!',value,num)
                                } else {
                                    console.log('IT IS NOT VALID 22222',value,num) }
                                    this.setState({fName:value})
                                }}
                               // this.setState({fName:value})}}
                            // onChangeText={(text) => this.setState({fName: text})}
                            keyboardType={Platform.OS === 'ios'? 'ascii-capable':'visible-password'}
                            fontSize={13}
                        />
                        <TextField
                            label="Last Name"
                            value={this.state.lName}
                            onChangeText={(value) =>{
                                let num = value.replace(/^[a-zA-Z ]+$/g,  '');
                                if (isNaN(num)) {
                                    // Its not a number
                                } else {
                                    this.setState({lName:value})
                                }}}
                            // onChangeText={(text) => this.setState({payeeName: text})}
                            keyboardType={Platform.OS === 'ios'? 'ascii-capable':'visible-password'}
                           /* onChangeText={LastName =>
                                this.setState({
                                    lName:LastName
                                })
                                //onSignupFieldChange({ prop: "LastName", value: LastName })
                            }*/
                            fontSize={13}

                        />
                        <View style={{borderBottomWidth: 0.5, borderBottomColor: base.theme.colors.grey,width:'100%' , height:40,justifyContent:'flex-end', }}>
                            {/* <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ visible: true })
                                        }}>
                                        <Text style={{marginTop:'30%',fontSize:14}}>+{this.state.callingCode}</Text>
                                    </TouchableOpacity>*/}
                            <Text style={{fontSize:14,marginBottom:5}}>+{this.state.callingCode}-{' '}{MobileNumber}</Text>
                        </View>
                       {/* <View>
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
                             <Text style={{ marginTop: 15 }}>Mobile Number</Text>

                            <View style={{ flexDirection: 'row',backgroundColor:'red',height:60}}>


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
                        </View>*/}
                        <View style={{
                            flexDirection: 'row',
                            height: '7%',
                            width: '90%',
                            justifyContent: 'flex-start',
                            marginTop:15,
                            marginBottom:10
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
                        <TextField
                            label="Email ID"
                            value={Email}
                            onChangeText={Email =>
                                this.setState({
                                    email:Email
                                })
                                //onSignupFieldChange({ prop: "Email", value: Email })
                            }
                            fontSize={13}
                        />

                    </View>
     {/*               <View style={{marginTop:20,width:'90%',alignSelf:'center' }}>
                        <Text style={{color:base.theme.colors.black,fontSize:16}}>(Optional)</Text>
                        <Text style={{fontSize:14,color:base.theme.colors.grey,marginTop:3}}>To get notification for tailored offers please update the following - </Text>

                    </View>
                    <View style={{width:'90%',borderWidth:1,alignSelf:'center',
                        borderColor:base.theme.colors.black,marginTop:20,borderRadius:5,alignItems:'flex-start',justifyContent:'center',paddingBottom:20,paddingLeft:5}}>
                        <View style={{
                            flexDirection: 'row',
                            //height: '6%',
                            //width: '90%',
                            justifyContent: 'flex-start',
                            marginTop: 20,
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
                            <View style={{flexDirection:'row',width:'100%',alignItems: 'center',justifyContent:'flex-start'}}>
                                <Text style={{fontSize:16,marginRight:10}}>Anniversary Date</Text>
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

                    </View>*/}

                   {/* <Button style={{ marginTop: 30,marginBottom:100, width: "80%", color: base.theme.colors.white,alignSelf:'center'}}
                            title="SIGN UP"
                            onPress={() => {
                                this.RegisterMobileNumberCheck();
                                // this.props.navigation.navigate("PayMerchant");
                            }}

                    />*/}
                    <View style={{alignItems:'center'}}>
                    <TouchableOpacity onPress={() => {
                        this.RegisterMobileNumberCheck();
                        // this.props.navigation.navigate("PayMerchant");
                    }} style={{marginTop: 30,marginBottom:100, }}>
                        <Text style={{fontSize:16,color:base.theme.colors.primary,fontWeight:'bold'}}>SIGN UP</Text>
                    </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>

        )
    };

    signUpValidations = (title, message) => {

        if (base.utils.validate.isBlank(this.state.fName)) {
            Alert.alert("Please Enter First name", message)
        } else if (!base.utils.validate.alphabetValidation(this.state.fName)) {
            Alert.alert("First name should not contain special characters",message)
        } else if (this.state.fName.length < 1) {
            Alert.alert("First name should be minimum 1 character",message)
        } else if (base.utils.validate.isBlank(this.state.lName)) {
            Alert.alert("Please Enter Last name", message)
        } else if (!base.utils.validate.alphabetValidation(this.state.lName)) {
            Alert.alert("Last name should not contain special characters",message)
        } else if (this.state.lName.length < 1) {
            Alert.alert("Last name should be minimum 1 character",message)
        } /*else if (base.utils.validate.isBlank(this.state.mobile)) {
            Alert.alert("Please Enter Primary mobile number",message)
        } else if (this.state.mobile.length < 10) {
            Alert.alert("Please enter a valid (10 digit) Mobile no",message)
        }*/
        else if (this.state.isGenderSelected==2) {
            Alert.alert("Gender is Mandatory",message)
        }
        else if (this.state.dateOfBirth=='') {
            Alert.alert("Date of birth is  Mandatory",message)
        }
        else if (base.utils.validate.isBlank(this.state.email)) {
            Alert.alert("Email cannot be empty",message)
        } else if (!base.utils.validate.validateEmailId(this.state.email)) {
            Alert.alert("Please Enter a Valid Email Id",message)
        }
        else{

            const { MobileNumber } = this.props;
            let fName=this.state.fName;
            let lName=this.state.lName;
            let mobNum="+91" + this.props.MobileNumber;
            let email=this.state.email;
            let isGenderSelected=this.state.isGenderSelected
            let dob=moment(this.state.dateOfBirth,'DD-MM-YYYY').format('YYYY-MM-DD')
            let self=this;
            this.launchSecurity(function (isSupported) {
                console.log('Going inside this',isSupported)
                self.props.Register(fName,lName,mobNum, email,
                    "+91", self.props.navigation, isGenderSelected,dob,
                    isSupported)
            })



        }



    };

    async launchSecurity(cb) {
        console.log("HITTING Here")

        let self = this;
        const optionalConfigObject = {
            unifiedErrors: false,
            passcodeFallback: true,
        };
        if(Platform.OS==='android'){
            console.log("Checking defaultSecurity")
            let isSecure = await OpenSecuritySettings.isDeviceSecure()
            console.log("OpenSecuritySettings.isDeviceSecure",isSecure)
            if(isSecure){
                cb(true)
            }else{
                cb(false)
            }
        }else {
            TouchID.isSupported(optionalConfigObject).then(biometryType => {
                console.log("Signupaction", biometryType);
                // Success code
                //true
                cb(true)
            })
                .catch(error => {
                    cb(false)
                    /* if (Platform.OS === 'android'){
                       cb(true)
                     }
                   else{
                       cb(false)
                     }*/
                });
        }
    }

    RegisterMobileNumberCheck = () => {
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
