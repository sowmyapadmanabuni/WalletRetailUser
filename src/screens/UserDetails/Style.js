import { StyleSheet } from "react-native";
import base from "../../base";

export const Style = StyleSheet.create({
        textStyle :{     
          marginTop  : '5%',
          marginLeft : '10%',
          flexDirection : 'row',
                
        },
        textButtonPosition :{
          backgroundColor:base.theme.colors.transparent, width : '70%',bottom:13,left:-35
        },
        buttonOverLay :{
          position: 'absolute',top:'70%', left: '30%', right: 0,width:'40%', height: '15%'
        },
        headerText: {
          textAlign:'center',
          marginTop: '3%',
          marginBottom:'3%',
          marginLeft:'15%',
          borderBottomColor:'black',borderBottomWidth:0.3
        },
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        },
        cardViewStyle:{
          marginTop:5,marginLeft:40,marginRight:40,flexDirection:'row',   
        },
        inputContainer:{
          marginLeft:'15%',marginRight:'15%',marginTop:'5%',backgroundColor:'white',
          borderRadius:7,borderColor:'white'
        },
        amountButtonStyle:{
          marginTop:'10%',width:'40%',height:'50%',marginLeft:'20%',flexDirection:'row'
        },
        buttonTextColor:{
          color:base.theme.colors.black
        },
        buttonVisibilityStyle:{
          backgroundColor:base.theme.colors.white,marginLeft:'30%'
        },
        amountButton23Style:{
          marginLeft:'30%',marginTop:-80
        }
      
});