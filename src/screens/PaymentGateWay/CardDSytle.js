import { StyleSheet } from "react-native";
import base from "../../base";

export const CardDStyle = StyleSheet.create({
    marginContainer:{
        marginLeft:'5%',marginTop:'5%',flexDirection:'row'  
      },  
      textInputStyle:
      {
       
        width: '20%',marginLeft:'2.5%',marginTop:'6%',borderRadius:7,height:'20%',padding:2,textAlign:'center',
        fontSize:20,
      },
      expiryContainer:{
       
         width:'7%',height:'10%',marginTop:'6%',padding:5,
        borderRadius:7,marginLeft:'2%',textAlign:'center'
      },
      borderContainer:
      {
         borderLeftWidth:1,borderRightWidth:1,
         borderTopWidth:1,borderBottomWidth:1,
      },
      collapsedContainer:{
        borderLeftWidth:0.5,borderRightWidth:0.5,
        borderTopWidth:0.5,borderBottomWidth:0.5,marginLeft:'2%',marginRight:'2%',marginTop:'5%',
        borderRadius:7
      }

});
