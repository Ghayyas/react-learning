import React ,{ Component } from "react";
import {View,Text} from 'react-native';

export class HomeComponent extends Component{

    render(){
        return(
            <View>
                <Text>
                    Hello Home Component
                </Text>
            </View>
        )
    }
}
HomeComponent.navigationOptions = {
    title: 'Welcome Home'
}