import React, {Component} from 'react';
import {
    Alert,
    Animated,
    BackHandler,
    Image,
    ImageBackground,
    PanResponder,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
//import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import {RadioButton} from 'react-native-paper';
import {connect} from 'react-redux';
import {updateCardType} from '../../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dropdown} from 'react-native-material-dropdown';
import base from '../../base';
import {TextInput, TouchableHighlight,} from 'react-native-gesture-handler';
import {CardDStyle} from './CardDSytle';
import colors from "../../base/theme/colors";
import axios from "axios";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

//const colors = ['#5C6BC0', '#009688', '#F44336'];

class CardDetails extends Component{

    constructor(props){
        super(props);
        this.state={
            item:null,
            collapsed : false,
            isUPIVerified:false,
            upiVerifyText:"VERIFY",
            upiText:"",

            cardName:'',

            block1: '',
            block2: '',
            block3: '',
            block4: '',
            block5: '',

            month:'',
            year:'',

            savedCardCvv:'',
            cvv:'',

            saveCard:false,


            scCardLength:0,
            scNum1:'',
            scNum2:'',
            scCardType:'',

            cardType:[
                {label: "mastercard", icon: require('../../icons/mastercard.png')},
                {label: "visa", icon: require('../../icons/visa.png')},
            ],

            savedCardBank:[
                {label:'ICICI',value:0, cardNumber:'1000002233337744', month:'05', year:'22',icon: require('../../icons/icici.png'), type:require('../../icons/mastercard.png'), bgimg:require('../../icons/Cardic.png')},
                {label:'Axis',value:1, cardNumber:'1111222233334444', month:'05', year:'22', icon: require('../../icons/axis1.png'), type:require('../../icons/visa.png'), bgimg:require('../../icons/Card1.png') },
                {label:'Sbi',value:2, cardNumber:'51061222233338976', month:'05', year:'22',icon: require('../../icons/sbi.png'), type:require('../../icons/american-express.png'), bgimg:require('../../icons/Card1.png')},
            ],

            savedCardBank2:[],

            currentSavedCard:"Axis",

            cardType2 : '',
            cardImage : require('../../icons/credit-card.png'),
            CardType:[
                {label:'Credit Card',value:0, isActive:false},
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

        this.cardsPanResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: (evt,gestureState) => {
                console.log("Gesture State:",gestureState)
                const {dx, dy} = gestureState;
                if (dx!==4 && dy!==0 && dy/dx!==Math.abs(0) && dy/dx!==-1) { return true }else{ return false }
            },
            onMoveShouldSetPanResponderCapture: () => false,
            onPanResponderMove: ( event, gestureState ) => {
                //this.reSetCVV()
                this.state
                    .cardsPan
                    .setValue(
                        {
                            x: gestureState.dx,
                            y: this.state.cardsPan.y
                        },
                    );
                ;
            },
            onPanResponderTerminationRequest: () => false,
            onPanResponderRelease: ( event, gestureState ) => {

                console.log(":::::: onPanResponderRelease..");
                console.log("cardNumber: ", this.cardNumber, this.state.currentIndex);
                let data = this.state.savedCardBank2
                let i;
                for(i=0 ; i<data.length ; i++){
                    console.log("data[i] ",data[i])
                    if ( this.state.currentIndex === i ){
                        this.cardNumber = data[i].ccCardNumber;
                        this.state.scCardType = this.detectCardType(this.cardNumber, '1');
                        //this.state.cardType2
                        this.setState({
                            scNum1 : String( data[i].ccCardNumber).substr(0, 2),
                            scNum2 : String( data[i].ccCardNumber).substr(data[i].ccCardNumber.length-4, data[i].ccCardNumber.length),
                        });
                        this.num1 = String( data[i].ccCardNumber).substr(0, 2);
                        this.num2 = String( data[i].ccCardNumber).substr(data[i].ccCardNumber.length-2, data[i].ccCardNumber.length);
                        //console.log("num1--> ",this.num1, String( data[i].ccCardNumber).substr(0, 2))
                    }
                }


                let data2 = this.state.savedCardBank;
                for(i in data2){
                    if (this.state.currentIndex === data2[i].value){
                        this.val = data2[i].value
                        this.bgimg = data2[i].bgimg
                        this.icon = data2[i].icon
                        // this.type = data2[i].type
                        // this.cardNumber = data2[i].cardNumber
                        // this.sMonth = data2[i].month
                        // this.sYear = data2[i].year
                        // this.num1 =String( data2[i].cardNumber).substr(0, 2);
                        // this.num2 =String( data2[i].cardNumber).substr(data2[i].cardNumber.length-2, data2[i].cardNumber.length);
                        // this.bank = data2[i].label
                        console.log("this.num1  ",this.num1 , this.num2);
                    }
                }


                this.setState({
                    savedCardCvv : ''
                });

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
                    if (this.state.currentIndex === this.state.savedCardBank2.length-1)
                        this.setState({
                            currentIndex: 0,
                        });
                    else
                        this.setState({
                            currentIndex: this.state.currentIndex + 1,
                        });
                } );

            },
        } );
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.getCardList('1')
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        if (Platform.OS === 'android') {
            this.props.navigation.navigate('Amount')
        }
        return true;
    }



    onSelect = (index, value) => {
        const {updateCardType} = this.props;
        let cardValue = this.state.CardType[index].label;

        // Action here with the value
        updateCardType(cardValue);

        // alert(radioValue); // Pass this value to reducer
    };

    getCardList(type){
        console.log("this.props.registrationId ",this.props.registrationId);
        axios
            .get(
                'http://devapi.oyewallet.com/wallet/api/v1/ListOfCardsByRegistration/' + this.props.registrationId,
            )
            .then(response => {
                console.log("response",response, response.data)
                if(response.data.success){

                    console.log(">>>>data- ",response);
                    let data = response.data.data;
                    this.setState({
                        scCardLength : response.data.data.length,
                        scNum1 : type === '1' ? String( data[0].ccCardNumber).substr(0, 2) : '',
                        scNum2 : type === '1' ? String( data[0].ccCardNumber).substr(data[0].ccCardNumber.length-4, data[0].ccCardNumber.length) : '',
                        savedCardBank2 : response.data.data
                    });
                    if (type === '1'){
                        let data2 = this.state.savedCardBank
                        this.bgimg = data2[0].bgimg
                        this.icon = data2[0].icon
                        this.cardNumber = data[0].ccCardNumber;
                        this.detectCardType(data[0].ccCardNumber, '1')
                    }
                }
                else{
                    this.setState({
                        scCardLength : 0
                    })
                }



                //Alert.alert("success Feature comming soon...")
            })
            .catch(error => {
                console.log("data-!!!!! ",error);
                console.log("data-!!!!! ",error.message);
                //Alert.alert("failure Feature comming soon...")
            });
    }

    debitCreditPay2(cardNumber,month,year){

        this.getCardList()


        if (this.state.checked === ''){
            console.log("data- INSIDE")
            cardNumber =  this.cardNumber;
            month = this.month;
            year = this.year;
        }

        console.log("this.state.savedCardBank2 ", this.state.savedCardBank2);


        console.log("data-@@@@ ",  typeof (cardNumber) , typeof (month) , typeof (year));
        console.log("data-#### ", cardNumber,month,year);
        let self = this;
        //console.log("data-", "5256118950213876","09","2019");
        axios
            .post(

                'http://devapi.oyewallet.com/wallet/api/v1/CardValidation ',
                // {
                //     "ccCardNumber" : "5015555566665434" //cardNumber.toString(),
                //     "expiryMonth"  : "08" //month.toString(),
                //     "expiryYear"   : "23" //year.toString()
                // }

                {
                    "ccCardNumber" : cardNumber.toString() ,
                    "expiryMonth"  : month.toString(),
                    "expiryYear"   : year.toString(),
                    "registrationID" : this.props.registrationId, //"1729",
                }
            )
            .then(response => {
                this.getCardList()
                console.log("res- RES: ",response);
                Alert.alert("Card Saved")

            })
            .catch(error => {
                console.log("res- < error > ",error);
                console.log("res- < error > ",error.message);
                Alert.alert("Card Not Saved")
            });

    }

    saveCardPress(){
        console.log("payAction ");
        console.log("savedCardBank2: ",this.state.savedCardBank2);
        // if (this.state.checked === ""){
        //     this.debitCreditPay("","","")
        // }
        let yearPrefix = new Date().getFullYear().toString().substr(0,2)
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
            else if(newYear < this.year )
                Alert.alert("Alert","Card expied")
            else if(this.state.cvv === '')
                Alert.alert("","Invalid CVV")
            else {
                console.log("this.state.saveCard ", this.state.saveCard);
                let monthSufix = this.state.year;
                this.debitCreditPay2(
                    this.state.block1 + this.state.block2 + this.state.block3 + this.state.block4,
                    this.state.month,
                    yearPrefix + monthSufix,
                );
                this.getCardList();
                Alert.alert("Card Saved")

            }
        }


    }

    chooseSavedCard(){
        if (this.state.savedCardCvv !== ''){
            this.setState({
                checked:''
            })
        }
        else{
            Alert.alert("Alert", "Please enter cvv")
        }
    };


    payUPI(){
        if(this.state.isUPIVerified){
            this.initiateDBS();
        }else{
            alert("Please verify UPI ID")
        }
    }

    async initiateDBS(){
        let config = await base.utils.upi.getDBSUPIConfiguration(this.props.navigation.state.params.data,this.state.upiText,0)
        
        console.log("initiateDBS",config)
        let initiatedResp = await base.utils.upi.initiateDBSUPI(config);
        console.log("initiateDBS_RESP",initiatedResp)
        //this.props.navigation.navigate('UPITimer',{upiResponse:''})
    }

    payAction(type){
        console.log("payAction");
        let yearPrefix = new Date().getFullYear().toString().substr(0,2)
        let year = parseInt(new Date().getFullYear().toString().substr(-2));
        let month = new Date().getMonth() + 1;
        let newYear = parseInt(this.state.year);
        let newMonth = parseInt(this.state.month);

        console.log("payAction>>>data: ",month, year, yearPrefix, newYear, newMonth);
        console.log("card number: ",
            this.state.block1.length,
            this.state.block2.length,
            this.state.block3.length,
            this.state.block4.length
        );
        if (this.state.checked === ""){
            //this.debitCreditPay("","","")
            Alert.alert("Feature comming soon... ")
        }
        else if(this.state.cardName === ''){
            Alert.alert("Alert","Please enter the card name")
        }
        else if(this.state.block1.length === 0 && this.state.block2.length === 0 && this.state.block3.length === 0 && this.state.block4.length === 0 ){
            Alert.alert("Alert","Please enter the card number")
        }
        else if( this.state.block1.length !== 4 || this.state.block2.length !== 4 || this.state.block3.length !== 4 || this.state.block4.length < 2 ){
            console.log("card number ??????: ",
                this.state.block1.length,
                this.state.block2.length,
                this.state.block3.length,
                this.state.block4.length
            );
            Alert.alert("Alert","Invalid card number")
        }
        else if(this.state.month.length === 0){
            Alert.alert("Alert","Please enter the card expiry month")
        }
        else if(this.state.year.length === 0){
            Alert.alert("Alert","Please enter the card expiry year")
        }
        else if(newYear < this.year ){
            Alert.alert("Alert","Card expired")
        }
        else if(this.year === newYear && newMonth < this.month){
            Alert.alert("Alert","Card expired")
        }
        else if(this.state.cvv === 0){
            Alert.alert("Alert","Please enter the CVV code")
        }
        else if(this.state.cvv < 3 && this.state.cvv >4){
            Alert.alert("Alert","Invalid CVV")
        }
        else{
            if(type === 'SAVE'){
                let data = this.state.savedCardBank2
                let i;
                let isExist = false
                for (i in data){
                    if (data[i].ccCardNumber === this.state.block1 + this.state.block2 + this.state.block3 + this.state.block4){
                        console.log("bank-> ",data[i].ccCardNumber, this.state.block1 + this.state.block2 + this.state.block3 + this.state.block4);
                        isExist = true
                        break
                    }
                }
                console.log("bank", isExist)
                if (!isExist){
                    let monthSufix = this.state.year;
                    this.debitCreditPay2(
                        this.state.block1 + this.state.block2 + this.state.block3 + this.state.block4,
                        this.state.month,
                        yearPrefix + monthSufix,
                    )
                }
                else
                    Alert.alert("Alert", "Card already exist")

            }
            else if(type === 'PAY')
                Alert.alert("Feature comming soon... ")
        }


        /*
        console.log("savedCardBank2: ",this.state.savedCardBank2);
        if (this.state.checked === ""){
            this.debitCreditPay("","","")
        }
        let yearPrefix = new Date().getFullYear().toString().substr(0,2)
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
            else {
                if (this.state.checked === 'Credit Card' || this.state.checked === 'Debit Card') {

                    this.setState({
                        saveCard: false
                    });
                    let monthSufix = this.state.year;
                    console.log("saveCard ", this.state.saveCard);
                    this.setState({
                        d1: this.state.block1 + this.state.block2 + this.state.block3 + this.state.block4,
                        d2: this.state.month,
                        d3: yearPrefix + monthSufix,
                    });

                    // this.debitCreditPay(
                    //     this.state.block1 + this.state.block2 + this.state.block3 + this.state.block4,
                    //     this.state.month,
                    //     yearPrefix + monthSufix,
                    // )
                    //let cardNumber = this.state.block1+this.state.block2+this.state.block3+this.state.block4
                    Alert.alert("", "Feature comming soon...")

                } else {
                    this.setState({
                        saveCard: false
                    })
                    // this.debitCreditPay(
                    //     this.state.block1 + this.state.block2 + this.state.block3 + this.state.block4,
                    //     this.state.month,
                    //     yearPrefix + monthSufix,
                    // )
                    Alert.alert("", "Feature comming soon...")
                }

            }
        }
        */

    }

    detectCardType2(number, type) {
        let key = "", re;

        re = base.regex.cardType;

        for(key in re) {
            console.log("key ", key, re[key].test(number), number)
            if(re[key].test(number)) {
                if (type === '1'){
                    //console.log("key ", key, re[key].test(number))
                    this.setState({scCardType : key});
                }
                else{
                    //console.log("key ", key, re[key].test(number))
                    this.setState({cardType2 : key});
                }
            }
        }
    }

    detectCardType(number, type) {
        if (number.length === 4 ){
            console.log("detectCardType>>>number: ", number, type);
            let key = "", re;

            re = base.regex.cardType;

            for(key in re) {
                console.log("detectCardType>>>key ", key, re[key].test(number+"000000000000"))
                if(re[key].test(number+"000000000000")) {
                    if (type === '1'){
                        //console.log("key ", key, re[key].test(number))
                        this.setState({scCardType : key});
                    }
                    else{
                        //console.log("key ", key, re[key].test(number))
                        this.setState({cardType2 : key});
                    }
                }
            }
        }
    }

    verifyUPI(){        
        var isValidUPI = (/^\w+@\w+$/g).test(this.state.upiText);
        this.setState({isUPIVerified:isValidUPI,upiVerifyText:isValidUPI?'VERIFIED':'VERIFY'})
        if(!isValidUPI){
            alert("Invalid UPI")
        }
    }

    setRadio(){
        const { checked } = this.state;
        const{} = this.props;
        
            return(
                <View style={{width:'90%',alignSelf:'center',borderWidth:0, marginTop:'20%'}}>

                    {
                        
                        <View>
                            <Text style={{marginLeft:'5%'}}>Enter Your UPI ID</Text>
                            <View style={{
                                marginTop:'2%',
                                borderWidth:1,
                                marginLeft:'5%',
                                marginRight:'5%',
                                borderRadius:4,
                                justifyContent:'center',
                                height:wp(10),
                                //borderColor: colors.grey,
                            }}>
                                <TextInput
                                    
                                    style={{paddingLeft:8}}
                                    onChangeText={(text)=>{
                                        console.log(text)
                                        this.setState({isUPIVerified:false,upiVerifyText:'VERIFY',upiText:text})
                                    }}
                                    keyboardType={'email-address'}
                                    returnKeyType={'done'}
                                    placeholder={"Ex: MobileNumber@upi"}
                                />
                            </View>
                            <View>
                                <View style={{flexDirection:'row', alignSelf:'flex-end', marginRight:'5%', marginTop:'2%', borderColor:'#959090'}}>
                                    {/* <TouchableOpacity>
                                        <Text style={{fontSize: 18, marginRight:'5%', color:'#959090'}}>CANCEL</Text>
                                    </TouchableOpacity> */}
                                    {/* <TouchableHighlight underlayColor={'transparent'} onPress={()=>this.verifyUPI()}> */}
                                        <Text onPress={()=>this.verifyUPI()} style={{fontSize: 18, color:this.state.isUPIVerified?'green':'orange',marginTop:2}}>{this.state.upiVerifyText}</Text>
                                    {/* </TouchableHighlight> */}
                                </View>

                                <View></View>
                            </View>
                        </View>
                    }
                </View>
                
            );
        

        return RadioButtons

    }

    render(){
        const { registrationId } = this.props;
        console.log("const { registrationId } = this.props; ", this.props.registrationId)
        console.log("CARD TYPE: ", this.state.scCardType, this.state.cardType2 )

        let tt=''
        let key=''
        this.year = parseInt(new Date().getFullYear().toString().substr(-2));
        this.month = new Date().getMonth() + 1;

        const colors = ['#5C6BC0', '#009688', '#F44336'];
        const backimg = ['../../icons/Card - 1', '../../icons/Cardic']


        let data = this.state.savedCardBank;

        this.num1 ="";
        this.num2 ="";
        this.cardNumber = "";
        this.bank="";
        this.sMonth="";
        this.sYear="";
        //this.ctype = require('../../icons/visa.png');
        let i;
        

        let data2 = this.state.savedCardBank2

  
        return(
            <ScrollView>
                {/*<KeyboardAwareScrollView>*/}

                <View
                    style={[{
                        paddingBottom:hp(3)
                    },
                        CardDStyle.shadow
                    ]}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: '2%',}}>
                        <Icon style={{marginLeft: '3%',}}
                              name="chevron-left"
                              type="font-awesome"
                              size={15}
                              onPress={() => {
                                  this.props.navigation.navigate('Amount')
                              }}
                        />
                        <Text style={{marginLeft: '3%', fontSize: 16}}>Payment Methods</Text>
                    </View>

                    

                    <View style={CardDStyle.topSec}>
                        <Text style={CardDStyle.topSecTxtSize}>You are paying to</Text>
                        <View style={{
                            //alignSelf: 'center',
                            borderBottomWidth: 1,
                            //backgroundColor: base.theme.colors.primary,
                        }}>
                            <Text
                                style={[CardDStyle.topSecTxtSize, {
                                    fontWeight: 'bold'
                                }]}>
                                {this.props.navigation.state.params.store}
                            </Text>
                        </View>

                        <Text style={CardDStyle.topSecTxtSize}>
                            Rs
                        </Text>

                        <Image
                            style={{
                                height: 16,
                                width: 16,
                                tintColor: base.theme.colors.primary
                            }}
                            source={require('../../icons/rupee_black.png')}/>
                        <Text style={{
                            color: base.theme.colors.orange,
                            fontSize: 20,
                            //marginTop:'2%'
                        }}>
                            {this.props.navigation.state.params.data}
                        </Text>
                        <Text style={{
                            color: base.theme.colors.lightgrey,
                            fontSize: 16,
                            //marginTop:'2%'
                            marginLeft: '2%'
                            // Reason for paying

                        }}>
                            {this.props.navigation.state.params.purposeOfPay}
                        </Text>
                    </View>
                </View>

                

                {this.setRadio()}
                {/*</ScrollView>*/}
                <View style={{
                    width:wp(100),
                    alignSelf:'center',
                    justifyContent: 'center',
                    height:hp(10),
                    marginTop: hp(40)//this.state.checked === 'UPIs' ? hp(16.5) : hp(0)
                }}>
                    {/*
                        this.state.checked !== 'Netbanking' ?
                            this.state.checked === 'UPIs' ?
                                <TouchableOpacity
                                    onPress={()=> this.payAction('')}
                                    disabled={this.state.checked}
                                    style={[
                                        {backgroundColor: this.state.checked === 'UPIs' && this.state.upiStatus ? 'orange' : '#EAEAEA'},
                                        CardDStyle.payButtonStyle,
                                    ]}
                                >
                                    <Text style={{
                                        bottom:hp(4),
                                        alignSelf:'center',
                                        fontSize:20,
                                        color : this.state.checked === 'UPIs' && this.state.upiStatus? 'orange' : "#FFFFFF",
                                    }}>PAY</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    onPress={()=> this.payAction("PAY")}
                                    style={[
                                        {backgroundColor: 'orange'},
                                        CardDStyle.payButtonStyle,
                                    ]}
                                >
                                    <Text style={{
                                        bottom:hp(4),
                                        alignSelf:'center',
                                        color : 'orange',
                                        fontSize:20,
                                    }}>PAY</Text>
                                </TouchableOpacity>
                            :
                            <View/>
                    */}
                    {
                        this.state.checked !== 'Netbanking' ?
                            this.state.checked === 'UPIs' ?
                                <TouchableOpacity
                                    onPress={()=> this.payAction('')}
                                    disabled={this.state.checked}
                                    style={[
                                        {backgroundColor: this.state.checked === 'UPIs' && this.state.upiStatus ? 'orange' : '#EAEAEA'},
                                        CardDStyle.payButtonStyle,
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
                                    onPress={()=> this.payUPI("PAY")}
                                    style={[
                                        {backgroundColor: 'orange'},
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
                </View>
                {/*</KeyboardAwareScrollView>*/}

            </ScrollView>

        )
    }
}

const mapStateToProps = state =>{
    return{
        registrationId: state.UserReducer.registrationId,
    }
};

export default connect(mapStateToProps,{updateCardType},)(CardDetails);
