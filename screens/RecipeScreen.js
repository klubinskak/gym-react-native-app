import { ScrollView, Text, View, Image } from "react-native";
import React from "react";
import tw from "twrnc";

const RecipeScreen = ({ route }) => {
  const { recipe } = route.params;

  return (
    <ScrollView>
      <Image source={{ uri: recipe.image }} style={tw`h-[400px] mb-[-50px]`} />
      <View
        style={tw`bg-black rounded rounded-[30px] w-full h-full pb-[-200px] p-2`}
      >
        <Text style={tw`text-2xl mx-5 my-2 mt-7 font-bold text-white`}>
          {recipe.name}
        </Text>
        <View style={tw`mx-5`}>
          <View style={tw`flex-row`}>
            <Text style={tw`mr-4 text-gray-400`}>
              🕑 {recipe.prepareTime} min
            </Text>
            <Text style={tw`text-gray-400`}>
              🔥 {Math.round(recipe.nutrients.caloriesKCal)} kcal
            </Text>
          </View>
          <View>
            <Text style={tw`text-xl font-bold mt-5 text-white`}>
              Description
            </Text>
            <Text style={tw`text-gray-400 py-3`}>{recipe.description}</Text>
          </View>
          <Text style={tw`text-xl font-bold py-3 text-white`}>Ingredients</Text>
          {recipe.ingredients.map((item) => (
            <View style={tw`flex-row items-center justify-between`}>
              <Text style={tw`my-2 w-[220px]`}>{item.name}</Text>
              <Text>{Math.round(item.servingSize.grams)} g</Text>
            </View>
          ))}
          <Text></Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default RecipeScreen;
