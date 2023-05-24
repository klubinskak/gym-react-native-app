import { SafeAreaView, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import tw from "twrnc";



const WorkoutListScreen = () => {
    const [videos, setVideos] = useState([

    ]);



    useEffect(()=> {
      const fetchVideos = async () => {
        const options = {
            method: 'GET',
            url: 'https://youtube-search-results.p.rapidapi.com/youtube-search/',
            params: {q: 'justin+bieber'},
            headers: {
              'X-RapidAPI-Key': '30f18160f6msh19b491a61c66142p194cfbjsnfc0a7e65b47f',
              'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com'
            }
          };
          
          try {
              const response = await axios.request(options);
              setVideos(response.data);
              console.log(videos);
          } catch (error) {
              console.error(error);
          }
    }
    fetchVideos();
    }, [])
    
  return (
    <SafeAreaView>
      <View style={tw`bg-black`}>
        <Text>Hello</Text>
        {videos?.map((item) => (
          <Text>{item.title}</Text>
        ))}
      </View>
    </SafeAreaView>
  )
}

export default WorkoutListScreen