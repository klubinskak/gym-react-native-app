import { SafeAreaView, Text, Image, View, Button, TouchableOpacity } from "react-native";
import React from "react";
import welcomeImg from "../assets/welcome.png";
import tw from "twrnc";
import { useNavigation } from '@react-navigation/native';
import LoginScreen from "./LoginScreen";
import RegisterScreen from './RegisterScreen';



const WelcomeScreen = () => {
  const navigation = useNavigation();


  return (
    <SafeAreaView>
      <View style={tw`py-10`}>
        <Image style={tw`w-100 h-100`} source={welcomeImg} />
      </View>
      <View style={tw`justify-center items-center`}>
        <Text style={tw`text-3xl font-bold`}>Your Daily Workout</Text>
        <Text style={tw`text-3xl font-bold`}>Companion</Text>
        <Text style={tw`w-[250px] text-center text-gray-500 p-3`}>Enhance your workout experiance with our workout app!</Text>
      </View>
      <View style={tw`pt-[60px] items-center`}>
        <TouchableOpacity
          style={tw`bg-black p-2 w-90 h-15 text-white rounded-full`}
        >
          <Button
            color="white"
            title="Register Now"
            onPress={() => navigation.navigate(RegisterScreen)}
          />
        </TouchableOpacity>
      </View>
      <View style={tw`justify-center items-center flex-row py-5`}>
      <Text style={tw`text-black`}>Already have an account?</Text>
      <Button title="Sign In" onPress={()=> navigation.navigate(LoginScreen)}/>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
