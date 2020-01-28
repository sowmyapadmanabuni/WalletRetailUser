import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, DeviceEventEmitter} from 'react-native';
import { connect } from 'react-redux';
import { Update, ShowProfile } from "../../actions";
import ProgressLoader from '../../components/common/ProgressLoader'

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
            visible: true

        }
    }
    async updateProfile() {
        var accountData = {
            firstName: this.state.FirstName,
            lastName: this.state.LastName,
            mobileNumber: '+91'+this.props.OTPReducer.MobileNumber,
            email: this.state.Email,
            registrationId:this.props.ShowProfileReducer.list.data[0].registrationId

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
            visible: false,
            FirstName: (resp && resp.data[0]) ? resp.data[0].firstName : '',
            LastName: (resp && resp.data[0]) ? resp.data[0].lastName : '',
            Email: (resp && resp.data[0]) ? resp.data[0].email : '',
            MobileNumber: (resp && resp.data[0]) ? resp.data[0].mobileNumber : '',
        })
    }

    render() {
        console.log("PROFILE DATA IN PROFILE#####",this.props)
        var ShowProfileReducer = (this.props.ShowProfileReducer.list && this.props.ShowProfileReducer.list.data[0]) ? this.props.ShowProfileReducer.list.data[0] : ''
        return (
            <View>

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
                                {/*<View
                                    style={{
                                        borderBottomColor: 'grey',
                                        borderBottomWidth: 0.5,
                                        marginTop: 5
                                    }}
                                />
                                <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 16 }}>Alternate Mobile No</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: 16 }}>{ShowProfileReducer.mobileNumber}</Text>
                                    </View>
                                </View>*/}
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
                            <View style={{ marginTop: '10%' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Edit Profile</Text>
                                <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 16 }}>First Name</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <TextInput
                                            // style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                            onChangeText={text => this.setState({ FirstName: text })}
                                            value={this.state.FirstName}
                                            //   numberOfLines={2}
                                            style={{ fontSize: 16 }}
                                            // placeholder='First Name'
                                        />
                                    </View>
                                </View>
                                <View
                                    style={{
                                        borderBottomColor: 'grey',
                                        borderBottomWidth: 0.5,
                                    }}
                                />
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 16 }}>Last Name</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <TextInput
                                            // style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                            onChangeText={text => this.setState({ LastName: text })}
                                            value={this.state.LastName}
                                            style={{ fontSize: 16 }}
                                            // placeholder='Last Name'
                                        />
                                    </View>
                                </View>
                                <View
                                    style={{
                                        borderBottomColor: 'grey',
                                        borderBottomWidth: 0.5,
                                    }}
                                />
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 16 }}>Mobile No</Text>
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
                                {/*<View
                                    style={{
                                        borderBottomColor: 'grey',
                                        borderBottomWidth: 0.5,
                                    }}
                                />
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 16 }}>Alternate Mobile No</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <TextInput
                                            style={{ fontSize: 16 }}
                                            onChangeText={text => this.setState({ MobileNumber: text })}
                                            value={this.state.MobileNumber}
                                            // placeholder='Alternate Mobile No'
                                        />
                                    </View>
                                </View>*/}
                                <View
                                    style={{
                                        borderBottomColor: 'grey',
                                        borderBottomWidth: 0.5,
                                    }}
                                />
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 16 }}>Email ID</Text>
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
                                    }}
                                />
                                <View style={{ alignItems: 'center', justifyContent: 'space-around', marginTop: '10%', flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => [this.setState({ showProfile: true, editProfile: false }), this.showProfile()]
                                    } >
                                        <Text>CANCEL</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => [this.updateProfile(), this.setState({ showProfile: true, editProfile: false ,visible:true})]}>
                                        <Text style={{ color: 'orange' }}>SAVE</Text>
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
