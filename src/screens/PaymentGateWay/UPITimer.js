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

class UPITimer extends Component{

    render(){
        return(
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>

                    <CircleTimer
                        radius={80}
                        borderWidth={10}
                        seconds={300}
                        borderColor={'#F5F5F5'}
                        borderBackgroundColor={"orange"}
                        onTimeElapsed={() => {
                            console.log('Timer Finished!');
                        }}
                        showSecond={true}
                    />

            </View>
        )
    }

}

export default UPITimer;