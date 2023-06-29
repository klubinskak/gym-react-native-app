import { SafeAreaView, View, Text } from "react-native";
import React, { useState, useEffect } from 'react';
import tw from "twrnc";
import { Input } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { CalorieCalculator } from "../utils/caloriesCalculator";
import {postUserActivity} from '../src/firebase/config';
import { AntDesign } from '@expo/vector-icons';




const ActivityScreen = ({ navigation, route }) => {
  const { activity } = route.params;
  const [weight, setWeight] = useState(0);
  const [minutes, setMinutes ] = useState(0);
  const [distance, setDistance] = useState(0);
  const [calories, setCalories] = useState(0);
  const { user } = useSelector((state) => state.user);
  const [parsedUser, setParsedUser] = useState({});

  console.log(user);


  useEffect(() => {
    const parseUser = async () => {
      if (user && typeof user === "string") {
        try {
          const parsed = JSON.parse(user);
          setParsedUser(parsed);
        } catch (error) {
          console.error("Error parsing user data:", error);
          setParsedUser(null);
        }
      } else {
        setParsedUser(user);
      }
    };

    if (user) {
      parseUser();
    }
  }, [user]);


  const handleDurChange = (event) => {
    setWeight(parsedUser.weight);
    const value = event.nativeEvent.text;
    setMinutes(value);
    console.log(weight)
    setCalories(CalorieCalculator(activity, weight, value));
  }

  const handleDistChange = (event) => {
    setWeight(parsedUser.weight);
    const value = event.nativeEvent.text;
    setDistance(value)
    setCalories(CalorieCalculator(activity, weight, minutes, value));
  }

  const handleSubmit = () => {
    const activityData = {
      icon: activity.icon,
      userId: parsedUser.id,
      activity: activity.name,
      calories: calories,
      duration: minutes,
      distance: distance,
      date: new Date().toLocaleDateString(),
    };
    console.log(activityData)
    try {
      postUserActivity(activityData);
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.log(error);
    };
  }

  
  return (
    <SafeAreaView style={tw`bg-black h-full`}>
      <View style={tw`flex-row items-center justify-center px-7 py-3`}>
        <TouchableOpacity style={tw`bg-opacity-50 backdrop-filter backdrop-blur-md bg-gray-700 p-4 rounded-full`} onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <View style={tw`items-center flex-1 mr-12`}>
          <Text style={tw`text-lg text-center text-white`}>{activity.name}</Text>
        </View>
      </View>
      <View style={tw`items-center justify-center py-5`}>
        <Text style={tw`text-5xl`}>{activity.icon}</Text>
        <Text style={tw`my-2 text-white`}>{Math.round(calories)} kcal</Text>
      </View>
      <View style={tw`items-center justify-center mx-10`}>
        <Input placeholder="Duration(min)" keyboardType="numeric" color="white"
 onChange={handleDurChange}/>
        <Input placeholder="Distance(km)" color="white" keyboardType="numeric" onChange={handleDistChange}/>
        <TouchableOpacity
        onPress={handleSubmit}
          style={tw`bg-gray-600 bg-opacity-50 backdrop-filter backdrop-blur-md items-center justify-center p-2 rounded-full w-90 h-15`}
        >
          <Text style={tw`text-xl text-white`}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ActivityScreen;
