import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    DeviceEventEmitter,
    FlatList,
    ScrollView,
    ImageBackground,
    ToastAndroid,
    Platform
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Button from '../../components/common/Button';
import CardView from 'react-native-cardview';
import base from '../../base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import Profile from './Profile';
import Statement from './Statement'
//import ChangePassword from './ChangePassword';
//import BankDetail from './BankDetail';
//import PaymentMethod from './PaymentMethod';
//import {GETOTP_SEQUENCE, UPDATE_lOGGEDIN, UPDATE_USER_INFO} from "../../actions/types";
import ProgressLoader from 'rn-progress-loader';
import { BackHandler } from 'react-native';
import axios from "axios";
import api from "../../base/utils/strings";
import { ShowProfile } from "../../actions";

import DefaultOrCustom from "../Authentication/SelectPasscode/DefaultOrCustom";
import Support from "./Support";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const UserProfile = (props) => {
    console.log("props.....", props)
    return (
        <View style={{ flexDirection: 'row', paddingTop: '5%' }}>
            <View style={{ flex: 1 }}>
                <View style={styles.profileButtonSytle} >
                    <Text style={{ fontWeight: 'bold' }}>{props.firstName[0]}</Text>
                </View>
            </View>
            <View style={{ flex: 4 }}>
                <Text style={{ fontWeight: 'bold' }}>{props.firstName}</Text>
                <Text>+91 {props.mobileNumber}</Text>
            </View>
            {/* <TouchableOpacity onPress={props.filter} >
                <Image
                    style={{ width: 25, height: 25, marginRight: '5%' }}
                    source={require('../../icons/filter.png')}
                />
            </TouchableOpacity> */}
        </View>
    );
};


function naviToChangePin(props) {
    console.log("naviToChangePin ", props);
    props.navigation.navigate("DefaultOrCustom", { data: 'change' })
}

const ViewData = (props) => {
    console.log("@@@props........", props)
    return (
        <View style={{ marginTop: '10%' }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 0.2 }}>
                    <Image
                        source={require('../../icons/my_profile.png')}
                        style={{ marginLeft: '10%' }}

                    />
                </View>
                <View style={{ flex: 1 }}>

                    <TouchableOpacity onPress={() => {
                        console.log("PROPS ", props);
                        props.showProfile();
                        // this.setState({ showProfile: true , profile: !this.state.profile });
                        // this.props.onPress(false, 'Profile')
                    }
                    }>
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
                        style={{ marginLeft: '10%' }}
                        source={require('../../icons/statements.png')}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => {
                        props.showStatement()
                    }}>
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
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                <View style={{ flex: 0.2 }}>
                    <Image
                        style={{ marginLeft: '10%' }}
                        source={require('../../icons/group_2352.png')}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => {
                        props.contact()
                    }}>
                        <View style={{ flexDirection: "row" }}>
                            <View >
                                <Text style={{ fontSize: 16 }}>Contact Support</Text>
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
                    </TouchableOpacity>
                </View>
            </View>
            {/* <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                <View style={{ flex: 0.2 }}>
                    <Image
                        style={{ marginLeft: '10%' }}
                        source={require('../../icons/bank_details.png')}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity>

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
                    </TouchableOpacity>
                </View>
            </View> */}
            {/* <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                <View style={{ flex: 0.2 }}>
                    <Image
                        style={{ marginLeft: '10%' }}
                        source={require('../../icons/payment_methods.png')}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity>
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
                    </TouchableOpacity>
                </View>
            </View> */}
            {/*   <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                <View style={{ flex: 0.2 }}>
                    <Image
                        style={{ marginLeft: '10%' }}
                        source={require('../../icons/change_passcode.png')}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={()=>naviToChangePin(props)}>
                        <View style={{ flexDirection: "row" }}>
                            <View >
                                <Text style={{ fontSize: 16 }}>Security</Text>
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
                    </TouchableOpacity>
                </View>
            </View>*/}
        </View>
    )

}
class PayMerchant extends Component {
    constructor(props) {
        super(props);
        this.showProfile()
        this.state = {
            showData: false,
            isProfileShown: false,
            statementShow: false,
            flag: false,
            firstName: '',
            mobileNumber: '',
            reward: 0,
            showContact: false
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }


    async UNSAFE_componentWillMount(){
        // let qr = await base.utils.storage.retrieveData("QR_SCAN");
        // if(qr != null){
        //     try{
        //         this.props.navigation.navigate('Amount',JSON.parse(qr))
        //     }catch(e){
        //         console.log(e)
        //     }
        // }

    }


    async componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        await base.utils.storage.storeData("IS_LOGGED_IN","true")
        let qr = await base.utils.storage.retrieveData("QR_SCAN");
        if(qr != null){
            try{
                this.props.navigation.navigate('Amount',JSON.parse(qr))
            }catch(e){
                console.log(e)
            }
        }
        // this.getDetails()
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    removeBackButton() {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'QR' })],
        });
        this.props.navigation.dispatch(resetAction);
    }

    handleBackButtonClick() {
        //this.props.navigation.goBack(null);
        console.log("this.props.navigation ", this.props.navigation, );
        if(this.state.isProfileShown || this.state.showContact){
            this.setState({showData:false,isProfileShown:false,showContact:false});
        }else{
            if (Platform.OS === 'android') {
                /* ToastAndroid.show('Press again to exit app', ToastAndroid.SHORT);
                 var doubleClick = BackHandler.addEventListener('hardwareBackPress', () => {
                     BackHandler.exitApp()
                 });
                 setTimeout(
                     () => {
                         doubleClick.remove()
                     },
                     1500
                 );*/
                BackHandler.exitApp()
            }
        }

        return true;
    }

    /*getDetails(){
        axios
            .get(
                "http://devapi.oyewallet.com/wallet/api/v1/GetProfileDetailsByMobileNumber/919490791523",
            )
            .then(response => {
                console.log("details>>>RES: ", response.data.data[0].rewardsAvailable);
                this.setState({
                    reward:response.data.data[0].rewardsAvailable
                })
            })
            .catch(error => {
                console.log("GenerateOTP>>>ERROR: ", error, error.message);
                alert(error.message);
            });
    }*/


    async showProfile() {
        let resp = await this.props.ShowProfile(this.props.OTPReducer.MobileNumber);
        console.log("resp firstname", resp)
        if (resp && resp.data[0])
            this.setState({ firstName: resp.data[0].firstName, mobileNumber: resp.data[0].mobileNumber })
    }

    render() {
        const { } = this.props;
        console.log("payMerchant.......", this.props, this.props.ShowProfileReducer.list)
        DeviceEventEmitter.addListener('refreshUserName', event => {
            console.log("refreshUserName....")
            this.showProfile();
        });

        return (
            <ScrollView>

                <CardView style={{ flex: 1, backgroundColor: 'white', marginTop: hp('-2%'), marginBottom: hp('2%'), paddingHorizontal: '4%',paddingTop: '4%' }}
                          cardElevation={5}
                          cardMaxElevation={5}
                          cornerRadius={25}
                >
                    {/* <View style={{ margin: '5%', padding: '5%', borderColor: base.theme.colors.grey, borderWidth: 1, borderRadius: 5 ,borderBottomLeftRadius:20,borderBottomRightRadius:20}}> */}
                    {/* <TouchableOpacity onPress={() => {
                            this.setState({ showData: true, flag: true })
                        }}> */}
                    <UserProfile filter={() => { this.setState({ showData: !this.state.showData, isProfileShown: false, statementShow: false }) }}
                                 firstName={this.state.firstName} mobileNumber={this.props.OTPReducer.MobileNumber} showData={this.state.showData} />
                    {/* </TouchableOpacity> */}
                    <View>
                        {
                            ((!this.state.isProfileShown && !this.state.showContact) && this.state.showData) ?
                                <ViewData navigation={this.props.navigation}

                                          showProfile={() => { this.setState({ isProfileShown: true, statementShow: false }) }}
                                          showStatement={() => { this.setState({ statementShow: true, }) }}
                                          contact={() => { this.setState({ showContact: true, statementShow: false }) }} /> :
                                null
                        }
                    </View>
                    <View>
                        {
                            (this.state.isProfileShown && this.state.showData) ?
                                <Profile /> :
                                null
                        }
                    </View>
                    <View>
                        {
                            (this.state.statementShow) ? this.props.navigation.navigate('TransactionDetail') :
                                null
                        }
                    </View>
                    <View>
                        {
                            (this.state.showData && this.state.showContact) ?
                                <Support /> :
                                null
                        }
                    </View>
                    <View style={{height:50,justifyContent:'flex-end',alignItems: 'center'}}>
                        {

                            <TouchableOpacity  style={{alignItems: 'center',marginBottom:10}}
                                               onPress={() => {
                                                   this.setState({ showData: !this.state.showData, isProfileShown: false, statementShow: false,showContact:false })
                                               }}>
                                {
                                    (this.state.showData) ?
                                        <Image
                                            style={{ width: 25, height: 25, position: 'absolute', bottom: -18 }}
                                            source={require('../../icons/images.png')}
                                        /> :
                                        <Image
                                            style={{ width: 25, height: 25, position: 'absolute', bottom: -13, transform: [{ rotate: '180deg' }] }}
                                            source={require('../../icons/images.png')}
                                        />
                                }
                                <Image
                                    style={{ width: 80, height: 80, marginBottom: '-11%' }}
                                    source={require('../../icons/semicircle.png')}
                                />
                            </TouchableOpacity>
                        }
                    </View>
                </CardView>
                {/* </View> */}
                {
                    (!this.state.showData) ?
                        <View>
                            <CardView style={{ backgroundColor: base.theme.colors.orange, marginLeft: '10%', marginRight: '10%', marginTop: '5%' }}
                                      cardElevation={3}
                                      cardMaxElevation={3}
                                      cornerRadius={10}>
                                <ImageBackground source={require('../../icons/card.png')} style={{ width: null, flex: 1 }} imageStyle={{ borderRadius: 10 }}>
                                    <Text style={{ color: 'white', margin: '5%' }}>Reward Cash Back</Text>

                                    <Text style={{ color: 'white', margin: '5%', fontSize: 24 }}>₹ {this.state.reward}</Text>

                                </ImageBackground>
                            </CardView>
                            <CardView style={{ marginLeft: '20%', marginRight: '20%', height: '15%', marginTop: '8%', flex: 1, backgroundColor: 'white' }}
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
                        :
                        null
                }
                <View style={{ flexDirection: 'row', marginLeft: '3%', marginRight: '3%', marginTop: '10%' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: 'orange', fontSize: 16, height: 30 }}>Recent transaction</Text>
                    </View>
                    <TouchableOpacity style={{ alignItems: 'flex-end', flex: 1, height: 20 }}

                                      onPress={() => {
                                          console.log("onpress................")
                                          this.props.navigation.navigate('TransactionDetail')
                                      }}>

                        <Text style={{ color: 'orange', fontSize: 16, height: 30 }}>More</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    showsHorizontalScrollIndicator={false}

                    data={[
                        { transaction: 'Money Recieved', amount: '₹200', From: 'abcd', date: '01/01/2019' },
                        { transaction: 'Money Recieved', amount: '₹200', From: 'abcd', date: '02/01/2019' },
                        { transaction: 'Money Recieved', amount: '₹200', From: 'abcd', date: '03/01/2019' },
                        { transaction: 'Money Recieved', amount: '₹200', From: 'abcd', date: '04/01/2019' },

                    ]}
                    renderItem={({ item }) =>
                        <View style={{ marginLeft: '3%', marginRight: '3%', marginTop: '3%' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ flex: 1, fontSize: 16 }}>{item.transaction}</Text>
                                <Text style={{ alignItems: 'flex-end', fontSize: 16 }}>+ {item.amount}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ flex: 1, fontSize: 12 }}>From: {item.From}</Text>
                                <Text style={{ alignItems: 'flex-end', fontSize: 12 }}>{item.date}</Text>
                            </View>
                            <View style={{ borderWidth: 0.5, marginTop: '3%' }}></View>
                        </View>
                    }

                />
            </ScrollView>
        )
    };
}

export const styles = StyleSheet.create({
    buttonStyle: {
        position: 'absolute',
        width: '60%',
        height: '40%',
        borderRadius: 70,
        marginTop: '80%',
        marginLeft: '20%',
        backgroundColor: 'white',
    },
    cardStyle: {
        marginTop: 40,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: base.theme.colors.orange
    },
    buttonView: {
        backgroundColor: 'white', width: '60%', marginLeft: '10%', marginTop: '1%', flexDirection: 'row'
    }, profileButtonSytle: {
        width: 50, height: 50, backgroundColor: base.theme.colors.grey, borderRadius: 25, alignItems: 'center', justifyContent: 'center'
    }
});

const mapStateToProps = state => {
    return {
        registrationId: state.UserReducer.registrationId,
        loggedIn: state.UserReducer.loggedIn,
        SignUpReducer: state.SignUpReducer,

        ShowProfileReducer: state.ShowProfileReducer,
        OTPReducer: state.OTPReducer
    };
};

export default connect(
    mapStateToProps, { ShowProfile }
)(PayMerchant);
