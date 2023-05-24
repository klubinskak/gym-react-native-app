import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Icon } from "@rneui/themed";
import tw from "twrnc";



const Locations = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // setLocation(location);
      const address = await Location.reverseGeocodeAsync(location.coords);
      setLocation(address);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    let city = location[0].city + ", " + location[0].isoCountryCode;
    text = city;
  }

  return (
    <View style={tw`flex-row items-center justify-center`}>
      <Icon
        name="location"
        type="ionicon"
        onPress={() => console.log("hello")}
      />
      <Text style={tw`text-base ml-1`}>{text}</Text>
    </View>
  );
};

export default Locations;
