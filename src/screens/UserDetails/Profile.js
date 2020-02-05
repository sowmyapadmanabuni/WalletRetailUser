import React, { Component } from 'react';
import {Text, View, Image, TouchableOpacity, TextInput, DeviceEventEmitter, Alert} from 'react-native';
import { connect } from 'react-redux';
import { Update, ShowProfile } from "../../actions";
import ProgressLoader from '../../components/common/ProgressLoader'
import base from "../../base";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from "react-native-simple-radio-button";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import Dropdown from "react-native-material-dropdown/src/components/dropdown";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {TextField} from "react-native-material-textfield";


class Profile extends Component {

    constructor(props) {
        super(props);
        this.showProfile()
        this.state = {
            showProfile: true,
            editProfile: false,
            FirstName: '',
            LastName: '',
            Email: '',
            MobileNumber: '',
            refresh: false,
            visible: true,
            genderProps: [{label: 'Male', value: 0},
                {label: 'Female', value: 1}],
            isGenderSelected:0,
            dateOfBirth:new Date(moment().subtract(18, 'years').calendar()),
            todayDate:moment().format('DD-MM-YYYY'),
        }
    }

    profileValidations = (title, message) => {

        if (base.utils.validate.isBlank(this.state.FirstName)) {
            Alert.alert("Please Enter First name", message)
        } else if (!base.utils.validate.alphabetValidation(this.state.FirstName)) {
            Alert.alert("First name should not contain special characters",message)
        } else if (this.state.FirstName.length < 1) {
            Alert.alert("First name should be minimum 1 character",message)
        } else if (base.utils.validate.isBlank(this.state.LastName)) {
            Alert.alert("Please Enter Last name", message)
        } else if (!base.utils.validate.alphabetValidation(this.state.LastName)) {
            Alert.alert("Last name should not contain special characters",message)
        } else if (this.state.LastName.length < 1) {
            Alert.alert("Last name should be minimum 1 character",message)
        } /*else if (base.utils.validate.isBlank(this.state.mobile)) {
            Alert.alert("Please Enter Primary mobile number",message)
        } else if (this.state.mobile.length < 10) {
            Alert.alert("Please enter a valid (10 digit) Mobile no",message)
        }*/
        else if (this.state.isGenderSelected==2) {
            Alert.alert("Gender is Mandatory",message)
        } else if (base.utils.validate.isBlank(this.state.Email)) {
            Alert.alert("Email cannot be empty",message)
        } else if (!base.utils.validate.validateEmailId(this.state.Email)) {
            Alert.alert("Please Enter a Valid Email Id",message)
        }
        else {
            this.setState({ showProfile: true, editProfile: false ,visible:true})
            this.updateProfile()
        }



    };
    async updateProfile() {

        var accountData = {
            firstName: this.state.FirstName,
            lastName: this.state.LastName,
            mobileNumber: '+91'+this.props.OTPReducer.MobileNumber,
            email: this.state.Email,
            registrationId:this.props.ShowProfileReducer.list.data[0].registrationId,
            gender:this.state.isGenderSelected===0?"Male":"Female",
            DOB:moment(this.state.dateOfBirth,'DD-MM-YYYY').format('YYYY-MM-DD'),
            // isMarried:this.state.isMarriedSelected===0?"Yes":"No",
            // noOfKids:this.state.selectedChild,
            // anniversaryDate:moment(this.state.anniversaryDate,'DD-MM-YYYY').format('YYYY-MM-DD')
        };
        console.log("updateProfile@@registrationID", accountData,this.props.ShowProfileReducer.list.data[0].registrationId)
        let resp = await this.props.Update(accountData, this.props.navigation)
        this.setState({visible:false})
        DeviceEventEmitter.emit('refreshUserName', { status: true })
        this.showProfile()
    }
    async showProfile() {
        console.log("componentDidMount.....start")
        let resp = await this.props.ShowProfile(this.props.OTPReducer.MobileNumber);
        console.log("resp////", resp, this.props.ShowProfileReducer)
        // this.setState ( {
        //     FirstName: (this.props.ShowProfileReducer.list && this.props.ShowProfileReducer.list.data[0]) ? this.props.ShowProfileReducer.list.data[0].firstName : '',
        //     LastName: (this.props.ShowProfileReducer.list && this.props.ShowProfileReducer.list.data[0]) ? this.props.ShowProfileReducer.list.data[0].lastName : '',
        //     Email: (this.props.ShowProfileReducer.list && this.props.ShowProfileReducer.list.data[0]) ? this.props.ShowProfileReducer.list.data[0].email : '',
        //     MobileNumber: (this.props.ShowProfileReducer.list && this.props.ShowProfileReducer.list.data[0]) ? this.props.ShowProfileReducer.list.data[0].mobileNumber : '',
        // })

        this.setState({
            //             dateOfBirth:new Date(moment().subtract(18, 'years').calendar()),
            visible: false,
            FirstName: (resp && resp.data[0]) ? resp.data[0].firstName : '',
            LastName: (resp && resp.data[0]) ? resp.data[0].lastName : '',
            Email: (resp && resp.data[0]) ? resp.data[0].email : '',
            MobileNumber: (resp && resp.data[0]) ? resp.data[0].mobileNumber : '',
            isGenderSelected: (resp && resp.data[0]) ? resp.data[0].gender=='Female' ?1:0 : 2 ,//
            dateOfBirth:  (resp && resp.data[0]) ? moment(resp.data[0].DOB,'YYYY-MM-DD').format('DD-MM-YYYY') :'', //"2002-01-16"

        })
    }

    render() {
        console.log("PROFILE DATA IN PROFILE#####",this.props)
        var ShowProfileReducer = (this.props.ShowProfileReducer.list && this.props.ShowProfileReducer.list.data[0]) ? this.props.ShowProfileReducer.list.data[0] : ''
        return (
            <View style={{marginTop:this.state.editProfile?-15:0}}>

                <ProgressLoader visible={this.state.visible}/>
                <View>
                    {
                        (this.state.showProfile) ?
                            <View style={{ marginTop: '10%' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                    My Profile</Text>
                                <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 16 }}>Name</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: 16 }}>{ShowProfileReducer.firstName}</Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        borderBottomColor: 'grey',
                                        borderBottomWidth: 0.5,
                                        marginTop: 5
                                    }}
                                />
                                <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 16 }}>Mobile No</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: 16 }}>{ShowProfileReducer.mobileNumber}</Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        borderBottomColor: 'grey',
                                        borderBottomWidth: 0.5,
                                        marginTop: 5
                                    }}
                                />
                                <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 16 }}>Gender</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: 16 }}>{ShowProfileReducer.gender}</Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        borderBottomColor: 'grey',
                                        borderBottomWidth: 0.5,
                                        marginTop: 5
                                    }}
                                />
                                <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 16 }}>DOB</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: 16 }}>{ShowProfileReducer.DOB}</Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        borderBottomColor: 'grey',
                                        borderBottomWidth: 0.5,
                                        marginTop: 5
                                    }}
                                />
                                <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 16 }}>Email Id</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: 16 }}>{ShowProfileReducer.email}</Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        borderBottomColor: 'grey',
                                        borderBottomWidth: 0.5,
                                        marginTop: 5
                                    }}
                                />
                                {/*<View style={{ flexDirection: 'row', marginTop: '10%' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 16 }}>Married</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: 16 }}>{ShowProfileReducer.isMarried}</Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        borderBottomColor: 'grey',
                                        borderBottomWidth: 0.5,
                                        marginTop: 5
                                    }}
                                />
                                <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 16 }}>Anniversary Date</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: 16 }}>{ShowProfileReducer.isMarried}</Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        borderBottomColor: 'grey',
                                        borderBottomWidth: 0.5,
                                        marginTop: 5
                                    }}
                                />
                                <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 16 }}>Married</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: 16 }}>{ShowProfileReducer.isMarried}</Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        borderBottomColor: 'grey',
                                        borderBottomWidth: 0.5,
                                        marginTop: 5
                                    }}
                                />*/}
                                <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                                    <View>
                                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Edit Profile</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.setState({ editProfile: true, showProfile: false })}>
                                        <Image
                                            style={{ width: 20, height: 20, marginLeft: 5 }}
                                            source={require('../../icons/edit.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                                {/* <TouchableOpacity onPress={() => this.setState({ editProfile: false, showProfile: false })}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Image
                                            style={{ width: 30, height: 30 }}
                                            source={require('../../icons/images.png')}
                                        />
                                    </View>
                                </TouchableOpacity> */}
                            </View> :
                            null
                    }
                </View>
                <View>
                    {
                        (this.state.editProfile) ?
                            <View style={{ marginTop: '8%' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Edit Profile</Text>
                                <View style={{ flexDirection: 'row', marginTop: '8%'}}>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 16 ,height:30}}>First Name</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <TextInput
                                            // style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                            //  onChangeText={text => this.setState({ FirstName: text })}
                                            onChangeText={(value) =>{
                                                let num = value.replace(/^[a-zA-Z ]+$/g,  '');
                                                if (isNaN(num)) {
                                                    // Its not a number
                                                } else {
                                                    this.setState({FirstName:value})
                                                }}}
                                            value={this.state.FirstName}
                                            //   numberOfLines={2}
                                            style={{ fontSize: 16 }}
                                            // placeholder='First Name'
                                            maxLength={30}

                                        />
                                    </View>
                                </View>
                                <View
                                    style={{
                                        borderBottomColor: 'grey',
                                        borderBottomWidth: 0.5,
                                        paddingBottom:Platform.OS==='ios'?'2%':0

                                    }}
                                />
                                <View style={{ flexDirection: 'row',marginTop:Platform.OS==='ios'?'9%':0  }}>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 16 ,height:30}}>Last Name</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <TextInput
                                            // style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                            //onChangeText={text => this.setState({ LastName: text })}
                                            onChangeText={(value) =>{
                                                let num = value.replace(/^[a-zA-Z ]+$/g,  '');
                                                if (isNaN(num)) {
                                                    // Its not a number
                                                } else {
                                                    this.setState({LastName:value})
                                                }}}
                                            value={this.state.LastName}
                                            style={{ fontSize: 16 }}
                                            maxLength={30}

                                            // placeholder='Last Name'
                                        />
                                    </View>
                                </View>
                                <View
                                    style={{
                                        borderBottomColor: 'grey',
                                        borderBottomWidth: 0.5,
                                        paddingBottom:Platform.OS==='ios'?'2%':0

                                    }}
                                />
                                <View style={{ flexDirection: 'row',marginTop:Platform.OS==='ios'?'9%':0  }}>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 16 ,height:30}}>Mobile No</Text>
                                    </View>
                                    <View style={{ alignItems: 'flex-end', flex: 1 }}>
                                        <TextInput
                                            style={{ fontSize: 16 }}
                                            onChangeText={text => this.setState({ MobileNumber: text })}
                                            value={this.state.MobileNumber}
                                            // placeholder='Mobile No'
                                            editable={false}
                                        />
                                    </View>
                                </View>
                                <View
                                    style={{
                                        borderBottomColor: 'grey',
                                        borderBottomWidth: 0.5,
                                        paddingBottom:Platform.OS==='ios'?'2%':0

                                    }}
                                />
                                <View style={{
                                    flexDirection: 'row',
                                    height: '7%',
                                    width: '90%',
                                    justifyContent: 'flex-start',
                                    // marginTop:15,
                                    // marginBottom:10
                                    marginTop:Platform.OS==='ios'?'9%':'5%'
                                }}>
                                    <Text style={{fontSize: 16, color: base.theme.colors.black,width:'50%',height:30}}>Gender</Text>
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
                                                        buttonWrapStyle={{marginLeft:20}}
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
                                <View
                                    style={{
                                        borderBottomColor: 'grey',
                                        borderBottomWidth: 0.5,
                                        // paddingBottom:Platform.OS==='ios'?'1%':0

                                    }}
                                />
                                <View style={{width:'100%',flexDirection:'row',alignItems: 'center',marginTop:Platform.OS==='ios'?'9%':'3%'}}>
                                    <Text style={{color:base.theme.colors.black,width:'60%',}}>DOB</Text>
                                    <DatePicker
                                        style={{width: '40%',}}
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
                                <View
                                    style={{
                                        borderBottomColor: 'grey',
                                        borderBottomWidth: 0.5,
                                        // paddingBottom:Platform.OS==='ios'?'2%':0

                                    }}
                                />

                                <View style={{ flexDirection: 'row', marginTop:Platform.OS==='ios'?'9%':0}}>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 16 ,height:30}}>Email ID</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <TextInput
                                            style={{ fontSize: 16 }}
                                            onChangeText={text => this.setState({ Email: text })}
                                            value={this.state.Email}
                                            // placeholder='Email ID'
                                        />
                                    </View>
                                </View>
                                <View
                                    style={{
                                        borderBottomColor: 'grey',
                                        borderBottomWidth: 0.5,
                                        paddingBottom:Platform.OS==='ios'?'2%':0

                                    }}
                                />

                                <View style={{ alignItems: 'center', justifyContent: 'space-around', marginTop: '4%', flexDirection: 'row' ,}}>
                                    <TouchableOpacity onPress={() => [this.setState({ showProfile: true, editProfile: false }), this.showProfile()]
                                    } >
                                        <Text style={{height:30}}>CANCEL</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => [this.profileValidations()]}>
                                        <Text style={{ color: 'orange' ,height:30}}>SAVE</Text>
                                    </TouchableOpacity>
                                </View>
                                {/* <TouchableOpacity onPress={() => this.setState({ editProfile: false, showProfile: false })}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Image
                                            style={{ width: 30, height: 30 }}
                                            source={require('../../icons/images.png')}
                                        />
                                    </View>
                                </TouchableOpacity> */}
                            </View> :
                            null
                    }
                </View>
            </View>
        )
    }

};

const mapStateToProps = state => {
    return {
        AccountUpdateReducer: state.AccountUpdateReducer,
        ShowProfileReducer: state.ShowProfileReducer,
        OTPReducer:state.OTPReducer,
        SignUpReducer: state.SignUpReducer,
    };
};

// const mapDispatchToProps = (dispatch, ownProps) => {
//     console.log("@AddService.mapDispatchToProps...state.ownProps=");
//     const Update = require('../../actions/SignUpAction')

//     return {
//         Update: (accountData) => Update.Update(dispatch, accountData),
//     };

//   }
export default connect(
    mapStateToProps, { Update, ShowProfile }
)(Profile);
