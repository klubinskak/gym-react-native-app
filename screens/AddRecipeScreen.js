import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import ImageUploader from "../components/ImageUploader";
import tw from "twrnc";
import { Input } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

const AddRecipeScreen = ({ navigation }) => {
  const meal = {
    id: Number,
    name: String,
    image: String,
    ingridients: Array,
    time: Number,
    instruction: String,
  };

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
          <Text style={tw`text-lg text-center text-white`}>Add Recipe</Text>
        </View>
      </View>
      <View
        style={tw`bg-gray-600 bg-opacity-30 backdrop-filter backdrop-blur-md mx-3 rounded-[20px]`}
      >
        <ImageUploader />
      </View>
      <View style={tw`bg-black px-3 py-3 w-full h-full`}>
        <View style={tw``}>
          <Text style={tw`font-light py-3 px-2 text-white`}>Description</Text>
          <Input placeholder="Recipe name" color="white" />
          <Input placeholder="Number of servings" color="white" />
        </View>
        <View>
          <Text style={tw`font-light py-3 px-2 text-white`}>Ingredients</Text>
          <Input placeholder="Add Ingridient" color="white" />
        </View>
        <View>
          <Text style={tw`font-light py-3 px-2 text-white`}>
            Instructions(optional)
          </Text>
          <Input placeholder="Add steps" color="white" />
        </View>
        <View style={tw`items-center justify-center`}>
          <TouchableOpacity
            style={tw`bg-opacity-50 p-5 backdrop-filter backdrop-blur-md bg-gray-700 p-4 rounded-full w-[190px]`}
          >
            <Text style={tw`text-white text-center font-bold p-2`}>
              Add Recipe
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddRecipeScreen;
