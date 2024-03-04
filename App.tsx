import { StatusBar } from 'expo-status-bar'
import { ActivityIndicator, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native'
import SearchInput from './components/SearchInput'
import getImageForWeather from './utils/weatherIImages'
import { useEffect, useState } from 'react'
import fetchWeather from './utils/api'

type AppState = {
  loading: boolean;
  error: boolean;
  address: string;
  temperature: number;
  description: string;
}

const initialState: AppState = {
  loading: true,
  error: false,
  address: '',
  temperature: 0,
  description: ''
}

export default function App() {
  const [state, setState] = useState<AppState>(initialState)

  const handleUpdateLocation = async (city: string) => {
    if (!city) return

    try {
      const { address, temperature, description } = await fetchWeather(city)

      setState({
        loading: false,
        error: false,
        address,
        temperature,
        description
      })
    } catch (err) {
      setState(prevState => ({
        ...prevState,
        loading: false,
        error: true
      }))
    }
  }

  useEffect(() => {
    async function fetchInitialData() {
      await handleUpdateLocation('San Francisco')
    }
    fetchInitialData()
  }, [])

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <StatusBar style='auto' />
      <ImageBackground
        source={getImageForWeather(state.description)}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
      <View style={styles.detailsContainer}>
        <ActivityIndicator animating={state.loading} color='white' size='large'/>
        {!state.loading && (
          <View>
            {state.error && (
              <Text style={[styles.smallText, styles.textStyle]}>
                Could not load weather data. Please try a different city.
              </Text>
            )}
        {!state.error && (
        <View>
          <Text style={[styles.largeText, styles.textStyle]}>{state.address}</Text>
          <Text style={[styles.smallText, styles.textStyle]}>{state.description}</Text>
          <Text style={[styles.largeText, styles.textStyle]}>{state.temperature}&deg;</Text>
        </View>
        )}
        <SearchInput placeholder='Search any City' locationCallback={handleUpdateLocation}/>
      </View>
      )}
    </View>
    </ImageBackground>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495e'
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 20
  },
  smallText: {
    fontSize: 18
  },
  largeText: {
    fontSize: 44
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS == 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white'
  },
  imageContainer: {
    flex: 1
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  }
})
