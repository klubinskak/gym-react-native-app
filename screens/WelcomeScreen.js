import {
  SafeAreaView,
  Text,
  Image,
  View,
  Button,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import welcomeImg from "../assets/welcome.png";
import tw from "twrnc";
import LoginScreen from "./auth/LoginScreen";
import RegisterScreen from "./auth/RegisterScreen";

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={tw`bg-black h-full`}>
      <StatusBar barStyle="light-content" />
      <View style={tw`py-5 items-center`}>
        <Image style={tw`w-100 h-100`} source={welcomeImg} />
      </View>
      <View style={tw`justify-center items-center`}>
        <Text style={tw`text-3xl font-bold text-white`}>
          Your Daily Workout
        </Text>
        <Text style={tw`text-3xl font-bold text-white`}>Companion</Text>
        <Text style={tw`w-[250px] text-center text-gray-500 p-3`}>
          Enhance your workout experiance with our workout app!
        </Text>
      </View>
      <View style={tw`pt-[100px] items-center`}>
        <TouchableOpacity
          style={tw`bg-gray-600 bg-opacity-50 backdrop-filter backdrop-blur-md p-2 w-90 h-15 rounded-full items-center justify-center`}
          onPress={() => navigation.navigate(RegisterScreen)}
        >
          <Text style={tw`text-center text-white text-xl`}>Register now</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`justify-center items-center flex-row py-5`}>
        <Text style={tw`text-white`}>Already have an account?</Text>
        <Button
          title="Sign In"
          onPress={() => navigation.navigate(LoginScreen)}
        />
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
