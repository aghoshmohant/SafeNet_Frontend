import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/BackButton';
import { hp, wp } from '../helper/common';
import Input from '../components/Input';
import SignIn from '../components/SignIn';
import Checkbox from 'expo-checkbox';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const signup = () => {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(''); // State to hold the formatted date
  const [showPicker, setShowPicker] = useState(false);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type === 'set') {
      const currentDate = selectedDate || date;
      setDate(currentDate);

      // Format the selected date to display
      const formatted = currentDate.toLocaleDateString('en-GB'); // Format as DD/MM/YYYY
      setFormattedDate(formatted);

      toggleDatePicker(); // Close the picker after date selection
    } else {
      toggleDatePicker();
    }
  };
  const [isSelected, setSelection] = useState(false);

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
              <Input placeholder="Full Name" />
            </View>

            <View style={styles.inp}>
              <Text style={styles.text}>Email</Text>
              <Input placeholder="Email Address" keyboardType="email-address" />
            </View>

            <View style={styles.inp}>
              <Text style={styles.text}>Phone Number</Text>
              <Input placeholder="Phone Number" keyboardType="numeric" />
            </View>

            <View style={styles.inp}>
              <Text style={styles.text}>District</Text>
              <Input placeholder="District" />
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
                  <Input placeholder="Date of Birth" value={formattedDate} editable={false} />
                </Pressable>
              )}
            </View>

            <View style={styles.inp}>
              <Text style={styles.text}>Blood Group</Text>
              <Input placeholder="Blood Group" />
            </View>

            <View style={styles.check}>
              <Checkbox value={isSelected}
               onValueChange={setSelection} 
               style={styles.checkbox} />
              <Text style={styles.checkboxText}>If are you are ready to donate blood</Text>
            </View>

            <View style={styles.inp}>
              <Text style={styles.text}>Password</Text>
              <Input placeholder="Password" />
            </View>

            <View style={styles.button}>
              <SignIn title="Submit" />
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
  inp: {
    marginTop: 25,
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
