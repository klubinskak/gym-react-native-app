import { SafeAreaView, View, Text, TouchableOpacity, Button } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import CalendarStrip from "react-native-calendar-strip";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import MealCard from "../components/MealCard";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import AddRecipeScreen from './AddRecipeScreen';
import { useRoute } from '@react-navigation/native';
import Navbar from "../components/Navbar";




const FoodScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();


  return (
    <SafeAreaView style={tw`bg-white`}>
      <Navbar route={route}/>
      <ScrollView>
      <CalendarStrip
        scrollable
        style={{ height: 100, paddingBottom: 55 }}
        calendarColor={"transparent"}
        calendarHeaderStyle={{ display: "none" }}
        dateNumberStyle={{ color: "black" }}
        dateNameStyle={{ color: "#adb5bd" }}
        onDateSelected={() => console.log("Clicked!!!!")}
        iconContainer={{ flex: 0.1 }}
      />
      <View style={tw`mt-[-50]`}>
        <View style={tw`items-center justify-center pb-3`}>
          <Text style={tw`text-[#6c757d] text-sm`}>Calories left</Text>
          <Text style={tw`text-3xl font-bold`}>1.480 kcal</Text>
          <Text style={tw`text-3xl`}>💪🏼</Text>
        </View>
        <View>
          <View style={tw`flex-row justify-around p-2`}>
            <AnimatedCircularProgress
              size={50}
              width={7}
              fill={80}
              tintColor="#3a0ca3"
              onAnimationComplete={() => console.log("onAnimationComplete")}
              backgroundColor="#e5e5e5"
            />
            <View style={tw`justify-center`}>
              <Text style={tw`font-bold`}>Carbs</Text>
              <Text>70g left</Text>
            </View>
            <AnimatedCircularProgress
              size={50}
              width={7}
              fill={80}
              tintColor="#fca311"
              onAnimationComplete={() => console.log("onAnimationComplete")}
              backgroundColor="#e5e5e5"
            />
            <View style={tw`justify-center`}>
              <Text style={tw`font-bold`}>Fat</Text>
              <Text>26g left</Text>
            </View>
            <AnimatedCircularProgress
              size={50}
              width={7}
              fill={80}
              tintColor="#4cc9f0"
              onAnimationComplete={() => console.log("onAnimationComplete")}
              backgroundColor="#e5e5e5"
            />
            <View style={tw`justify-center`}>
              <Text style={tw`font-bold`}>Protein</Text>
              <Text>58g left</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={tw`px-2 items-center py-3`}>
          <TouchableOpacity
            style={tw`bg-black p-2 w-90 h-15 text-white rounded-full`}
          >
            <Button color="white" title="+ Add recipe" onPress={()=> navigation.navigate(AddRecipeScreen)}></Button>
          </TouchableOpacity>
        </View>
     <MealCard/>
     </ScrollView>
    </SafeAreaView>
  );
};

export default FoodScreen;
