import React,{Component} from 'react';
import {View,Image,StyleSheet,Text} from 'react-native';
import Button from '../../components/common/Button';
import CardView from 'react-native-cardview';
import base from '../../base';
import Icon from 'react-native-vector-icons/FontAwesome';

class PayMerchant extends Component{
    constructor(props){
        super(props);
    }


render(){
    const {}=this.props;
    return(
     <View>
         <View style={{marginTop:'5%',marginLeft:'5%',flexDirection:'row'}}>
            <Button style ={styles.profileButtonSytle} title ="A"/>
               <View style ={{marginLeft:'5%'}}>
                 <Text>FirstName</Text>
                 <Text>+91 9490791523</Text>
                 </View>
                 </View>
            <View> 
                <CardView style={styles.cardStyle}
                                cardElevation={3}
                                cardMaxElevation={3}
                                cornerRadius={2}><Text style ={{color:base.theme.colors.white,fontStyle:'bold'}}>
                                    
                                    Reward Cash Back</Text>
                                    <Text> </Text> 
                                   
                                    </CardView>
            
            {/* <View>     
                <Button style ={styles.buttonStyle}
                
                textStyle={{color: base.theme.colors.black}}
                shadow
                Image = {(require('../../icons/pay.png'))}
                title =  "Make Payment"
                onPress={() => {
                    this.props.navigation.navigate('QR');    
                }}  />
                  
                
                </View> */}
                <CardView style ={{marginLeft :'20%',marginRight:'20%',height:'15%',marginTop:'50%'}}
                cardElevation={3}
                cardMaxElevation={3}
                cornerRadius={7}
                >
                  
                    
                    <View style ={{flexDirection:'row'}}>
                         <Image
                         style={{marginTop:'5%',marginLeft:'10%'}}
                         source={require('../../icons/pay.png')}
                      /> 
                        <Button style ={styles.buttonView}
                        onPress ={()=>{this.props.navigation.navigate('QR')}}
                        textStyle = {{color:base.theme.colors.black}}
                        title ="Make Payment "/>
                    </View>
                    
                </CardView>
            
             
            </View>
        </View>
    )
};
}


export const styles = StyleSheet.create({
    buttonStyle: {
        position: 'absolute',
        width: '60%',
        height: '40%',
        borderRadius: 70,
        marginTop :'80%',
        marginLeft:'20%',
        backgroundColor:'white',  
      },
      cardStyle :{
        marginTop:40,
        marginLeft:30,
        marginRight:30,  
        backgroundColor:base.theme.colors.orange
      },
      buttonView:{
          backgroundColor :'white',width:'60%',marginLeft:'10%',marginTop:'1%',flexDirection:'row'
    },profileButtonSytle:{
        width:'10%',height:'35%',backgroundColor:base.theme.colors.grey
    }

})


export default PayMerchant;