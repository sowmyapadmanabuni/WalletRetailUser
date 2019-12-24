import React,{Component} from 'react';
import {View,Text,ScrollView} from 'react-native';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import {connect} from 'react-redux';
import {updateCardType} from '../../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import base from '../../base';
import CardView from 'react-native-cardview';
import { TextInput, } from 'react-native-gesture-handler';
import { GlobalStyle } from '../../components/common/GlobalStyle';
import { CardDStyle } from './CardDSytle';

class CardDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            item:null,
            collapsed : false,
            CardType:[
                {label:'Credit Card',value:0},
                {label:'Debit Card',value:1},
                {label:'Netbanking',value:2},
                {label:'UPIs',value:3},
                
            ],
         
            initialCardPos : -1,
            formKey:0,
        };
    }

    ComponentHideAndShow = () =>{
      this.setState(previousState => ({collapsed: !previousState.collapsed}))
     
  }

    onSelect = (index, value) => {
        const {updateCardType} = this.props;
        let cardValue = this.state.CardType[index].label;
    
        // Action here with the value
        updateCardType(cardValue);
    
        // alert(radioValue); // Pass this value to reducer
      };
    
  renderCollapsedView =()=>{
 return(
      <View style ={CardDStyle.collapsedContainer}>
      
        <CardView 
              cardElevation={3}
              cardMaxElevation={3}
              cornerRadius={7}>
            <View style ={CardDStyle.marginContainer}>
                <Text>
                  Name On Card 
                </Text>
                <TextInput style = {GlobalStyle.InputContainer}/>  
            </View>
        
            <View>
               <Text style={{marginLeft:'5%',marginTop:'3%'}}>Enter Card Number</Text>
              <View style ={{flexDirection:'row',}}>
                  <TextInput style ={{...CardDStyle.textInputStyle,...CardDStyle.borderContainer}}placeholder="X X X X" />
                  <TextInput style ={{...CardDStyle.textInputStyle,...CardDStyle.borderContainer}}placeholder="X X X X" />
                  <TextInput style ={{...CardDStyle.textInputStyle,...CardDStyle.borderContainer}}placeholder="X X X X" />
                  <TextInput style ={{...CardDStyle.textInputStyle,...CardDStyle.borderContainer}}placeholder="X X X X" />
              </View>
              <View style={{flexDirection:'row'}}>
                  <Text style={{marginLeft:'5%',marginTop:'7%'}}>Expires On</Text>
                  
                  <TextInput style ={{...CardDStyle.expiryContainer,...CardDStyle.borderContainer}}placeholder="MM" />
                  <TextInput style ={{...CardDStyle.expiryContainer,...CardDStyle.borderContainer}}placeholder="YY" />

                  <Text style={{marginLeft:'10%',marginTop:'7%'}}>Enter CVV</Text>
                  <TextInput style ={{...CardDStyle.expiryContainer,...CardDStyle.textInputStyle,
                                      ...CardDStyle.borderContainer,marginLeft:'5%'}}
                  placeholder="X X X" />
              </View>
           
            </View></CardView>
      </View>
 )
    
  }
      
  
    render(){
        const{} = this.props;
        const RadioButtons = this.state.CardType.map((data, index) => {
            return (       
                  <RadioButton> 
                    <Text>{data.label}</Text>
                    
                  </RadioButton>
            );
          });

        return(
          <View> 
            
           <View style ={{flexDirection:'row',marginLeft:'3%',marginTop:'7%'}}>
                <Icon style ={{marginTop:'1%'}}
                    name="chevron-left"
                    type="font-awesome"
                    size={15}  
                  onPress={()=>{this.props.navigation.navigate('Amount')}}
                 />
                 <View>
                    <Text style={{marginLeft:'3%',fontSize:15}}>Payment</Text>
                
                      <View>
                        <Text style={{marginTop:'15%'}}>You are paying to {} Rs {}</Text>
                        </View>
                 </View>
                 
            </View>
           <ScrollView>
            <RadioGroup
            style={{marginTop: '5%',marginLeft:'5%'}}
            color="#000000"
            selectedIndex={0}
            activeColor="#ff8c00"
            // onSelect={(index, value) => alert(JSON.stringify(index))}>
            // onSelect={(index, value) => this.onSelect(index, value)}>   
      
            onSelect={(index, value) => {this.ComponentHideAndShow()} }> 
           
               {RadioButtons}
             
          </RadioGroup>
         
         <View>
           {!this.state.collapsed ? this.renderCollapsedView() :<View>{this.state.collapsed}</View>}
           </View>    

           </ScrollView>
        </View>
        
        
        )
    }
   
}


const mapStateToProps = state =>{
       return{
           
       }
}

export default connect(mapStateToProps,{updateCardType},)(CardDetails);