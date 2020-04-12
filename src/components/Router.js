import React from 'react';
import {Image} from 'react-native';
import {
    createAppContainer,
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MovieList from '../screens/MovieList';
import DetailView from '../screens/DetailView';


export const appNavigationOptions = createStackNavigator(
    {
        MovieList: { screen: MovieList},
        DetailView: { screen: DetailView},
    },{
        headerMode: 'none'
    }
);

export const AppContainer = createAppContainer(appNavigationOptions);