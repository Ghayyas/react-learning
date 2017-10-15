/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// import React, { Component } from 'react';
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View,
//   Button
// } from 'react-native';
// import { StackNavigator, TabNavigator } from 'react-navigation'
// import { AboutComponent, HomeComponent } from './src'


// export default class App extends Component {
//   static navigationOptions = {
//     title: 'This is main Page'
//   }
//   render() {
//     const {navigate} = this.props.navigation;
//     return (
//      <View>
//       <Text>Wellcome to main App</Text>
//       <Button onPress={()=>navigate('Home')}>Go to Home Page</Button>
//      </View>
//     );
//   }
// }
// const SimpleApp = StackNavigator({
//   Main: { screen: App },
//   Home: { screen: HomeComponent },
//   About: { screen: AboutComponent }
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
