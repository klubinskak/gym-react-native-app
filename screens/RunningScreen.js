import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  ImageBackground,
} from "react-native";
import React from "react";
import tw from "twrnc";
import runningImg from "../assets/running-image.jpg";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

const RunningScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={tw`bg-black h-full`}>
      <StatusBar barStyle="light-content" />
      <View style={tw`flex-row items-center justify-center px-6`}>
        <TouchableOpacity
          style={tw`bg-opacity-50 backdrop-filter backdrop-blur-md bg-gray-700 p-4 rounded-full`}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <View style={tw`items-center flex-1 mr-12`}>
          <Text style={tw`text-lg text-center text-white`}>
            Running Counter
          </Text>
        </View>
      </View>
      <View>
        <ImageBackground
          source={runningImg}
          style={tw`w-full h-full relative`}
        ></ImageBackground>
        <View
          style={tw`bg-opacity-50 backdrop-filter backdrop-blur-md bg-[#313131] absolute bottom-15 items-center rounded-[50px]  py-7  w-full z-10`}
        >
          <Text style={tw`text-7xl py-5 text-white font-bold`}>12:56</Text>
          <View style={tw`flex-row justify-between px-8 items-center w-full`}>
            <TouchableOpacity
              style={tw`bg-gray-600 bg-opacity-50 backdrop-filter backdrop-blur-md rounded-[30px] w-[130px] p-4 items-center`}
            >
              <Text style={tw`text-white`}>TIME</Text>
              <Text style={tw`text-white font-bold`}>20MIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`bg-[#E0FE0E] p-7 rounded-full`}>
              <Text style={tw`text-white`}>
                <FontAwesome name="pause" size={24} color="black" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-gray-600 bg-opacity-50 backdrop-filter backdrop-blur-md rounded-[30px] w-[130px] p-4 items-center`}
            >
              <Text style={tw`text-white`}>EQUIP</Text>
              <Text style={tw`text-white font-bold`}>MUSCLES</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RunningScreen;
