import { SafeAreaView, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import NewsFeed from "../components/NewsFeed";
import ScoresFeed from "../components/ScoresFeed";
import { AntDesign } from "@expo/vector-icons";

const InfoScreen = () => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sport, setSport] = useState("");

  return (
    <SafeAreaView style={[tw`flex-1 bg-black`]}>
      <View style={tw`flex-row items-center flex-row px-12 justify-between`}>
        <Text style={tw`text-xl text-white`}>Feeds</Text>
        <AntDesign
          name="search1"
          size={24}
          color="white"
          onPress={() => setShowSearchInput(!showSearchInput)}
        />
      </View>
      {showSearchInput && (
        <TextInput
          style={tw`border-b border-gray-500 mt-2 p-4 mx-12 `}
          placeholder="Search"
          onChangeText={(text) => {
            setSearchText(text);
          }}
          color="white"
          placeholderTextColor="white"
        />
      )}

      <View style={tw`p-5 flex-row px-12 justify-around`}>
        <View style={tw`items-center`}>
          <TouchableOpacity
            style={tw`bg-[#E0FE0E] w-[75px] h-[75px] rounded-[15px] items-center justify-center`}
            onPress={() => setSport("")}
          >
            <Image
              source={require("../assets/football-icon.png")}
              style={tw`w-[55px] h-[55px]`}
            />
          </TouchableOpacity>
          <Text style={tw`mt-2 text-white`}>Soccer</Text>
        </View>
        <View style={tw`items-center`}>
          <TouchableOpacity
            style={tw`bg-[#E0FE0E] w-[75px] h-[75px] rounded-[15px] items-center justify-center`}
            onPress={() => setSport("basketball_nba")}
          >
            <Image
              source={require("../assets/basketball.png")}
              style={tw`w-[55px] h-[55px]`}
            />
          </TouchableOpacity>
          <Text style={tw`mt-2 text-white`}>Basketball</Text>
        </View>
        <View style={tw`items-center`}>
          <TouchableOpacity
            style={tw`bg-[#E0FE0E] w-[75px] h-[75px] rounded-[15px] items-center justify-center`}
          >
            <Image
              source={require("../assets/rugby-icon.png")}
              style={tw`w-[55px] h-[55px]`}
            />
          </TouchableOpacity>
          <Text style={tw`mt-2 text-white`}>Rugby</Text>
        </View>
        <View style={tw`items-center`}>
          <TouchableOpacity
            style={tw`bg-[#E0FE0E] w-[75px] h-[75px] rounded-[15px] items-center justify-center`}
          >
            <Image
              source={require("../assets/baseball-icon.png")}
              style={tw`w-[55px] h-[55px]`}
            />
          </TouchableOpacity>
          <Text style={tw`mt-2 text-white`}>Baseball</Text>
        </View>
      </View>
      <View style={tw`flex-row px-12`}>
        <Text style={tw`text-xl text-white`}>Latest news</Text>
      </View>
      {sport.length > 0 ? <ScoresFeed sport={sport} /> : <NewsFeed />}
    </SafeAreaView>
  );
};

export default InfoScreen;
