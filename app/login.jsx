import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import BackButton from '../components/BackButton'
import { hp, wp } from '../helper/common'
import Input from '../components/Input'



const login = () => {
  const router = useRouter();
  return (
    <ScreenWrapper>
      <StatusBar style='dark'/>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton router={router} />
          <Image resizeMode='contain' source={require('../assets/images/SafeNetText.png')} style={styles.logo}/>
        </View>

        <View>
          <Text style={styles.welcomeText}>Hi, Welcome👋</Text>
        </View>

        <View style={styles.form}>
          <Input placeholder='Email Address'
          onChangeText={value=>{}}
          />
        </View>
      </View> 
    </ScreenWrapper>
  )
}

export default login

const styles = StyleSheet.create({
  header:{
    flexDirection: 'row',
    justifyContent:'space-between',
    width: wp(100),
    alignItems:'center',  
  },
  logo:{
    width: wp(25), // Adjust width of the logo
    height: hp(5),
  },
  welcomeText:{
    fontSize:hp(4),
    fontWeight:'bold',
    paddingTop:50,
    
  },
  form:{
    color:'red',
  }
})