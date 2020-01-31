import { StyleSheet } from "react-native";
import base from "../../base";

export const GlobalStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

  },
  cardContainerStyle: {
    marginVertical: 10,
    borderBottomWidth: 0.2
   
  },

  buttonTextSyle: {
    marginVertical: "2%",
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-around"
  },

  noMargins: {
    margin: 0,
    padding: 0
  },
  Title:{
   justifyContent: "center", alignItems: "center"
  },
  rightContainer: {
    justifyContent: "flex-end", flexDirection: "row", marginRight: 10
  },
  overLayText:
  {
   position: 'absolute', top: 20, left: 10, right: 0, height: 300
 },
 SemiCircle:
       {
        marginTop:75,
        width:100, 
        height:120,
        marginLeft:350,
        backgroundColor:'#DCDCDC',
       },
  leftContainer:{
    width:"50%",alignSelf:'flex-start'
  },
  TextBottomBorder :{
    borderBottomWidth:1,width:"80%",borderBottomColor:'#B5B5B5',color:base.theme.colors.black
},   
//Box Input
InputContainer:{
  borderBottomWidth:1,borderLeftWidth: 1,
  borderRightWidth: 1,borderTopWidth:1, width:'65%',height:'70%',
  marginLeft:'5%',marginTop:-10,borderRadius:7
}
});


