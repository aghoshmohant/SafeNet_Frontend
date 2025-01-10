import { Image, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import { hp, wp } from '../helper/common';
import BackButton from '../components/BackButton';
import { useRouter } from 'expo-router';

const guidelines = {
  Earthquakes: {
    dos: [
      "Move away from all glass and breakable objects",
      "Identify safe places",
      "Hide under a strong desk or table, and cover your head and neck",
      "Stay in a secure location until told it’s safe",
      "Locate your emergency kit if needed",
      "Stay in communication with local authorities and disaster responders",
    ],
    donts: [
      "Move around or try to outrun the situation",
      "Drive during an earthquake",
      "Go near any live wires or debris",
      "Enter a building until it is inspected and deemed safe if outdoors",
    ],
  },
  Wildfires: {
    dos: [
      "Remove flammable materials from your home’s exterior",
      "Shut off gas systems",
      "Soak your roof and plants near your building or home if time permits",
      "Shut all windows and doors",
      "Follow evacuation directions from city officials and authorities",
      "Stay connected to the news and monitor the situation",
      "Stay close to a body of water, stream, or less flammable area like a mountain backside if surrounded",
    ],
    donts: [
      "Go near a live wildfire",
      "Attempt to control a wildfire",
      "Return home until deemed safe",
      "Leave your vehicle engine on in a directly affected area; get low in the vehicle with the engine off",
    ],
  },
  Hurricanes: {
    dos: [
      "Track the hurricane and prepare accordingly",
      "Gather supplies and ensure your emergency kit is stocked",
      "Install storm shutters",
      "Store loose exterior items in a safe location",
      "Sterilize the bath tub and fill it with water",
      "Be aware of flood risks in your area",
      "Evacuate if instructed to",
      "Stay inside and away from windows",
      "Wait until officials deem it safe to leave your home",
      "Take photos for insurance",
    ],
    donts: [
      "Avoid electrical equipment",
      "Do not enter a body of water",
      "Do not go near live wires",
      "Do not run a generator indoors",
      "Do not go outside during the storm",
    ],
  },
  Tornados: {
    dos: [
      "Get into the basement or storm cellar",
      "Cover your head and neck with your hands and arms",
      "If outside, lie in a ditch and cover up",
      "Wait until the tornado has completely passed",
      "Drive away from the tornado's path if in a car",
    ],
    donts: [
      "Take shelter in a flimsy structure",
      "Seek shelter under an overpass",
      "Use an elevator in a building",
      "Stand by or look out of windows",
      "Stand near heavy objects that could fall",
      "Attempt to chase or record a tornado",
    ],
  },
};

const DoDont = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  const filterGuidelines = () => {
    if (!searchText.trim()) return guidelines;

    const filtered = {};
    Object.keys(guidelines).forEach((category) => {
      if (category.toLowerCase().includes(searchText.toLowerCase())) {
        filtered[category] = guidelines[category];
      }
    });

    return filtered;
  };

  const filteredGuidelines = filterGuidelines();

  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton router={router} />
          <Image resizeMode="contain" source={require('../assets/images/SafeNetText.png')} style={styles.logo} />
        </View>
        <View style={{padding:20}}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search disaster type (e.g., Earthquakes)"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <ScrollView style={styles.scrollContainer}>
          {Object.keys(filteredGuidelines).map((category) => (
            <View key={category} style={styles.categoryBox}>
              <Text style={styles.categoryTitle}>{category}</Text>
              <Text style={styles.subTitle}>Do's</Text>
              {filteredGuidelines[category].dos.map((item, index) => (
                <Text key={`do-${index}`} style={styles.guidelineText}>
                  {`• ${item}`}
                </Text>
              ))}
              <Text style={styles.subTitle}>Don'ts</Text>
              {filteredGuidelines[category].donts.map((item, index) => (
                <Text key={`dont-${index}`} style={styles.guidelineText}>
                  {`• ${item}`}
                </Text>
              ))}
            </View>
          ))}
        </ScrollView>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default DoDont;

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
  searchBar: {
    marginTop: 15,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#eaeaea',
    fontSize: 16,
  },
  scrollContainer: {
    marginTop: 20,
  },
  categoryBox: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    color: '#444',
  },
  guidelineText: {
    fontSize: 16,
    color: '#555',
    marginVertical: 2,
  },
});
