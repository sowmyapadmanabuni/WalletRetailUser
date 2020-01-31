import { StyleSheet } from "react-native";
import base from "../../base";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

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
          position: 'absolute',top:'70%' ,width:'45%', height: '15%',alignItems:'center'
        },
        headerText: {
          textAlign:'center',
          marginTop: '3%',
          marginBottom:'3%',
          marginLeft:'15%',
          //   alignItems:'center',
          //   justifyContent:'center',
          borderBottomColor:'black',
            borderBottomWidth:0.3,
            //backgroundColor:'yellow'
        },
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        },
        cardViewStyle:{
          marginTop:5,
            marginLeft:40,
            marginRight:40,
            flexDirection:'row',
        },
    cardViewStyle2:{
        marginTop:20,
        flexDirection:'row',
        alignItems:'center',
        alignSelf:'center',
        paddingLeft:wp(5),
        paddingRight:wp(5),
        height:hp(10),
        width:wp(80),
    },
    block1:{
            alignItems:'center',
            flexDirection:'row',
            //flex:1,
        justifyContent:'center',
        width:wp(50),
        borderBottomWidth: 0.3,
        borderBottomColor: base.theme.colors.black,
    },
    block2:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',

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
        },
    mobNumOpt:{
            marginTop:hp(5),
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
      
});