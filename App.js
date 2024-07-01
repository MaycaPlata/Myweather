import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons'; 


export const fetchWeatherData = async (city) => {
  try {
    const apiKey = "a27bdeda609ed694998e6b261b8e1f75"; 
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) return null;

  let weatherIconName;
  switch (weatherData.weather[0].main) {
    case 'Clear':
      weatherIconName = 'md-sunny';
      break;
    case 'Clouds':
      weatherIconName = 'md-cloudy';
      break;
    case 'Rain':
      weatherIconName = 'md-rainy';
      break;
    default:
      weatherIconName = 'md-partly-sunny';
  }

  return (
    <View style={styles.weatherContainer}>
      <Text style={styles.weatherText}>Temperature: {weatherData.main.temp} °C</Text>
      <Text style={styles.weatherText}>Description: {weatherData.weather[0].description}</Text>
      <Ionicons name={weatherIconName} size={50} color="orange" />
    </View>
  );
};

export default function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

 
  const handleFetchWeather = async () => {
    try {
      const data = await fetchWeatherData(city);
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>

      <TextInput
        style={styles.input}
        value={city}
        onChangeText={setCity}
        placeholder="Enter city name"
      />

      <TouchableOpacity style={styles.button} onPress={handleFetchWeather}>
        <Text style={styles.buttonText}>Get Weather</Text>
      </TouchableOpacity>

      {error && <Text style={styles.error}>{error}</Text>}

      <WeatherDisplay weatherData={weatherData} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 18,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    fontSize: 18,
    marginTop: 10,
  },
});
