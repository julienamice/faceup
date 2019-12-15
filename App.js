import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import CameraScreen from './camerascreen';
import LibraryScreen from './libraryscreen';
import HomeScreen from './homescreen';


const TabNavigator = createBottomTabNavigator({
  Camera: CameraScreen,
  Library: LibraryScreen,
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      var iconName;
      if (navigation.state.routeName == 'Camera') {
        iconName = 'ios-camera';
      } else if (navigation.state.routeName == 'Library') {
        iconName = 'ios-folder';
      }
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'green',
    inactiveTintColor: 'gray',
  }
})



var StackNavigator = createStackNavigator({
  Home: { screen: HomeScreen, navigationOptions: () => ({ header: null }) },
  Tab: TabNavigator
});

var AppStack = createAppContainer(StackNavigator)


function App() {
  return (
    <AppStack />
  );
}

export default App
