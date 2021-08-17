import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Add from './screens/Add';
import Home from './screens/Home';
import Edit from './screens/Edit';
import {NativeBaseProvider} from 'native-base';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            options={{
              headerStyle: {
                backgroundColor: 'white',
              },
              title: 'Notes',
              headerTitleStyle: {
                textAlign: 'center',
                color: '#070D59',
              },
            }}
            component={Home}></Stack.Screen>

          <Stack.Screen
            name="Add"
            options={{
              headerStyle: {
                backgroundColor: 'white',
              },
              title: 'Add',
              headerTitleStyle: {
                textAlign: 'center',
                color: '#070D59',
              },
            }}
            component={Add}></Stack.Screen>

          <Stack.Screen
            name="Edit"
            options={{
              headerStyle: {
                backgroundColor: 'white',
              },
              title: 'Edit',
              headerTitleStyle: {
                textAlign: 'center',
                color: '#070D59',
              },
            }}
            component={Edit}></Stack.Screen>
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
