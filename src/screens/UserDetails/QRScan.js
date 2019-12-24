import React,{Component} from 'react';
import { Text,View,Image,TouchableOpacity} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/common/Button';
import base from '../../base';
import { TextInput, } from 'react-native-gesture-handler';
import CardView from 'react-native-cardview';
import { Style} from './Style';
import CountryPicker,
{
  getAllCountries,
} from 'react-native-country-picker-modal';

class QRScan extends Component{
    constructor(props){
        super(props);
        let mappedCountries = [];
        getAllCountries().then(data => {
          data.map(countries => {
            mappedCountries.push(countries.cca2);
          });
        });
        this.state={
            text1    : 'not able to scan? ',
            text2    : 'Tap to enter mobile number',
           
            content  : false, // to show the mobilenumber cardview 

            cca2: 'IN',
            callingCode: '91',
            countryList: mappedCountries,

        };
        
    }
    onSuccess = (e) => {
      Linking
        .openURL(e.data)
        .catch(err => console.error('An error occured', err));
    }

 ComponentHideAndShow = () =>{
     this.setState(previousState => ({content: !previousState.content}))
 }

 imageTouched =() =>{
   
   console.log("Pressed")
  
 }

    render(){
        return(
       
            <View>
            <View style ={{marginTop:'4%', flexDirection:'row',marginLeft:'2%'}}>
        
                 <Text>Pay</Text>
            </View>    
            <View>
                 <Image
                    style={{marginTop:'10%',marginLeft:'18%'}}
                    source={require('../../icons/qr.png')}
                 />    
                <Button  style ={Style.buttonOverLay}             
                title ='TAP TO SCAN QR'  
                onPress ={()=>{
                    // alert("Camera interface");
                   this.props.navigation.navigate("Scanned");
                
                
                    }}
                />
                </View>
                <View style ={Style.textStyle}>
                       
                        <Text> {this.state.text1}    
                        </Text> 
                        <Button style ={Style.textButtonPosition}
                        title = {this.state.text2}
                         
                        textStyle={{color:base.theme.colors.primary}}
                        onPress={()=>{
                            {this.ComponentHideAndShow()}
                        }} 
                        />                        
                </View>
              <CardView  
              style={Style.cardViewStyle}
              cardElevation={3}
              cardMaxElevation={3}
              cornerRadius={7}
              >  
           {
              this.state.content ? <View style ={{...Style.headerText,flexDirection:'row'}}>  

              <CountryPicker 
         
            onSelect={value => {
          
              this.setState({
                cca2: value.cca2,
                callingCode: value.callingCode,
              });
            }}
   
            countryCode={this.state.cca2}
            withCallingCode
           
            translation="eng"
           withFlagButton={false}
            visible={this.state.visible}
            onClose={() => this.setState({ visible: false })}
           
          />

      <TouchableOpacity 
             style={{marginTop:'13%'}}
             onPress={() => {
             
              this.setState({ visible: true})
             }}>
                <Text>+{this.state.callingCode}</Text>
              </TouchableOpacity>

              <TextInput placeholder="Enter Mobile Number"></TextInput></View>: <View></View>
           }
            { this.state.content ? <View>
             <Button  style={{marginLeft:'30%',marginTop:'5%',width:45,height:45}}
              onPress={()=>{this.props.navigation.navigate("Amount")}}   
              title={
              <Icon 
                name="ios-checkmark"
                size={60}
                color= "white"
              />
            }
            /> 
             </View>: <View></View>
            }
          </CardView>      
   
            </View>      
        )
    } 
   
};


export default QRScan;