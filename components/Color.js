import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Text} from 'react-native-svg';

const Color = ({color, active}) => {
  const styles = StyleSheet.create({
    colors: {
      borderRadius: 100,
      width: 40,
      height: 40,
      backgroundColor: color,
    },
    activeColor: {
      borderWidth: 5,
      borderRadius: 100,
      borderColor: 'blue',
    },
  });

  return (
    <View style={[styles.colors, active == color ? styles.activeColor : '']}>
    </View>
  );
};

export default Color;
