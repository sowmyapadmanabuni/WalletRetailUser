import { StyleSheet } from "react-native";
import base from "../../base";
import colors from "../../base/theme/colors";

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
        //backgroundColor:'yellow',
        //borderLeftWidth:0.5,borderRightWidth:0.5,
        //borderTopWidth:0.5,borderBottomWidth:0.5,
        marginLeft:'2%',marginRight:'2%',
        marginTop:'5%',
        borderRadius:7
    },

    cardInputViewStyle:{
        //backgroundColor: "yellow",
        borderWidth:1,
        borderRadius:4,
        borderColor: colors.grey,
        height:'80%',
    },
    cardInputStyle:{
        padding:2,
        //marginLeft:'6%',
        textAlign:'center',
        fontSize:15,
    },
    shadow: {
        //borderColor:'#EFEFEF', // if you need
        borderBottomColor:'#EFEFEF',
        borderBottomWidth:2,
        //borderWidth:1,
      //  overflow: 'hidden',
        shadowColor: '#EFEFEF',
        shadowRadius: 10,
        shadowOpacity: 1,
    },
    topSec:{
        //alignItems:'baseline',
        alignItems:'center',
        //justifyContent:'center',
        //backgroundColor:'yellow',
        flexDirection:'row',
        marginTop:'5%',
        marginLeft:'3%',
    },
    topSecTxtSize:{
        fontSize:15,
        marginRight:'1%',
    },
    payeeStyle:{
        height:'70%',
        fontWeight:'bold',
        borderBottomWidth:1,
        borderBottomColor: colors.black,
        marginRight:'1%',
    },
    savedCardMainView:{
        height:"25%" ,
        //backgroundColor:'yellow',
        justifyContent:'center',
        alignItems: "center",

        //marginLeft:'-5%',

    },
    savedCardView:{
        backgroundColor:colors.grey,
        height:'80%',
        width:'80%',
        borderRadius:7,
        padding:'2%',
        paddingLeft:'4%',
        paddingRight:'4%',

        // position:'absolute',
        // marginLeft:'10%',
        // marginTop:'-10%',
    },
    savedCardView2:{
        //backgroundColor:colors.blue,
        height:'100%',
        width:'100%',
        //flex:1,
        borderRadius:7,
        padding:'2%',
        paddingLeft:'4%',
        paddingRight:'4%',

        position:'absolute',
    },
    savedCardNumberStyle:{
        alignItems:'center',
        flexDirection:'row',
        marginTop:'2%',
        //backgroundColor: 'yellow'
    },
    payButtonStyle:{
        width:'65%',
        height:'50%',
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',

        // position:'absolute',
        // bottom:'7%',
        marginBottom:50,
        borderRadius:50,
        borderWidth: 0
    },

});
