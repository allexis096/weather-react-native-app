import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function PreviousCard({ city, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.previousContainer}>
      <View style={styles.previousContainerView}>
        <Text style={styles.previousContainerTextBold}>{city.city}</Text>
        <Text>
          {city.state_code}, {city.country}
        </Text>
      </View>
      <Feather name="arrow-right" size={24} color="#f2494d" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  previousContainer: {
    backgroundColor: '#dbdbdb',
    marginTop: 5,
    marginBottom: 5,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
  },
  previousContainerTextBold: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  previousContainerView: {
    borderLeftWidth: 3,
    borderLeftColor: '#f2494d',
    paddingLeft: 5,
  },
});
