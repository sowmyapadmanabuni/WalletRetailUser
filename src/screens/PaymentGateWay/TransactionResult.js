import React, {Component} from 'react';
import {
    Alert,
    Animated,
    BackHandler,
    Image,
    ImageBackground,
    PanResponder,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import CircleTimer from 'react-native-circle-timer';
import CircularTimer from 'react-native-circular-timer';
import CountdownCircle from 'react-native-countdown-circle'
import CountDown from 'react-native-countdown-component';

class TransactionResult extends Component{

    constructor(props){
        super(props);
        this.state = {
            time:"05:00",
            status:true,
            amount:20,
            paidTo:"The Deely ",
            purpose:"Lunch",
            transactionid:"76767676767",
            dateTime:"",
            transDate:"22/01/2020",
            transTime:"12.30PM"

        }
    }
    componentDidMount(){
        this.startTimer()
    }

    startTimer(){
        // let self = this;
        // this._interval = setInterval(function(){
        //     self.setState({time:})
        // },1000)
    }

    renderAmount(amount){
        return(
            <Text numberOfLines={1} style={{color:'orange',fontSize:32,alignSelf:'center',marginTop:16}}>{"₹ "+amount}</Text>
        )
    }

    render(){
        return(
            <View style={{ flex: 1}}>

                <View style={{height:82,width:'100%',backgroundColor:this.state.status?'#9068EE':'red',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'white',alignSelf:'center',fontWeight:'bold'}}>{this.state.status?"Transaction Successful!":"Transaction Failed"}</Text>
                    <Text style={{color:'white',alignSelf:'center',marginTop:4}}>{"Date: "+this.state.transDate+" Time: "+this.state.transTime}</Text>                    
                </View>
                {
                    this.state.status?
                    <View style={{flex:1}}>
                        <Text numberOfLines={1} style={{color:'black',alignSelf:'center',marginTop:24,fontSize:18,fontWeight:'400'}}>{"Amount Paid to "}<Text style={{textDecorationLine:'underline'}}>{this.state.paidTo}</Text>{" for "+this.state.purpose}</Text>                      
                        <Text numberOfLines={1} style={{color:'#9068EE',alignSelf:'center',marginTop:12}}>{"Transaction ID: "+this.state.transactionid}</Text>                        
                        {this.renderAmount(""+this.state.amount)}
                    </View>:
                    <View/>
                }

            </View>
        )
    }

}

export default TransactionResult;