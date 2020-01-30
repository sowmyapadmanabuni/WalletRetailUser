/*
 * @Author: Anooj Krishnan G 
 * @Date: 2019-05-06 10:17:25 
 * @Last Modified by: Anooj Krishnan G
 * @Last Modified time: 2020-01-28 12:14:12
 */

import React from 'react';
import {Modal, Text, View, Platform} from 'react-native';
import ProgressLoader from 'rn-progress-loader';
import { showMessage, hideMessage } from "react-native-flash-message";
    


    const progressloader = (isLoading, show) => {
        return(

                    isLoading?
                    <ProgressLoader 
                    visible={isLoading} 
                    isModal={true} isHUD={true}
                    hudColor={'#FFF'}
                color={base.colors.primary}/>:<View/>            
        )
    }

    const emptyView = (visible,messgae,dark) => {
        return (
        visible?<View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text style={{alignSelf:'center',marginBottom:base.dimens.tipHeight,color:dark?'#000':'#FFF'}}>{messgae}</Text></View>:<View/>
        )
    }

    // const messagemodal = (props) => {
    //     const {isSuccess, headerText, bodyText, onClosed, isOpen, onBtnPress} = props;
    //     return(
    //         <Modal   
    //         style={{width:base.dimens.screenwidth,height:300,alignSelf:'center',backgroundColor:base.colors.white}}                         
    //             transparent={true}
    //             isOpen={isOpen}
    //             >
    //             <View style={{width:base.dimens.screenwidth,height:100,alignSelf:'center',backgroundColor:base.colors.white}}></View>
                

    //         </Modal>
    //     )
    // }

    // const showtoast = (props) => {
    //     const {type, message, duration} = props;
    //     let style={
    //         backgroundColor: type=='error'?base.colors.error:base.colors.success,
    //         width: base.dimens.screenwidth-150,
    //         height: Platform.OS === ("ios") ? 50 : 100,
    //         borderRadius: 10,
    //         fontSize: 15,            
    //         fontWeight: "normal",            
            
    //     };
    //     setTimeout(function(){
    //         //Toast.show(message, duration=="short"?Toast.SHORT:Toast.LONG, Toast.BOTTOM, style);        
    //         showMessage({                
    //             message: message,
    //             type: type=='error'?"danger":"success",
    //           });
    //     },500)
        
    // }

    // const parseErrorResponse = (data) => {  
    //     try{      
    //     let arrayofkeys = Object.keys(data);
    //     for(obj of arrayofkeys){            
    //         if(data[obj] != undefined &&
    //             data[obj] != null && 
    //             data[obj].length != undefined &&
    //             data[obj][0] != undefined && 
    //             data[obj][0] != null){   
    //                 let msg = data[obj][0]+""; 
    //                 if(obj != 'token' && msg.indexOf("page.") == -1)                                          
    //                     showtoast({message:msg,type:'error'});
    //             }
    //     }
    //     }catch(e){

    //     }
    // }

    export default class widgets {

    static flashError(title, desc){
        showMessage({
            message: title,
            description: desc,
            type: "default"           
          });
    }

    static flashMessage(title, desc){
        showMessage({
            message: title,
            description: desc,            
            type:'warning'
            //backgroundColor: '#FF5602', // background color
            //color: "#FFF",         
          });
    }
    
}
//export default widgets;
