import React,{Component} from 'react';
import {View,Text,ScrollView} from 'react-native';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import {connect} from 'react-redux';
import {updateCardType} from '../../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import base from '../../base';
import CardView from 'react-native-cardview';
import { TextInput, } from 'react-native-gesture-handler';
import { GlobalStyle } from '../../components/common/GlobalStyle';
import { CardDStyle } from './CardDSytle';

class CardDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            item:null,
            collapsed : false,
            block1: '',
            block2: '',
            block3: '',
            block4: '',
            CardType:[
                {label:'Credit Card',value:0},
                {label:'Debit Card',value:1},
                {label:'Netbanking',value:2},
                {label:'UPIs',value:3},

            ],

            initialCardPos : -1,
            formKey:0,
        };
    }

    ComponentHideAndShow = (index,value) =>{
        //this.setState(previousState => ({collapsed: !previousState.collapsed}));
        console.log("value ",value);
        if (value ==="Credit Card" || value === 'Debit Card')
            this.setState({collapsed: false});
        else
            this.setState({collapsed: true});
    }

    onSelect = (index, value) => {
        const {updateCardType} = this.props;
        let cardValue = this.state.CardType[index].label;

        // Action here with the value
        updateCardType(cardValue);

        // alert(radioValue); // Pass this value to reducer
    };

    renderCollapsedView =()=>{
        return(
            <View style ={CardDStyle.collapsedContainer}>
                {/*<CardView
                    style={{backgroundColor:'yellow'}}
                    cardElevation={3}
                    cardMaxElevation={3}
                    cornerRadius={7}>
                    <View style ={CardDStyle.marginContainer}>
                        <Text>
                            Name On Card
                        </Text>
                        <TextInput style = {GlobalStyle.InputContainer}/>
                    </View>

                    <View>
                        <Text style={{marginLeft:'5%',marginTop:'3%'}}>Enter Card Number</Text>
                        <View style ={{flexDirection:'row',}}>
                            <TextInput style ={{...CardDStyle.textInputStyle,...CardDStyle.borderContainer}}placeholder="X X X X" />
                            <TextInput style ={{...CardDStyle.textInputStyle,...CardDStyle.borderContainer}}placeholder="X X X X" />
                            <TextInput style ={{...CardDStyle.textInputStyle,...CardDStyle.borderContainer}}placeholder="X X X X" />
                            <TextInput style ={{...CardDStyle.textInputStyle,...CardDStyle.borderContainer}}placeholder="X X X X" />
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{marginLeft:'5%',marginTop:'7%'}}>Expires On</Text>

                            <TextInput style ={{...CardDStyle.expiryContainer,...CardDStyle.borderContainer}}placeholder="MM" />
                            <TextInput style ={{...CardDStyle.expiryContainer,...CardDStyle.borderContainer}}placeholder="YY" />

                            <Text style={{marginLeft:'9%',marginTop:'7%'}}>Enter CVV</Text>
                            <TextInput style ={{...CardDStyle.expiryContainer,...CardDStyle.textInputStyle,
                                ...CardDStyle.borderContainer,marginLeft:'3%'}}
                                       placeholder="X X X" />
                        </View>

                    </View></CardView>*/}

                <CardView
                    style={{padding:8,}}
                    cardElevation={3}
                    cardMaxElevation={3}
                    cornerRadius={7}>
                    <View style ={{flexDirection:'row', alignItems:'center'}}>
                        <Text>
                            Name On Card
                        </Text>
                        <TextInput style = {{
                            borderBottomWidth:1,borderLeftWidth: 1,
                            borderRightWidth: 1,borderTopWidth:1, width:'65%',height:'70%',
                            marginLeft:'5%',borderRadius:7
                        }}/>
                    </View>

                    <View>
                        <Text style={{marginTop:'3%'}}>Enter Card Number</Text>
                        <View style ={{flexDirection:'row',alignItems:'center', justifyContent:'space-between'}}>
                            <TextInput style ={{
                                width: '20%',marginTop:'6%',borderRadius:7,height:'20%',padding:2,textAlign:'center',
                                fontSize:15,borderLeftWidth:1,borderRightWidth:1,
                                borderTopWidth:1,borderBottomWidth:1,
                            }}
                                       value={this.state.block1}
                                       ref={"block1"}
                                       keyboardType={"number-pad"}
                                       maxLength={4}
                                       placeholder="X X X X"
                                       onChangeText={(num)=>{
                                           console.log("block1 ",num);
                                           this.setState({ block1: num });
                                           console.log("block1.length ",this.state.block1.length);
                                       }
                                       }
                            />
                            <TextInput style ={{
                                width: '20%',marginTop:'6%',borderRadius:7,height:'20%',padding:2,textAlign:'center',
                                fontSize:15,borderLeftWidth:1,borderRightWidth:1,
                                borderTopWidth:1,borderBottomWidth:1,
                            }}
                                       value={this.state.block2}
                                       ref="block2"
                                       keyboardType={"number-pad"}
                                       maxLength={4}
                                       placeholder="X X X X"
                                       onChangeText={(num) => {
                                           this.setState({block2: num});
                                           console.log(":::block2 ", this.state.block2);
                                           console.log(":::length ", this.state.block2.length);
                                       }
                                       }
                            />
                            <TextInput style ={{
                                width: '20%',marginTop:'6%',borderRadius:7,height:'20%',padding:2,textAlign:'center',
                                fontSize:15,borderLeftWidth:1,borderRightWidth:1,
                                borderTopWidth:1,borderBottomWidth:1,
                            }}
                                       value={this.state.block3}
                                       ref="block3"
                                       keyboardType={"number-pad"}
                                       maxLength={4}
                                       placeholder="X X X X"
                                       onChangeText={(num) => {
                                           this.setState({block3: num});
                                           console.log(":::block2 ", this.state.block3);
                                           console.log(":::length ", this.state.block3.length);
                                       }
                                       }
                            />
                            <TextInput style ={{
                                width: '20%',marginTop:'6%',borderRadius:7,height:'20%',padding:2,textAlign:'center',
                                fontSize:15,borderLeftWidth:1,borderRightWidth:1,
                                borderTopWidth:1,borderBottomWidth:1,
                            }}
                                       value={this.state.block4}
                                       ref={"block4"}
                                       keyboardType={"number-pad"}
                                       maxLength={4}
                                       placeholder="X X X X"
                                       onChangeText={(num) => {
                                           this.setState({block4: num});
                                           console.log(":::block2 ", this.state.block4);
                                           console.log(":::length ", this.state.block4.length);
                                       }
                                       }
                            />
                        </View>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={{marginTop:'7%'}}>Expires On</Text>

                            <TextInput style ={{
                                marginLeft:'7%',
                                width:'6%',height:'10%',marginTop:'6%',padding:5,
                                borderRadius:7,textAlign:'center',
                                borderLeftWidth:1,borderRightWidth:1,
                                borderTopWidth:1,borderBottomWidth:1,}}placeholder="MM" />
                            <TextInput style ={{
                                marginLeft:'1%',
                                width:'10%',height:'10%',marginTop:'6%',padding:5,
                                borderRadius:7,textAlign:'center',
                                borderLeftWidth:1,borderRightWidth:1,
                                borderTopWidth:1,borderBottomWidth:1,}}placeholder="YY" />

                            <Text style={{marginLeft:'3%',marginTop:'7%'}}> Enter CVV</Text>
                            <TextInput style ={{
                                marginLeft:'6%',
                                width:'13%',height:'10%',marginTop:'6%',padding:5,
                                borderRadius:7,textAlign:'center',
                                borderLeftWidth:1,borderRightWidth:1,
                                borderTopWidth:1,borderBottomWidth:1,}}
                                       placeholder="X X X" />
                        </View>
                    </View>
                    </CardView>
            </View>
        )

    }


    render(){
        const{} = this.props;
        const RadioButtons = this.state.CardType.map((data, index) => {
            console.log("RadioButtons: ",data.label);
            return (
                <RadioButton value={data.label}>
                    <Text>{data.label}</Text>
                </RadioButton>
            );
        });

        return(
            <View>

                <View style ={{flexDirection:'row',marginLeft:'3%',marginTop:'7%'}}>
                    <Icon style ={{marginTop:'1%'}}
                          name="chevron-left"
                          type="font-awesome"
                          size={15}
                          onPress={()=>{this.props.navigation.navigate('Amount')}}
                    />
                    <View>
                        <Text style={{marginLeft:'3%',fontSize:15}}>Payment</Text>

                        <View>
                            <Text style={{marginTop:'15%'}}>You are paying to {} Rs {}</Text>
                        </View>
                    </View>

                </View>
                <ScrollView>

                    <RadioGroup
                        style={{marginTop: '5%',marginLeft:'5%'}}
                        color="#000000"
                        selectedIndex={0}
                        activeColor="#ff8c00"
                        // onSelect={(index, value) => alert(JSON.stringify(index))}>
                        // onSelect={(index, value) => this.onSelect(index, value)}>
                        onSelect={(index, value) => {this.ComponentHideAndShow(index,value)} }>
                        {RadioButtons}

                    </RadioGroup>

                    <View>
                        {!this.state.collapsed ? this.renderCollapsedView() :<View>{this.state.collapsed}</View>}
                    </View>

                </ScrollView>
            </View>


        )
    }

}


const mapStateToProps = state =>{
    return{

    }
}

export default connect(mapStateToProps,{updateCardType},)(CardDetails);