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

import CountDown from 'react-native-countdown-component';

class UPITimer extends Component{

    constructor(props){
        super(props);
        this.state = {
            time:"05:00",running:true,
            amount:177
        }
    }
    componentDidMount(){
        this.startTimer()
    }

    componentWillUnmount(){
        // try{
        //     this.clearTimeout(this._interval)
        // }catch(e){
        //     console.log(e)
        // }
    }

    startTimer(){
        // let self = this;
        // this._interval = setTimeout(function(){
        //     self.setState({running:false})
        // },10000)
    }

    onTimerFinish(){        
        this.props.navigation.navigate('TransactionResult',{status:false})
    }

    render(){
        return(
            <View style={{flex: 1,alignItems:'center',padding:16}}>

                    <Text style={{fontSize:20,marginVertical:24,fontWeight:'bold'}}>Complete Your Payment</Text>
                    <View>
                        <Text style={{fontSize:16,marginVertical:16,alignSelf:'flex-start'}}>1. Go to your UPI Payments app</Text>
                        <Text style={{fontSize:16,marginVertical:8,alignSelf:'flex-start'}}>2. Check pending requests and approve payment by entering your UPI PIN </Text>
                    </View>
                    <CountDown
                        style={{marginTop:24}}
                        until={10}
                        onFinish={() => this.onTimerFinish()}
                        digitStyle={{backgroundColor:'orange'}}
                        digitTxtStyle={{color:'white'}}
                        timeToShow={['M', 'S']}
                        size={20}
                        running={this.state.running}
                    />
            </View>
        )
    }

}

export default UPITimer;