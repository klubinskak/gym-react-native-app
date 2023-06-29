import { SafeAreaView, View, Image, Text, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import tw from "twrnc";
import avatar from "../assets/logo.png";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const Navbar = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.user);
  const [parsedUser, setParsedUser] = useState(null);

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

  const capitalizeFirstLetter = (string) => {
    if (typeof string === "string" && string.length > 0) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return "";
  };

  const name = parsedUser ? capitalizeFirstLetter(parsedUser.displayName) : "";
  console.log(parsedUser);

  return (
    <SafeAreaView>
      <View style={tw`flex-row items-center px-5 mb-2`}>
        <View style={tw`flex-row items-center`}>
          {parsedUser && (
            <Pressable onPress={() => navigation.navigate("ProfileScreen")}>
              <Image
                style={tw`rounded-full w-15 h-15`}
                source={{ uri: user.picture || parsedUser.picture }}
                defaultSource={avatar}
              />
            </Pressable>
          )}
          <View style={tw`text-left px-5`}>
            {parsedUser && (
              <>
                <Text style={tw`text-sm text-gray-500 ml-1`}>
                  WELCOME BACK,
                </Text>
                <Text style={tw`text-2xl text-white`}>
                  {" "}
                  {name ||
                    user.given_name ||
                    parsedUser.given_name.toUpperCase()}{" "}
                  💪🏼{" "}
                </Text>
              </>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Navbar;
