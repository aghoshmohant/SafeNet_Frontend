import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Modal, Linking, Image } from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/BackButton';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

const bloodDonor = () => {
  // Declare donors array here
  const donors = [
    { name: 'John Doe', phone: '9876543210', bloodGroup: 'O+', district: 'Manhattan', state: 'New York' },
    { name: 'Alice Johnson', phone: '9123456789', bloodGroup: 'A-', district: 'Downtown', state: 'California' },
    { name: 'Michael Smith', phone: '9012345678', bloodGroup: 'B+', district: 'South Side', state: 'Illinois' },
    { name: 'Emma Davis', phone: '9871234567', bloodGroup: 'AB-', district: 'East End', state: 'Texas' },
    { name: 'Robert Wilson', phone: '9543216789', bloodGroup: 'O-', district: 'North Gate', state: 'Arizona' },
    { name: 'Sophia Martinez', phone: '9687456321', bloodGroup: 'A+', district: 'West Village', state: 'Pennsylvania' },
  ];

  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Filter donors based on district, state, and blood group
  const filterDonors = () => {
    return donors.filter((donor) =>
      (
        donor.district.toLowerCase().includes(searchText.toLowerCase()) || 
        donor.state.toLowerCase().includes(searchText.toLowerCase()) || 
        searchText === ''
      ) &&
      (donor.bloodGroup === selectedBloodGroup || selectedBloodGroup === '')
    );
  };

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <BackButton router={router} />
            <Image source={require('../assets/images/SafeNet_Red.png')} style={styles.safeNetTextImage} />
          </View>
          <View style={styles.body}>
            {/* Search Bar and Filter Icon */}
            <View style={styles.searchAndFilterContainer}>
              <TextInput
                style={styles.searchBar}
                placeholder="Search by District or State"
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
              />
              {/* Filter Icon */}
              <TouchableOpacity onPress={() => setIsFilterVisible(true)}>
                <Image source={require('../assets/images/blood-type.png')} style={styles.filterIcon} />
              </TouchableOpacity>
            </View>

            {/* Donor List */}
            <ScrollView style={styles.listContainer}>
              {filterDonors().map((donor, index) => (
                <View key={index} style={styles.donorCard}>
                  <View style={styles.donorInfo}>
                    <Text style={styles.donorName}>{donor.name}</Text>
                    <Text style={[styles.donorDetails, styles.bloodGroup]}>Blood Group: {donor.bloodGroup}</Text>
                    <Text style={styles.donorDetails}>District: {donor.district}</Text>
                    <Text style={styles.donorDetails}>State: {donor.state}</Text>
                    <Text style={styles.donorDetails}>{donor.phone}</Text>
                  </View>
                  <TouchableOpacity style={styles.callButton} onPress={() => handleCall(donor.phone)}>
                    <Text style={styles.callButtonText}>Call</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            {/* Filter Modal */}
            <Modal
              visible={isFilterVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setIsFilterVisible(false)}
            >
              <View style={styles.modalBackground}>
                <View style={styles.filterModal}>
                  <Text style={styles.filterTitle}>Select Blood Group</Text>

                  {/* Blood Group Filter */}
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={selectedBloodGroup}
                      onValueChange={(itemValue) => setSelectedBloodGroup(itemValue)}
                      style={styles.picker}
                    >
                      <Picker.Item label="All Blood Groups" value="" />
                      <Picker.Item label="A+" value="A+" />
                      <Picker.Item label="A-" value="A-" />
                      <Picker.Item label="B+" value="B+" />
                      <Picker.Item label="B-" value="B-" />
                      <Picker.Item label="O+" value="O+" />
                      <Picker.Item label="O-" value="O-" />
                      <Picker.Item label="AB+" value="AB+" />
                      <Picker.Item label="AB-" value="AB-" />
                    </Picker>
                  </View>

                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setIsFilterVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default bloodDonor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 5,
  },
  body: {
    padding: 20,
  },
  safeNetTextImage: {
    width: 100, 
    height: 40,  
    resizeMode: 'contain',
  },
  searchAndFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#eaeaea',
    paddingHorizontal: 10,
    justifyContent: 'center', // Center the search bar horizontally
  },
  filterIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  searchBar: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  
  },
  listContainer: {
    marginTop: 10,
  },
  donorCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  donorInfo: {
    flex: 1,
  },
  donorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  donorDetails: {
    fontSize: 16,
    color: '#555',
  },
  bloodGroup: {
    fontWeight: 'bold',
    color: '#d9534f',
  },
  callButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
  },
  callButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  filterModal: {
    backgroundColor: '#fff',
    padding: 12,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 10,
    width: '60%',
    maxWidth: 320,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 15,
    borderWidth: 0.8,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  picker: {
    height: 50,
  },
  closeButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
