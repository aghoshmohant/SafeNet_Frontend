import { Image, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import { hp, wp } from '../helper/common';
import BackButton from '../components/BackButton';
import { useRouter } from 'expo-router';



const guidelines = [
  {
    title: 'Stay Informed:',
    description: 'Listen to a portable, battery-powered radio or television for warnings, emergency alerts, and instructions from local authorities. Ensure you have a battery-powered radio in your survival kit, which may also include multiple power sources like batteries, solar panels, or a hand crank.',
  },
  {
    title: 'Evacuate if Ordered:',
    description: 'If local authorities order an evacuation, leave immediately. Follow the recommended evacuation routes and avoid using shortcuts.',
  },
  {
    title: 'Stay in a Safe Area:',
    description: ' If you are not ordered to evacuate, stay in a safe area or shelter during the disaster. In your home, a safe area may be a ground floor interior room, closet, or bathroom.',
  },
  {
    title: 'Have a Survival Kit',
    description: 'Prepare a survival kit that includes essential items such as water, food, first aid supplies, flashlights, batteries, and other necessities. Ensure your kit is accessible and can sustain you for several days.',
  },
  {
    title: 'Avoid Hazardous Areas:',
    description: 'Stay away from downed power lines, flooded areas, and damaged structures. Do not venture out unless it is absolutely necessary.',
  },
  {
    title: 'Follow Official Instructions:',
    description: 'Adhere to instructions from local authorities and emergency services. Do not re-enter buildings or affected areas until they are declared safe by officials.',
  },
  {
    title: 'Prepare for Post-Disaster Needs: ',
    description: 'After the disaster, be prepared for potential disruptions in services like water, electricity, and gas. Have a plan for obtaining necessary supplies and services.',
  },
  {
    title: 'Support Recovery Efforts: ',
    description: 'Assist in recovery efforts by volunteering, donating to relief organizations, and supporting affected communities.',
  },
  {
    title: 'Network Recovery',
    description: 'For complex networks, develop a step-by-step recovery procedure including information about network performance and staff expertise.',
  },
  {
    title: 'Cloud Disaster Recovery',
    description: 'Utilize cloud services for backup and replication, offering scalable solutions for application recovery.',
  },
  {
     title: 'National Preparedness System',
    description: 'This system, as outlined by DHS/FEMA, involves a continuous cycle of planning, organizing, training, equipping, exercising, evaluating, and taking corrective action to ensure effective coordination during incident response.',
  },
  { 
    title: 'Strategic and Operational Planning',
    description: 'Establishing priorities, identifying expected levels of performance and capability requirements, and providing standards for assessing capabilities are crucial for managing the entire life cycle of a potential crisis.'
  },
  {
    title: 'Private-Public Partnerships (P3) Guide',
    description: 'This guide provides best practices for establishing and maintaining partnerships to help coordinate mitigation, response, and recovery planning and preparedness, increasing community resilience.'
  },
  {
    title: 'Climate Adaptation',
    description: 'Incorporating climate adaptation into emergency management planning efforts is vital, and guides like the one provided by FEMA can help emergency managers understand how to do this effectively.'
  },
  {
    title: 'Cyber Incident Preparedness',
    description: "With the increasing risk of cyber incidents, guidance like the 'Planning Considerations for Cyber Incidents: Guidance for Emergency Managers Guide' can help emergency managers prepare for and respond to such incidents."
  },
  {
    title: 'Hazardous Materials Incident Preparedness',
    description: 'Providing officials with information and resources on hazardous materials, incident preparedness, and response practices can increase community resilience to these incidents.'
  },
  {
    title: 'Threat and Hazard Identification and Risk Assessment (THIRA)',
    description: 'Conducting a THIRA and Stakeholder Preparedness Review (SPR) can help planners examine threats or hazards and produce integrated, coordinated, and synchronized plans.'
  },
  {
    title: 'Emergency Operations Planning',
    description: 'Guides like CPG 101, CPG 201, and CPG 502 provide valuable information on developing emergency operations plans, promoting a common understanding of the fundamentals of community-based, risk-informed planning and decision making.'
  }
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
  card: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20, // Curved corners
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#ff4d4d', // Red border
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
    marginBottom: 0,
  },
  definitionDescription: {
    fontSize: 18,
    color: '#555',
    lineHeight: 24,
    marginTop: 12,// Space between title and description
  },
  noResultText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});



