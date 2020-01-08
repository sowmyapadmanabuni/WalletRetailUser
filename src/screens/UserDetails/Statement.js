import React, { Component } from 'react';
import { Text, View, ImageBackground, TouchableOpacity, TextInput, DeviceEventEmitter, StyleSheet, Image } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Credit from './Credit'
import Debit from './Debit'
import CardView from 'react-native-cardview';

const FirstRoute = () => (
  <View>
    <DisplayDate />
    <Credit />
  </View>
);

const SecondRoute = () => (
  <View>
    <DisplayDate />
    <Debit />
  </View>
);

export default function Statement() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Credited' },
    { key: 'second', title: 'Debited' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  renderTabBar = (props) => {
    return <TabBar
      {...props}
      tabStyle={{ marginTop: '25%' }}
      style={{ backgroundColor: 'orange', height: '20%' }}
      indicatorStyle={{ backgroundColor: 'white', marginBottom: 10 }}
    />
  }
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
    />
  );
}
export class DisplayDate extends Component {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <CardView
            cardElevation={2}
            cardMaxElevation={2}
            cornerRadius={5}
            marginTop={'20%'}
            marginLeft={'20%'}
            padding={10}
          >
            <View>
              <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                <Text style={{ color: 'orange' }}>From Date</Text>
                <Image source={require('../../icons/cal.png')} style={{ width: '20%', height: '100%' }} />
              </View>
              <Text style={{ textAlign: 'center', marginTop: '5%' }}>15 june 2019</Text>
            </View>
          </CardView>
        </View>
        <View style={{ marginTop: '15%', marginLeft: '5%', marginRight: '5%' }}>
          <Text>...</Text>
        </View>
        <View style={{ flex: 1 }}>
          <CardView
            cardElevation={2}
            cardMaxElevation={2}
            cornerRadius={5}
            marginTop={'20%'}
            marginRight={'20%'}
            padding={10}
          >
            <View>
              <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                <Text style={{ color: 'orange' }}>To Date</Text>
                <Image source={require('../../icons/cal.png')} style={{ width: '20%', height: '100%' }} />
              </View>
              <Text style={{ textAlign: 'center', marginTop: '5%' }}>30 june 2019</Text>
            </View>
          </CardView>
        </View>
      </View>
    );
  }
}