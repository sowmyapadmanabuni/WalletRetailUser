import React,{Component} from "react";
import {View,Text,StyleSheet,Image,TouchableHighlight, Dimensions} from "react-native";
import base from "../base";
import Button from '../../src/components/common/Button';
// import Carousel from "react-native-snap-carousel";


// const height=Dimensions.get('window').height;
// const width = Dimensions.get('window').width;

class Start extends Component{
    constructor(props){
        super(props);
        this.state={
            bodyText:'OyeWallet is your personal cashback app.\n'+
                       'Earn cashback for every purchase that you make in the stores near you.'+
                       'Make the most of\ntop cashback offers from the wallet app.',
            images: [ '../icons/login_img.png','../icons/Bills.png'],     
                    }                        
    } 

    componentDidMount() {
        // alert(height)
    }
    render(){
        return(        
            <View style ={styles.backgroundcontainer}>  
            <Image resizeMode={"contain"} style={{}} source={require('../icons/login_img.png')} />             
              <Text style={{padding:'10%',fontSize:28 }}>
                <Text style={{color:base.theme.colors.white}}>Welcome!</Text>{'\n'}<Text>To The OyeWallet</Text>{'\n'}{'\n'}
                <Text style={{fontSize:14,color:base.theme.colors.white}}>{this.state.bodyText}</Text>


                </Text>
             
                <Button  style ={styles.ButtonContainer}
                title="GET STARTED"    
                onPress={()=>{
                   this.props.navigation.navigate("Otp");
                }}
                />
              </View>
         
        )
    };
};

const styles = StyleSheet.create(
    {
        backgroundcontainer:
        {
            flex:1,
            backgroundColor:'#FFB81A',
            resizeMode:'cover' ,
            position: 'relative'
        },
        ButtonContainer:
        {
            width:'30%',
            backgroundColor:'#FFD16B',
            marginLeft:'30%'  
        }
       
    }
)

export default Start;