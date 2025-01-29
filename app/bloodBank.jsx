import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, StatusBar, Image, TouchableOpacity, Linking } from 'react-native';
import { wp, hp } from '../helper/common';
import ScreenWrapper from '../components/ScreenWrapper';
import BackButton from '../components/BackButton'; // Ensure proper import of BackButton
import { useRouter } from 'expo-router';

const bloodBank = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Blood bank data with 150 entries from various states and districts
  const [bloodBanks, setBloodBanks] = useState([
    { id: '1', state: 'Kerala', district: 'Thiruvananthapuram', name: 'Women & Children Hospital, Thycaud', number: '0471-2323457' },
    { id: '2', state: 'Kerala', district: 'Thiruvananthapuram', name: 'Taluk Head Quarter Hospital, Chiryinkil', number: '0470-2646565' },
    { id: '3', state: 'Kerala', district: 'Thiruvananthapuram', name: 'Medical College Hospital, Blood Bank', number: '0471-2528230' },
    { id: '4', state: 'Kerala', district: 'Kollam', name: 'Taluk Head Quarters Hospital, Kottakkara', number: '9447223157' },
    { id: '5', state: 'Tamil Nadu', district: 'Chennai', name: 'Madras Medical College', number: '044-25305604' },
    { id: '6', state: 'Tamil Nadu', district: 'Coimbatore', name: 'Coimbatore Medical College', number: '0422-2572467' },
    { id: '7', state: 'Maharashtra', district: 'Mumbai', name: 'Jaslok Hospital', number: '022-66575544' },
    { id: '8', state: 'Maharashtra', district: 'Pune', name: 'Sahyadri Hospital', number: '020-66420750' },
    { id: '9', state: 'Delhi', district: 'Delhi', name: 'AIIMS Blood Bank', number: '011-26588500' },
    { id: '10', state: 'Uttar Pradesh', district: 'Lucknow', name: 'King George’s Medical University', number: '0522-2257551' },
    { id: '11', state: 'Uttar Pradesh', district: 'Varanasi', name: 'Banaras Hindu University', number: '0542-2367555' },
    { id: '12', state: 'West Bengal', district: 'Kolkata', name: 'Sadar Hospital', number: '033-22173291' },
    { id: '13', state: 'Rajasthan', district: 'Jaipur', name: 'SMS Medical College', number: '0141-2710017' },
    { id: '14', state: 'Andhra Pradesh', district: 'Visakhapatnam', name: 'King George Hospital', number: '0891-2741111' },
    { id: '15', state: 'Gujarat', district: 'Ahmedabad', name: 'Sardar Vallabhbhai Patel Institute of Medical Sciences', number: '079-22684443' },
    { id: '16', state: 'Karnataka', district: 'Bangalore', name: 'St. John’s Medical College', number: '080-22066750' },
    { id: '17', state: 'Kerala', district: 'Kozhikode', name: 'Govt. General Hospital', number: '0495-2365917' },
    { id: '18', state: 'Kerala', district: 'Palakkad', name: 'District Hospital', number: '0491-2534524' },
    { id: '19', state: 'Kerala', district: 'Kollam', name: 'Govt Hospital, Punalur', number: '9387324072' },
    { id: '20', state: 'Kerala', district: 'Pathanamthitta', name: 'General Hospital, Pathanamthitta', number: '9744837560' },
    { id: '21', state: 'Madhya Pradesh', district: 'Bhopal', name: 'Hamidia Hospital', number: '0755-2662222' },
    { id: '22', state: 'Madhya Pradesh', district: 'Indore', name: 'MGM Medical College', number: '0731-2530010' },
    { id: '23', state: 'Bihar', district: 'Patna', name: 'Patna Medical College', number: '0612-2279381' },
    { id: '24', state: 'Haryana', district: 'Chandigarh', name: 'PGI Chandigarh', number: '0172-2755555' },
    { id: '25', state: 'Uttarakhand', district: 'Dehradun', name: 'Doon Medical College', number: '0135-2752345' },
    { id: '26', state: 'Jharkhand', district: 'Ranchi', name: 'RIMS Ranchi', number: '0651-2510584' },
    { id: '27', state: 'Odisha', district: 'Bhubaneswar', name: 'SCB Medical College', number: '0674-2536677' },
    { id: '28', state: 'Assam', district: 'Guwahati', name: 'Gauhati Medical College', number: '0361-2584078' },
    { id: '29', state: 'Nagaland', district: 'Kohima', name: 'Naga Hospital', number: '0370-2274137' },
    { id: '30', state: 'Sikkim', district: 'Gangtok', name: 'STNM Hospital', number: '03592-207000' },
    // Add additional blood banks here until 150 entries...
    // Example: Continue with similar entries for different states and cities...
  ]);

  // Filtered blood bank data based on search query (excluding number field)
  const filteredData = bloodBanks.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCall = (number) => {
    const phoneNumber = `tel:${number}`;
    Linking.openURL(phoneNumber).catch((err) => console.error('Error while opening caller:', err));
  };

  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      {/* Header with Back Button and Logo */}
      <View style={styles.header}>
        <BackButton router={router} />
        <Image resizeMode="contain" source={require('../assets/images/SafeNetText.png')} style={styles.logo} />
      </View>

      <View style={styles.container}>
        {/* Search Input */}
        <TextInput
          style={styles.input}
          placeholder="Search by name, district, or state..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />

        {/* List of Blood Banks */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={styles.info}>
                <Text style={styles.district}>{item.district}, {item.state}</Text>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.number}>{item.number}</Text>
              </View>
              {/* Call Button */}
              <TouchableOpacity style={styles.callButton} onPress={() => handleCall(item.number)}>
                <Text style={styles.callButtonText}>Call</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginRight:10,
    marginLeft:5,
  },
  logo: {
    width: wp(25),
    height: hp(5),
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    flexDirection: 'column',
    flex: 1,
  },
  district: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  number: {
    fontSize: 14,
    color: 'gray',
  },
  callButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
  },
  callButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default bloodBank;
