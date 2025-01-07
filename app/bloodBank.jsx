import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, StatusBar, Image, TouchableOpacity, Linking } from 'react-native';
import { wp, hp } from '../helper/common';
import ScreenWrapper from '../components/ScreenWrapper';
import BackButton from '../components/BackButton'; // Make sure the BackButton component is properly imported
import { useRouter } from 'expo-router';

const bloodBank = () => {
  const router = useRouter();  
  const [searchQuery, setSearchQuery] = useState('');

  // Blood bank data categorized by district
  const [bloodBanks, setBloodBanks] = useState([
    { id: '1', district: 'Thiruvananthapuram', name: 'Women & Children Hospital, Thycaud', number: '0471-2323457' },
    { id: '2', district: 'Thiruvananthapuram', name: 'Taluk Head Quarter Hospital, Chiryinkil', number: '0470-2646565' },
    { id: '3', district: 'Thiruvananthapuram', name: 'Medical College Hospital, Blood Bank', number: '0471-2528230' },
    { id: '4', district: 'Thiruvananthapuram', name: 'General Hospital', number: '0471-2307874' },
    { id: '5', district: 'Kollam', name: 'Taluk Head Quarters Hospital, Kottakkara', number: '9447223157' },
    { id: '6', district: 'Kollam', name: 'Govt Hospital, Punalur', number: '9387324072' },
    { id: '7', district: 'Pathanamthitta', name: 'General Hospital, Pathanamthitta', number: '9744837560' },
    { id: '8', district: 'Alappuzha', name: 'Medical College Hospital', number: '0477-2282709' },
    { id: '9', district: 'Kottayam', name: 'District Hospital', number: '9895795422' },
    { id: '10', district: 'Ernakulam', name: 'Co-Operative Medical College, Kalamassery', number: '0484-2411460' },
    { id: '11', district: 'Thrissur', name: 'District Hospital', number: '0487-2427383' },
    { id: '12', district: 'Palakkad', name: 'District Hospital', number: '0491-2534524' },
    { id: '13', district: 'Malappuram', name: 'District Hospital Blood Bank, Manjeri', number: '0483-2766880' },
    { id: '14', district: 'Kozhikode', name: 'Govt. General Hospital', number: '0495-2365917' },
    { id: '15', district: 'Wayanad', name: 'District Hospital, Manathavadi', number: '04935-240264' },
    { id: '16', district: 'Kannur', name: 'Academy of Medical Sciences, Pariyaram', number: '0497-2808080' },
    { id: '17', district: 'Kasaragod', name: 'District Hospital Blood Bank, Kanhangad', number: '0467-2204333' },
  ]);

  // Filtered blood bank data based on search query
  const filteredData = bloodBanks.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.number.includes(searchQuery)
  );

  const handleCall = (number) => {
    const phoneNumber = `tel:${number}`;
    Linking.openURL(phoneNumber).catch((err) => 
      console.error('Error while opening caller:', err)
    );
  };

  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      {/* Header with Back Button and Logo */}
      <View style={styles.header}>
        <BackButton router={router} />
        <Image
          resizeMode="contain"
          source={require('../assets/images/SafeNetText.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.container}>
        {/* Search Input */}
        <TextInput
          style={styles.input}
          placeholder="Search by name, district, or number..."
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
                <Text style={styles.district}>{item.district}</Text>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.number}>{item.number}</Text>
              </View>
              {/* Call Button */}
              <TouchableOpacity
                style={styles.callButton}
                onPress={() => handleCall(item.number)}
              >
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
