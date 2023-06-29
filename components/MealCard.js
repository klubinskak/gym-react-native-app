import { View, Text } from "react-native";
import React, { useState } from "react";
import { ListItem } from "@rneui/themed";
import { Divider } from "@rneui/themed";
import tw from "twrnc";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const lunchTimesArray = [
  {
    id: 1,
    title: "Breakfast",
    calories: "480 calories",
    expanded: true,
  },
  {
    id: 2,
    title: "Snack",
    calories: "480 calories",
    expanded: false,
  },
  {
    id: 3,
    title: "Lunch",
    calories: "480 calories",
    expanded: false,
  },
  {
    id: 4,
    title: "II Snack",
    calories: "480 calories",
    expanded: false,
  },
  {
    id: 5,
    title: "Dinner",
    calories: "480 calories",
    expanded: false,
  },
];

const MealCard = () => {
  const [expanded, setExpanded] = useState(false);
  const [lunchTimes, setLunchTimes] = useState(lunchTimesArray);

  return (
    <View>
      {lunchTimes?.map((item, index) => {
        return (
          <ListItem.Accordion
            theme={{ colors: { primary: "#4169e1" } }}
            style={tw`px-3 rounded py-3 text-white`}
            containerStyle={{
              backgroundColor: "#000000",
              borderRadius: "10px",
            }}
            content={
              <>
                <Text style={tw`text-5xl mr-2 text-white`}>☀️</Text>
                <ListItem.Content>
                  <ListItem.Title style={tw`font-bold text-white`}>
                    {item.title}
                  </ListItem.Title>
                  <Text style={tw`text-white`}>480 calories</Text>
                </ListItem.Content>
              </>
            }
            key={index}
            index={index}
            noRotation
            isExpanded={item.expanded}
            icon={<MaterialIcons name="expand-more" size={24} color="white" />}
            onPress={() => {
              setLunchTimes(
                lunchTimes.map((i) =>
                  i.id === item.id ? { ...i, expanded: !i.expanded } : i
                )
              );
            }}
          >
            <ListItem
              containerStyle={{
                backgroundColor: "#000000",
                borderRadius: "10px",
              }}
              style={tw`px-3 mt-[-25]`}
              onPress={() => console.log("hi")}
              bottomDivider
            >
              <ListItem.Content>
                <ListItem.Title>
                  <Divider width={1} style={tw`w-full`} />
                  <View style={tw`justify-around items-center flex-row w-full`}>
                    <View>
                      <Text style={tw`text-gray-400`}>Fats</Text>
                      <Text style={tw`font-bold text-white`}>28.4</Text>
                    </View>
                    <View>
                      <Text style={tw`text-gray-400`}>Carbs</Text>
                      <Text style={tw`font-bold text-white`}>42.32</Text>
                    </View>
                    <View>
                      <Text style={tw`text-gray-400`}>Prot</Text>
                      <Text style={tw`font-bold text-white`}>60,45</Text>
                    </View>
                    <View>
                      <Text style={tw`text-gray-400`}>RDC</Text>
                      <Text style={tw`font-bold text-white`}>12%</Text>
                    </View>
                  </View>
                </ListItem.Title>
                <ListItem.Subtitle style={tw`p-2`}>
                  <View style={tw`py-3`}>
                    <View
                      style={tw`flex-row py-5 items-center justify-between w-full`}
                    >
                      <View style={tw`flex-row ml-2`}>
                        <Text style={tw`text-4xl`}>🥘</Text>
                        <View style={tw`ml-3 justify-center`}>
                          <Text style={tw`font-bold text-white`}>
                            Pepperoni Sandwich
                          </Text>
                          <Text style={tw`text-white`}>2 pieces</Text>
                        </View>
                      </View>
                      <Feather name="edit-2" size={24} color="white" />
                    </View>
                  </View>
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </ListItem.Accordion>
        );
      })}
    </View>
  );
};

export default MealCard;
