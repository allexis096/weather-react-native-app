import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { WEATHER_API_KEY } from 'react-native-dotenv';

import WeatherInfo from '../components/WeatherInfo';
import UnitsPicker from '../components/UnitsPicker';
import ReloadIcon from '../components/ReloadIcon';
import WeatherDetails from '../components/WeatherDetails';

import { colors } from '../utils';

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';

export default function Temp({ route }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState('metric');

  useEffect(() => {
    load();
  }, [unitsSystem]);

  async function load() {
    try {
      setCurrentWeather(null);
      setErrorMessage(null);

      if (route.params === undefined) {
        const { status } = await Location.requestPermissionsAsync();

        if (status !== 'granted') {
          setErrorMessage('Access to location is needed to run the App.');
          return;
        }
      }

      const data =
        route.params !== undefined
          ? route.params
          : await Location.getCurrentPositionAsync();

      const { latitude, longitude } = data.coords;

      const weatherURL = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;

      const response = await fetch(weatherURL);

      const result = await response.json();

      if (response.ok) {
        setCurrentWeather(result);
      } else {
        setErrorMessage(result.message);
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  }

  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker
            unitsSystem={unitsSystem}
            setUnitsSystem={setUnitsSystem}
          />
          <ReloadIcon load={load} />
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails
          currentWeather={currentWeather}
          unitsSystem={unitsSystem}
        />
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <ReloadIcon load={load} />
        <Text style={{ textAlign: 'center' }}>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1,
  },
});
