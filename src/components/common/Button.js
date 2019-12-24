import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
// import { maxHeaderSize } from "http";
import Icon from 'react-native-vector-icons/FontAwesome';
// The coloris changing  --- aha not here let me show u this common one right so fine here 
// if i want specific colors when i put buttons there its not changing 
const Button = props => {
  console.log(props.onPress);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.onPress ? props.onPress() : null;
      }}
    >
      <View style={[styles.buttonStyle, {...props.style},  props.shadow ? { elevation: 5,shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * 5 },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * 5} : {} ]}>
        <Text style={[{ color: "#fff"}, {...props.textStyle}]}>{props.title}</Text>
        
        {/* <Text>{props.title}</Text> */} 
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
   // backgroundColor: "orange",
    backgroundColor:'#FFB81A',
    borderRadius: 50,
    padding: 10,
    height: 45,
    display: "flex",
    justifyContent: "center",
    width: "30%",
    alignItems: "center",

  }
});

export default Button;


