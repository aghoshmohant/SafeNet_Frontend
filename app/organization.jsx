import { Alert, Image, Pressable, StyleSheet, Text, View, } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import BackButton from '../components/BackButton'
import { hp, wp } from '../helper/common'
import Input from '../components/Input'
import SignIn from '../components/SignIn'




const organization = () => {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <StatusBar style='dark'/>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton router={router} />
          <Image resizeMode='contain' source={require('../assets/images/SafeNetText.png')} style={styles.logo}/>
        </View>

        <View style={styles.form}>

          <View style={styles.inp}>
            <Text style={styles.text}>Organization Name</Text>
          <Input placeholder='Organization Name' 
          />
          </View>
          <View style={styles.inp}>
            <Text style={styles.text}>Phone Number</Text>
          <Input placeholder='Phone Number' 
          />
          </View>

          <View style={styles.inp}>
            <Text style={styles.text}>Email</Text>
          <Input placeholder='Email' 
          />
          </View>

          <View style={styles.inp}>
            <Text style={styles.text}>District</Text>
          <Input placeholder='District' 
          />
          </View>

          <View style={styles.inp}>
            <Text style={styles.text}>State</Text>
          <Input placeholder='State' 
          />
          </View>
          <View style={styles.button}>
          <SignIn title='Submit' />
          </View>
        </View>

        
      </View> 
    </ScreenWrapper>
  )
}

export default organization

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
    fontSize:hp(3.5),
    fontWeight:'bold',
    paddingTop:50,
    paddingLeft:10,
    
  },
  form:{
    color:'red',
    paddingTop:20,
  },
  inp:{
    marginTop:25,
  },
  button:{
    paddingTop:35,
    paddingLeft:10,
    paddingRight:10,
  },
  container:{
    backgroundColor:'#D9F8DB',
    height:hp(100),
  },
  text:{
    fontSize:15,
    paddingLeft:17,
    paddingBottom:5,
    fontWeight:'bold'
  },
  footer:{ 
    flex:1,
    flexDirection:'row',
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center'
    
   

  },
  signupText:{
   fontSize:wp(3.5),
   paddingTop:200,
   

  }

})