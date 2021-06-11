import React, { useLayoutEffect } from 'react'
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import CustomListItem from '../components/CustomListItem'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { auth } from '../firebase'

const HomeScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "hiMate Chat",
      headerStyle: { backgroundColor: "#D50000" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "black",
      headerRight: () => (
        <View>
          <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
        </View>
      ),
    })
  }, [])

  return (

    <SafeAreaView>
      <StatusBar style="light" />
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  )

}

export default HomeScreen

const styles = StyleSheet.create({})
