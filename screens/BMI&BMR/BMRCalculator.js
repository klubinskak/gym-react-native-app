import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { ButtonGroup } from "react-native-elements";
import Slider from "@react-native-community/slider";
import tw from "twrnc";
import { postUserInfo } from "../../src/firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { setInfo } from "../../src/redux/userInfoSlice";
import { calculateBMX } from "../../utils/calculateBMX";
import { AntDesign } from "@expo/vector-icons";

const BMRCalculator = ({ navigation }) => {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { user } = useSelector((state) => state.user);
  const { userInfo } = useSelector((state) => state.userInfo);
  const [userId, setUserId] = useState();
  const [data, setData] = useState({});

  useEffect(() => {
    const parseUser = async () => {
      if (user && typeof user === "string") {
        try {
          const parsed = JSON.parse(user);
          if (parsed.id) {
            setUserId(parsed.id);
            console.log(userId);
          } else {
            setUserId(parsed.sub);
          }
          setData({
            id: userId,
            BMI: 0,
            BMR: 0,
            gender: "",
            height: 150,
            weight: 50,
            age: 20,
          });
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      } else {
        setParsedUser(user);
      }
    };

    if (user) {
      parseUser();
    }
  }, [user]);

  const handlePress = () => {
    calculateBMX(data);
    try {
      console.log("Data:", data);
      postUserInfo(data);
      dispatch(setInfo(data));
    } catch (e) {
      console.log(e);
    }
    navigation.navigate("ResultBMRScreen");
  };

  return (
    <SafeAreaView style={tw`h-full bg-black`}>
      <View style={tw`flex-row items-center justify-center px-7 py-3`}>
        <TouchableOpacity
          style={tw`bg-opacity-50 backdrop-filter backdrop-blur-md bg-gray-700 p-4 rounded-full`}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <View style={tw`items-center flex-1 mr-12`}>
          <Text style={tw`text-lg text-center text-white`}>Workouts</Text>
        </View>
      </View>
      <View style={tw`items-center justify-center p-5`}>
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
          buttonStyle={tw`bg-gray-900 bg-opacity-90 backdrop-filter backdrop-blur-md border-0`}
          containerStyle={{
            marginBottom: 20,
            height: 130,
            borderWidth: 0,
          }}
          selectedTextStyle={{ color: "black" }}
          innerBorderStyle={{ color: "black" }}
          selectedButtonStyle={{ backgroundColor: "#E0FE0E" }}
        />
        <View
          style={tw`bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-md w-[350px] h-50 p-3 flex justify-center items-center rounded rounded-[10px]`}
        >
          <Text style={tw`mb-5 text-gray-300`}>HEIGHT</Text>
          <View style={tw`flex-row items-end`}>
            <Text style={tw`text-3xl font-bold text-white`}>
              {data.height} <Text style={tw`text-xs text-gray-300`}>cm</Text>
            </Text>
          </View>
          <Slider
            value={150}
            style={{ width: 250, height: 40, color: "white" }}
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
            style={tw`p-3 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-md mt-5 w-44 mr-1 h-55 items-center justify-center rounded rounded-[20px]`}
          >
            <Text style={tw`mb-3 text-white`}>WEIGHT</Text>
            <Text style={tw`m-2 text-3xl font-bold text-white`}>
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
                style={tw`items-center justify-center mr-3 bg-white rounded-full w-13 h-13`}
              >
                <AntDesign name="minus" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setData((prev) => ({
                    ...prev,
                    weight: data.weight + 1,
                  }))
                }
                style={tw`items-center justify-center bg-white rounded-full w-13 h-13`}
              >
                <AntDesign name="plus" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={tw`p-3 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-md mt-5 w-44 h-55 items-center justify-center rounded-[20px]`}
          >
            <Text style={tw`mb-3 text-white`}>AGE</Text>
            <Text style={tw`m-2 text-3xl font-bold text-white`}>
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
                style={tw`items-center justify-center bg-white rounded-full w-13 h-13`}
              >
                <AntDesign name="minus" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setData((prev) => ({
                    ...prev,
                    age: data.age + 1,
                  }))
                }
                style={tw`items-center justify-center ml-3 bg-white rounded-full w-13 h-13`}
              >
                <AntDesign name="plus" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={tw`bg-gray-600 bg-opacity-50 backdrop-filter backdrop-blur-md rounded-full h-16 items-center justify-center text-white rounded-full p-3 m-7 mt-2`}
        onPress={handlePress}
        disabled={data.gender == ""}
      >
        <Text style={tw`text-lg text-white`}>Calculate your BMR & BMI</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BMRCalculator;
