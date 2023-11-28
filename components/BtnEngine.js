import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const BtnEngine = ({text1, text2}) => {
    
  return (
    <View style={styles.flex1}>
      <Text>{text1}</Text>
      <Text>{text2} ₺</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default BtnEngine;
