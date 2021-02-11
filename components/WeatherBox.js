import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors } from '../utils';

const { SECONDARY_COLOR } = colors;

export default function WeatherBox({ icon, text, textAPI, unit, ...rest }) {
  return (
    <View style={styles.weatherDetailsBox} {...rest}>
      <View style={styles.weatherDetailsRow}>
        {icon}
        <View style={styles.weatherDetailsItems}>
          <Text>{text}</Text>
          <Text style={styles.textSecondary}>{textAPI}{unit}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weatherDetailsBox: {
    flex: 1,
    padding: 20,
  },
  weatherDetailsItems: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  textSecondary: {
    fontSize: 15,
    color: SECONDARY_COLOR,
    fontWeight: '700',
    marginTop: 7
  },
});