import {
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import Navbar from "../components/Navbar";
import CardItem from "../components/CardItem";
import Plan from "../components/Plan";
import Activities from "../components/Activities";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { logOut } from "../src/redux/userSlice";
import { useDispatch } from "react-redux";
import FoodScreen from "./FoodScreen";
import {fetchUserInfo} from '../src/firebase/config'
import {setInfo}  from "../src/redux/userInfoSlice";







const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userInfo } = useSelector((state) => state.userInfo)
  const {user}  = useSelector((state) => state.user)
  const [data, setData] = useState();
  const bmruser = 1512;
  const dispatch = useDispatch();


  console.log("User:", user);


  const handleLogout = () => {
    dispatch(logOut());
    navigation.navigate('WelcomeScreen',{screen: 'WelcomeScreen'});
  }

  const checkBmrBmi = () => {
    console.log("DATAAA:: ", data)
    
  }

  useEffect( () => {
    try {
      const userInfoData = fetchUserInfo();
      console.log("INFFFOO: ", userInfoData)
    } catch (e) {
      console.log(e);
    }
    checkBmrBmi();
  })

  // if(userInfo) {
    return (
      <SafeAreaView>
        <Navbar route={route.name}/>
      <ScrollView>
        <View>
          <CardItem />
          <View style={tw`px-2 items-center py-3`}>
            <TouchableOpacity
              style={tw`bg-black p-2 w-90 h-15 text-white rounded-full`}
            >
              <Button color="white" title="+ Add activity" onPress={()=> navigation.navigate(FoodScreen)}></Button>
              {/* <Button color="white" title="Log out" onPress={handleLogout}></Button> */}
            </TouchableOpacity>
          </View>
          <Plan calories={bmruser} />
          <Activities/>
        </View>
      </ScrollView>
      </SafeAreaView>
    );
  }
//   return (
//     <BMRCalculator/>
//   )



// };

export default HomeScreen;
