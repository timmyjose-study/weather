import { StatusBar } from 'expo-status-bar'
import { ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native'
import SearchInput from './components/SearchInput'
import getImageForWeather from './utils/getImageForWeather'
import { useEffect, useState } from 'react'

export default function App() {
  const [location, setLocation] = useState<string>('')

  const updateLocation = (newLocation: string) => {
    setLocation(newLocation)
  }

  useEffect(() => {
    updateLocation('San Francisco')
  }, [])

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <ImageBackground
        source={getImageForWeather('Clear')}
        style={styles.imageContainer}
        imageStyle={styles.image}
      />
      <View style={styles.detailsContainer}>
        <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
        <Text style={[styles.smallText, styles.textStyle]}>Light Cloud</Text>
        <Text style={[styles.largeText, styles.textStyle]}>24&deg;</Text>
        <SearchInput placeholder='Search any City' locationCallback={updateLocation}/>
      </View>
      <StatusBar style="auto" />
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
