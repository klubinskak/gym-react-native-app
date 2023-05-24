import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { Icon } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';


const Plan = ({calories}) => {

  const data = [
    {
      id: 1,
      background: "black",
      screen: "Workout",
      icon: "fitness-center",
      color:"white",
      type: "material",
      title: "Workout",
      description: "2 Hours",
    },
    {
      id: 2,
      background: "[#a3b18a]",
      screen: "Running",
      icon: "directions-run",
      color:"white",
      type: "material",
      title: "Running",
      description: "12 km",
    },
    {
      id: 3,
      background: "black",
      screen: "FoodScreen",
      icon: "restaurant",
      color: "white",
      type: "material",
      title: "Food",
      description: "1800 kcal",
    },
      {
      id: 4,
      background: "[#a3b18a]",
      screen: "BMR Calculator",
      icon: "calculate",
      color: "white",
      type: "material",
      title: "BMR & BMI Calculator",
      description: calories + ' kcal',
    },
  ];

  
  console.log(calories)
  const navigation = useNavigation();
  return (
    <View style={tw`p-2`}>
      <View style={tw`flex-row items-center`}>
        <Text style={tw`text-xl ml-3 mt-3 font-bold`}>My Plan</Text>
        <Icon
          style={tw`mt-3`}
          name="keyboard-arrow-right"
          color="black"
          type="material"
        />
      </View>
      <View>
        <FlatList
          data={data}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`p-5 bg-gray-200 h-50 bg-${item.background} rounded-6 w-35 m-2`} onPress={()=> navigation.navigate(item.screen)}
            >
              <View style={tw`h-full justify-between items-start`}>
                <Icon
                  style={tw`p-2`}
                  name={item.icon}
                  color={item.color}
                  type={item.type}
                />
                <View>
                  <Text style={tw`mt-2 text-lg font-semibold text-${item.color}`}>
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
