import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { Input } from "@rneui/themed";
import tw from "twrnc";
import { activities } from "../utils/activities";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const AddActivityScreen = ({ navigation }) => {
  const [query, setQuery] = React.useState("");
  const filteredActivities = activities.filter((activity) =>
    activity.name.includes(query)
  );

  return (
    <SafeAreaView style={tw`bg-black h-full`}>
      <View style={tw`flex-row items-center justify-center px-7 py-3`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`bg-opacity-50 backdrop-filter backdrop-blur-md bg-gray-700 p-4 rounded-full`}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <View style={tw`items-center flex-1 mr-12`}>
          <Text style={tw`text-lg text-center text-white`}>Add activity</Text>
        </View>
      </View>

      <View style={tw`p-5`}>
        <Input
          placeholder="🔍 Search for activity"
          style={tw`text-center`}
          value={query}
          onChange={(e) => setQuery(e.nativeEvent.text)}
          color="white"
        />
      </View>
      <View>
        <Text style={tw`mx-10 font-light`}>Frequently Used</Text>
        <ScrollView>
          {query !== ""
            ? filteredActivities.map((item, index) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ActivityScreen", { activity: item })
                  }
                  key={index}
                  style={tw`bg-black flex-row items-center p-5 px-5 mx-5 border-b-2 border-gray-300`}
                >
                  <Text style={tw`text-2xl text-white`}>{item.icon}</Text>
                  <Text style={tw`flex-grow ml-3 text-white `}>
                    {item.name}
                  </Text>
                  <MaterialIcons name="arrow-right" size={24} color="white" />
                </TouchableOpacity>
              ))
            : activities.map((item, index) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ActivityScreen", { activity: item })
                  }
                  key={index}
                  style={tw`flex-row items-center p-5 px-5 mx-5 border-b-2 border-gray-300`}
                >
                  <Text style={tw`text-2xl text-white`}>{item.icon}</Text>
                  <Text style={tw`flex-grow ml-3 text-white`}>{item.name}</Text>
                  <MaterialIcons name="arrow-right" size={24} color="white" />
                </TouchableOpacity>
              ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddActivityScreen;
