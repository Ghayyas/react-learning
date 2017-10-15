
import { AppRegistry } from 'react-native';

import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation'
import { AboutComponent, HomeComponent } from './src'
import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text ,Title ,Body } from 'native-base';


export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedTab : ''
        }
    }
  navigatorScreen(){
    switch (this.state.selectedTab) {
        case 'Home':
        return (<HomeComponent />);
          break;
        case 'About':
     return (<AboutComponent />);
          break;
        default:
         return (<HomeComponent/>)
         break;
      }
  }
  render() {
    return (
    <Container>
    <Header>
    <Body>
         <Title>Wellcome</Title>
    </Body> 
    </Header>
    <Content padder>
       {this.navigatorScreen()}
    </Content>
    <Footer>
      <FooterTab>
        <Button vertical 
        active={this.state.selectedTab==='Home'} 
        onPress={() => this.setState({selectedTab:'Home'})}>
          <Icon name="apps" />
          <Text>Home</Text>
        </Button>
        <Button vertical onPress={() =>  this.setState({selectedTab:'About'})}>
          <Icon name="camera" />
          <Text>About</Text>
        </Button>
      </FooterTab>
    </Footer>
  </Container>
    );
  }
}
// const SimpleApp = TabNavigator({
//   Main: { screen: App },
//   Home: { screen: HomeComponent },
//   About: { screen: AboutComponent }
// });

AppRegistry.registerComponent('BottomNavigationTabs', () => App);
