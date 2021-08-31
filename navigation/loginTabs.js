import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegisterScreen from "../screens/RegisterScreen"

const Tab = createBottomTabNavigator();

const LoginTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Register" component={RegisterScreen} />
    </Tab.Navigator>
  )
}

export default LoginTabs

const styles = StyleSheet.create({})
