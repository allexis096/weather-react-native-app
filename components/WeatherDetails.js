import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import { colors } from '../utils';
import { WeatherBox } from '.';

const { PRIMARY_COLOR, BORDER_COLOR } = colors;

export default function WeatherDetails({ currentWeather, unitsSystem }) {
  const { 
    main: { feels_like, humidity, pressure },
    wind: { speed },
  } = currentWeather;

  const windSpeed = 
    unitsSystem === 'metric' ? `${Math.round(speed)} m/s` : `${Math.round(speed)} miles/h`

  return (
    <View style={styles.weatherDetails}>
      <View style={styles.weatherDetailsRow}>
        <WeatherBox
          style={{ borderRightWidth: 1, borderRightColor: BORDER_COLOR, flex: 1, padding: 20 }}
          icon={<FontAwesome5 name="temperature-low" size={25} color={PRIMARY_COLOR} />}
          text="Feels like:"
          textAPI={feels_like}
          unit="º"
        />
        <WeatherBox
          style={{ borderRightWidth: 1, borderRightColor: BORDER_COLOR, flex: 1, padding: 20 }}
          icon={<MaterialCommunityIcons name="water" size={30} color={PRIMARY_COLOR} />}
          text="Humidity:"
          textAPI={humidity}
          unit="%"
        />
      </View>

      <View style={{...styles.weatherDetailsRow, borderTopWidth: 1, borderTopColor: BORDER_COLOR}}>
        <WeatherBox
          style={{ borderRightWidth: 1, borderRightColor: BORDER_COLOR, flex: 1, padding: 20 }}
          icon={<MaterialCommunityIcons name="weather-windy" size={30} color={PRIMARY_COLOR} />}
          text="Wind Speed:"
          textAPI={windSpeed}
        />
        <WeatherBox
          icon={<MaterialCommunityIcons name="speedometer" size={30} color={PRIMARY_COLOR} />}
          text="Pressure:"
          textAPI={pressure}
          unit="hPa"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherDetails: {
    marginTop: 'auto',
    margin: 15,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 10,
  },
  weatherDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});