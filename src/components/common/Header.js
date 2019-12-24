import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Header } from "react-native-elements";

class HeaderComp extends Component {
  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <Header
          // leftComponent={{
          //  icon: "long-arrow-left",
          //  type: "font-awesome",
          //   color: "orange"
          // }}
          containerStyle={{
            borderBottomColor: "orange",
            borderBottomWidth: 3,
            justifyContent: "center",
            alignItems: "center",
            height: 65,
            margin: 0,
            padding: 0,
            marginBottom: 14
          }}
          backgroundColor="#fff"
          //  centerComponent={this.props.children}
        centerComponent={<Image resizeMode
          ="contain" style={{ height: 50, width: 50}} source = {require('../../icons/login_img.png')}/>}
        />
        <Text style={styles.headerText}> {this.props.title} </Text>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  headerText: {
    color: "orange",
    textAlign: "center",
    fontSize: 19
  }
});

export default HeaderComp;
