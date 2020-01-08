import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput,DeviceEventEmitter } from 'react-native';


class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {  showProfile: true, editProfile: false }
    }

    render() {
        
        console.log("profile....................", this.state)
        return (
            <View>
             
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
                                        <Text style={{ fontSize: 16 }}>Abcd</Text>
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
                                        <Text style={{ fontSize: 16 }}>+91 9876543210</Text>
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
                                        <Text style={{ fontSize: 16 }}>Alternate Mobile No</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: 16 }}>+91 9876543210</Text>
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
                                        <Text style={{ fontSize: 16 }}>abcd@gmail.com</Text>
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
                                        <Text style={{ fontWeight: 'bold', fontWeight: 'bold', fontSize: 18 }}>Edit Profile</Text>
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
                        (this.state.editProfile ) ?
                            <View style={{ marginTop: '10%' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Edit Profile</Text>
                                <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 16 }}>First Name</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <TextInput
                                            // style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                            // onChangeText={text => onChangeText(text)}
                                            value='abcdefghij'
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
                                            // onChangeText={text => onChangeText(text)}
                                            value='bjhgjgjg'
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
                                            // onChangeText={text => onChangeText(text)}
                                            value='+919876543210'
                                        // placeholder='Mobile No'
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
                                        <Text style={{ fontSize: 16 }}>Alternate Mobile No</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <TextInput
                                            style={{ fontSize: 16 }}
                                            // onChangeText={text => onChangeText(text)}
                                            value='+919876543210'
                                        // placeholder='Alternate Mobile No'
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
                                        <Text style={{ fontSize: 16 }}>Email ID</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <TextInput
                                            style={{ fontSize: 16 }}
                                            // onChangeText={text => onChangeText(text)}
                                            value='abcd@gmail.com'
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
                                    <TouchableOpacity onPress={() => this.setState({ showProfile: true ,editProfile:false})} >
                                        <Text>CANCEL</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.saveProfile}>
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


export default Profile;