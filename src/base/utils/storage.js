import React,{Component} from "react";
//import {AsyncStorage} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
export default class storage {

    static async storeData(key,value){
        console.log("<<<<<data storage>>>storeData ",key, value);
        try {
            let data = await AsyncStorage.setItem(key, value)
            console.log("<<<<<data ",data)
        } catch (error) {
            console.log("<<<<<data ",error)
        }
    };
    static async retrieveData(key) {
        console.log("storage>>>retrieveData ",key);
        try {
            const value = await AsyncStorage.getItem(key);
            console.log("storage>>>retrieveData ",key,  value);
            if (value !== null) {
                // We have data!!
                console.log(value);
            }
            return value;
        } catch (error) {
            // Error retrieving data
        }
    };
    static async removeData(key) {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            // Error retrieving data
        }
    };
}
