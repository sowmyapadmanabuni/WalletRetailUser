import React,{Component} from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import Button from '../../components/common/Button';
import CardView from 'react-native-cardview';
import base from '../../base';
import Icon from 'react-native-vector-icons/FontAwesome';

class PayMerchant extends Component{
    constructor(props){
        super(props);
        this.state = { showData: false, showProfile: false, editProfile: false }
    }


render(){
    const { } = this.props;
        console.log("payMerchant.......",this.props)
        return (
            <View>
                    <View style={{ margin: '5%', padding: '5%', borderColor: base.theme.colors.grey, borderWidth: 1, borderRadius: 5 }}>
                <TouchableOpacity onPress={() => this.setState({ showData: true })}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <View style={styles.profileButtonSytle} >
                                    <Text style={{ color: "white", fontWeight: 'bold' }}>A</Text>
                                </View>
                            </View>
                            <View style={{ flex: 2 }}>
                                <Text style={{ fontWeight: 'bold' }}>FirstName</Text>
                                <Text>+91 9490791523</Text>
                            </View>
                        </View>
                        </TouchableOpacity>
                        {
                            (this.state.showData) ?
                                <View style={{ marginTop: '10%' }}>

                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 0.2 }}>
                                            <Image
                                                source={require('../../icons/my_profile.png')}
                                            />
                                        </View>
                                        <View style={{ flex: 1 }}>

                                            <TouchableOpacity onPress={() => this.setState({ showProfile: true, showData: false })}>
                                                <View style={{ flexDirection: "row" }}>
                                                    <View>
                                                        <Text style={{ fontSize: 16 }}>My Profile</Text>
                                                    </View>
                                                    <View style={{ alignItems: 'flex-end', flex: 1 }}>
                                                        <Image
                                                            style={{ transform: [{ rotate: '90deg' }], width: 15, height: 15 }}
                                                            source={require('../../icons/images.png')} />
                                                    </View>
                                                </View>
                                            </TouchableOpacity>

                                            <View
                                                style={{
                                                    borderBottomColor: 'grey',
                                                    borderBottomWidth: 0.5,
                                                    flex: 0.5
                                                }}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                                        <View style={{ flex: 0.2 }}>
                                            <Image
                                                // style={{ marginTop: '5%', marginLeft: '10%' }}
                                                source={require('../../icons/statements.png')}
                                            />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <View >
                                                    <Text style={{ fontSize: 16 }}>Statements</Text>
                                                </View>
                                                <View style={{ alignItems: 'flex-end', flex: 1 }}>
                                                    <Image
                                                        style={{ transform: [{ rotate: '90deg' }], width: 15, height: 15 }}
                                                        source={require('../../icons/images.png')} />
                                                </View>
                                            </View>
                                            <View
                                                style={{
                                                    borderBottomColor: 'grey',
                                                    borderBottomWidth: 0.5,
                                                    flex: 0.5
                                                }}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                                        <View style={{ flex: 0.2 }}>
                                            <Image
                                                style={{ marginTop: '5%', marginLeft: '10%' }}
                                                source={require('../../icons/bank_details.png')}
                                            />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <View>
                                                    <Text style={{ fontSize: 16 }}>Bank Details</Text>
                                                </View>
                                                <View style={{ alignItems: 'flex-end', flex: 1 }}>
                                                    <Image
                                                        style={{ transform: [{ rotate: '90deg' }], width: 15, height: 15 }}
                                                        source={require('../../icons/images.png')} />
                                                </View>
                                            </View>
                                            <View
                                                style={{
                                                    borderBottomColor: 'grey',
                                                    borderBottomWidth: 0.5,
                                                    flex: 0.5
                                                }}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                                        <View style={{ flex: 0.2 }}>
                                            <Image
                                                style={{ marginTop: '5%', marginLeft: '10%' }}
                                                source={require('../../icons/payment_methods.png')}
                                            />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View >
                                                    <Text style={{ fontSize: 16 }}>Payment Methods</Text>
                                                </View>
                                                <View style={{ alignItems: 'flex-end', flex: 1 }}>
                                                    <Image
                                                        style={{ transform: [{ rotate: '90deg' }], width: 15, height: 15 }}
                                                        source={require('../../icons/images.png')} />
                                                </View>
                                            </View>
                                            <View
                                                style={{
                                                    borderBottomColor: 'grey',
                                                    borderBottomWidth: 0.5,
                                                    flex: 0.5
                                                }}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                                        <View style={{ flex: 0.2 }}>
                                            <Image
                                                style={{ marginTop: '5%', marginLeft: '10%' }}
                                                source={require('../../icons/change_passcode.png')}
                                            />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                           <View style={{flexDirection:"row"}}>
                                           <View >
                                                <Text style={{ fontSize: 16 }}>Create/Change Password</Text>
                                            </View>
                                            <View style={{ alignItems: 'flex-end', flex: 1 }}>
                                                    <Image
                                                        style={{ transform: [{ rotate: '90deg' }], width: 15, height: 15 }}
                                                        source={require('../../icons/images.png')} />
                                                </View>
                                               </View>
                                            <View
                                                style={{
                                                    borderBottomColor: 'grey',
                                                    borderBottomWidth: 0.5,
                                                    flex: 0.5
                                                }}
                                            />
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={() => this.setState({ showData: false })}>
                                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '5%' }}>
                                            <Image
                                                style={{ width: 30, height: 30 }}
                                                source={require('../../icons/images.png')}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                :
                                null
                        }
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
                                            <TouchableOpacity onPress={() => this.setState({ editProfile: true, showData: false, showProfile: false })}>
                                                <Image
                                                    style={{ width:20,height:20,marginLeft:5}}
                                                    source={require('../../icons/edit.png')}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity onPress={() => this.setState({ editProfile: false, showData: false, showProfile: false })}>
                                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                <Image
                                                    style={{ width: 30, height: 30 }}
                                                    source={require('../../icons/images.png')}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    </View> :
                                    null
                            }
                        </View>
                        <View>
                            {
                                (this.state.editProfile && !this.state.showData && !this.state.showProfile) ?
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
                                            <TouchableOpacity onPress={() => this.setState({ showProfile: true })} >
                                                <Text>CANCEL</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={()=>this.saveProfile}>
                                                <Text style={{ color: 'orange' }}>SAVE</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View> :
                                    null
                            }
                        </View>
                    </View>

                
                <View>
                    <CardView style={styles.cardStyle}
                        cardElevation={3}
                        cardMaxElevation={3}
                        cornerRadius={2}><Text style={{ color: base.theme.colors.white, fontStyle: 'bold' }}>

                            Reward Cash Back</Text>
                        <Text> </Text>

                    </CardView>

                    {/* <View>     
                <Button style ={styles.buttonStyle}
                
                textStyle={{color: base.theme.colors.black}}
                shadow
                Image = {(require('../../icons/pay.png'))}
                title =  "Make Payment"
                onPress={() => {
                    this.props.navigation.navigate('QR');    
                }}  />
                  
                
                </View> */}
                    <CardView style={{ marginLeft: '20%', marginRight: '20%', height: '15%', marginTop: '50%' }}
                        cardElevation={3}
                        cardMaxElevation={3}
                        cornerRadius={7}
                    >


                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                style={{ marginTop: '5%', marginLeft: '10%' }}
                                source={require('../../icons/pay.png')}
                            />
                            <Button style={styles.buttonView}
                                onPress={() => { this.props.navigation.navigate('QR') }}
                                textStyle={{ color: base.theme.colors.black }}
                                title="Make Payment " />
                        </View>

                    </CardView>


                </View>
            </View>
        )
    };
}


export const styles = StyleSheet.create({
    buttonStyle: {
        position: 'absolute',
        width: '60%',
        height: '40%',
        borderRadius: 70,
        marginTop :'80%',
        marginLeft:'20%',
        backgroundColor:'white',  
      },
      cardStyle :{
        marginTop:40,
        marginLeft:30,
        marginRight:30,  
        backgroundColor:base.theme.colors.orange
      },
      buttonView:{
          backgroundColor :'white',width:'60%',marginLeft:'10%',marginTop:'1%',flexDirection:'row'
    },profileButtonSytle:{
        width: 50, height: 50, backgroundColor: base.theme.colors.grey, borderRadius: 25, alignItems: 'center', justifyContent: 'center'
    }

})


export default PayMerchant;