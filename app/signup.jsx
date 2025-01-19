import { Image, Pressable, ScrollView, StyleSheet, Text, View, Alert  } from 'react-native';
import React, { useState, useRef } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/BackButton';
import { hp, wp } from '../helper/common';
import Input from '../components/Input';
import SignIn from '../components/SignIn';
import Checkbox from 'expo-checkbox';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import axios from '../config/axiosConfig'; // Import your axios instance


const signup = () => {
  const router = useRouter();

 // Refs for input fields
 const nameRef = useRef('');
 const emailRef = useRef('');
 const phoneRef = useRef('');
 const districtRef = useRef('');
 const stateRef = useRef('');
 const bloodGroupRef = useRef('');
 const passwordRef = useRef('');


  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(''); // State to hold the formatted date
  const [showPicker, setShowPicker] = useState(false);
  const [isSelected, setSelection] = useState(false);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = (event, selectedDate) => {
    setShowPicker(false); // Close the picker once a date is selected
  
    if (selectedDate) {
      setDate(selectedDate); // Update the `date` state
      // Format the selected date (e.g., DD/MM/YYYY)
      const formatted = `${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`;
      setFormattedDate(formatted); // Update the `formattedDate` state
    }
  };

  const handleSignup = async () => {
    // Check if any required field is empty
    if (
      !nameRef.current ||
      !emailRef.current ||
      !passwordRef.current ||
      !phoneRef.current ||
      !districtRef.current ||
      !formattedDate || // Ensure date is formatted and available
      !stateRef.current ||
      !bloodGroupRef.current
    ) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
  
    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(emailRef.current)) {
      Alert.alert('Error', 'Invalid email format');
      return;
    }
  
    // Validate phone number
    if (phoneRef.current.length !== 10 || isNaN(phoneRef.current)) {
      Alert.alert('Error', 'Phone number must be 10 digits');
      return;
    }
  
    // Validate password strength
    if (passwordRef.current.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
  
    try {
      // Send signup request
      const response = await axios.post('/auth/signup', {
        full_name: nameRef.current,
        email: emailRef.current,
        phone_number: phoneRef.current,
        district: districtRef.current,
        state: stateRef.current,
        dob: formattedDate, // Use the formatted date
        blood_group: bloodGroupRef.current,
        donate_blood: isSelected, // Donation preference
        password: passwordRef.current,
      });
  
      // Check response status
      if (response.status === 201) {
        Alert.alert('Success', 'Account created successfully!');
        router.push('/login'); // Navigate to login page
      } else {
        Alert.alert('Signup Failed', response.data?.error || 'Something went wrong');
      }
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.error === 'User already exists') {
        Alert.alert('Error', 'An account with this email already exists. Please use a different email.');
      } else {
        Alert.alert('Signup Failed', error.response?.data?.error || 'Something went wrong.');
    }
  }
  };
  
  
  
  
  
  
 

  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <BackButton router={router} />
            <Image resizeMode="contain" source={require('../assets/images/SafeNetText.png')} style={styles.logo} />
          </View>

          <View>
            <Text style={styles.welcomeText}>Sign Up</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inp}>
              <Text style={styles.text}>Full Name</Text>
              <Input placeholder="Full Name" onChangeText={(value) => (nameRef.current = value)} />
            </View>

            <View style={styles.inp}>
              <Text style={styles.text}>Email</Text>
              <Input placeholder="Email Address" keyboardType="email-address" onChangeText={(value) => (emailRef.current = value)} />
            </View>

            <View style={styles.inp}>
              <Text style={styles.text}>Phone Number</Text>
              <Input placeholder="Phone Number" keyboardType="numeric" onChangeText={(value) => (phoneRef.current = value)} />
            </View>

            <View style={styles.inp}>
              <Text style={styles.text}>District</Text>
              <Input placeholder="District" onChangeText={(value) => (districtRef.current = value)}/>
            </View>

            <View style={styles.inp}>
              <Text style={styles.text}>State</Text>
              <Input placeholder="State" onChangeText={(value) => (stateRef.current = value)} />
            </View>

            <View style={styles.inp}>
              <Text style={styles.text}>Date Of Birth</Text>

              {showPicker && (
                <RNDateTimePicker
                  mode="date"
                  display="spinner"
                  value={date}
                  onChange={onChange}
                />
              )}
              {!showPicker && (
                <Pressable onPress={toggleDatePicker}>
                  <Input placeholder="Date of Birth" value={formattedDate} editable={false}  />
                </Pressable>
              )}
            </View>

            <View style={styles.inp}>
              <Text style={styles.text}>Blood Group</Text>
              <Input placeholder="Blood Group" onChangeText={(value) => (bloodGroupRef.current = value)} />
            </View>

            <View style={styles.check}>
              <Checkbox value={isSelected}
               onValueChange={setSelection} 
               style={styles.checkbox} />
              <Text style={styles.checkboxText}>Are you are ready to donate blood</Text>
            </View>

            <View style={styles.inp}>
              <Text style={styles.text}>Password</Text>
              <Input placeholder="Password" onChangeText={(value) => (passwordRef.current = value)} />
            </View>

            <View style={styles.button}>
              <SignIn title="Submit" onPress={handleSignup}  />
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.signupText}>Already have an account? </Text>
            <Pressable onPress={() => router.push('login')}>
              <Text style={[styles.signupText, { color: 'green' }]}>Login</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default signup;

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
  welcomeText: {
    fontSize: hp(3.5),
    fontWeight: 'bold',
    paddingTop: 50,
    paddingLeft: 10,
  },
  form: {
    color: 'red',
    paddingTop: 20,
  },
  inp:{
    marginTop:25,
  },
  button: {
    paddingTop: 35,
    paddingLeft: 10,
    paddingRight: 10,
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
  footer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: wp(3.5),
    paddingTop: 15,
    paddingBottom: 15,
  },
  check: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 18,
    paddingTop: 20,
  },
  checkbox: {
    paddingTop: 7,
  },
  checkboxText: {
    fontSize: 15,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
});
