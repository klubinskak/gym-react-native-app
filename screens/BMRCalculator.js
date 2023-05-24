import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { ButtonGroup } from "react-native-elements";
import Slider from "@react-native-community/slider";
import tw from "twrnc";
import Icon from "react-native-vector-icons/FontAwesome";
import { postUserInfo } from "../src/firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { setInfo } from "../src/redux/userInfoSlice";
import { calculateBMX } from "../utils/calculateBMX";
import Navbar from "../components/Navbar";





const BMRCalculator = ({ navigation }) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { user } = useSelector((state) => state.user.value)
  const [data, setData] = useState({
    BMI: 0,
    BMR: 0,
    gender: "",
    height: 150,
    weight: 50,
    age: 20,
  });  

  const handlePress = () => {
    calculateBMX(data);
    console.log("User:", user)
    // data.id = user.id
    try {
      postUserInfo(data);
      dispatch(setInfo(data));
    }catch (e) {
      console.log(e);
    }
    navigation.navigate("ResultBMRScreen");
  }

  return (
    <SafeAreaView backgroundColor={"#ced4da"} style={tw`h-full`}>
      <Navbar route={route} />
      <View style={tw`p-3`}>
        <ButtonGroup
          buttons={["MALE", "FEMALE"]}
          selectedIndex={selectedIndex}
          onPress={(value) => {
            if (value == 0) {
              setData((prev) => ({
                ...prev,
                gender: "male",
              }));
            } else {
              setData((prev) => ({
                ...prev,
                gender: "female",
              }));
            }
            setSelectedIndex(value);
          }}
          textStyle={{ color: "white" }}
          buttonStyle={{ backgroundColor: "black" }}
          containerStyle={{ marginBottom: 20, height: 130 }}
          selectedButtonStyle={{ backgroundColor: "#a3b18a" }}
        />
        <View
          style={tw`bg-black h-50 p-3 flex justify-center items-center `}
        >
          <Text style={tw`text-gray-300 mb-5`}>HEIGHT</Text>
          <View style={tw`flex-row items-end`}>
            <Text style={tw`text-3xl text-white font-bold`}>
              {data.height} <Text style={tw`text-xs text-gray-300`}>cm</Text>
            </Text>
          </View>
          <Slider
            value={150}
            style={{ width: 250, height: 40, color: 'white' }}
            minimumValue={0}
            maximumValue={300}
            onValueChange={(value) => {
              setData((prev) => ({
                ...prev,
                height: Math.round(value),
              }));
            }}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#6c757d"
          />
        </View>
        <View style={tw`flex-row`}>
          <View
            style={tw`p-3 bg-black mt-5 w-50 mr-1 h-55 items-center justify-center`}
          >
            <Text style={tw`text-white mb-3`}>WEIGHT</Text>
            <Text style={tw`text-3xl text-white font-bold m-2`}>
              {data.weight}
            </Text>
            <View style={tw`flex-row`}>
              <TouchableOpacity
                onPress={() =>
                  setData((prev) => ({
                    ...prev,
                    weight: data.weight - 1,
                  }))
                }
                style={tw`rounded-full bg-white mr-3 w-13 justify-center items-center h-13`}
              >
                <Icon name="minus" style={tw`m-2`} size={18} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setData((prev) => ({
                    ...prev,
                    weight: data.weight + 1,
                  }))
                }
                style={tw`rounded-full bg-white w-13 justify-center items-center h-13`}
              >
                <Icon name="plus" style={tw`m-2`} size={18} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={tw`p-3 bg-black mt-5 w-50 h-55 items-center justify-center`}
          >
            <Text style={tw`text-white mb-3`}>AGE</Text>
            <Text style={tw`text-3xl text-white font-bold m-2`}>
              {data.age}
            </Text>
            <View style={tw`flex-row`}>
              <TouchableOpacity
                onPress={() =>
                  setData((prev) => ({
                    ...prev,
                    age: data.age - 1,
                  }))
                }
                style={tw`rounded-full bg-white w-13 justify-center items-center h-13`}
              >
                <Icon name="minus" style={tw`m-2`} size={18} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setData((prev) => ({
                    ...prev,
                    age: data.age + 1,
                  }))
                }
                style={tw`rounded-full bg-white ml-3 w-13 justify-center items-center h-13`}
              >
                <Icon name="plus" style={tw`m-2`} size={18} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={tw`bg-[#a3b18a] text-white rounded-full p-3 m-3 mt-6`}
        onPress={handlePress}
        disabled={data.gender == ""}
      >
        <Button
          disabled={data.gender == ""}
          color="white"
          style={tw`bg-[#a3b18a] text-white rounded rounded-full h-13 items-center justify-center`}
          type="clear"
          titleStyle={{ color: "white" }}
          title="Calculate your BMR & BMI"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BMRCalculator;
