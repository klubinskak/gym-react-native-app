import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
  Text,
  Image,
  Linking,
} from "react-native";
import axios from "axios";
import tw from "twrnc";

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchNews()
      .then(() => {
        setRefreshing(false);
      })
      .catch(() => {
        setRefreshing(false);
      });
  }, []);

  const fetchNews = async () => {
    const options = {
      method: "GET",
      url: "https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=d7a746248319400390073114d3345437",
    };

    try {
      setLoading(true); // Set loading flag to true before making the request
      const response = await axios.request(options);
      console.log(response.data);
      setNews(response.data.articles);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading flag back to false after the request is completed
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return loading ? (
    <View style={tw`flex-1 justify-center items-center`}>
      <ActivityIndicator size="large" color="black" />
    </View>
  ) : (
    <>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={news}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()} // Use a unique identifier as the key
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(item.url);
            }}
          >
            <View
              style={tw`mx-12 my-5 rounded-[25px] h-[300px] bg-opacity-20 backdrop-filter backdrop-blur-md bg-gray-600`}
            >
              <Image
                source={{ uri: item.urlToImage }}
                style={tw`w-[100%] h-[65%] rounded-t-[25px]`}
              />
              <Text style={tw`font-bold pt-4 px-2 text-white`}>
                {item.title}
              </Text>
              <Text style={tw`font-light py-3 px-2 text-white`}>
                {item.publishedAt}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

export default NewsFeed;
