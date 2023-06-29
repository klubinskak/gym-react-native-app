import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Plan = () => {
  const navigation = useNavigation();

  const data = [
    {
      id: 1,
      background: "gray-600",
      screen: "UserWorkoutScreen",
      icon: "🏋🏼",
      color: "white",
      type: "material",
      title: "Workout",
      description: "2 Hours",
    },
    {
      id: 2,
      background: "[#E0FE0E]",
      screen: "RunningScreen",
      icon: "🏃🏼",
      color: "black",
      type: "material",
      title: "Running",
      description: "12 km",
    },
    {
      id: 3,
      background: "gray-600",
      screen: "FoodScreen",
      icon: "🥗",
      color: "white",
      type: "material",
      title: "Food",
      description: "1800 kcal",
    },
    {
      id: 4,
      background: "[#E0FE0E]",
      screen: "BMR Calculator",
      icon: "➕",
      color: "black",
      type: "material",
      title: "BMR & BMI",
      description: "Calculator",
    },
  ];

  return (
    <View style={tw`p-2`}>
      <View style={tw`flex-row items-center text-center`}>
        <Text style={tw`mt-3 ml-3 text-xl font-bold text-white`}>My Plan </Text>
      </View>
      <View>
        <FlatList
          data={data}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`p-5 bg-gray-200 h-50 bg-${
                item.background
              } rounded-6 w-35 m-2 ${
                item.id % 2 !== 0
                  ? "bg-opacity-50 backdrop-filter backdrop-blur-md"
                  : ""
              }`}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={tw`items-start justify-between h-full`}>
                <Text style={tw`text-3xl`}>{item.icon}</Text>
                <View>
                  <Text
                    style={tw`mt-2 text-lg font-semibold text-${item.color}`}
                  >
                    {item.title}
                  </Text>
                  <Text style={tw`text-${item.color}`}>{item.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Plan;
