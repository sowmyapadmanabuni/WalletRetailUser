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
    ImageBackground,
    BackHandler, Platform
} from 'react-native';
import Button from '../../components/common/Button';
import CardView from 'react-native-cardview';
import base from '../../base';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/FontAwesome';

class TransactionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            date2: '',
            maxDate:'',
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    }

    componentDidMount() {
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        let day = new Date().getDate();
        console.log("componentDidMount>>>date: ", year,month,day)
        this.d2 = day.toString()+"-"+month.toString()+"-"+year.toString()
        this.setState({
            maxDate : day.toString()+"-"+month.toString()+"-"+year.toString()
        })
        this.BackHandler =  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

    }

    handleBackButtonClick() {
       this.props.navigation.navigate('PayMerchant')
        return true ;

    }
    componentWillUnmount() {
        this.BackHandler.remove();
    }


    checkSecondDate(d){

        console.log("checkSecondDate>>>date: ",d, typeof (d));
        //this.setState({ date2: date })
        let newD1, day1, month1, year1, newD2, day2, month2, year2
        newD2 = d.split(' ');
        day2 = parseInt(newD2[0]);
        month2 = parseInt(new Date(Date.parse(newD2[1] +" 1, 2012")).getMonth()+1);
        year2 = parseInt(newD2[2]);

        //console.log("checkSecondDate>>>d: ", newD2, month, this.state);
        console.log("checkSecondDate>>>d: ",day, month, year)

        if(this.state.date !== ''){
            newD1 = this.state.d.split(' ');
            day1 = parseInt(newD1[0]);
            month1 = parseInt(new Date(Date.parse(newD1[1] +" 1, 2012")).getMonth()+1);
            year1 = parseInt(newD1[2]);
            if (year2 === year1 || year2 > year1){
                if (month2 === month1 || month2 > month1){
                    if (day2 > day1){
                        this.setState({date2 : d})
                    }
                }
            }
            else{
                Alert.alert("Please select a valid date")
            }
        }
    }

    render() {
        console.log("render>>>d2", this.state.maxDate)
        return (
            <View>
                <ImageBackground source={require('../../icons/card.png')} style={{ width: '100%', height: "68%" }} imageStyle={{ borderBottomRightRadius: 30, borderBottomLeftRadius: 30 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ flexDirection: 'row' }}>
                        <Image source={require('../../icons/back_white.png')} style={{ width: 10, height: 20, marginTop: '5%', marginLeft: '5%' }} />
                        <Text style={{ marginTop: '5%', marginLeft: '5%', fontWeight: 'bold', fontSize: 16, color: 'white' }}>Statements</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <CardView
                                cardElevation={2}
                                cardMaxElevation={2}
                                cornerRadius={10}
                                marginTop={'20%'}
                                marginLeft={'20%'}
                                padding={15}
                            >
                                <View>
                                    <View style={{ flexDirection: "row"}}>
                                        <Text style={{ color: 'orange' }}>From Date</Text>
                                        <DatePicker
                                            style={{ width: 200 }}
                                            date={this.state.date}
                                            mode="date"
                                            placeholder="select date"
                                            format="DD MMM YYYY"
                                            // minDate="2016-05-01"
                                            // maxDate="2016-06-01"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            // iconComponent={
                                            //   <Icon
                                            //     size={30}
                                            //     color='#333333'
                                            //     name="chevron-left"
                                            //     type="font-awesome"
                                            //   />
                                            // }

                                            customStyles={{
                                                dateIcon: {
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: 0,
                                                    marginLeft: 30
                                                },
                                                dateInput: {
                                                    left: '-300%',
                                                    marginBottom: -40,
                                                    borderColor: 'white'
                                                }
                                                // ... You can check the source to find the other keys.
                                            }}
                                            onDateChange={(date) => { this.setState({ date: date }) }}
                                        />
                                    </View>
                                </View>
                            </CardView>
                        </View>

                        <View style={{ marginTop: '15%', marginLeft: '5%', marginRight: '5%' }}>
                            <Text>...</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <CardView
                                cardElevation={2}
                                cardMaxElevation={2}
                                cornerRadius={10}
                                marginTop={'20%'}
                                marginRight={'20%'}
                                padding={15}
                            >
                                <View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ color: 'orange' }}>To Date</Text>
                                        <DatePicker
                                            style={{ width: 200 }}
                                            date={this.state.date2}
                                            mode="date"
                                            placeholder="select date"
                                            format="DD MMM YYYY"
                                            // minDate="2016-05-01"
                                            //maxDate="2016-06-01"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            // iconComponent={
                                            //   <Icon
                                            //     size={30}
                                            //     color='#333333'
                                            //     name="chevron-left"
                                            //     type="font-awesome"
                                            //   />
                                            // }

                                            customStyles={{
                                                dateIcon: {
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: 0,
                                                    marginLeft: 45
                                                },
                                                dateInput: {
                                                    left: '-250%',
                                                    marginBottom: -40,
                                                    borderColor: 'white'
                                                }
                                                // ... You can check the source to find the other keys.
                                            }}
                                            //onDateChange={(date) => { this.setState({ date2: date }) }}
                                            onDateChange={(date) => { this.setState({date2 : data}) }}
                                        />
                                    </View>
                                    {/* <Text style={{ textAlign: 'center', marginTop: '5%' }}>{this.state.date2}</Text> */}
                                </View>
                            </CardView>
                        </View>
                    </View>

                </ImageBackground>

                <View style={{ position: 'absolute', width: '90%', marginTop: '45%', alignSelf: 'center', marginBottom: "-15%" }}>

                    <CardView
                        cardElevation={2}
                        cardMaxElevation={2}
                        cornerRadius={10}
                        padding={10}
                    >
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={[
                                { transaction: 'Money Recieved', amount: '₹200', From: 'abcd', date: '01/01/2019' },
                                { transaction: 'Money Recieved', amount: '₹200', From: 'abcd', date: '02/01/2019' },
                                { transaction: 'Money Recieved', amount: '₹200', From: 'abcd', date: '03/01/2019' },
                                { transaction: 'Money Recieved', amount: '₹200', From: 'abcd', date: '04/01/2019' },
                                { transaction: 'Money Recieved', amount: '₹200', From: 'abcd', date: '05/01/2019' },
                                { transaction: 'Money Recieved', amount: '₹200', From: 'abcd', date: '06/01/2019' },
                                { transaction: 'Money Recieved', amount: '₹200', From: 'abcd', date: '07/01/2019' },
                                { transaction: 'Money Recieved', amount: '₹200', From: 'abcd', date: '08/01/2019' },
                            ]}
                            renderItem={({ item }) =>
                                <View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 16 }}>{item.transaction}</Text>
                                        <Text style={{ alignItems: 'flex-end', fontWeight: 'bold', fontSize: 16 }}>+ {item.amount}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ flex: 1, fontSize: 12 }}>From: {item.From}</Text>
                                        <Text style={{ alignItems: 'flex-end', fontSize: 12 }}>{item.date}</Text>
                                    </View>
                                    <View style={{ borderWidth: 0.3, marginTop: '3%', marginBottom: '3%' }}></View>
                                </View>
                            }

                        />
                    </CardView>
                </View>
            </View>
        )
    };
}

export default TransactionDetail;
