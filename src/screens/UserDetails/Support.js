import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, DeviceEventEmitter, Platform ,Linking} from 'react-native';
import { connect } from 'react-redux';
import { Update, ShowProfile, updateUserInfo } from "../../actions";
import axios from 'axios';
// import ProgressLoader from '../../components/common/ProgressLoader'

class Support extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View>
                <View style={{ marginTop: '10%' }}>
                    <Text style={{ fontSize: 18 }}>Contact Support</Text>
                    <TouchableOpacity style={{ flexDirection: 'row',marginTop:'5%',alignItems:'center' }}
                                      onPress={() => {{Platform.OS === 'android'
                                          ? Linking.openURL(`tel:9343121121`)
                                          :Linking.openURL(`telprompt:9343121121`)}}}>
                        <Image
                            // style={{ marginLeft: '10%' }}
                            source={require('../../icons/group_2353.png')}
                        />
                        <Text style={{marginLeft:5}}>+919606121121</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row' ,marginTop:'2%',alignItems:'center'}}
                                      onPress={() => {{Linking.openURL(`mailto:profit@oyewallet.com`)}
                                      }}>
                        <Image
                            // style={{ marginLeft: '10%' }}
                            source={require('../../icons/group_2354.png')}
                        />
                        <Text style={{marginLeft:5}}>profit@oyewallet.com</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

};
const mapStateToProps = state => {
    return {

        UserReducer: state.UserReducer.userDetails
    };
};
export default connect(
    mapStateToProps
)(Support);
