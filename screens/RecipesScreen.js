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
import { AntDesign } from "@expo/vector-icons";

const RecipeListScreen = ({ navigation }) => {
  const [text, onChangeText] = useState("");
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = useCallback(async () => {
    const options = {
      method: "GET",
      url: "https://low-carb-recipes.p.rapidapi.com/search",
      params: {
        name: text !== "" ? text : "cake",
        limit: "20",
      },
      headers: {
        "X-RapidAPI-Key": "30f18160f6msh19b491a61c66142p194cfbjsnfc0a7e65b47f",
        "X-RapidAPI-Host": "low-carb-recipes.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const data = response.data;
      console.log("Fetched recipes:", data); // Check the structure of the API response
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  const handleClick = (recipe) => {
    navigation.navigate("RecipeScreen", { recipe: recipe });
  };

  useEffect(() => {
    fetchRecipes()
      .then((data) => {
        setLoading(false);
        setRecipes(data);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [text]);

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
          <Text style={tw`text-lg text-center text-white`}>Recipes</Text>
        </View>
      </View>
      <View style={tw`items-center justify-center py-10`}>
        <TextInput
          onChangeText={handleChangeText}
          value={text}
          style={tw`bg-opacity-50 backdrop-filter backdrop-blur-md rounded border-gray-500 bg-gray-600 p-4 w-90 rounded rounded-[10px] text-center`}
          placeholder="Search Recipes 🔍"
          keyboardType="numeric"
          placeholderTextColor="white"
        />
        <View>
          <View style={tw`px-6 py-8 mb-15`}>
            <FlatList
              data={recipes}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()} // Use a unique identifier as the key
              renderItem={({ item }) => (
                <TouchableHighlight
                  onPress={() => handleClick(item)}
                  underlayColor="none"
                  style={tw`mb-5 bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur-md p-0 rounded-[10px] overflow-hidden`}
                >
                  <View style={tw`flex-row`}>
                    <View style={tw`flex-row`}>
                      {item.image ? (
                        <Image
                          source={{ uri: item.image }}
                          style={{ width: 160, height: 150, borderRadius: 20 }}
                          resizeMode="cover"
                        />
                      ) : (
                        <Image
                          source={require("../assets/placeholder.png")}
                          resizeMode="cover"
                        />
                      )}
                    </View>
                    <View style={tw`p-2 justify-between`}>
                      <View>
                        <Text style={tw`m-1 text-white`}>{item.name}</Text>
                        <Text style={tw`m-1 text-gray-400`}>
                          🕑 {item.prepareTime} min
                        </Text>
                      </View>
                      <View style={tw`flex-row`}>
                        <Text
                          style={tw`text-gray-400 m-1 border-2 border-[#cfbaf0] text-white rounded p-1 bg-[#cfbaf0]`}
                        >
                          {item.nutrients.protein}
                        </Text>
                        <Text
                          style={tw`text-gray-400 m-1 border-2 rounded p-1 bg-[#adc178] text-white border-[#adc178]`}
                        >
                          {item.nutrients.fat}
                        </Text>
                        <Text
                          style={tw`text-gray-400 m-1 border-2 rounded p-1 bg-[#ffd670] border-[#ffd670] text-white`}
                        >
                          {item.nutrients.totalCarbs}
                        </Text>
                      </View>
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

export default RecipeListScreen;
