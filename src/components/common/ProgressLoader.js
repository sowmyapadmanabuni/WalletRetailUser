import React from "react";
import { View, Text, StyleSheet ,ActivityIndicator,Modal,TouchableOpacity} from "react-native";

const ProgressLoader=({visible})=>{
   return(
    <Modal
    animationType="fade"
    transparent={true}
    visible={visible}>

    <TouchableOpacity
        style={{
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.62)'
        }}
        activeOpacity={1}>
        <View style={{
            marginLeft: 30,
            marginRight: 30,
            backgroundColor: '#fff',
            elevation: 24,
            minWidth: 200,
            borderRadius: 5,
        }}>
            <View style={{ marginTop: 15, alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
            <Text style={{
                fontWeight: 'bold',
                fontSize: 20,
                textAlign: 'center',
                margin: 10
            }}>{"Please wait..."}</Text>
        </View>
    </TouchableOpacity>
</Modal>
   )
}
export default ProgressLoader;