import {Platform, StatusBar, View} from "react-native";
import React from "react";
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
export function StatusBarPlaceHolder() {
    return (
        <View style={{
            width: "100%",
            height: STATUS_BAR_HEIGHT,
            backgroundColor: 'orange'
        }}>
            <StatusBar
                barStyle="light-content"
            />
        </View>
    );
}