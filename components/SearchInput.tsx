import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface SearchProps {
  placeholder: string;
  locationCallback: (newLocation: string) => void;
}

export default function(props: SearchProps) {
  const [newLocation, setNewLocation] = useState<string>('')

  return (
    <View style={styles.container}>
      <TextInput
        autoCorrect={false}
        placeholder={props.placeholder}
        placeholderTextColor='white'
        style={styles.textInput}
        underlineColorAndroid='transparent'
        clearButtonMode='always'
        onChangeText={text => setNewLocation(text)}
        onSubmitEditing={() => props.locationCallback(newLocation)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#666',
    color: 'white',
    height: 40,
    marginTop: 20,
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: .5
  },
  textInput: {
    flex: 1,
    color: 'white'
  }
})