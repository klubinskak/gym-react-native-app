import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import tw from "twrnc";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const ResultBMRScreen = ({ navigation, route }) => {
  const [message, setMessage] = useState("");
  const [state, setState] = useState({
    status: "",
    color: "",
  });
  const { userInfo } = useSelector((state) => state.userInfo);

  useEffect(() => {
    checkBMI(userInfo.BMI);
  });

  const checkBMI = (BMI) => {
    if (BMI > 18.5 && BMI < 25) {
      setMessage("You have a normal body weight. Good job!");
      state.status = "NORMAL";
      state.color = "green-500";
    }
    if (BMI < 18.5) {
      setMessage("You have underweight body weight.");
      state.status = "UNDERWEIGHT";
      state.color = "red-500";
    }
    if (BMI > 25) {
      setMessage("You have overweight body weight.");
      state.status = "OVERWEIGHT";
      state.color = "orange-500";
    }
  };

  return (
    <SafeAreaView style={tw``}>
      <View style={tw`flex-row items-center justify-center px-5 py-3`}>
        <AntDesign
          name="arrowleft"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <View style={tw`items-center flex-1 mr-12 `}>
          <Text style={tw`text-lg text-center`}>Your Results</Text>
        </View>
      </View>
      <View style={tw`flex justify-center px-5 py-2`}>
        <View
          style={tw`bg-black h-140 justify-center items-center  rounded rounded-[20px]`}
        >
          <Text style={tw`mb-12 text-4xl font-bold text-white`}>
            Your results
          </Text>
          <View>
            <Text style={tw`mb-3 text-center text-white`}>
              Your caloric needs{" "}
            </Text>
            <Text style={tw`text-6xl font-bold text-center text-white`}>
              {userInfo.BMR}
            </Text>
          </View>
          <Text style={tw`font-bold text-${state.color} text-xl mb-5 mt-10`}>
            {state.status}
          </Text>
          <Text style={tw`text-6xl font-bold text-white`}>{userInfo.BMI}</Text>
          <Text style={tw`mb-1 text-white`}>Normal BMI range:</Text>
          <Text style={tw`mb-4 text-white`}>18,5 - 25 kg/m2</Text>
          <Text style={tw`mb-2 text-center text-white w-60`}>{message}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={tw`bg-[#a3b18a] text-white p-3 m-6 mt-6 rounded rounded-full h-16 items-center justify-center`}
        onPress={() => navigation.goBack()}
      >
        <Text style={tw`text-lg text-white`}>Re-calculate your BMR & BMI</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ResultBMRScreen;
