import React from 'react';
import { ImageBackground, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function AppBackground({ children }: { children: React.ReactNode }) {
  return (
    <ImageBackground
      source={require('../assets/background_standard.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
  },
});
