import React from "react";
import { View, StyleSheet } from "react-native";

const Card = props => {
  return <View style={[styles.cardStyle, props.style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  cardStyle: {
    borderWidth: 0.2,
    borderColor: "white", //#777
    paddingHorizontal: 10,
    paddingVertical: 7.5,
    display: "flex",
    elevation: 0.5, // Eleveation works on android alone
    shadowOpacity: 0.3, //Shadows work on just ios
    shadowRadius: 5,
    shadowColor: "#999", //#999
    shadowOffset: { height: 1, width: 1 },
    backgroundColor: "#fff" //#fff
  }
});

export default Card;
