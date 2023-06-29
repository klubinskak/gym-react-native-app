import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import React from "react";
import tw from "twrnc";
import CalendarStrip from "react-native-calendar-strip";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import MealCard from "../components/MealCard";
import { ScrollView } from "react-native-gesture-handler";
import AddRecipeScreen from "./AddRecipeScreen";
import { AntDesign } from "@expo/vector-icons";

const FoodScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={tw`bg-black`}>
      <View style={tw`flex-row items-center justify-center px-7 py-3`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`bg-opacity-50 backdrop-filter backdrop-blur-md bg-gray-700 p-4 rounded-full`}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <View style={tw`items-center flex-1 mr-12`}>
          <Text style={tw`text-lg text-center text-white `}>Meal Plan</Text>
        </View>
      </View>
      <ScrollView>
        <CalendarStrip
          scrollable
          style={{ height: 100, paddingBottom: 55 }}
          calendarColor={"transparent"}
          calendarHeaderStyle={{ display: "none" }}
          dateNumberStyle={{ color: "white" }}
          dateNameStyle={{ color: "white" }}
          onDateSelected={() => console.log("Clicked!!!!")}
          iconContainer={{ flex: 0.1 }}
        />
        <View style={tw`mt-[-50]`}>
          <View style={tw`items-center justify-center pb-3`}>
            <Text style={tw`text-[#6c757d] text-sm text-white`}>
              Calories left
            </Text>
            <Text style={tw`text-3xl font-bold text-white`}>1.480 kcal</Text>
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
                <Text style={tw`font-bold text-white`}>Carbs</Text>
                <Text style={tw`text-white`}>70g left</Text>
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
                <Text style={tw`font-bold text-white`}>Fat</Text>
                <Text style={tw`text-white`}>26g left</Text>
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
                <Text style={tw`font-bold text-white`}>Protein</Text>
                <Text style={tw`text-white`}>58g left</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={tw`items-center px-2 py-3`}>
          <TouchableOpacity
            style={tw`bg-gray-600 bg-opacity-50 backdrop-filter backdrop-blur-md p-2 text-white rounded-full w-90 h-15`}
          >
            <Button
              color="white"
              title="+ Add recipe"
              onPress={() => navigation.navigate(AddRecipeScreen)}
            ></Button>
          </TouchableOpacity>
        </View>
        <MealCard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FoodScreen;
