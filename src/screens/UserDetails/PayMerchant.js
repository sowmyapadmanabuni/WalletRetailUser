import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput, DeviceEventEmitter, FlatList, ScrollView, ImageBackground } from 'react-native';
import Button from '../../components/common/Button';
import CardView from 'react-native-cardview';
import base from '../../base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import Profile from './Profile';
import Statement from './Statement'
import ChangePassword from './ChangePassword';
import BankDetail from './BankDetail';
import PaymentMethod from './PaymentMethod';

export const UserProfile = (props) => {
    return (

        <View style={{ flexDirection: 'row', paddingTop: '5%' }}>
            <View style={{ flex: 1 }}>
                <View style={styles.profileButtonSytle} >
                    <Text style={{ fontWeight: 'bold' }}>A</Text>
                </View>
            </View>
            <View style={{ flex: 2 }}>
                <Text style={{ fontWeight: 'bold' }}>FirstName</Text>
                <Text>+91 9490791523</Text>
            </View>
        </View>
    );
}
const ViewData = (props) => {
    console.log("@@@props........", props)
    return (
        <View style={{ marginTop: '10%' }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 0.2 }}>
                    <Image
                        source={require('../../icons/my_profile.png')}
                    />
                </View>
                <View style={{ flex: 1 }}>

                    <TouchableOpacity onPress={() => {
                        props.showProfile()
                        // this.setState({ showProfile: true ,profile:!this.state.profile}), this.props.onPress(false, 'Profile')
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
                        // style={{ marginTop: '5%', marginLeft: '10%' }}
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
                        style={{ marginTop: '5%', marginLeft: '10%' }}
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

            </View>
            <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                <View style={{ flex: 0.2 }}>
                    <Image
                        style={{ marginTop: '5%', marginLeft: '10%' }}
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
            </View>
            <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                <View style={{ flex: 0.2 }}>
                    <Image
                        style={{ marginTop: '5%', marginLeft: '10%' }}
                        source={require('../../icons/change_passcode.png')}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity>
                        <View style={{ flexDirection: "row" }}>
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
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

}
class PayMerchant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showData: false,
            isProfileShown: false,
            statementShow: false,
            flag: false
        }
    }

    render() {
        const { } = this.props;
        console.log("payMerchant.......", this.props)
        return (
            <ScrollView>
                <View style={{ marginTop: '-4%', marginBottom: '2%' }}>
                    <CardView style={{ flex: 1 }}
                        cardElevation={5}
                        cardMaxElevation={5}
                        cornerRadius={25}
                        padding={10}
                    >
                        {/* <View style={{ margin: '5%', padding: '5%', borderColor: base.theme.colors.grey, borderWidth: 1, borderRadius: 5 ,borderBottomLeftRadius:20,borderBottomRightRadius:20}}> */}
                        <TouchableOpacity onPress={() => {
                            this.setState({ showData: true, flag: true })
                        }}>
                            <UserProfile />
                        </TouchableOpacity>
                        <View>
                            {
                                ((!this.state.isProfileShown || !this.state.statementShow) && this.state.showData) ?
                                    <ViewData navigation={this.props.navigation}
                                        showProfile={() => { this.setState({ isProfileShown: true, showData: false }) }}
                                        showStatement={() => { this.setState({ statementShow: true, showData: false }) }} /> :
                                    (this.state.isProfileShown) ?
                                        <Profile /> : (this.state.statementShow) ? this.props.navigation.navigate('Statement') :
                                            null
                            }
                        </View>
                        <View>

                            {
                                (this.state.flag) ?
                                    <TouchableOpacity onPress={() => {
                                        this.setState({ showData: false, isProfileShown: false, statementShow: false, flag: false })
                                    }}>
                                        <View style={{ alignItems: 'center', }}>

                                            <Image
                                                style={{ width: 25, height: 25, position: 'absolute' ,bottom:-13}}
                                                source={require('../../icons/images.png')}
                                            />

                                            <Image
                                                style={{ width: 80, height: 80, marginBottom: '-11%' }}
                                                source={require('../../icons/semicircle.png')}
                                            />
                                        </View>
                                    </TouchableOpacity> :
                                    null
                            }
                        </View>
                    </CardView>
                </View>
                {/* </View> */}
                <CardView style={{ backgroundColor: base.theme.colors.orange, marginLeft: '10%', marginRight: '10%', marginTop: '5%' }}
                    cardElevation={3}
                    cardMaxElevation={3}
                    cornerRadius={10}>
                    <ImageBackground source={require('../../icons/card.png')} style={{ width: null, flex: 1 }}>
                        <Text style={{ color: 'white', margin: '5%' }}>Reward Cash Back</Text>
                        <Text style={{ color: 'white', margin: '5%', fontSize: 24 }}>₹ 20,000</Text>
                    </ImageBackground>
                </CardView>
                <CardView style={{ marginLeft: '20%', marginRight: '20%', height: '15%', marginTop: '5%', flex: 1 }}
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
                <View style={{ flexDirection: 'row', marginLeft: '3%', marginRight: '3%', marginTop: '10%' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: 'orange', fontSize: 16 }}>Recent transaction</Text>
                    </View>
                    <TouchableOpacity style={{ alignItems: 'flex-end', flex: 1, height: 20 }}
                        onPress={() => {
                            console.log("onpress................")
                            this.props.navigation.navigate('TransactionDetail')
                        }}>
                        <Text style={{ color: 'orange', fontSize: 16 }}>More</Text>
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
                            <View style={{ borderWidth: 0.3, marginTop: '3%' }}></View>
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

})
// const mapStateToProps = state => {
//     return {
//         SignUpReducer: state.SignUpReducer,
//     };
// };
// export default connect(
//     mapStateToProps,
// )(PayMerchant);
export default PayMerchant;