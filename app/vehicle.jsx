import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, { useState,useRef } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/BackButton';
import { hp, wp } from '../helper/common';
import Input from '../components/Input';
import SignIn from '../components/SignIn';
import { Picker } from '@react-native-picker/picker';
import axios from '../config/axiosConfig';

const Vehicle = () => {
  const router = useRouter();

  // State for form fields
const ownerNameRef = useRef('');
 const vehicleTypeRef = useRef('');
 const vehicleModelRef = useRef('');
 const phoneNumberRef = useRef('');
 const emailRef = useRef('');
 const districtRef = useRef('');



  const handleVehicle = async () => {
    // Validate required fields
    if (!ownerNameRef.current ||
       !vehicleTypeRef.current ||
        !vehicleModelRef.current ||
         !phoneNumberRef.current ||
          !emailRef.current ||
           !districtRef.current
          ) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert('Error', 'Invalid email format');
      return;
    }

    // Validate phone number
    if (!/^\d{10}$/.test(phoneNumber)) {
      Alert.alert('Error', 'Phone number must be exactly 10 digits');
      return;
    }
    

    try {
      // Send registration request
      const response = await axios.post('/api/vehicle', {
        owner_name: ownerNameRef.current,
        vehicle_type: vehicleTypeRef.current,
        vehicle_model: vehicleModelRef.current,
        phone_number: phoneNumberRef.current,
        email:emailRef.current,
        district:districtRef.current,
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Vehicle registered!');
        router.push('/home'); // Navigate to home page
      } else {
        Alert.alert('Registration Failed', response.data?.error || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Registration Failed', error.response?.data?.error || 'Something went wrong.');
    }
  };

  return (
    <ScreenWrapper>
      <StatusBar style='dark' />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <BackButton router={router} />
            <Image resizeMode='contain' source={require('../assets/images/SafeNetText.png')} style={styles.logo} />
          </View>

          <View>
            <Text style={styles.Heading}>Vehicle Registration</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inp}>
              <Text style={styles.text}>Owner Name</Text>
              <Input placeholder='Owner Name' onChangeText={(value) => (ownerNameRef.current = value)} />
            </View>

            <View style={styles.inp}>
              <Text style={styles.text}>Vehicle Type</Text>
              <View style={styles.pic}>
                <Picker  onChangeText={(value) => (vehicleTypeRef.current = value)}>
                  <Picker.Item label="Select Vehicle Type" value="" />
                  <Picker.Item label="Ambulance" value="Ambulance" />
                  <Picker.Item label="Fire Truck" value="Fire Truck" />
                  <Picker.Item label="Rescue Vehicle" value="Rescue Vehicle" />
                  <Picker.Item label="Utility Truck" value="Utility Truck" />
                  <Picker.Item label="Water Tanker" value="Water Tanker" />
                  <Picker.Item label="4x4 Off-road Vehicle" value="4x4 Off-road Vehicle" />
                  <Picker.Item label="Helicopter" value="Helicopter" />
                  <Picker.Item label="Dump Truck" value="Dump Truck" />
                  <Picker.Item label="Logistics Vehicle" value="Logistics Vehicle" />
                  <Picker.Item label="Command Vehicle" value="Command Vehicle" />
                </Picker>
              </View>
            </View>

            <View style={styles.inp}>
              <Text style={styles.text}>Vehicle Model</Text>
              <Input placeholder='Vehicle Model'  onChangeText={(value) => (vehicleModelRef.current = value)} />
            </View>

            <View style={styles.inp}>
              <Text style={styles.text}>Phone Number</Text>
              <Input placeholder='Phone Number' keyboardType="numeric"  onChangeText={(value) => (phoneNumberRef.current = value)} />
            </View>

            <View style={styles.inp}>
              <Text style={styles.text}>Email</Text>
              <Input placeholder='Email' keyboardType="email-address"  onChangeText={(value) => (emailRef.current = value)} />
            </View>

            <View style={styles.inp}>
              <Text style={styles.text}>District</Text>
              <View style={styles.pic}>
                <Picker  onChangeText={(value) => (districtRef.current = value)}>
                  <Picker.Item label="Select District" value="" />
                  <Picker.Item label="Thiruvananthapuram" value="Thiruvananthapuram" />
                  <Picker.Item label="Kollam" value="Kollam" />
                  <Picker.Item label="Pathanamthitta" value="Pathanamthitta" />
                  <Picker.Item label="Alappuzha" value="Alappuzha" />
                  <Picker.Item label="Kottayam" value="Kottayam" />
                  <Picker.Item label="Idukki" value="Idukki" />
                  <Picker.Item label="Ernakulam" value="Ernakulam" />
                  <Picker.Item label="Thrissur" value="Thrissur" />
                  <Picker.Item label="Palakkad" value="Palakkad" />
                  <Picker.Item label="Malappuram" value="Malappuram" />
                  <Picker.Item label="Kozhikode" value="Kozhikode" />
                  <Picker.Item label="Wayanad" value="Wayanad" />
                  <Picker.Item label="Kannur" value="Kannur" />
                  <Picker.Item label="Kasaragod" value="Kasaragod" />
                </Picker>
              </View>
            </View>

            <View style={styles.button}>
              <SignIn title='Submit' onPress={handleVehicle} />
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Vehicle;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(100),
    alignItems: 'center',
  },
  logo: {
    width: wp(25),
    height: hp(5),
  },
  Heading: {
    fontSize: hp(3),
    fontWeight: 'bold',
    paddingTop: 50,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  form: {
    paddingTop: 20,
  },
  inp: {
    marginTop: 25,
  },
  button: {
    paddingTop: 35,
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  container: {
    backgroundColor: '#D9F8DB',
    height: '100%',
  },
  text: {
    fontSize: 15,
    paddingLeft: 17,
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  pic: {
    height: hp(7),
    borderWidth: 0.4,
    borderColor: 'black',
    borderRadius: 10,
    marginHorizontal: 15,
  },
});
