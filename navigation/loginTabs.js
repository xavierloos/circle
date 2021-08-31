import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import RegisterScreen from "../screens/RegisterScreen"

const Tab = createBottomTabNavigator()

const loginTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Register" component={RegisterScreen} />
      <Tab.Screen name="Register" component={RegisterScreen} />
    </Tab.Navigator>
  )
}

export default loginTabs

const styles = StyleSheet.create({})
