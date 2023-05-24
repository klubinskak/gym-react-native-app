import { SafeAreaView, View, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import avatar from "../assets/avatar.jpg";
import { Icon } from "@rneui/themed";
import Location from './Location';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';




const Navbar = ({route}) => {
    const navigation = useNavigation();


  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOpenDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer())
  };
  

  return (
    <SafeAreaView >
      <View style={tw`p-3 flex-row items-center justify-around`}>
        { route == 'HomeScreen' ?
        <Icon
        name="bars"
        onPress={handleOpenDrawer}
        type="font-awesome"/>  :  
        <Icon
        name="arrow-left"
        type="font-awesome"
        onPress={handleGoBack}
         /> 
        }
        <Location/>
         <Image style={tw`rounded-full w-15 h-15`} source={avatar} />
      </View>
    </SafeAreaView>
  );
};

export default Navbar;
