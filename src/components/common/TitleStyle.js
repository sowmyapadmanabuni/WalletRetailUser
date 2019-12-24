import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TitleStyle = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> {props.name} </Text>
      {/* <View style={styles.line} /> */}
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row", // TO align them in a row,
    alignItems: "center",
    marginBottom: 20,
    justifyContent:"center",
   
    
  },
  // line: {
  //   borderTopColor: "#777",
  //   borderTopWidth: 0.6,
  //   flex: 1
  // },
  text: {
    fontSize: 18,
    marginRight: 13,
    color: "orange",
    fontWeight: "400"
  }
});

export default TitleStyle;
