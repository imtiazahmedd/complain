import React, { Component } from 'react';
import { Text, View} from 'react-native';
import Styles from './Styles';
import Signup from '../Register/Signup'

export default class Admin extends Component {

    static navigationOptions = {
        header : null
    };
    constructor(props){
        super(props);
        this.state={

        }
    }

    render() {
        return (
            <View>
                <Signup role={"admin"} />
            </View>
        );
    }
}
