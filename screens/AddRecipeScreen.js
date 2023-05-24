import { SafeAreaView, View} from "react-native";
import React from "react";
import ImageUploader from '../components/ImageUploader';
import tw from "twrnc";
import { useRoute } from '@react-navigation/native';
import Navbar from '../components/Navbar';




const AddRecipeScreen = () => {
  const route = useRoute();

  const meal = {
    id: Number,
    name : String,
    image: String,
    ingridients: Array,
    time: Number,
    instruction: String
  }

  return (
    <SafeAreaView>
      <Navbar route={route.name}/>
      <ImageUploader/>
      <View style={tw`bg-gray-300 w-full h-full rounded rounded-10`}>
      </View>
    </SafeAreaView>
  );
};

export default AddRecipeScreen;
