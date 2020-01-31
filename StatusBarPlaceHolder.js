import {Platform, StatusBar, View} from "react-native";
import { isIphoneX } from 'react-native-iphone-x-helper'
 
import React from "react";
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ?isIphoneX()?36: 20 : 0;
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