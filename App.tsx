import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';

import {Provider} from 'react-redux';
import store from './src/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';

import Tabbar from './src/views/Tabbar/Tabbar';
import Welcome from './src/views/Login/Welcome';
import Login from './src/views/Login/Login';

enableScreens();
const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.root}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'} />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
              ...TransitionPresets.SlideFromRightIOS,
            }}>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Tabbar"
              component={Tabbar}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
});

export default App;
