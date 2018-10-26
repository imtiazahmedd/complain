/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';


import Route from './app/configs/Router'
import { Provider } from 'react-redux'
import {store, persistor} from './app/redux/createStore'
export default class App extends Component<Props> {

  render() {
    return (
        <Provider store={store}>
            <Route/>
        </Provider>

    );
  }
}

