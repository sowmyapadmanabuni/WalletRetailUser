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


    static async getasyncstorage(key){
        try {
            var value = await AsyncStorage.getItem(key);            
            return value;
        } catch (e) {
            return null;
        }
    }

    static async saveasyncstorage(key, value, cb){
        try {
            AsyncStorage.setItem(key,JSON.stringify(value),()=>{
                if(cb != undefined){
                    cb()
                }
            });                        
        } catch (e) {
            
        }
    }

    static async removeasyncstorage(key){
        try {
            AsyncStorage.removeItem(key);                        
        } catch (e) {
            
        }
    }

    static getTimeDifference(){
        
    }

    static isvalidemail(val){
        let regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
        if(val != undefined && val != null && val != "" && regex.test(val)){            
            return true;
        }else{
            return false;
        }
    }

    static isvalidmobile(val){
        let regex = /^\d{10}$/;
        if(val != undefined && val != null && val != "" && regex.test(val)){
            return true;
        }else{
            return false;
        }
    }

    static isvalid(val,min){
        if(val != undefined && val != null && val != ""){
            if(min != undefined){                
                if(val.length >= min){
                    return true
                }else{
                    return false;
                }
            }
            return true;
        }else{
            return false;
        }
    }

    static clearcache(){
        try {
            AsyncStorage.removeItem('profile');   
            AsyncStorage.removeItem('auth');
            AsyncStorage.clear();               
        } catch (e) {            
        }
    }
}
