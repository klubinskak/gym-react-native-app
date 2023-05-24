import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const MyDrawer = ({ navigation }) => {
  const handleDrawerItemPress = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => handleDrawerItemPress('HomeScreen')}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDrawerItemPress('ProfileScreen')}>
        <Text>Profile</Text>
      </TouchableOpacity>
      {/* Add more drawer items as needed */}
    </View>
  );
};

export default MyDrawer;
