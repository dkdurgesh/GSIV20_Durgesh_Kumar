/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, SafeAreaView} from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import { AppContainer } from './src/components/Router';

const store = configureStore();


export default class App extends Component {
  constructor(props){
    super(props)
    console.disableYellowBox = true;
  }

  render() {
    return (
         <SafeAreaView style={{flex: 1}}>
                 <Provider store = {store}>
          <AppContainer />
          </Provider>
         </SafeAreaView> 
    );
  }
}


