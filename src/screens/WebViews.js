import React,{Component} from 'react';
import {WebView} from 'react-native-webview';
//import RNRsaEncryption from '@akeo/react-native-rsa-encryption';
import { View,Text,Dimensions,Platform } from 'react-native';
import qs from 'querystring'
import axios from 'axios'
import base from '../base'
import LottieView from 'lottie-react-native';
import CcavenueEncryption from 'react-native-ccavenue-encryption';


const {width, height} = Dimensions.get('window');

class WebViews extends Component{
    

    constructor(props){
        super(props)
        this.state={
            isLoad:false,
            pay_url:'https://secure.ccavenue.com/transaction/initTrans',
            paybody:'',
            access_code:'',
            merchantID:'',
            currency:'INR',
            redirectUrl:'',
            cancelUrl:'',
            oid:'',
            customerID:9539,
            amount:this.props.navigation.state.params.amount,
            language:"EN"
        }
    }
    
    componentDidMount(){
        console.log(`http://${this.props.oyeURL}/oyeliving/api/v1/PaymentHDFCCreate`)
        console.log("PROP__",this.props)
        //this.setState({isLoad:false})
        this.getHDFCPaymentGateWay()
        
    }

   async encrypt(_msg, _key, cb){
        console.log("Staring encryption: ",_msg)
        console.log("Using key: ",_key)        
        let enc = await CcavenueEncryption.encrypt(_msg, _key)
        console.log("NATIVE_MODULE",enc)
        cb(enc)
    }

    
     //enc_val=MucQgOOeJ2tcDPfwTHE7QDtWSJGorVtgcFw81OjalIvMcBgyd2RafdLdsbKEGI8BeiuPZJ%2FcjYcX%0ACjFQRJcCWmqOelwwY1%2BnvgGlaE2%2FMTbbcSHrx9umKUzx%2Fp8Tc8zdZxd8%2BDxMV8bVIPdq%2Ft5cDKyl%0AZ6UZJ9yLOEM7kZUZZylG21C5wI7gNwsaUQw3A49wRvMC5zQWucU2H3xQFuB8oXwdfu6Ov13rQLJ5%0A1aJyrx%2B6mDSh9E6MxqgWxtrIej7c6NvH%2F2FVM%2Fdu2rAsaJvROlJPCuX7g3iI%2Fkq0zxzcg4G8wHO2%0ARG7xgde84eKLJTZC9OmTJlabFbGVHP6JVhHY3A%3D%3D%0A
     

     getHDFCPaymentGateWay(){
         let self = this;
        axios
            .post(
                `http://devapi.oyewallet.com/wallet/api/v1/PaymentHDFCCreate`,
                {
                  "chargetotal":self.state.amount,
                  "customerID": self.state.customerID
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'X-Champ-APIKey': '1FDF86AF-94D7-4EA9-8800-5FBCCFF8E5C1',
                    'Authorization':'my-auth-token'
                  }
                }
            )
            .then(response => {console.log('RESPONSE >>>>>',response.data.data);
            if(response.data != undefined && response.data.data != undefined && response.data.data.merchantID != undefined){
                let paymentData = response.data.data;
                self.setState({
                    access_code:paymentData.access_code,
                    merchantID:paymentData.merchantID,
                    currency:paymentData.currency,
                    redirectUrl:paymentData.redirectUrl,
                    cancelUrl:paymentData.cancelUrl,
                    oid:paymentData.oid,
                    language:paymentData.language
                },()=>{
                    self.getRSA()
                    
                })
            }else{
                alert("No Payment Information from server")
            }
            
              
            }).catch(error => console.log("ERROR",error))
    }

    async getRSA(params, card){
        let self = this;
        let rsaResponse = await axios({
            method: 'post',
            url: 'http://devapi.oyewallet.com/GetRSAValue',//'https://secure.ccavenue.com/transaction/jsp/GetRSA.jsp',
            data: qs.stringify({'access_code':self.state.access_code,'order_id':self.state.oid}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
        });
        if(rsaResponse != null && rsaResponse != undefined && rsaResponse.data != undefined){
            console.log("Encrypt_key",rsaResponse.data)
            this.buildparams(rsaResponse.data)
        }else{
            alert("Payment cannot be completed")
        }       
    }

    async buildparams(encKey){
        let self = this;
        let param_qp = "access_code="+this.state.access_code+"&merchant_id="+this.state.merchantID+"&order_id="+this.state.oid+"&redirect_url="+this.state.redirectUrl+"&cancel_url="+this.state.cancelUrl+"&language="+this.state.language+"&billing_name=Charli&billing_address=Room no 1101 near Railway station Ambad&billing_city=Indore&billing_state=MH vi&billing_zip=425001&billing_country=India&billing_tel=9595226054&billing_email=pratik.pai@avenues.info&delivery_name=Chaplin&delivery_address=room no.701 near bus stand&delivery_city=Hyderabad&delivery_state=Andhra&delivery_zip=425001&delivery_country=India&delivery_tel=9595226054&merchant_param1=additional Info.&merchant_param2=additional Info.&merchant_param3=additional Info.&merchant_param4=additional Info.&"//payment_option=OPTDBCRD&card_type=DBCRD&card_name=Andhra Bank&issuing_bank=State Bank of India&
        let card_info = this.props.navigation.state.params.card;
        let amount = this.props.navigation.state.params.amount;
        console.log("param_qp",param_qp)
        console.log(card_info)
        console.log(amount)
        let cardKeys = Object.keys(card_info);
        console.log(cardKeys)
        var card_string_builder = "";//"cvv_number=&amount=1.00&currency=INR&card_number=&customer_identifier=stg&expiry_year=2027&expiry_month=07&";
        for(let card_param of cardKeys){
            console.log(card_param)
            let key_val = card_param+"="+card_info[card_param]+"&"
            card_string_builder+=key_val
        }
        card_string_builder+="amount="+amount+"&currency=INR&customer_identifier="+this.state.customerID+"&merchant_id="+this.state.merchantID

        console.log("card_string_builder",card_string_builder)
        this.encrypt(card_string_builder,encKey,async function(enc){
            let encoded = await CcavenueEncryption.urlEncode(enc.encrypted)
            
            console.log("After Encrp",enc.encrypted)//cipherTextString //encryptedSecretKey
            let encval = "enc_val="+(encoded.encoded)
            
            // ("DhCayQ0VZtSuMrr5Yi9D5z9bHN68wjPAXPHFk3rMStDaOMzx5c/qvKw7Hc3KGEGYz1rPYaWTz5E2"+
            // "GcE5FOXxv+D55wFMbdLJjzkftu4KSjdtXrctw4M2s+Qvwyt2SSbAyReEtQtV+JHp+L6dipWJMRay"+
            // "mjiAchvaBmZxLIPRlU9dymEshR7qE7B/43VBUihTWyaAboaGRSJFakcDKRgc8f1bRJm+0wwOmnkw"+
            // "LmpQ2FPnoYaAkamSnIhPTlHTMkDLhHJxywxftb4uJQo0cwY97MVtI0deXXOFPukv9wlWZAtAltGh"+
            // "n0flIK7/LAVJR5GbtTj5ABzEICMOFl0mKc6pow==")
            //card_string_builder+=(encval)
            console.log(card_string_builder)
            param_qp+=encval
            console.log("FINAL",param_qp)
            //console.log(self.toUTF8Array(param_qp))
            //let str ="access_code=4YRUXLSRO20O8NIH&merchant_id=2&order_id=4269470&redirect_url=http://122.182.6.216/merchant/ccavResponseHandler.jsp&cancel_url=http://122.182.6.216/merchant/ccavResponseHandler.jsp&language=EN&billing_name=koCharli&billing_address=Room no 1101 near Railway station Ambad&billing_city=Indore&billing_state=MH&billing_zip=425001&billing_country=India&billing_tel=9595226054&billing_email=pratik.pai@avenues.info&delivery_name=Chaplin&delivery_address=room no.701 near bus stand&delivery_city=Hyderabad&delivery_state=Andhra&delivery_zip=425001&delivery_country=India&delivery_tel=9595226054&merchant_param1=additional Info.&merchant_param2=additional Info.&merchant_param3=additional Info.&merchant_param4=additional Info.&payment_option=OPTCRDC&card_type=CRDC&card_name=Visa&issuing_bank=State Bank of India&enc_val=yUJg%2BxTTlofKGyiVHMIPNdyRNN5gKI2WSz15DvQmp8GX6bC%2F3FiZqTgaxo2gbdFhGec9dp2MgK2R%0APrSONLH4NJihqmd9WqB%2BbZCYySE4rn1G8Y1l5lDkWO8BEnH3WSzbTy6%2F7vma7Xp3XyyNJxlJuU4Z%0AY0hsgcqBevHD0jE2ay2G%2BTWGUTu9q5cVTLLTSXNZawBJezB8hjC%2BzwvVf08IZjS3U6ShRZ8sw7Er%0A%2BzI0l7DqA9lpksbsWgXiyJmEW0sxVGUBu%2B7DO4p1OMrzkVhsjVZqCfMN3kV9BsHNCO7v8Lq7kabl%0A8pJwjs8Nn%2BXi8B1%2B5cP2f7fxqKOZD%2FS23hkUpg%3D%3D%0A"
            self.setState({isLoad:true,paybody:param_qp})
        });
        

    }

    toUTF8Array(str) {
        var utf8 = [];
        for (var i=0; i < str.length; i++) {
            var charcode = str.charCodeAt(i);
            if (charcode < 0x80) utf8.push(charcode);
            else if (charcode < 0x800) {
                utf8.push(0xc0 | (charcode >> 6), 
                          0x80 | (charcode & 0x3f));
            }
            else if (charcode < 0xd800 || charcode >= 0xe000) {
                utf8.push(0xe0 | (charcode >> 12), 
                          0x80 | ((charcode>>6) & 0x3f), 
                          0x80 | (charcode & 0x3f));
            }
            // surrogate pair
            else {
                i++;
                // UTF-16 encodes 0x10000-0x10FFFF by
                // subtracting 0x10000 and splitting the
                // 20 bits of 0x0-0xFFFFF into two halves
                charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                          | (str.charCodeAt(i) & 0x3ff));
                utf8.push(0xf0 | (charcode >>18), 
                          0x80 | ((charcode>>12) & 0x3f), 
                          0x80 | ((charcode>>6) & 0x3f), 
                          0x80 | (charcode & 0x3f));
            }
        }
        return utf8;
    }

    handleMessage = (event) => {
        console.log("handleMessage::",event.nativeEvent.data);
     }

     _onNavigationStateChange(webViewState){
        console.log("_onNavigationStateChange:",webViewState.url)
        console.log("_onNavigationStateChange_2:",webViewState)
        if(webViewState.url.indexOf("command=retryTransaction")!=-1){
            alert("Transaction Failed")
            this.props.navigation.goBack()
        }
      }

    render(){
        const jsCode = "window.postMessage(document.getElementsByTagName('html')[0].innerHTML)"
        return(
          <View style={{flex:1}}>

          {
              this.state.isLoad?
            <WebView       
            style={{height:height,width:width}}
                    javaScriptEnabled={true}
                    domStorageEnabled   
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                    onMessage={this.handleMessage}
                    originWhitelist={["*"]}
                    nativeConfig={true}
                    useWebKit={Platform.OS == 'ios'}
                    thirdPartyCookiesEnabled={true}
                    scrollEnabled={true}
                    thirdPartyCookiesEnabled={true}
                    injectedJavaScript={jsCode}
            source={{uri: this.state.pay_url,method: 'POST', body:this.state.paybody}}

            />:<View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                    <Text style={{fontSize:24,color:'black',fontWeight:'bold',marginBottom:32}}>Processing</Text>
                    <LottieView style={{alignSelf:'center',marginTop:32}} source={require('../icons/processing.json')} autoPlay loop />
            </View>
            }
            
            </View>
         
        )
    }
}

export default WebViews;
