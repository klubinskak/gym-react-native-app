import {
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  Button,
  RefreshControl,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import Navbar from "../components/Navbar";
import CardItem from "../components/CardItem";
import Plan from "../components/Plan";
import Activities from "../components/Activities";

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={tw`bg-black`}>
      <StatusBar barStyle="light-content" />
      <Navbar />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          <CardItem />
          <View style={tw`items-center px-2 py-3`}>
            <TouchableOpacity
              style={tw`p-2 text-white bg-[#E0FE0E] rounded-full w-90 h-15`}
            >
              <Button
                color="black"
                title="+ Add activity"
                onPress={() => navigation.navigate("AddActivityScreen")}
              ></Button>
            </TouchableOpacity>
          </View>
          <Plan />
          <Activities />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
