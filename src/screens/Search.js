import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { GEOCODE_API_KEY } from 'react-native-dotenv';

import { Creators } from '../store/ducks/city';
import CardPrevious from '../components/CardPrevious';

const BASE_URL = `https://api.opencagedata.com/geocode/v1/json?key=${GEOCODE_API_KEY}&q=`;

export default function Search({ navigation }) {
  const [gps, setGps] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { lastThreeRecents } = useSelector(({ city }) => city);

  const handleSubmitFunc = async ({ cityName }, { resetForm }) => {
    setError(null);

    try {
      if (gps) {
        setGps(false);
        return navigation.push('Temp');
      }

      const { results } = await fetch(`${BASE_URL}${cityName}`).then(res =>
        res.json()
      );

      const {
        geometry,
        components: { town, city, state_code, country },
      } = results[0];

      const coords = {
        latitude: geometry.lat,
        longitude: geometry.lng,
      };

      const completeCity = {
        city: city === undefined && town !== undefined ? town : city,
        state_code,
        country,
      };

      dispatch(Creators.addRecentCity(completeCity));

      resetForm();

      return navigation.push('Temp', { coords });
    } catch (err) {
      console.log(err);
      setError('Error on search this location.');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      style={styles.container}
    >
      <Text style={styles.textLocation}>Type your location here:</Text>
      <Formik
        initialValues={{ cityName: '' }}
        onSubmit={(values, { resetForm }) =>
          handleSubmitFunc(values, { resetForm })
        }
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <TextInput
              style={styles.textInput}
              keyboardAppearance="dark"
              placeholder="input a city here"
              value={values.cityName}
              onBlur={handleBlur('cityName')}
              onChangeText={handleChange('cityName')}
            />
            {error && (
              <Text style={{ margin: 5, color: '#f2494d' }}>{error}</Text>
            )}
            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={() => {
                  setGps(false);
                  handleSubmit();
                }}
                style={styles.actionButton}
              >
                <Text style={styles.actionButtonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  setGps(true);
                  handleSubmit();
                }}
              >
                <MaterialIcons name="gps-fixed" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
      <Text style={styles.titleText}>Previous Searches</Text>
      <View>
        {lastThreeRecents.map((city, index) => (
          <CardPrevious
            key={index}
            city={city}
            onPress={() => handleSubmitFunc({ cityName: city.city })}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  textLocation: {
    fontSize: 24,
    paddingTop: 15,
    paddingBottom: 15,
  },
  textInput: {
    fontSize: 20,
    padding: 16,
    borderColor: '#dbdbdb',
    borderWidth: 1,
    borderRadius: 15,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#f2494d',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    width: 120,
    height: 55,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 15,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleText: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2c2c2c',
  },
});
