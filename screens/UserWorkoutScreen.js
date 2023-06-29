import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { fetchUserTodaysWorkout } from "../src/firebase/config";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import workoutImg from "../assets/workout-image.jpg";

const UserWorkoutScreen = ({ navigation }) => {
  const [workouts, setWorkouts] = useState([]); // [{}
  const [calories, setCalories] = useState(0);

  useEffect(() => {
    const date = new Date().toLocaleDateString();
    console.log(date);
    fetchData(date);
    countCalories();
  }, []);

  const fetchData = async (date) => {
    try {
      const data = await fetchUserTodaysWorkout(date);
      setWorkouts(data);
    } catch (error) {
      console.log("Error fetching user's today's workout:", error);
    }
  };

  const countCalories = () => {
    let calories = 0;
    workouts.forEach((workout) => {
      calories += workout.calories;
    });
    setCalories(calories);
  };

  return (
    <SafeAreaView style={tw`bg-black h-full`}>
      <ImageBackground source={workoutImg} style={tw`w-full h-full relative`}>
        <View style={tw`flex-row items-center justify-around px-7 py-3`}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`bg-opacity-50 backdrop-filter backdrop-blur-md bg-gray-700 p-4 rounded-full`}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <View style={tw`items-center flex-1 mr-12`}>
            <Text style={tw`text-lg text-center text-white`}>
              Today's Workout
            </Text>
          </View>
        </View>
        <View
          style={tw`h-full items-center justify-center bg-opacity-40 backdrop-filter backdrop-blur-md bg-black `}
        >
          <View
            style={tw`items-center justify-center p-3 bg-opacity-60 backdrop-filter backdrop-blur-md bg-black w-[350px] h-[300px] rounded-[25px]`}
          >
            <Text style={tw`text-xl text-white`}>
              Your burned: {Math.round(calories)} today
            </Text>
            <View style={tw`items-center justify-center`}>
              {workouts && workouts.length > 0 ? (
                <FlatList
                  data={workouts}
                  horizontal
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View
                      key={item.id}
                      style={tw`p-4 items-center justify-center m-10 bg-black w-[300px] rounded-[15px] h-[200px]`}
                    >
                      <Text style={tw`my-5 text-xl text-white`}>
                        {item.icon}
                        {item.activity}
                      </Text>
                      <Text style={tw`text-white`}>
                        Calories burned: {Math.round(item.calories)}
                      </Text>
                      <Text style={tw`text-white`}>
                        Distance: {item.distance}km
                      </Text>
                      <Text style={tw`text-white`}>
                        Time: {item.duration} min
                      </Text>
                    </View>
                  )}
                />
              ) : (
                <View style={tw`items-center `}>
                  <Text style={tw`p-5 text-white`}>No workouts yet</Text>
                  <TouchableOpacity
                    style={tw`items-center justify-center text-white  bg-white bg-opacity-50 backdrop-filter backdrop-blur-md rounded-full w-50 h-15`}
                    onPress={() => navigation.navigate("AddActivityScreen")}
                  >
                    <Text style={tw`py-3 text-xl text-white`}>Add Workout</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default UserWorkoutScreen;
