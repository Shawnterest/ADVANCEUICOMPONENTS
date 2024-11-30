import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, Animated, Easing, TouchableOpacity } from 'react-native';
import withLogging from './withLogging';
import CustomButton from './customButton';

const EnhancedButton = withLogging(CustomButton);
const App = () => {
  const [isVisible, setIsVisible] = useState(false); 
  const fadeAnim = useRef(new Animated.Value(0)).current; 
  const [colorChanged, setColorChanged] = useState(false); 
 

  const toggleFade = () => {
    Animated.timing(fadeAnim, {
      toValue: isVisible ? 0 : 1, 
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    setIsVisible(!isVisible);
  };
 

  const translateY = useRef(new Animated.Value(0)).current;
  const [isMoved, setIsMoved] = useState(false);
  const buttonColor = colorChanged ? 'red' : 'yellowgreen';


  const startTranslation = () => {
    const toValue = isMoved ? 0 : 100;
    Animated.timing(translateY, {
      toValue: toValue, 
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(); 
    setIsMoved(!isMoved);   
  };


  return (
    <View style={styles.container}>
     <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonColor}]}
        onPress={() => {
          console.log('Enhanced Button Pressed!');
          setColorChanged(!colorChanged); 
        }}>

        <Text style={styles.buttonText}> Enhanced Me </Text>

      </TouchableOpacity>        
      <Animated.View style={{...styles.box, opacity: fadeAnim}}/>
      <Button title={isVisible ? 'Fade Out' : 'Fade In'} onPress={toggleFade}/>
 
      <Animated.View style={[styles.box, { transform: [{ translateY }] }]}/>
      <Button title={isMoved ? 'Move Back' : 'Move Down'} onPress={startTranslation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: 'yellowgreen',
    marginBottom: 20, 
    marginTop: 15,
    height: 100,
    width: 100,
  },
  button: {
    borderRadius: 17,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    padding: 6, 
  },
});

export default App;

