import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  Image,
  TouchableHighlight,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import tw from "twrnc";
import { FlatList } from "react-native-gesture-handler";
import { Linking } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const WorkoutListScreen = ({ navigation }) => {
  const [text, onChangeText] = useState("");
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);

  const fetchVideos = useCallback(async () => {
    const options = {
      method: "GET",
      url: "https://youtube-search-results.p.rapidapi.com/youtube-search/",
      params: {
        q: text !== "" ? text + "workout" : "yoga workout",
        maxResults: 20,
      },
      headers: {
        "X-RapidAPI-Key": "30f18160f6msh19b491a61c66142p194cfbjsnfc0a7e65b47f",
        "X-RapidAPI-Host": "youtube-search-results.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const data = response.data;
      console.log("Fetched videos:", data); // Add console log to check if data is fetched successfully
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }, [text]);

  useEffect(() => {
    // Fetch the data asynchronously
    fetchVideos()
      .then((data) => {
        // Set the fetched data to the videos state
        const videoArray = Object.values(data.items);
        setLoading(false);
        setVideos(videoArray);
      })
      .catch((error) => {
        // Handle any errors during data fetching
        console.error("Error fetching videos:", error);
        setLoading(false);
      });
  }, [fetchVideos]);

  const handleChangeText = (text) => {
    onChangeText(text);
  };

  if (loading) {
    return (
      <SafeAreaView style={tw`items-center justify-center h-full bg-black`}>
        <ActivityIndicator size="large" color="white" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw`bg-black`}>
      <View style={tw`flex-row items-center justify-center px-7 py-3`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`bg-opacity-50 backdrop-filter backdrop-blur-md bg-gray-700 p-4 rounded-full`}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <View style={tw`items-center flex-1 mr-12`}>
          <Text style={tw`text-lg text-center text-white`}>Workouts</Text>
        </View>
      </View>
      <View style={tw`items-center justify-center py-10`}>
        <TextInput
          value={text}
          style={tw`bg-opacity-50 backdrop-filter backdrop-blur-md rounded border-gray-500 bg-gray-600 p-4 w-90 rounded rounded-[10px] text-center`}
          placeholder="Search Your Plan  🔍"
          placeholderTextColor="white"
          keyboardType="numeric"
          onChangeText={handleChangeText}
        />
        <View>
          <View style={tw`p-10 mb-15`}>
            <FlatList
              data={videos}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableHighlight
                  onPress={() => {
                    Linking.openURL(item.url);
                  }}
                  underlayColor="none"
                  style={tw`mb-5`}
                >
                  <View style={tw`flex-row`}>
                    {item.thumbnails && item.thumbnails.length > 0 ? (
                      <Image
                        source={{ uri: item.thumbnails[0]?.url }}
                        style={{ width: 160, height: 100, borderRadius: 20 }}
                      />
                    ) : (
                      <Image
                        source={"../assets/images/placeholder.png"}
                        style={{ width: 100, height: 100 }}
                      />
                    )}
                    <View>
                      <Text style={tw`m-1 text-white`}>{item.title}</Text>
                      <View style={tw`flex-row items-center m-2`}>
                        <Text>🕑</Text>
                        <Text style={tw`m-1 text-gray-400`}>
                          {item.duration}
                        </Text>
                      </View>
                      <Text style={tw`m-1 text-gray-400`}>
                        {item.uploadedAt}
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              )}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WorkoutListScreen;
