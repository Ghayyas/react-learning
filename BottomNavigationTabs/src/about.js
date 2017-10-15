import React ,{Component} from 'react';
import {View, Text} from 'react-native';


export class AboutComponent extends Component{
    
    render(){
        return(
            <View>
                <Text>This is About Page</Text>
            </View>
        )
    }
}

AboutComponent.navigationOptions = {
    title: 'This is About Page'
}