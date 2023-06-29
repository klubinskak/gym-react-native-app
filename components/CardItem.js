import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import YogaImage from "../assets/yoga-image.png";
import ChickenPasta from "../assets/chicken-pasta.png";
import Football from "../assets/football.png";
import { useNavigation } from "@react-navigation/native";

const data = [
  {
    id: 213,
    tag: "FITNESS",
    image: YogaImage,
    name: "Yoga for beginners",
    level: "Intermediate",
    screen: "WorkoutListScreen",
  },
  {
    id: 242,
    tag: "FOOD",
    image: ChickenPasta,
    name: "Chicken pasta",
    level: "20 mintues",
    screen: "RecipesScreen",
  },
  {
    id: 423,
    tag: "TRAINING",
    image: Football,
    name: "Football News",
    level: "",
    screen: "InfoScreen",
  },
];

const CardItem = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`ml-1 px-1`}>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(item.screen)}
            style={tw`bg-opacity-50 backdrop-filter backdrop-blur-md p-2 pl-6 pb-8 pt-4 bg-gray-700 rounded-3 w-70 h-40 m-2`}
          >
            <View style={tw`flex-row items-center`}>
              <Image source={item.image} style={tw`w-35 h-35`} />
              <Text style={tw`mt-2 text-lg font-semibold w-35 px-4 text-white`}>
                {item.name}
              </Text>
              <Text style={tw``}></Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CardItem;
