import React,{Component} from 'react';
import {Text,View,StyleSheet,TextInput,Keyboard,TouchableWithoutFeedback,Image} from 'react-native';
import base from '../../base';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/common/Button';
import {CardDStyle} from '../PaymentGateWay/CardDSytle';
import {Style} from './Style';

class Amount extends Component{
constructor(props){
  super(props);
  this.state={
    value : 0
  }
}


// updateInput(evt){
 
//   this.setState={value:evt}
//   alert(
//     "vvvvvv "+this.state.value)
// }
updateInput=()=>{
  console.log('On click works')
  this.setState( { value: this.state.value })
}

render(){
  alert({value:this.state.value})
    return(     
    
           <View style={styles.container}>  
           

<View style ={{backgroundColor:'orange',height:'100%'}}>
                          <View style={{marginLeft:'3%',marginTop:'5%',}}>
                            <Icon 
                                    name="ios-arrow-back"
                                    type="font-awesome"
                                    size={20}
                                    onPress={()=>{this.props.navigation.navigate('QR')}}
                                    
                                    />
                                    

                          </View>
                        
                          <Text style ={styles.textInput}>You are paying to ''</Text>
                          <Text style={styles.textInput1}>Enter Amount</Text>
                         <View style ={styles.SectionStyle}>
                          <Image source={require('../../icons/rupee_black.png')}/>
                       
                          {/* <TextInput style={{...CardDStyle.borderContainer,...Style.inputContainer}} */}
    
                          <TextInput
                          
                          editable = {false}
                          /></View>                        
                       </View>  
                    
                       <View style ={{...Style.amountButtonStyle}}>
                      
                         <Button style ={{backgroundColor:base.theme.colors.white}}
                         onPress={()=>{this.updateInput(1),this.setState.value}}
                         
                         shadow 
                         textStyle = {Style.buttonTextColor}
                         title ='1'/>
                          <Button style ={Style.buttonVisibilityStyle}  
                           onPress={()=>{this.updateInput(2)}}
                         shadow 
                         textStyle = {Style.buttonTextColor}
                         title ='2'/>
                           <Button style ={Style.buttonVisibilityStyle}
                         shadow 
                         textStyle = {Style.buttonTextColor}
                         title ='3'/>
                       </View>
                     <View style ={{...Style.amountButtonStyle, ...{marginLeft:'7%',marginTop:-80}}}>
                       <Button style ={Style.buttonVisibilityStyle}
                         shadow 
                         textStyle = {Style.buttonTextColor}
                         title ='4'/>
                       <Button style ={Style.buttonVisibilityStyle}
                         shadow 
                         textStyle = {Style.buttonTextColor}
                         title ='5'/>
                      <Button style ={Style.buttonVisibilityStyle}
                         shadow 
                         textStyle = {Style.buttonTextColor}
                         title ='6'/>
                      </View>
                      <View style ={{...Style.amountButtonStyle, ...{marginLeft:'7%',marginTop:-80}}}>
                       <Button style ={Style.buttonVisibilityStyle}
                         shadow 
                         textStyle = {Style.buttonTextColor}
                         title ='7'/>
                       <Button style ={Style.buttonVisibilityStyle}
                         shadow 
                         textStyle = {Style.buttonTextColor}
                         title ='8'/>
                      <Button style ={Style.buttonVisibilityStyle}
                         shadow 
                         onPress={()=>{alert("Hey")}}
                         textStyle = {Style.buttonTextColor}
                         title ='9'/>
                      </View>
                      <View style ={{...Style.amountButtonStyle, ...Style.amountButton23Style}}>
                       <Button style ={Style.buttonVisibilityStyle}
                         shadow 
                         textStyle = {Style.buttonTextColor}
                         title ='10'/>
                     <View style ={{marginTop :'40%',marginLeft:'50%'}}>
                      <Button  style={{marginLeft:'30%',marginTop:-20,width:45,height:45}}
                      onChangeText={(value)=>this.setState({text})}
                      onPress={()=>{
                        this.props.navigation.navigate("CardDetails")
                      
                      }}
                     
                        title={
                        <Icon 
                          name="ios-checkmark"
                          size={55}
                          color= "white"
                        />
                         }
                      /> 
                  
                  </View> 
                         </View>     
            </View>   
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#FFB81A',
    flex:1,
    height: '45%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  
  },
  textInput: {
   color :base.theme.colors.white,
   marginTop :'5%',
   textAlign:'center',
   fontSize : 15,
   
  },
  textInput1:{
    color:base.theme.colors.black,
    fontSize :15,
    textAlign :'center',
    marginTop:'5%'
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems:'center',
    backgroundColor:'white',
    borderWidth: .5,
    borderColor: 'white',
    height: '20%',
    borderRadius: 7,
    width:'80%',
    margin: 20,
    marginLeft:'10%'
},
  
});


export default Amount;