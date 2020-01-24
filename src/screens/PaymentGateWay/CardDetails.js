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
import {TextInput,} from 'react-native-gesture-handler';
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

    setRadio(){
        const { checked } = this.state;
        const{} = this.props;
        const RadioButtons = this.state.CardType.map((data, index)=>{
            return(
                <View style={{width:'90%',alignSelf:'center',borderWidth:0, }}>
                    <View style={{flexDirection:'row', alignItems:'center',
                        //marginBottom:index===3?130:0, marginTop:index===0?50:0
                        // marginBottom:index===3?130:0, marginTop:index===0?50:0
                    }}>
                        <RadioButton
                            color={ 'orange'}
                            value= {data.label}
                            status={checked === data.label ? 'checked' : 'unchecked'}
                            onPress={() => {
                                if (this.state.checked !== data.label){
                                    this.setState({
                                        checked: data.label,
                                        cardName:'',
                                        block1:'', block2:'', block3:'', block4:'',
                                        year:'', month:'',
                                        cvv:'',
                                    });
                                }
                            }}
                        />
                        <View style={{flex:1 }}>
                            <Text>{data.label}</Text>
                        </View>
                        {
                            ( (this.state.checked === 'Credit Card' && data.label === "Credit Card") || (this.state.checked === 'Debit Card' && data.label==="Debit Card") ) &&
                            (this.state.block1 !== '' && this.state.block2 !== '' && this.state.block3 !== '' && this.state.block4.length > 1) && this.state.month !== '' && this.state.year !== '' && this.state.cardName !== '' &&
                            <TouchableOpacity
                                onPress={()=>{
                                    this.setState({saveCard : true});
                                    //this.saveCardPress()
                                    this.payAction('SAVE')
                                }
                                }
                                style={{flexDirection:'row', right:'3%'}}>
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

                        >

                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text>
                                    Name On Card
                                </Text>
                                <TextInput
                                    value={this.state.cardName}
                                    ref= "cardName"
                                    returnKeyType={'next'}
                                    maxLength={30}
                                    onSubmitEditing={() => {
                                        this.refs.block1.focus()
                                    }}
                                    onChangeText={(num) => {
                                        let check = /^[a-zA-Z\s]*$/ ;
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
                                        if (num.length === 30) {
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
                                    <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, }}>
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

                                                           let check = /^[0-9]*$/ ;
                                                           if (check.test(num[num.length - 1]) || num.length === 0)
                                                               this.setState({block1: num});

                                                           if (num.length === 4){
                                                               this.detectCardType(
                                                                   num, '2'
                                                               );
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

                                                           let check = /^[0-9]*$/ ;
                                                           if (check.test(num[num.length - 1]) || num.length === 0)
                                                               this.setState({block2: num});

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

                                                           let check = /^[0-9]*$/ ;
                                                           if (check.test(num[num.length - 1]) || num.length === 0)
                                                               this.setState({block3: num});

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
                                                       onSubmitEditing={() => {
                                                           this.refs.month.focus()
                                                       }}
                                                       onChangeText={(num) => {

                                                           let check = /^[0-9]*$/ ;
                                                           if (check.test(num[num.length - 1]) || num.length === 0)
                                                               this.setState({block4: num});

                                                           if (num.length > 1) {
                                                               if (num.length === 0) {
                                                                   this.refs.block3.focus()
                                                               }
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
                                        <Image  style={{alignSelf: 'center', marginLeft:'4%'}}
                                                source={require('../../icons/credit-card.png')}
                                        />
                                    }
                                    {
                                        this.state.cardType2 === "diners" &&
                                        <Image  style={{alignSelf: 'center',marginLeft:'4%'}}
                                                source={require('../../icons/diners-club.png')}
                                        />
                                    }
                                    {
                                        this.state.cardType2 === "discover" &&
                                        <Image  style={{alignSelf: 'center',marginLeft:'4%'}}
                                                source={require('../../icons/discover.png')}
                                        />
                                    }
                                    {
                                        this.state.cardType2 === "jcb" &&
                                        <Image  style={{alignSelf: 'center',marginLeft:'4%'}}
                                                source={require('../../icons/jcb.png')}
                                        />
                                    }
                                    {
                                        this.state.cardType2 === "mastercard" &&
                                        <Image  style={{alignSelf: 'center',marginLeft:'4%'}}
                                                source={require('../../icons/mastercard.png')}
                                        />
                                    }
                                    {
                                        this.state.cardType2 === "visa" &&
                                        <Image  style={{alignSelf: 'center',marginLeft:'4%'}}
                                                source={require('../../icons/visa.png')}
                                        />
                                    }
                                    {
                                        this.state.cardType2 === "american" &&
                                        <Image  style={{alignSelf: 'center'}}
                                                source={require('../../icons/american-express.png')}
                                        />
                                    }
                                    {
                                        this.state.cardType2 !== "diners" && this.state.cardType2 !== "discover" && this.state.cardType2 !== "jcb" && this.state.cardType2 !== "mastercard" && this.state.cardType2 !== "visa" && this.state.cardType2 !== "american" &&
                                        <View
                                            style={{
                                                //marginLeft:'4%',
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
                                    <View style={[CardDStyle.cardInputViewStyle, {marginLeft:'4%', width:'22%'}]}>
                                        <TextInput style={CardDStyle.cardInputStyle}
                                                   ref={"month"}
                                                   value={this.state.month}
                                                   blurOnSubmit={ false }
                                                   keyboardType={"number-pad"}
                                                   maxLength={2}
                                                   placeholder="mm"
                                                   returnKeyType={'next'}
                                                   onSubmitEditing={(num) => {
                                                       if (this.state.month.length == 1)
                                                           this.setState({
                                                               month : '0'+this.state.month
                                                           })
                                                       this.refs.year.focus()
                                                   }}
                                                   onChangeText={(num) => {
                                                       let check = /^[0-9]*$/ ;
                                                       //console.log("vbvvbvbv ", check.test(num[num.length - 1]))
                                                       if (check.test(num[num.length - 1]) || num.length === 0) {
                                                           if (parseInt(num) < 0 || parseInt(num) > 12) {
                                                               num = num.substring(0, num.length - 1)
                                                           } else {
                                                               this.setState({month: num});
                                                           }
                                                       }
                                                       if (num.length === 2 ) {
                                                           this.refs.year.focus()
                                                       }

                                                       // console.log("detectCardType ", this.detectCardType(
                                                       //     this.state.block1 + this.state.block2 + this.state.block3 + this.state.block4
                                                       // ))

                                                       //this.setState({month: num});
                                                   }
                                                   }
                                        />
                                    </View>
                                    <View style={[CardDStyle.cardInputViewStyle, {marginLeft:'2%', width:'22%'}]}>
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

                                                       //console.log(">>num ",num, this.month, new Date().getMonth() + 1, this.year);
                                                       //console.log(">>num ",num, this.year, num < this.year);
                                                       //if (num.length === 2 && this.month)
                                                       //this.setState({year: num});

                                                       //if(num.length === 2 && this.month[0] !== '0' && this.year < num){


                                                       let check = /^[0-9]*$/ ;
                                                       if (check.test(num[num.length - 1]) || num.length === 0) {
                                                           if (num.length === 2 && num < this.year) {
                                                               if (parseInt(num) < this.year || (this.state.month < this.month && this.year === parseInt(num))) {
                                                                   console.log(">>num ", num, this.year, num < this.year);
                                                                   num = num.substring(0, num.length - 1)
                                                                   console.log(">>num  ", num)
                                                               } else {
                                                                   console.log(">>num ==== ", num)
                                                                   this.setState({year: num});
                                                               }
                                                           } else
                                                               this.setState({year: num});
                                                       }

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
                                                   maxLength={4}
                                                   placeholder="XXX"
                                                   secureTextEntry={true}
                                                   onChangeText={(num) => {
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

                        >

                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text>
                                    Name On Card
                                </Text>
                                <TextInput
                                    value={this.state.cardName}
                                    ref= "cardName"
                                    returnKeyType={'next'}
                                    maxLength={30}
                                    onSubmitEditing={() => {
                                        this.refs.block1.focus()
                                    }}
                                    onChangeText={(num) => {
                                        let check = /^[a-zA-Z\s]*$/ ;
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
                                        if (num.length === 30) {
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
                                    <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, }}>
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

                                                           let check = /^[0-9]*$/ ;
                                                           if (check.test(num[num.length - 1]) || num.length === 0)
                                                               this.setState({block1: num});

                                                           if (num.length === 4){
                                                               this.detectCardType(
                                                                   num, '2'
                                                               );
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

                                                           let check = /^[0-9]*$/ ;
                                                           if (check.test(num[num.length - 1]) || num.length === 0)
                                                               this.setState({block2: num});

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

                                                           let check = /^[0-9]*$/ ;
                                                           if (check.test(num[num.length - 1]) || num.length === 0)
                                                               this.setState({block3: num});

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
                                                       onSubmitEditing={() => {
                                                           this.refs.month.focus()
                                                       }}
                                                       onChangeText={(num) => {

                                                           let check = /^[0-9]*$/ ;
                                                           if (check.test(num[num.length - 1]) || num.length === 0)
                                                               this.setState({block4: num});

                                                           if (num.length > 1) {
                                                               if (num.length === 0) {
                                                                   this.refs.block3.focus()
                                                               }
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
                                        <Image  style={{alignSelf: 'center', marginLeft:'4%'}}
                                                source={require('../../icons/credit-card.png')}
                                        />
                                    }
                                    {
                                        this.state.cardType2 === "diners" &&
                                        <Image  style={{alignSelf: 'center',marginLeft:'4%'}}
                                                source={require('../../icons/diners-club.png')}
                                        />
                                    }
                                    {
                                        this.state.cardType2 === "discover" &&
                                        <Image  style={{alignSelf: 'center',marginLeft:'4%'}}
                                                source={require('../../icons/discover.png')}
                                        />
                                    }
                                    {
                                        this.state.cardType2 === "jcb" &&
                                        <Image  style={{alignSelf: 'center',marginLeft:'4%'}}
                                                source={require('../../icons/jcb.png')}
                                        />
                                    }
                                    {
                                        this.state.cardType2 === "mastercard" &&
                                        <Image  style={{alignSelf: 'center',marginLeft:'4%'}}
                                                source={require('../../icons/mastercard.png')}
                                        />
                                    }
                                    {
                                        this.state.cardType2 === "visa" &&
                                        <Image  style={{alignSelf: 'center',marginLeft:'4%'}}
                                                source={require('../../icons/visa.png')}
                                        />
                                    }
                                    {
                                        this.state.cardType2 === "american" &&
                                        <Image  style={{alignSelf: 'center'}}
                                                source={require('../../icons/american-express.png')}
                                        />
                                    }
                                    {
                                        this.state.cardType2 !== "diners" && this.state.cardType2 !== "discover" && this.state.cardType2 !== "jcb" && this.state.cardType2 !== "mastercard" && this.state.cardType2 !== "visa" && this.state.cardType2 !== "american" &&
                                        <View
                                            style={{
                                                //marginLeft:'4%',
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
                                    <View style={[CardDStyle.cardInputViewStyle, {marginLeft:'4%', width:'22%'}]}>
                                        <TextInput style={CardDStyle.cardInputStyle}
                                                   ref={"month"}
                                                   value={this.state.month}
                                                   blurOnSubmit={ false }
                                                   keyboardType={"number-pad"}
                                                   maxLength={2}
                                                   placeholder="mm"
                                                   returnKeyType={'next'}
                                                   onSubmitEditing={(num) => {
                                                       if (this.state.month.length == 1)
                                                           this.setState({
                                                               month : '0'+this.state.month
                                                           })
                                                       this.refs.year.focus()
                                                   }}
                                                   onChangeText={(num) => {
                                                       let check = /^[0-9]*$/ ;
                                                       //console.log("vbvvbvbv ", check.test(num[num.length - 1]))
                                                       if (check.test(num[num.length - 1]) || num.length === 0) {
                                                           if (parseInt(num) < 0 || parseInt(num) > 12) {
                                                               num = num.substring(0, num.length - 1)
                                                           } else {
                                                               this.setState({month: num});
                                                           }
                                                       }
                                                       if (num.length === 2 ) {
                                                           this.refs.year.focus()
                                                       }

                                                       // console.log("detectCardType ", this.detectCardType(
                                                       //     this.state.block1 + this.state.block2 + this.state.block3 + this.state.block4
                                                       // ))

                                                       //this.setState({month: num});
                                                   }
                                                   }
                                        />
                                    </View>
                                    <View style={[CardDStyle.cardInputViewStyle, {marginLeft:'2%', width:'22%'}]}>
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

                                                       //console.log(">>num ",num, this.month, new Date().getMonth() + 1, this.year);
                                                       //console.log(">>num ",num, this.year, num < this.year);
                                                       //if (num.length === 2 && this.month)
                                                       //this.setState({year: num});

                                                       //if(num.length === 2 && this.month[0] !== '0' && this.year < num){


                                                       let check = /^[0-9]*$/ ;
                                                       if (check.test(num[num.length - 1]) || num.length === 0) {
                                                           if (num.length === 2 && num < this.year) {
                                                               if (parseInt(num) < this.year || (this.state.month < this.month && this.year === parseInt(num))) {
                                                                   console.log(">>num ", num, this.year, num < this.year);
                                                                   num = num.substring(0, num.length - 1)
                                                                   console.log(">>num  ", num)
                                                               } else {
                                                                   console.log(">>num ==== ", num)
                                                                   this.setState({year: num});
                                                               }
                                                           } else
                                                               this.setState({year: num});
                                                       }

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
                                                   maxLength={4}
                                                   placeholder="XXX"
                                                   secureTextEntry={true}
                                                   onChangeText={(num) => {
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
                            label='Bank'
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
                                justifyContent:'center',
                                height:wp(10),
                                //borderColor: colors.grey,
                            }}>
                                <TextInput
                                    placeholder={"Ex: MobileNumber@upi"}
                                />
                            </View>
                            <View>
                                <View style={{flexDirection:'row', alignSelf:'flex-end', marginRight:'5%', marginTop:'2%', borderColor:'#959090'}}>
                                    <TouchableOpacity>
                                        <Text style={{fontSize: 18, marginRight:'5%', color:'#959090'}}>CANCEL</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text style={{fontSize: 18, color:'orange',}}>VERIFY</Text>
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
        // for(i in data){
        //     if (this.state.currentIndex === data[i].value){
        //         this.val = data[i].value
        //         this.bgimg = data[i].bgimg
        //         this.type = data[i].type
        //         this.icon = data[i].icon
        //         this.cardNumber = data[i].cardNumber
        //         this.sMonth = data[i].month
        //         this.sYear = data[i].year
        //         this.num1 =String( data[i].cardNumber).substr(0, 2);
        //         this.num2 =String( data[i].cardNumber).substr(data[i].cardNumber.length-2, data[i].cardNumber.length);
        //         this.bank = data[i].label
        //         console.log("this.num1  ",this.num1 , this.num2);
        //     }
        // }

        let data2 = this.state.savedCardBank2

        // for(i=0 ; i< data2.length ; i++){
        //     console.log("data---- ",data2)
        //     if (this.state.currentIndex === i){
        //
        //         console.log("data{{{{{ ",data2[i], this.state.currentIndex)
        //
        //         this.cardNumber = data2[i].ccCardNumber
        //
        //         let re = {
        //             electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
        //             maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
        //             dankort: /^(5019)\d+$/,
        //             interpayment: /^(636)\d+$/,
        //             unionpay: /^(62|88)\d+$/,
        //             visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        //             mastercard: /^5[1-5][0-9]{14}$/,
        //             amex: /^3[47][0-9]{13}$/,
        //             diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        //             discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
        //             jcb: /^(?:2131|1800|35\d{3})\d{11}$/
        //         };
        //
        //         for(key in re) {
        //             if(re[key].test(this.cardNumber)) {
        //                 console.log("number ", this.cardNumber, key, this.state.cardType, this.state.savedCardBank)
        //                 let typ = this.state.cardType;
        //                 console.log("typ ",typ);
        //                 let j;
        //                 for (j in typ){
        //                     if (typ[j].label === key){
        //                         console.log("key ", key)
        //                         this.ctype = key
        //                         tt = key
        //                         console.log("VVVtyp[j].icon ",this.ctype)
        //                         // this.ctype = typ[j].icon
        //                         // console.log("::::this.ctype ", this.ctype);
        //                     }
        //                     else
        //                         this.ctype = ''
        //                 }
        //             }
        //         }
        //
        //         //this.val = data[i].value
        //         //this.bgimg = data[i].bgimg
        //         //this.type = data[i].type
        //         //this.icon = data[i].icon
        //         this.sMonth = data2[i].expiryMonth
        //         this.sYear = data2[i].expiryYear
        //         this.num1 =String( data2[i].ccCardNumber).substr(0, 2);
        //         this.num2 =String( data2[i].ccCardNumber).substr(data2[i].ccCardNumber.length-2, data2[i].ccCardNumber.length);
        //         //this.bank = data[i].label
        //         console.log("this.num1  ",this.cardNumber, this.month, this.year, this.num1, this.num2);
        //     }
        // }

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

                    {/*
                                <View style={CardDStyle.topSec}>
                                    <Text style={CardDStyle.topSecTxtSize}>You are paying to</Text>
                                    <View style={{
                                        alignSelf: 'center',
                                        borderBottomWidth: 1.5,
                                        borderBottomColor: base.theme.colors.primary,
                                    }}>
                                        <Text
                                            style={[CardDStyle.topSecTxtSize, {
                                                fontWeight: 'bold'
                                            }]}>
                                            The Deely
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
                                        color: colors.orange,
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
                                        For lunch
                                    </Text>

                                </View>
                            */}

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
                                The Deely
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
                            For lunch
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

                <View style={{alignItems:'center',
                    marginTop: this.state.scCardLength === 0 ? '0%' : '50%'
                }}>
                    {
                        this.state.scCardLength > 2 &&

                        <Animated.View
                            style={{
                                width: 300, height: 150,
                                position: 'absolute',
                                borderRadius: 7,
                                backgroundColor: colors[(this.state.currentIndex + 2) % 3],

                                zIndex: 1,
                                bottom: this.state.cardsStackedAnim.interpolate({
                                    inputRange: [0, 1], outputRange: [40, 20]
                                }),
                                transform: [{
                                    scale: this.state.cardsStackedAnim.interpolate({
                                        inputRange: [0, 1], outputRange: [0.80, 0.90]
                                    })
                                }],
                                opacity: this.state.cardsStackedAnim.interpolate({
                                    inputRange: [0, 1], outputRange: [0.3, 0.6]
                                }),
                                alignSelf: 'center'
                            }}
                        />
                    }
                    {
                        this.state.scCardLength > 1 &&

                        <Animated.View
                            style={{
                                width: 300, height: 150,
                                position: 'absolute',
                                borderRadius: 7,
                                backgroundColor: colors[(this.state.currentIndex + 1) % 3],
                                zIndex: 2,
                                bottom: this.state.cardsStackedAnim.interpolate({
                                    inputRange: [0, 1], outputRange: [20, 0]
                                }),
                                transform: [{
                                    scale: this.state.cardsStackedAnim.interpolate({
                                        inputRange: [0, 1], outputRange: [0.90, 1.0]
                                    })
                                }],
                                opacity: this.state.cardsStackedAnim.interpolate({
                                    inputRange: [0, 1], outputRange: [0.6, 1]
                                }),
                                alignSelf: 'center'
                            }}
                        >
                            <ImageBackground source={require('../../icons/Cardic.png')}
                                             style={{width: '100%', height: '100%', borderRadius: 20}}>
                                <View
                                    style={CardDStyle.savedCardView2}
                                >
                                    <View style={{
                                        width: 30,
                                        height: 30,
                                        backgroundColor: 'white',
                                        //borderRadius:7,
                                        //marginLeft:'2%',
                                        //marginTop:'2%',
                                    }}/>
                                    <View style={CardDStyle.savedCardNumberStyle}>
                                        {/*<Text style={{fontSize:15,colors:base.theme.colors.white}}>*/}
                                        {/*    12*/}
                                        {/*</Text>*/}
                                        <Text style={{fontSize: 15, colors: base.theme.colors.white}}>
                                            XXXX - XXXX - XXXX - XXXX
                                        </Text>
                                        {/*<Text style={{fontSize:15,colors:base.theme.colors.white}}>*/}
                                        {/*    3008*/}
                                        {/*</Text>*/}
                                    </View>
                                    <View style={CardDStyle.savedCardNumberStyle}>
                                        <Text style={{fontSize: 15,}}>{this.state.currentSavedCard} Bank Credit
                                            Card</Text>
                                    </View>

                                    <View style={CardDStyle.savedCardNumberStyle}>
                                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                            <View
                                                style={{
                                                    fontSize: 15,
                                                    //backgroundColor:'yellow',
                                                    borderBottomWidth: 1,
                                                    paddingLeft: '2%',
                                                    paddingRight: '2%',
                                                }}
                                            >
                                                <TextInput
                                                    style={{
                                                        padding: 0,
                                                    }}
                                                    keyboardType={"number-pad"}
                                                    placeholder={'Enter CVV'}
                                                    placeholderTextColor={colors.black}
                                                />
                                            </View>
                                            <Text
                                                style={{
                                                    marginLeft: '10%',
                                                    fontSize: 15,
                                                }}
                                            >Done</Text>
                                        </View>
                                        <View style={{
                                            width: 60,
                                            height: 40,
                                            backgroundColor: 'white',
                                            //borderRadius:7,
                                            alignSelf: 'flex-end',
                                            //marginLeft:'2%',
                                            //marginTop:'2%',
                                        }}/>

                                    </View>

                                </View>
                            </ImageBackground>
                        </Animated.View>
                    }
                    {
                        this.state.scCardLength !==0 &&

                        <Animated.View
                            style={{

                                width: 300, height: 150,
                                position: 'absolute',
                                borderRadius: 7,
                                backgroundColor: colors[this.state.currentIndex % 3],
                                zIndex: this.state.cardsStackedAnim.interpolate({
                                    inputRange: [0, 0.5, 1], outputRange: [3, 2, 0]
                                }),
                                bottom: this.state.cardsStackedAnim.interpolate({
                                    inputRange: [0, 1], outputRange: [0, 40]
                                }),
                                opacity: this.state.cardsStackedAnim.interpolate({
                                    inputRange: [0, 1], outputRange: [1, 0.3]
                                }),
                                transform: [
                                    {translateX: this.state.cardsPan.x},
                                    {
                                        scale: this.state.cardsStackedAnim.interpolate({
                                            inputRange: [0, 1], outputRange: [1, 0.80]
                                        })
                                    },
                                ],
                                alignSelf: 'center'
                            }}
                        >
                            <ImageBackground source={this.bgimg}
                                             style={{width: '100%', height: '100%', borderRadius: 20}}>
                                <View
                                    {...this.cardsPanResponder.panHandlers}
                                    style={CardDStyle.savedCardView2}
                                >
                                    <Image resizeMode={"contain"} style={{
                                        width: 30,
                                        height: 30,
                                    }} source={this.icon}/>
                                    <View style={CardDStyle.savedCardNumberStyle}>
                                        <Text style={{fontSize: 15, color: base.theme.colors.white}}>
                                            {this.state.scNum1}
                                        </Text>
                                        <Text style={{fontSize: 15, color: base.theme.colors.white}}>
                                            XX - XXXX - XXXX -
                                        </Text>
                                        <Text style={{fontSize: 15, color: base.theme.colors.white}}>
                                            {this.state.scNum2}
                                        </Text>
                                    </View>
                                    <View style={CardDStyle.savedCardNumberStyle}>
                                        <Text
                                            style={{fontSize: 15, color: base.theme.colors.white}}>{this.bank} Bank
                                            Credit Card</Text>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        marginTop: '30%', paddingLeft: '4%',
                                        paddingRight: '4%',
                                    }}
                                >
                                    <View style={CardDStyle.savedCardNumberStyle}>
                                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                            <View
                                                style={{
                                                    //fontSize:15,
                                                    width: wp(22),
                                                    //backgroundColor:'yellow',
                                                    borderBottomWidth: 1,
                                                    borderBottomColor: base.theme.colors.white,
                                                    paddingLeft: '2%',
                                                    paddingRight: '2%',
                                                }}
                                            >
                                                <TextInput
                                                    value={this.state.savedCardCvv}
                                                    style={{
                                                        padding: 0,
                                                        fontSize: 15,
                                                        color: base.theme.colors.white,
                                                    }}
                                                    onChange={(code) => {
                                                        this.setState({
                                                            savedCardCvv: code
                                                        })
                                                    }}
                                                    maxLength={4}
                                                    secureTextEntry={true}
                                                    keyboardType={"number-pad"}
                                                    placeholder={'Enter CVV'}
                                                    placeholderTextColor={base.theme.colors.white}
                                                />
                                            </View>
                                            <TouchableOpacity
                                                onPress={() => this.chooseSavedCard()}
                                            >
                                                <Text
                                                    style={{
                                                        marginLeft: wp(5),
                                                        fontSize: 15,
                                                        color: base.theme.colors.white
                                                    }}
                                                >Done</Text>
                                            </TouchableOpacity>
                                        </View>

                                        {
                                            this.state.scCardType === "mastercard" &&
                                            <Image
                                                resizeMode={"contain"}
                                                style={{
                                                    width: 60,
                                                    height: 40, alignSelf: 'flex-end',
                                                }}
                                                source={require('../../icons/mastercard.png')}
                                            />
                                        }
                                        {
                                            this.state.scCardType === "diners" &&
                                            <Image
                                                resizeMode={"contain"}
                                                style={{
                                                    width: 60,
                                                    height: 40, alignSelf: 'flex-end',
                                                }}
                                                source={require('../../icons/diners-club.png')}
                                            />
                                        }
                                        {
                                            this.state.scCardType === "discover" &&
                                            <Image
                                                resizeMode={"contain"}
                                                style={{
                                                    width: 60,
                                                    height: 40, alignSelf: 'flex-end',
                                                }}
                                                source={require('../../icons/discover.png')}
                                            />
                                        }
                                        {
                                            this.state.cardType2 === "jcb" &&
                                            <Image
                                                resizeMode={"contain"}
                                                style={{
                                                    width: 60,
                                                    height: 40, alignSelf: 'flex-end',
                                                }}
                                                source={require('../../icons/jcb.png')}
                                            />
                                        }
                                        {
                                            this.state.scCardType === "american" &&
                                            <Image
                                                resizeMode={"contain"}
                                                style={{
                                                    width: 60,
                                                    height: 40, alignSelf: 'flex-end',
                                                }}
                                                source={require('../../icons/american-express.png')}
                                            />
                                        }
                                        {
                                            this.state.scCardType === "visa" &&
                                            <Image
                                                resizeMode={"contain"}
                                                style={{
                                                    width: 60,
                                                    height: 40, alignSelf: 'flex-end',
                                                }}
                                                source={require('../../icons/visa.png')}
                                            />
                                        }
                                        {
                                            this.state.scCardType !== "mastercard" &&
                                            this.state.scCardType !== "visa" &&
                                            this.state.scCardType !== "diners" &&
                                            this.state.scCardType !== "discover" &&
                                            this.state.scCardType !== "jcb" &&
                                            this.state.scCardType !== "american" &&
                                            false &&
                                            <Image
                                                resizeMode={"contain"}
                                                style={{
                                                    width: 60,
                                                    height: 40, alignSelf: 'flex-end',
                                                }}
                                                source={require('../../icons/credit-card.png')}
                                            />
                                        }
                                        {/*{*/}
                                        {/*    this.state.cardType2 === '' &&*/}
                                        {/*    <Image  style={{alignSelf: 'center', marginLeft:'4%'}}*/}
                                        {/*            source={require('../../icons/credit-card.png')}*/}
                                        {/*    />*/}
                                        {/*}*/}

                                        {/*<View style={{*/}
                                        {/*    width:60,*/}
                                        {/*    height:40,*/}
                                        {/*    backgroundColor:'white',*/}
                                        {/*    //borderRadius:7,*/}
                                        {/*    alignSelf:'flex-end',*/}
                                        {/*    //marginLeft:'2%',*/}
                                        {/*    //marginTop:'2%',*/}
                                        {/*}}/>*/}

                                    </View>

                                </View>
                            </ImageBackground>
                        </Animated.View>
                    }
                </View>

                {this.setRadio()}
                {/*</ScrollView>*/}
                <View style={{
                    width:wp(100),
                    alignSelf:'center',
                    justifyContent: 'flex-end',
                    height:hp(10),
                    marginTop: this.state.checked === 'UPIs' ? hp(16.5) : hp(0)
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
                                    onPress={()=> this.payAction("PAY")}
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
