import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import tw from "twrnc";

const ScoresFeed = ({ sport }) => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchScores()
      .then(() => {
        setRefreshing(false);
      })
      .catch(() => {
        setRefreshing(false);
      });
  }, []);

  const fetchScores = async () => {
    const options = {
      method: "GET",
      url: `https://odds.p.rapidapi.com/v4/sports/${sport}/scores`,
      params: { daysFrom: "3" },
      headers: {
        "X-RapidAPI-Key": "30f18160f6msh19b491a61c66142p194cfbjsnfc0a7e65b47f",
        "X-RapidAPI-Host": "odds.p.rapidapi.com",
      },
    };

    try {
      setLoading(true);
      const response = await axios.request(options);
      setScores(response.data);
      //   console.log(response.data);
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false); // Set loading flag back to false after the request is completed
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  console.log(scores);

  if (loading) {
    return (
      <SafeAreaView style={tw`items-center justify-center h-full`}>
        <ActivityIndicator size="large" color="black" />
      </SafeAreaView>
    );
  }

  return (
    <View>
      <View style={tw`mx-12 py-4`}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={scores}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()} // Use a unique identifier as the key
          renderItem={({ item }) => (
            <View>
              <View style={tw`bg-white p-3 my-3 rounded-[15px]`}>
                <Image
                  source={require("../assets/nba-logo.png")}
                  alt="nba-logo"
                  style={tw`w-full h-[150px]`}
                />

                <View
                  style={tw`flex-row py-9 mx-2 items-center justify-center`}
                >
                  <View style={tw`flex-2 items-center`}>
                    <Text>{item.away_team}</Text>
                    {item.scores && item.scores.length > 0 && (
                      <Text style={tw`text-2xl font-bold`}>
                        {
                          [
                            ...new Set(item.scores.map((score) => score.score)),
                          ][0]
                        }
                      </Text>
                    )}
                  </View>
                  <View style={tw`flex-1 items-center`}>
                    <Text style={tw`text-2xl`}>:</Text>
                  </View>
                  <View style={tw`flex-2 items-center`}>
                    <Text>{item.home_team}</Text>
                    {item.scores && item.scores.length > 0 && (
                      <Text style={tw`text-2xl font-bold`}>
                        {
                          [
                            ...new Set(item.scores.map((score) => score.score)),
                          ][1]
                        }
                      </Text>
                    )}
                  </View>
                </View>

                <Text></Text>
                <Text></Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default ScoresFeed;
