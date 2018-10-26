import React from 'react'
import {Text, Button, View, StyleSheet, Image} from 'react-native'

export default class NotificationsScreen extends React.Component {

    render() {
        return (
            <Button
                onPress={() => this.props.navigation.navigate('HomeScreen')}
                title="Go back home"
            />
        );
    }
}
