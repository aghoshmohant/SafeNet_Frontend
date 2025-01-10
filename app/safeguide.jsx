import { Image, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import { hp, wp } from '../helper/common';
import BackButton from '../components/BackButton';
import { useRouter } from 'expo-router';



const guidelines = [
  {
    title: 'Identify Critical Applications',
    description: 'Determine which applications are essential for your business operations. Focus on these applications during the recovery process.',
  },
  {
    title: 'Establish Recovery Time Objective (RTO)',
    description: 'Define the maximum acceptable time your critical applications can be down. This helps prioritize recovery efforts.',
  },
  {
    title: 'Define Recovery Point Objective (RPO)',
    description: 'Specify the acceptable amount of data loss measured in time. This helps in deciding how far back to restore data.',
  },
  {
    title: 'Create a Communication Plan',
    description: 'Develop a strategy for internal and external communication, including alerts and updates for employees and informing clients or stakeholders.',
  },
  {
    title: 'Test the DRP Regularly',
    description: 'Regular testing of the disaster recovery plan helps identify deficiencies and ensures the plan remains effective and up-to-date.',
  },
  {
    title: 'Document and Store the Plan Securely',
    description: 'Keep detailed documentation of the DRP in a secure, accessible location. Include roles, recovery procedures, and contact information for key personnel.',
  },
  {
    title: 'Involve All Levels of Employees',
    description: 'Engage employees from all levels in planning and testing to increase effectiveness and ensure everyone knows their role during a disaster.',
  },
  {
    title: 'Virtualized Environment',
    description: 'Use virtualization to efficiently spin up new instances of applications quickly and provide high availability during recovery.',
  },
  {
    title: 'Network Recovery',
    description: 'For complex networks, develop a step-by-step recovery procedure including information about network performance and staff expertise.',
  },
  {
    title: 'Cloud Disaster Recovery',
    description: 'Utilize cloud services for backup and replication, offering scalable solutions for application recovery.',
  },
];

const safeguide = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  
  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      Alert.alert('Search', 'Please enter a valid disaster type.');
    } else {
      // Perform search logic (e.g., filter results, navigate, or fetch data)
      Alert.alert('Search', `Searching for: ${searchQuery}`);
    }
  };
  const filterGuidelines = () => {
    if (!searchText.trim()) return guidelines;

    return guidelines.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const filteredGuidelines = filterGuidelines();
  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton router={router} />
          <Image
            resizeMode="contain"
            source={require('../assets/images/SafeNetText.png')}
            style={styles.logo}
          />
        </View>
        <Text style={styles.title}>Safe Guidelines During Disaster</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search guideline..."
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollContainer}>
          {filteredGuidelines.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.definitionTitle}>{item.title}</Text>
              <View style={{ height: 10 }} />
              <Text style={styles.definitionDescription}>{item.description}</Text>
            </View>
          ))}
          {filteredGuidelines.length === 0 && (
            <Text style={styles.noResultText}>
              No guidelines found for "{searchText}".
            </Text>
          )}
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default safeguide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  },
  searchContainer: {
    marginHorizontal: 16,
    marginTop: 15,
  },
  searchBar: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#eaeaea',
    fontSize: 16,
  },
  scrollContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  definitionContainer: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  definitionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  definitionDescription: {
    fontSize: 18,
    color: '#555',
    lineHeight: 24,
  },
  noResultText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});



