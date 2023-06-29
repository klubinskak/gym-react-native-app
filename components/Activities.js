import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import { TouchableOpacity } from "react-native";
import ActivityRings from "react-native-activity-rings";

const Activities = () => {
  const activityData = [{ value: 0.8 }, { value: 0.6 }, { value: 0.2 }];

  const activityConfig = {
    width: 150,
    height: 150,
  };

  return (
    <View style={tw`p-3`}>
      <View style={tw`flex-row items-center`}>
        <Text style={tw`text-xl ml-3 mt-3 font-bold text-white`}>
          Activities
        </Text>
      </View>

      <View style={tw`flex-row items-center rounded rounded-6 bg-black mt-3`}>
        <TouchableOpacity style={tw`p-4`}>
          <ActivityRings data={activityData} config={activityConfig} />
        </TouchableOpacity>

        <TouchableOpacity style={tw`bg-black rounded rounded-3 p-2 py-3 w-45`}>
          <View style={tw`my-2`}>
            <Text style={tw`font-semibold mb-1 text-white text-base`}>
              Move
            </Text>
            <Text style={tw`font-bold text-2xl text-[#F72E79]`}>
              141/780 KCAL
            </Text>
          </View>

          <View style={tw`my-2`}>
            <Text style={tw`font-semibold mb-1 text-white text-base`}>
              Exercise
            </Text>
            <Text style={tw`font-bold text-2xl text-[#A8F804]`}>15/30 MIN</Text>
          </View>

          <View style={tw`my-2`}>
            <Text style={tw`font-semibold mb-1 text-white text-base`}>
              Stand
            </Text>
            <Text style={tw`font-bold text-2xl text-[#08D4C1]`}>3/12 HRS</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Activities;
