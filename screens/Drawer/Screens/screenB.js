import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';

const ScreenB = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="black" />
        </TouchableOpacity>


      </View>



      <View style={styles.container}>
        <Text style={styles.text}>Hello from screen B</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  backButton: {
    // position: 'absolute',

    left: 10,
    // marginTop: 50
  },
});

export default ScreenB;