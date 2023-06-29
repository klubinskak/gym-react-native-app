import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import tw from "twrnc";
import avatar from "../assets/logo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { logOut } from "../src/redux/userSlice";
import { useSelector } from "react-redux";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [parsedUser, setParsedUser] = useState({});

  useEffect(() => {
    const parseUser = async () => {
      if (user && typeof user === "string") {
        try {
          const parsed = JSON.parse(user);
          setParsedUser(parsed);
        } catch (error) {
          console.error("Error parsing user data:", error);
          setParsedUser(null);
        }
      } else {
        setParsedUser(user);
      }
    };

    if (user) {
      parseUser();
    }
  }, [user]);


  const handleLogout = async () => {
    dispatch(logOut());
    await AsyncStorage.removeItem("user");
    navigation.navigate("WelcomeScreen");
  };

  return (
    <SafeAreaView style={tw`bg-black`}>
      <View style={tw`flex-row items-center justify-around px-7 py-3`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`bg-opacity-50 backdrop-filter backdrop-blur-md bg-gray-700 p-4 rounded-full`}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text
          style={tw`items-center text-center w-[340px] mr-8 text-xl text-white`}
        >
          My Profile
        </Text>
      </View>
      <View style={tw`items-center justify-center`}>
        <Image
          style={tw`rounded-full w-20 h-20`}
          source={{ uri: user.picture || parsedUser.picture }}
          defaultSource={avatar}
        />
      </View>
      <View style={tw` w-full h-full justify-center items-center`}>
        <TouchableOpacity
          style={tw` bg-gray-600 bg-opacity-50 backdrop-filter backdrop-blur-md p-2 w-45 h-15 rounded-full items-center justify-center`}
        >
          <Button color="white" title="Log out" onPress={handleLogout}></Button>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
