import React,{Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity,
    Image,
    Alert,
    Animated,
    PanResponder
} from 'react-native';
//import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import { RadioButton } from 'react-native-paper';
import {connect} from 'react-redux';
import {updateCardType} from '../../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import base from '../../base';
import CardView from 'react-native-cardview';
import { TextInput, } from 'react-native-gesture-handler';
import { GlobalStyle } from '../../components/common/GlobalStyle';
import { CardDStyle } from './CardDSytle';
import colors from "../../base/theme/colors";
import axios from "axios";
import api from "../../base/utils/strings";
import {GETOTP_SEQUENCE} from "../../actions/types";
import Toast from "react-native-simple-toast";

//const colors = ['#5C6BC0', '#009688', '#F44336'];

class CardDetails extends Component{

    constructor(props){
        super(props);
        this.state={
            item:null,
            collapsed : false,

            cardName:'',

            block1: '',
            block2: '',
            block3: '',
            block4: '',
            block5: '',

            month:'',
            year:'',

            cvv:'',

            savedCardBank:[
                {label:'Axis',value:0},
                {label:'Kotal',value:1},
                {label:'Sbi',value:2},
                {label:'Mutthud Finance',value:3},
            ],

            currentSavedCard:"Axis",

            cardType2 : '',
            cardImage : require('../../icons/credit-card.png'),
            CardType:[
                {label:'Credit Card',value:0, isActive:true},
                {label:'Debit Card',value:1, isActive:false},
                {label:'Netbanking',value:2, isActive:false},
                {label:'UPIs',value:3, isActive:false},
            ],
            checked:'Credit Card',

            cardsPan: new Animated.ValueXY(),

            cardsStackedAnim: new Animated.Value( 0 ), // add this statement
            currentIndex: 0, // and this to track card positions

            upiStatus:false,

            bankList:[{
                value: 'Canara',
            }, {
                value: 'SBI',
            }, {
                value: 'Axis',
            },
                {
                    value: 'Kotak',
                }],
            initialCardPos : -1,
            formKey:0,

            d1: "",
            d2: "",
            d3: ""


        };
        this.cardsPanResponder = PanResponder.create( {
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: ( event, gestureState ) => {
                this.state
                    .cardsPan
                    .setValue(
                        {
                            x: gestureState.dx,
                            y: this.state.cardsPan.y
                        }
                    );
            },
            onPanResponderTerminationRequest: () => false,
            onPanResponderRelease: ( event, gestureState ) => {

                // bring the translationX back to 0
                Animated.timing( this.state.cardsPan, {
                    toValue: 0,
                    duration: 300,
                } ).start();
                // will be used to interpolate values in each view
                Animated.timing( this.state.cardsStackedAnim, {
                    toValue: 1,
                    duration: 300,
                } ).start( () => {
                    // reset cardsStackedAnim's value to 0 when animation ends
                    this.state.cardsStackedAnim.setValue( 0 );
                    // increment card position when animation ends
                    this.setState({
                        currentIndex: this.state.currentIndex + 1,
                    });
                } );

            },
        } );
    }

    ComponentHideAndShow = (index,value) =>{
        //this.setState(previousState => ({collapsed: !previousState.collapsed}));
        console.log("value ",value);
        let data = this.state.CardType;
        let i;
        for (i in data){
            if (data[i].label === value)
                data[i].isActive = true
            else
                data[i].isActive = false
        }

        this.setState({ CardType : data })

        // console.log("value ",value);
        // if (value ==="Credit Card" || value === 'Debit Card')
        //     this.setState({collapsed: false});
        // else
        //     this.setState({collapsed: true});
    };

    onSelect = (index, value) => {
        const {updateCardType} = this.props;
        let cardValue = this.state.CardType[index].label;

        // Action here with the value
        updateCardType(cardValue);

        // alert(radioValue); // Pass this value to reducer
    };

    renderCollapsedView =()=>{
        return (
            <CardView
                style={{
                    //backgroundColor: colors.grey,
                    marginRight: '2%',
                    marginLeft: '2%',
                    padding:8
                }}
                cardElevation={3}
                cardMaxElevation={2}
                cornerRadius={5}
            >

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text>
                        Name On Card
                    </Text>
                    <TextInput style={{
                        borderWidth: 1,
                        width: '65%',
                        height: '75%',
                        marginLeft: '5%',
                        borderRadius: 4,
                        borderColor: colors.grey,
                    }}/>
                </View>

                <View style={{marginTop: '3%'}}>
                    <Text>Enter Card Number</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center',}}>

                        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                            <View style={CardDStyle.cardInputViewStyle}>
                                <TextInput style={CardDStyle.cardInputStyle}
                                           value={this.state.block1}
                                           ref={"block1"}
                                           returnKeyType={'next'}
                                           onSubmitEditing={() => {
                                               this.refs.block2.focus()
                                           }}
                                           blurOnSubmit={false}
                                           keyboardType={"number-pad"}
                                           maxLength={4}
                                           placeholder="X X X X"
                                           onChangeText={(num) => {
                                               console.log("block1 ", num);
                                               this.setState({block1: num});
                                               if (num.length === 4) {
                                                   this.refs.block2.focus()
                                               }
                                           }
                                           }
                                />
                            </View>
                            <View style={[CardDStyle.cardInputViewStyle, {marginLeft: '2%'}]}>
                                <TextInput style={CardDStyle.cardInputStyle}
                                           value={this.state.block2}
                                           ref="block2"
                                           returnKeyType={'next'}
                                           onSubmitEditing={() => {
                                               this.refs.block3.focus()
                                           }}
                                           blurOnSubmit={false}
                                           keyboardType={"number-pad"}
                                           maxLength={4}
                                           placeholder="X X X X"
                                           onChangeText={(num) => {
                                               this.setState({block2: num});
                                               console.log(":::block2 ", this.state.block2);
                                               console.log(":::length ", this.state.block2.length);
                                               if (num.length === 4) {
                                                   this.refs.block3.focus()
                                               }
                                               if (num.length === 0) {
                                                   this.refs.block1.focus()
                                               }
                                           }
                                           }
                                />
                            </View>
                            <View style={[CardDStyle.cardInputViewStyle, {marginLeft: '2%'}]}>
                                <TextInput style={CardDStyle.cardInputStyle}
                                           value={this.state.block3}
                                           ref="block3"
                                           returnKeyType={'next'}
                                           onSubmitEditing={() => {
                                               this.refs.block4.focus()
                                           }}
                                           blurOnSubmit={false}
                                           keyboardType={"number-pad"}
                                           maxLength={4}
                                           placeholder="X X X X"
                                           onChangeText={(num) => {
                                               this.setState({block3: num});
                                               console.log(":::block2 ", this.state.block3);
                                               console.log(":::length ", this.state.block3.length);

                                               if (num.length === 4) {
                                                   this.refs.block4.focus()
                                               }
                                               if (num.length === 0) {
                                                   this.refs.block2.focus()
                                               }

                                           }
                                           }
                                />
                            </View>
                            <View style={[CardDStyle.cardInputViewStyle, {marginLeft: '2%'}]}>
                                <TextInput style={CardDStyle.cardInputStyle}
                                           value={this.state.block4}
                                           ref={"block4"}
                                           keyboardType={"number-pad"}
                                           maxLength={4}
                                           placeholder="X X X X"
                                           onChangeText={(num) => {
                                               this.setState({block4: num});
                                               console.log(":::block2 ", this.state.block4);
                                               console.log(":::length ", this.state.block4.length);

                                               if (num.length === 0) {
                                                   this.refs.block3.focus()
                                               }
                                           }
                                           }
                                />
                            </View>
                        </View>
                        <View
                            style={{justifyItems: 'center', padding: 9, backgroundColor: colors.grey, borderRadius: 6}}>
                            <Text style={{alignSelf: 'center'}}>VISA</Text>
                        </View>
                    </View>

                </View>

                <View style={{marginTop: '3%', flexDirection:'row'}}>
                    <View style={{flexDirection:'row', alignItems:'center', width:'50%'}} >
                        <Text>Expires On</Text>
                        <View style={[CardDStyle.cardInputViewStyle, {marginLeft:'4%', width:'20%'}]}>
                            <TextInput style={CardDStyle.cardInputStyle}
                                       blurOnSubmit={ false }
                                       keyboardType={"number-pad"}
                                       maxLength={4}
                                       placeholder="MM"
                            />
                        </View>
                        <View style={[CardDStyle.cardInputViewStyle, {marginLeft:'2%', width:'20%'}]}>
                            <TextInput style={CardDStyle.cardInputStyle}
                                       blurOnSubmit={ false }
                                       keyboardType={"number-pad"}
                                       maxLength={4}
                                       placeholder="YY"
                            />
                        </View>
                    </View>

                    <View style={{flexDirection:'row', alignItems:'center',width:'50%'}} >
                        <Text>Enter CVV</Text>
                        <View style={[CardDStyle.cardInputViewStyle, {marginLeft:'4%', width:'30%', borderLeftWidth:0, borderRightWidth:0, borderTopWidth:0}]}>
                            <TextInput style={CardDStyle.cardInputStyle}
                                       blurOnSubmit={ false }
                                       keyboardType={"number-pad"}
                                       maxLength={4}
                                       placeholder="XXX"
                            />
                        </View>
                    </View>
                </View>

            </CardView>
        )
    };

    debitCreditPay(cardNumber,month,year){

        console.log("data-@@@@ ",  typeof (cardNumber) , typeof (month) , typeof (year));
        console.log("data-#### ", cardNumber,month,year);
        //console.log("data-", "5256118950213876","09","2019");
        axios
            .post(
                'http://devapi.oyewallet.com/wallet/api/v1/CardValidation ',
                {
                    "ccCardNumber" : cardNumber.toString(),
                    "expiryMonth"  : month.toString(),
                    "expiryYear"   : year.toString()
                }
            )
            .then(response => {
                console.log("data- ",response);
                Alert.alert("success Feature comming soon...")
            })
            .catch(error => {
                console.log("data-!!!!! ",error);
                console.log("data-!!!!! ",error.message);
                Alert.alert("failure Feature comming soon...")
            });

    }

    payAction(){

        // let creditCardType = require('credit-card-type');
        // let visaCards = creditCardType(this.state.block1);
        // console.log("visaCards[0] ",visaCards[0].type);
        let monthPrefix = new Date().getFullYear().toString().substr(0,2)
        let year = parseInt(new Date().getFullYear().toString().substr(-2));
        let month = new Date().getMonth() + 1;
        let newYear = parseInt(this.state.year);
        let newMonth = parseInt(this.state.month);

        if (this.state.checked === "Credit Card" || this.state.checked === "Debit Card"){
            if(this.state.cardName === '')
                Alert.alert("","Invalid Card Name")
            else if(this.state.block1.length !== 4 || this.state.block2.length !== 4 || this.state.block3.length !== 4 || this.state.block4.length !== 4 )
                Alert.alert("","Invalid Card Number")
            else if(this.state.month === '' || newMonth > 12 || newMonth<1)
                Alert.alert("","Invalid Month")
            else if(newYear === year){
                console.log("month ", month, newMonth);
                if (newMonth < month)
                    Alert.alert("","Month not excepted")
            }
            else if(this.state.year === '')
                Alert.alert("","Invalid Year")
            else if(newYear < year )
                Alert.alert("","Year not excepted")
            else if(this.state.cvv === '')
                Alert.alert("","Invalid CVV")
            else
            if (this.state.checked === 'Credit Card' || this.state.checked === 'Debit Card'){

                let monthSufix = this.state.year;

                this.setState({
                    d1:this.state.block1+this.state.block2+this.state.block3+this.state.block4,
                    d2:this.state.month,
                    d3:monthPrefix + monthSufix,
                });

                this.debitCreditPay(
                    this.state.block1+this.state.block2+this.state.block3+this.state.block4,
                    this.state.month,
                    monthPrefix + monthSufix,
                )

                //let cardNumber = this.state.block1+this.state.block2+this.state.block3+this.state.block4

            }

            else
                Alert.alert("","Feature comming soon...")

        }

    }

    detectCardType(number) {
        console.log("number ",number);
        var re = {
            electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
            maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
            dankort: /^(5019)\d+$/,
            interpayment: /^(636)\d+$/,
            unionpay: /^(62|88)\d+$/,
            visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
            mastercard: /^5[1-5][0-9]{14}$/,
            amex: /^3[47][0-9]{13}$/,
            diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
            discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
            jcb: /^(?:2131|1800|35\d{3})\d{11}$/
        };

        for(var key in re) {
            if(re[key].test(number)) {
                console.log("number ", number, key)
                this.setState({cardType2:key})

                return key
            }
        }
    }

    setRadio(){

        // let monthPrefix = new Date().getFullYear().toString().substr(0,2)
        // let newYear = parseInt(this.state.year);
        // let newMonth = parseInt(this.state.month);

        let creditCardType = require('credit-card-type');
        this.type = this.state.cardType2
        const { checked } = this.state;
        const{} = this.props;
        const RadioButtons = this.state.CardType.map((data, index)=>{
            console.log("RadioButtons: ",data.label);
            return(
                <View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <RadioButton
                            color={ 'orange'}
                            value= {data.label}
                            status={checked === data.label ? 'checked' : 'unchecked'}
                            onPress={() => {
                                if (this.state.checked !== data.label)
                                    this.setState({
                                        checked: data.label,
                                        block1:'',
                                        block2:'',
                                        block3:'',
                                        block4:'',
                                        year:'',
                                        month:'',
                                        cvv:'',
                                    });

                                console.log("checked ", this.state.checked);
                            }}
                        />
                        <View style={{flex:1 }}>
                            <Text>{data.label}</Text>
                        </View>
                        {
                            ( (this.state.checked === 'Credit Card' && data.label === "Credit Card") || (this.state.checked === 'Debit Card' && data.label==="Debit Card") ) &&
                            <TouchableOpacity style={{flexDirection:'row', right:'3%'}}>
                                <Text style={{ color: '#A009F0'}}>Save Card</Text>
                                <Image resizeMode={"contain"} style={{height:20}} source={require('../../icons/checkbox.png')} />
                            </TouchableOpacity>
                        }
                    </View>
                    {
                        this.state.checked === 'Credit Card' && data.label === 'Credit Card' &&
                        <View
                            style={{
                                //backgroundColor: colors.grey,
                                marginTop:'5%',
                                marginRight: '2%',
                                marginLeft: '2%',
                                padding:8,
                                //marginBottom:'12%',
                                //marginLeft:-50
                            }}
                            // cardElevation={3}
                            // cardMaxElevation={2}
                            // cornerRadius={5}
                        >

                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text>
                                    Name On Card
                                </Text>
                                <TextInput
                                    value={this.state.cardName}
                                    ref= "cardName"
                                    returnKeyType={'next'}
                                    maxLength={50}
                                    onSubmitEditing={() => {
                                        this.refs.block1.focus()
                                    }}
                                    onChangeText={(num) => {
                                        console.log("NUM ", num);

                                        let check = /^[a-zA-Z\s]*$/ ;
                                        console.log("NUM check ",check.test(num));

                                        if(!check.test(num)){
                                            num = num.substring(0, num.length - 1)
                                        }
                                        else{
                                            this.setState({cardName: num});
                                        }

                                        // if (check.test(this.state.cardName))
                                        //     console.log("check.test(num) ",check.test(this.state.cardName), this.state.cardName);
                                        //     this.setState({cardName: num});

                                        //this.setState({cardName: num});
                                        if (num.length === 50) {
                                            this.refs.block1.focus()
                                        }
                                    }
                                    }
                                    style={{
                                        borderWidth: 1,
                                        width: '65%',
                                        height: '75%',
                                        marginLeft: '5%',
                                        borderRadius: 4,
                                        borderColor: colors.grey,
                                    }}/>
                            </View>

                            <View style={{marginTop: '3%'}}>
                                <Text>Enter Card Number</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                                        <View style={CardDStyle.cardInputViewStyle}>
                                            <TextInput style={CardDStyle.cardInputStyle}
                                                       value={this.state.block1}
                                                       ref={"block1"}
                                                       returnKeyType={'next'}
                                                       onSubmitEditing={() => {
                                                           this.refs.block2.focus()
                                                       }}
                                                       blurOnSubmit={false}
                                                       keyboardType={"number-pad"}
                                                       maxLength={4}
                                                       placeholder="X X X X"
                                                       onChangeText={(num) => {

                                                           console.log("block1 ", num);
                                                           this.setState({block1: num});
                                                           if (num.length === 4) {

                                                               if (num.length===4 && this.state.block2.length===4 && this.state.block3.length===4 && this.state.block4.length===4)
                                                                   console.log("detectCardType ", this.detectCardType(
                                                                       num
                                                                       +this.state.block2
                                                                       +this.state.block3
                                                                       +this.state.block4
                                                                   ));
                                                               // let creditCardType = require('credit-card-type');
                                                               // let visaCards = creditCardType(num.toString());
                                                               // console.log("visaCards[0] ",visaCards[0].type);
                                                               this.refs.block2.focus()
                                                           }
                                                       }
                                                       }
                                            />
                                        </View>
                                        <View style={[CardDStyle.cardInputViewStyle, {marginLeft: '2%'}]}>
                                            <TextInput style={CardDStyle.cardInputStyle}
                                                       value={this.state.block2}
                                                       ref="block2"
                                                       returnKeyType={'next'}
                                                       onSubmitEditing={() => {
                                                           this.refs.block3.focus()
                                                       }}
                                                       blurOnSubmit={false}
                                                       keyboardType={"number-pad"}
                                                       maxLength={4}
                                                       placeholder="X X X X"
                                                       onChangeText={(num) => {
                                                           this.setState({block2: num});
                                                           console.log(":::block2 ", this.state.block2);
                                                           console.log(":::length ", this.state.block2.length);
                                                           if (num.length === 4) {

                                                               if (this.state.block1.length===4 && num.length===4 && this.state.block3.length===4 && this.state.block4.length===4)
                                                                   console.log("detectCardType ", this.detectCardType(
                                                                       this.state.block1
                                                                       +num
                                                                       +this.state.block3
                                                                       +this.state.block4
                                                                   ));

                                                               this.refs.block3.focus()
                                                           }
                                                           if (num.length === 0) {
                                                               this.refs.block1.focus()
                                                           }
                                                       }
                                                       }
                                            />
                                        </View>
                                        <View style={[CardDStyle.cardInputViewStyle, {marginLeft: '2%'}]}>
                                            <TextInput style={CardDStyle.cardInputStyle}
                                                       value={this.state.block3}
                                                       ref="block3"
                                                       returnKeyType={'next'}
                                                       onSubmitEditing={() => {
                                                           this.refs.block4.focus()
                                                       }}
                                                       blurOnSubmit={false}
                                                       keyboardType={"number-pad"}
                                                       maxLength={4}
                                                       placeholder="X X X X"
                                                       onChangeText={(num) => {
                                                           this.setState({block3: num});
                                                           console.log(":::block2 ", this.state.block3);
                                                           console.log(":::length ", this.state.block3.length);

                                                           if (num.length === 4) {

                                                               if (this.state.block1.length===4 && this.state.block2.length===4 && num.length===4 && this.state.block4.length===4)
                                                                   console.log("detectCardType ", this.detectCardType(
                                                                       this.state.block1
                                                                       +this.state.block2
                                                                       +num
                                                                       +this.state.block4
                                                                   ));


                                                               this.refs.block4.focus()
                                                           }
                                                           if (num.length === 0) {
                                                               this.refs.block2.focus()
                                                           }

                                                       }
                                                       }
                                            />
                                        </View>
                                        <View style={[CardDStyle.cardInputViewStyle, {marginLeft: '2%'}]}>
                                            <TextInput style={CardDStyle.cardInputStyle}
                                                       value={this.state.block4}
                                                       ref={"block4"}
                                                       keyboardType={"number-pad"}
                                                       maxLength={4}
                                                       placeholder="X X X X"
                                                       onSubmitEditing={() => {
                                                           this.refs.month.focus()
                                                       }}
                                                       onChangeText={(num) => {
                                                           this.setState({block4: num});
                                                           console.log(":::block2 ", this.state.block4);
                                                           console.log(":::length ", this.state.block4.length);

                                                           if (num.length === 4) {

                                                               if (this.state.block1.length===4 && this.state.block2.length===4 && this.state.block3.length===4 && num.length===4)
                                                                   console.log("detectCardType ", this.detectCardType(
                                                                       this.state.block1
                                                                       +this.state.block2
                                                                       +this.state.block3
                                                                       +num
                                                                   ));


                                                               this.refs.month.focus()
                                                           }
                                                           if (num.length === 0) {
                                                               this.refs.block3.focus()
                                                           }
                                                       }
                                                       }
                                            />
                                        </View>
                                    </View>
                                    {/*<View*/}
                                    {/*    style={{*/}
                                    {/*        justifyItems: 'center',*/}
                                    {/*        alignItems:'center',*/}
                                    {/*        padding: 9,*/}
                                    {/*        backgroundColor: colors.grey,*/}
                                    {/*        borderRadius: 6*/}
                                    {/*    }}>*/}
                                    {
                                        this.state.cardType2 === '' &&
                                        <Image  style={{alignSelf: 'center'}}
                                                source={require('../../icons/credit-card.png')}
                                        />
                                    }
                                    {
                                        this.state.cardType2 === "diners" &&
                                        <Image  style={{alignSelf: 'center'}}
                                                source={require('../../icons/diners-club.png')}
                                        />
                                    }
                                    {
                                        this.state.cardType2 === "discover" &&
                                        <Image  style={{alignSelf: 'center'}}
                                                source={require('../../icons/discover.png')}
                                        />
                                    }
                                    {
                                        this.state.cardType2 === "jcb" &&
                                        <Image  style={{alignSelf: 'center'}}
                                                source={require('../../icons/jcb.png')}
                                        />
                                    }
                                    {
                                        this.state.cardType2 === "mastercard" &&
                                        <Image  style={{alignSelf: 'center'}}
                                                source={require('../../icons/mastercard.png')}
                                        />
                                    }
                                    {
                                        this.state.cardType2 === "visa" &&
                                        <Image  style={{alignSelf: 'center'}}
                                                source={require('../../icons/visa.png')}
                                        />
                                    }
                                    {
                                        this.state.cardType2 !== "diners" && this.state.cardType2 !== "discover" && this.state.cardType2 !== "jcb" && this.state.cardType2 !== "mastercard" && this.state.cardType2 !== "visa" &&
                                        <View
                                            style={{
                                                justifyItems: 'center',
                                                alignItems:'center',
                                                padding: 9,
                                                backgroundColor: (this.state.cardType2 !== "diners" && this.state.cardType2 !== "discover" && this.state.cardType2 !== "jcb" && this.state.cardType2 !== "mastercard" && this.state.cardType2 !== "visa") ?  "transparent" : colors.grey,
                                                borderRadius: 6
                                            }}>
                                            <Text style={{alignSelf: 'center'}}>{this.state.cardType2}</Text>
                                        </View>
                                    }



                                    {/*<Text style={{alignSelf: 'center'}}>{this.state.cardType2}</Text>*/}
                                    {/*</View>*/}
                                </View>
                            </View>

                            <View style={{marginTop: '3%', flexDirection:'row'}}>
                                <View style={{flexDirection:'row', alignItems:'center', width:'50%'}} >
                                    <Text>Expires On</Text>
                                    <View style={[CardDStyle.cardInputViewStyle, {marginLeft:'4%', width:'20%'}]}>
                                        <TextInput style={CardDStyle.cardInputStyle}
                                                   ref={"month"}
                                                   value={this.state.month}
                                                   blurOnSubmit={ false }
                                                   keyboardType={"number-pad"}
                                                   maxLength={2}
                                                   placeholder="mm"
                                                   onSubmitEditing={(num) => {
                                                       console.log("num onSubmitEditing ", this.state.month)
                                                       if (this.state.month.length == 1)
                                                           this.setState({
                                                               month : '0'+this.state.month
                                                           })
                                                       this.refs.year.focus()
                                                   }}
                                                   onChangeText={(num) => {


                                                       if( parseInt(num) < 0 || parseInt(num) > 12){
                                                           num = num.substring(0, num.length - 1)
                                                       }
                                                       else{
                                                           this.setState({month: num});
                                                       }

                                                       // console.log("detectCardType ", this.detectCardType(
                                                       //     this.state.block1 + this.state.block2 + this.state.block3 + this.state.block4
                                                       // ))

                                                       console.log("block1 ", num);
                                                       this.setState({month: num});
                                                       if (num.length === 2) {
                                                           this.refs.year.focus()
                                                       }
                                                   }
                                                   }
                                        />
                                    </View>
                                    <View style={[CardDStyle.cardInputViewStyle, {marginLeft:'2%', width:'20%'}]}>
                                        <TextInput style={CardDStyle.cardInputStyle}
                                                   ref={"year"}
                                                   value={this.state.year}
                                                   blurOnSubmit={ false }
                                                   keyboardType={"number-pad"}
                                                   maxLength={2}
                                                   placeholder="yy"
                                                   onSubmitEditing={() => {
                                                       this.refs.cvv.focus()
                                                   }}
                                                   onChangeText={(num) => {
                                                       console.log("block1 ", num);
                                                       //this.setState({year: num});
                                                       if(num.length === 2){
                                                           if( parseInt(num) < this.year || (this.state.month < this.month && this.year ===  parseInt(num)) ){
                                                               num = num.substring(0, num.length - 1)
                                                           }
                                                           else{
                                                               this.setState({year: num});
                                                           }
                                                       }
                                                       else
                                                           this.setState({year: num});


                                                       if (num.length === 2) {
                                                           this.refs.cvv.focus()
                                                       }
                                                       if (num.length === 0) {
                                                           this.refs.month.focus()
                                                       }
                                                   }
                                                   }
                                        />
                                    </View>
                                </View>

                                <View style={{flexDirection:'row', alignItems:'center',width:'50%', marginLeft:'5%'}} >
                                    <Text>Enter CVV</Text>
                                    <View style={[CardDStyle.cardInputViewStyle, {marginLeft:'4%', width:'40%', borderLeftWidth:0, borderRightWidth:0, borderTopWidth:0}]}>
                                        <TextInput style={CardDStyle.cardInputStyle}
                                                   ref={"cvv"}
                                                   value={this.state.cvv}
                                                   blurOnSubmit={ false }
                                                   keyboardType={"number-pad"}
                                                   maxLength={3}
                                                   placeholder="XXX"
                                                   secureTextEntry={true}
                                                   onChangeText={(num) => {
                                                       console.log("block1 ", num);
                                                       this.setState({cvv: num});
                                                   }
                                                   }
                                        />
                                    </View>
                                </View>
                            </View>

                            <View
                                style={{
                                    marginTop:'8%',
                                    borderBottomWidth:1,
                                }}
                            />
                        </View>
                    }

                    {
                        this.state.checked === 'Debit Card' && data.label === 'Debit Card' &&
                        <View
                            style={{
                                //backgroundColor: colors.grey,
                                marginTop:'5%',
                                marginRight: '2%',
                                marginLeft: '2%',
                                padding:8,
                                //marginBottom:'12%',
                                //marginLeft:-50
                            }}
                            // cardElevation={3}
                            // cardMaxElevation={2}
                            // cornerRadius={5}
                        >

                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text>
                                    Name On Card
                                </Text>
                                <TextInput
                                    value={this.state.cardName}
                                    ref= "cardName"
                                    returnKeyType={'next'}
                                    maxLength={50}
                                    onSubmitEditing={() => {
                                        this.refs.block1.focus()
                                    }}
                                    onChangeText={(num) => {
                                        console.log("NUM ", num);

                                        let check = /^[a-zA-Z\s]*$/ ;
                                        console.log("NUM check ",check.test(num));

                                        if(!check.test(num)){
                                            num = num.substring(0, num.length - 1)
                                        }
                                        else{
                                            this.setState({cardName: num});
                                        }

                                        // if (check.test(this.state.cardName))
                                        //     console.log("check.test(num) ",check.test(this.state.cardName), this.state.cardName);
                                        //     this.setState({cardName: num});

                                        //this.setState({cardName: num});
                                        if (num.length === 50) {
                                            this.refs.block1.focus()
                                        }
                                    }
                                    }
                                    style={{
                                        borderWidth: 1,
                                        width: '65%',
                                        height: '75%',
                                        marginLeft: '5%',
                                        borderRadius: 4,
                                        borderColor: colors.grey,
                                    }}/>
                            </View>

                            <View style={{marginTop: '3%'}}>
                                <Text>Enter Card Number</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                                        <View style={CardDStyle.cardInputViewStyle}>
                                            <TextInput style={CardDStyle.cardInputStyle}
                                                       value={this.state.block1}
                                                       ref={"block1"}
                                                       returnKeyType={'next'}
                                                       onSubmitEditing={() => {
                                                           this.refs.block2.focus()
                                                       }}
                                                       blurOnSubmit={false}
                                                       keyboardType={"number-pad"}
                                                       maxLength={4}
                                                       placeholder="X X X X"
                                                       onChangeText={(num) => {

                                                           console.log("block1 ", num);
                                                           this.setState({block1: num});
                                                           if (num.length === 4) {

                                                               if (num.length===4 && this.state.block2.length===4 && this.state.block3.length===4 && this.state.block4.length===4)
                                                                   console.log("detectCardType ", this.detectCardType(
                                                                       num
                                                                       +this.state.block2
                                                                       +this.state.block3
                                                                       +this.state.block4
                                                                   ));
                                                               // let creditCardType = require('credit-card-type');
                                                               // let visaCards = creditCardType(num.toString());
                                                               // console.log("visaCards[0] ",visaCards[0].type);
                                                               this.refs.block2.focus()
                                                           }
                                                       }
                                                       }
                                            />
                                        </View>
                                        <View style={[CardDStyle.cardInputViewStyle, {marginLeft: '2%'}]}>
                                            <TextInput style={CardDStyle.cardInputStyle}
                                                       value={this.state.block2}
                                                       ref="block2"
                                                       returnKeyType={'next'}
                                                       onSubmitEditing={() => {
                                                           this.refs.block3.focus()
                                                       }}
                                                       blurOnSubmit={false}
                                                       keyboardType={"number-pad"}
                                                       maxLength={4}
                                                       placeholder="X X X X"
                                                       onChangeText={(num) => {
                                                           this.setState({block2: num});
                                                           console.log(":::block2 ", this.state.block2);
                                                           console.log(":::length ", this.state.block2.length);
                                                           if (num.length === 4) {

                                                               if (this.state.block1.length===4 && num.length===4 && this.state.block3.length===4 && this.state.block4.length===4)
                                                                   console.log("detectCardType ", this.detectCardType(
                                                                       this.state.block1
                                                                       +num
                                                                       +this.state.block3
                                                                       +this.state.block4
                                                                   ));

                                                               this.refs.block3.focus()
                                                           }
                                                           if (num.length === 0) {
                                                               this.refs.block1.focus()
                                                           }
                                                       }
                                                       }
                                            />
                                        </View>
                                        <View style={[CardDStyle.cardInputViewStyle, {marginLeft: '2%'}]}>
                                            <TextInput style={CardDStyle.cardInputStyle}
                                                       value={this.state.block3}
                                                       ref="block3"
                                                       returnKeyType={'next'}
                                                       onSubmitEditing={() => {
                                                           this.refs.block4.focus()
                                                       }}
                                                       blurOnSubmit={false}
                                                       keyboardType={"number-pad"}
                                                       maxLength={4}
                                                       placeholder="X X X X"
                                                       onChangeText={(num) => {
                                                           this.setState({block3: num});
                                                           console.log(":::block2 ", this.state.block3);
                                                           console.log(":::length ", this.state.block3.length);

                                                           if (num.length === 4) {

                                                               if (this.state.block1.length===4 && this.state.block2.length===4 && num.length===4 && this.state.block4.length===4)
                                                                   console.log("detectCardType ", this.detectCardType(
                                                                       this.state.block1
                                                                       +this.state.block2
                                                                       +num
                                                                       +this.state.block4
                                                                   ));


                                                               this.refs.block4.focus()
                                                           }
                                                           if (num.length === 0) {
                                                               this.refs.block2.focus()
                                                           }

                                                       }
                                                       }
                                            />
                                        </View>
                                        <View style={[CardDStyle.cardInputViewStyle, {marginLeft: '2%'}]}>
                                            <TextInput style={CardDStyle.cardInputStyle}
                                                       value={this.state.block4}
                                                       ref={"block4"}
                                                       keyboardType={"number-pad"}
                                                       maxLength={4}
                                                       placeholder="X X X X"
                                                       onSubmitEditing={() => {
                                                           this.refs.month.focus()
                                                       }}
                                                       onChangeText={(num) => {
                                                           this.setState({block4: num});
                                                           console.log(":::block2 ", this.state.block4);
                                                           console.log(":::length ", this.state.block4.length);

                                                           if (num.length === 4) {

                                                               if (this.state.block1.length===4 && this.state.block2.length===4 && this.state.block3.length===4 && num.length===4)
                                                                   console.log("detectCardType ", this.detectCardType(
                                                                       this.state.block1
                                                                       +this.state.block2
                                                                       +this.state.block3
                                                                       +num
                                                                   ));


                                                               this.refs.month.focus()
                                                           }
                                                           if (num.length === 0) {
                                                               this.refs.block3.focus()
                                                           }
                                                       }
                                                       }
                                            />
                                        </View>
                                    </View>
                                    {/*<View*/}
                                    {/*    style={{*/}
                                    {/*        justifyItems: 'center',*/}
                                    {/*        alignItems:'center',*/}
                                    {/*        padding: 9,*/}
                                    {/*        backgroundColor: colors.grey,*/}
                                    {/*        borderRadius: 6*/}
                                    {/*    }}>*/}
                                    {
                                        this.state.cardType2 === '' &&
                                        <Image  style={{alignSelf: 'center'}}
                                                source={require('../../icons/credit-card.png')}
                                        />
                                    }
                                    {
                                        this.state.cardType2 === "diners" &&
                                        <Image  style={{alignSelf: 'center'}}
                                                source={require('../../icons/diners-club.png')}
                                        />
                                    }
                                    {
                                        this.state.cardType2 === "discover" &&
                                        <Image  style={{alignSelf: 'center'}}
                                                source={require('../../icons/discover.png')}
                                        />
                                    }
                                    {
                                        this.state.cardType2 === "jcb" &&
                                        <Image  style={{alignSelf: 'center'}}
                                                source={require('../../icons/jcb.png')}
                                        />
                                    }
                                    {
                                        this.state.cardType2 === "mastercard" &&
                                        <Image  style={{alignSelf: 'center'}}
                                                source={require('../../icons/mastercard.png')}
                                        />
                                    }
                                    {
                                        this.state.cardType2 === "visa" &&
                                        <Image  style={{alignSelf: 'center'}}
                                                source={require('../../icons/visa.png')}
                                        />
                                    }
                                    {
                                        this.state.cardType2 !== "diners" && this.state.cardType2 !== "discover" && this.state.cardType2 !== "jcb" && this.state.cardType2 !== "mastercard" && this.state.cardType2 !== "visa" &&
                                        <View
                                            style={{
                                                justifyItems: 'center',
                                                alignItems:'center',
                                                padding: 9,
                                                backgroundColor: (this.state.cardType2 !== "diners" && this.state.cardType2 !== "discover" && this.state.cardType2 !== "jcb" && this.state.cardType2 !== "mastercard" && this.state.cardType2 !== "visa") ?  "transparent" : colors.grey,
                                                borderRadius: 6
                                            }}>
                                            <Text style={{alignSelf: 'center'}}>{this.state.cardType2}</Text>
                                        </View>
                                    }



                                    {/*<Text style={{alignSelf: 'center'}}>{this.state.cardType2}</Text>*/}
                                    {/*</View>*/}
                                </View>
                            </View>

                            <View style={{marginTop: '3%', flexDirection:'row'}}>
                                <View style={{flexDirection:'row', alignItems:'center', width:'50%'}} >
                                    <Text>Expires On</Text>
                                    <View style={[CardDStyle.cardInputViewStyle, {marginLeft:'4%', width:'20%'}]}>
                                        <TextInput style={CardDStyle.cardInputStyle}
                                                   ref={"month"}
                                                   value={this.state.month}
                                                   blurOnSubmit={ false }
                                                   keyboardType={"number-pad"}
                                                   maxLength={2}
                                                   placeholder="mm"
                                                   onSubmitEditing={(num) => {
                                                       console.log("num onSubmitEditing ", this.state.month)
                                                       if (this.state.month.length == 1)
                                                           this.setState({
                                                               month : '0'+this.state.month
                                                           })
                                                       this.refs.year.focus()
                                                   }}
                                                   onChangeText={(num) => {


                                                       if( parseInt(num) < 0 || parseInt(num) > 12){
                                                           num = num.substring(0, num.length - 1)
                                                       }
                                                       else{
                                                           this.setState({month: num});
                                                       }

                                                       // console.log("detectCardType ", this.detectCardType(
                                                       //     this.state.block1 + this.state.block2 + this.state.block3 + this.state.block4
                                                       // ))

                                                       console.log("block1 ", num);
                                                       this.setState({month: num});
                                                       if (num.length === 2) {
                                                           this.refs.year.focus()
                                                       }
                                                   }
                                                   }
                                        />
                                    </View>
                                    <View style={[CardDStyle.cardInputViewStyle, {marginLeft:'2%', width:'20%'}]}>
                                        <TextInput style={CardDStyle.cardInputStyle}
                                                   ref={"year"}
                                                   value={this.state.year}
                                                   blurOnSubmit={ false }
                                                   keyboardType={"number-pad"}
                                                   maxLength={2}
                                                   placeholder="yy"
                                                   onSubmitEditing={() => {
                                                       this.refs.cvv.focus()
                                                   }}
                                                   onChangeText={(num) => {
                                                       console.log("block1 ", num);
                                                       //this.setState({year: num});
                                                       if(num.length === 2){
                                                           if( parseInt(num) < this.year || (this.state.month < this.month && this.year ===  parseInt(num)) ){
                                                               num = num.substring(0, num.length - 1)
                                                           }
                                                           else{
                                                               this.setState({year: num});
                                                           }
                                                       }
                                                       else
                                                           this.setState({year: num});


                                                       if (num.length === 2) {
                                                           this.refs.cvv.focus()
                                                       }
                                                       if (num.length === 0) {
                                                           this.refs.month.focus()
                                                       }
                                                   }
                                                   }
                                        />
                                    </View>
                                </View>

                                <View style={{flexDirection:'row', alignItems:'center',width:'50%', marginLeft:'5%'}} >
                                    <Text>Enter CVV</Text>
                                    <View style={[CardDStyle.cardInputViewStyle, {marginLeft:'4%', width:'40%', borderLeftWidth:0, borderRightWidth:0, borderTopWidth:0}]}>
                                        <TextInput style={CardDStyle.cardInputStyle}
                                                   ref={"cvv"}
                                                   value={this.state.cvv}
                                                   blurOnSubmit={ false }
                                                   keyboardType={"number-pad"}
                                                   maxLength={3}
                                                   placeholder="XXX"
                                                   secureTextEntry={true}
                                                   onChangeText={(num) => {
                                                       console.log("block1 ", num);
                                                       this.setState({cvv: num});
                                                   }
                                                   }
                                        />
                                    </View>
                                </View>
                            </View>

                            <View
                                style={{
                                    marginTop:'8%',
                                    borderBottomWidth:1,
                                }}
                            />
                        </View>
                    }

                    {
                        this.state.checked === 'Netbanking' && data.label === 'Netbanking' &&
                        <Dropdown
                            label='Favorite Fruit'
                            data={this.state.bankList}
                        />

                    }

                    {
                        this.state.checked === 'UPIs' && data.label === 'UPIs' &&
                        <View>
                            <Text style={{marginLeft:'5%'}}>Enter Your UPI id</Text>
                            <View style={{
                                marginTop:'2%',
                                borderWidth:1,
                                marginLeft:'5%',
                                marginRight:'5%',
                                borderRadius:4,
                                //height:'20%',
                                //borderColor: colors.grey,
                            }}>
                                <TextInput
                                    placeholder={"Ex: MobileNumber@upi"}
                                />
                            </View>
                            <View>
                                <View style={{flexDirection:'row', alignSelf:'flex-end', marginRight:'5%', marginTop:'2%', borderColor:'#959090'}}>
                                    <TouchableOpacity>
                                        <Text style={{fontSize: 20, marginRight:'5%', color:'#959090'}}>CANCEL</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text style={{fontSize: 20, color:'orange',}}>VERIFY</Text>
                                    </TouchableOpacity>
                                </View>
                                <View></View>
                            </View>
                        </View>
                    }

                </View>
            );
        });

        return RadioButtons

    }


    render(){
        console.log("PROPS ",this.props.navigation.state.params.data);
        this.year = parseInt(new Date().getFullYear().toString().substr(-2));
        this.month = new Date().getMonth() + 1;

        console.log("---> ", this.month, typeof (this.month));
        console.log("---> ", this.year, typeof (this.year));
        const colors = ['#5C6BC0', '#009688', '#F44336'];






        return(
            <View style={{flex:1}}>
                {/*<KeyboardAwareScrollView>*/}
                <View
                    style ={[{
                        paddingBottom:'4%',
                    },
                        CardDStyle.shadow
                    ]}>
                    <View style={{flexDirection:'row', alignItems:'center', marginTop:'2%',}}>
                        <Icon style ={{marginLeft:'3%',}}
                              name="chevron-left"
                              type="font-awesome"
                              size={15}
                              onPress={()=>{this.props.navigation.navigate('Amount')}}
                        />
                        <Text style={{marginLeft:'3%',fontSize:15}}>Payment Options</Text>
                    </View>
                    <View style={CardDStyle.topSec}>
                        <Text style={CardDStyle.topSecTxtSize}>You are paying to</Text>
                        <View style={{
                            alignSelf:'center',
                            borderBottomWidth:1.5,
                            borderBottomColor: colors.grey,
                        }}>
                            <Text
                                style={CardDStyle.topSecTxtSize}>
                                The Deely
                            </Text>
                        </View>

                        <Text style={CardDStyle.topSecTxtSize}>
                            Rs
                        </Text>

                        <Image
                            style={{
                                height:15,
                                width:15,
                            }}
                            source={require('../../icons/rupee_black.png')}/>
                        <Text style={{
                            color: colors.orange,
                            fontSize:15,
                            //marginTop:'2%'
                        }}>
                            {this.props.navigation.state.params.data}
                        </Text>

                    </View>
                </View>
                {/*
                <View style={CardDStyle.savedCardMainView}>
                    <View
                        style={CardDStyle.savedCardView2}
                    >
                        <View style={{
                            width:30,
                            height:30,
                            backgroundColor:'white',
                            //borderRadius:7,
                            //marginLeft:'2%',
                            //marginTop:'2%',
                        }}/>
                        <View style={CardDStyle.savedCardNumberStyle}>
                            <Text style={{fontSize:15,}}>
                                12
                            </Text>
                            <Text style={{fontSize:15,}}>
                                XX - XXXX - XXXX -
                            </Text>
                            <Text style={{fontSize:15,}}>
                                3008
                            </Text>
                        </View>
                        <View style={CardDStyle.savedCardNumberStyle}>
                            <Text style={{fontSize:15,}}>{this.state.currentSavedCard} Bank Credit Card</Text>
                        </View>
                        <View style={CardDStyle.savedCardNumberStyle}>
                            <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                                <View
                                    style={{
                                        fontSize:15,
                                        //backgroundColor:'yellow',
                                        borderBottomWidth:1,
                                        paddingLeft:'2%',
                                        paddingRight:'2%',
                                    }}
                                >
                                    <TextInput
                                        style={{
                                            padding:0,
                                        }}
                                        placeholder={'Enter CVV'}
                                        placeholderTextColor={colors.black}
                                    />
                                </View>
                                <Text
                                    style={{
                                        marginLeft:'10%',
                                        fontSize:15,
                                    }}
                                >Done</Text>
                            </View>
                            <View style={{
                                width:60,
                                height:40,
                                backgroundColor:'white',
                                //borderRadius:7,
                                alignSelf:'flex-end',
                                //marginLeft:'2%',
                                //marginTop:'2%',
                            }}/>

                        </View>
                    </View>
                    <View
                        style={CardDStyle.savedCardView}
                    >
                        <View style={{
                            width:30,
                            height:30,
                            backgroundColor:'white',
                            //borderRadius:7,
                            //marginLeft:'2%',
                            //marginTop:'2%',
                        }}/>
                        <View style={CardDStyle.savedCardNumberStyle}>
                            <Text style={{fontSize:15,}}>
                                12
                            </Text>
                            <Text style={{fontSize:15,}}>
                                XX - XXXX - XXXX -
                            </Text>
                            <Text style={{fontSize:15,}}>
                                3008
                            </Text>
                        </View>
                        <View style={CardDStyle.savedCardNumberStyle}>
                            <Text style={{fontSize:15,}}>{this.state.currentSavedCard} Bank Credit Card</Text>
                        </View>
                        <View style={CardDStyle.savedCardNumberStyle}>
                            <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                                <View
                                    style={{
                                        fontSize:15,
                                        //backgroundColor:'yellow',
                                        borderBottomWidth:1,
                                        paddingLeft:'2%',
                                        paddingRight:'2%',
                                    }}
                                >
                                    <TextInput
                                        style={{
                                            padding:0,
                                        }}
                                        placeholder={'Enter CVV'}
                                        placeholderTextColor={colors.black}
                                    />
                                </View>
                                <Text
                                    style={{
                                        marginLeft:'10%',
                                        fontSize:15,
                                    }}
                                >Done</Text>
                            </View>
                            <View style={{
                                width:60,
                                height:40,
                                backgroundColor:'white',
                                //borderRadius:7,
                                alignSelf:'flex-end',
                                //marginLeft:'2%',
                                //marginTop:'2%',
                            }}/>

                        </View>
                    </View>
                </View>
                */}

                <View style={{alignItems:'center', marginTop:'50%'}}>
                    <Animated.View
                        style={{
                            width: 300, height: 150,
                            position: 'absolute',
                            backgroundColor: colors[(this.state.currentIndex + 2) % 3],
                            zIndex: 1,
                            bottom: this.state.cardsStackedAnim.interpolate({
                                inputRange: [ 0, 1 ], outputRange: [ 40, 20 ] }),
                            transform: [{
                                scale: this.state.cardsStackedAnim.interpolate({
                                    inputRange: [ 0, 1 ], outputRange: [ 0.80, 0.90 ] })
                            }],
                            opacity: this.state.cardsStackedAnim.interpolate({
                                inputRange: [ 0, 1 ], outputRange: [ 0.3, 0.6 ] }),
                            alignSelf:'center'
                        }}
                    />
                    <Animated.View
                        style={{
                            width: 300, height: 150,
                            position: 'absolute',
                            backgroundColor: colors[(this.state.currentIndex + 1) % 3],
                            zIndex: 2,
                            bottom: this.state.cardsStackedAnim.interpolate({
                                inputRange: [ 0, 1 ], outputRange: [ 20, 0 ] }),
                            transform: [{
                                scale: this.state.cardsStackedAnim.interpolate({
                                    inputRange: [ 0, 1 ], outputRange: [ 0.90, 1.0 ] })
                            }],
                            opacity: this.state.cardsStackedAnim.interpolate({
                                inputRange: [ 0, 1 ], outputRange: [ 0.6, 1 ] }),
                            alignSelf:'center'
                        }}
                    >

                    </Animated.View>
                    <Animated.View
                        { ...this.cardsPanResponder.panHandlers }
                        style={{
                            width: 300, height: 150,
                            position: 'absolute',
                            backgroundColor: colors[this.state.currentIndex % 3],
                            zIndex: this.state.cardsStackedAnim.interpolate({
                                inputRange: [ 0, 0.5, 1 ], outputRange: [ 3, 2, 0 ] }),
                            bottom: this.state.cardsStackedAnim.interpolate({
                                inputRange: [ 0, 1 ], outputRange: [ 0, 40 ] }),
                            opacity: this.state.cardsStackedAnim.interpolate({
                                inputRange: [ 0, 1 ], outputRange: [ 1, 0.3 ] }),
                            transform: [
                                { translateX: this.state.cardsPan.x },
                                { scale: this.state.cardsStackedAnim.interpolate({
                                        inputRange: [ 0, 1 ], outputRange: [ 1, 0.80 ] }) },
                            ],
                            alignSelf:'center'
                        }}
                    />
                </View>

                {/*<Animated.View    // frontmost card*/}
                {/*    { ...this.cardsPanResponder.panHandlers }*/}
                {/*    style={{*/}
                {/*        width: 300, height: 150,*/}
                {/*        position: 'absolute',*/}
                {/*        zIndex: 3,*/}
                {/*        bottom: 0,*/}
                {/*        backgroundColor: colors[0], // Blue*/}
                {/*        opacity: 1,*/}
                {/*        transform: [*/}
                {/*            { translateX: this.state.cardsPan.x },*/}
                {/*            { scale: 1.0 },*/}
                {/*        ],*/}
                {/*    }}*/}
                {/*/>*/}

                {this.setRadio()}

                {
                    this.state.checked !== 'Netbanking' ?
                        this.state.checked === 'UPIs' ?
                            <TouchableOpacity
                                onPress={()=> this.payAction()}
                                disabled={this.state.checked}
                                style={[
                                    {backgroundColor: this.state.checked === 'UPIs' && this.state.upiStatus ? 'orange' : '#EAEAEA',},
                                    CardDStyle.payButtonStyle
                                ]}
                            >
                                <Text style={{
                                    alignSelf:'center',
                                    color : this.state.checked === 'UPIs' && this.state.upiStatus? 'orange' : "#FFFFFF",
                                    fontSize:20,
                                }}>PAY</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={()=> this.payAction()}
                                style={[
                                    {backgroundColor: 'orange',},
                                    CardDStyle.payButtonStyle
                                ]}
                            >
                                <Text style={{
                                    alignSelf:'center',
                                    color : '#FFFFFF',
                                    fontSize:20,
                                }}>PAY</Text>
                            </TouchableOpacity>
                        :
                        <View/>
                }
                {/*</KeyboardAwareScrollView>*/}
            </View>
        )
    }
}

const mapStateToProps = state =>{
    return{

    }
};

export default connect(mapStateToProps,{updateCardType},)(CardDetails);