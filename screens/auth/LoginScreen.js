import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import tw from "twrnc";
import { Button } from "react-native-elements";
import Health from "../../assets/Health.png";
import { Divider } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../src/firebase/config";
import RegisterScreen from "./RegisterScreen";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useDispatch } from "react-redux";
import { login } from "../../src/redux/userSlice";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "488526852775-8rdfggiprj07hqgrdmggvpdr72rq3aul.apps.googleusercontent.com",
    iosClientId:
      "488526852775-oscrj16d2jt52j5avd5jhpuck1gkm0et.apps.googleusercontent.com",
    expoClientId:
      "488526852775-cj6sqi4pvb66arrukp2sd2j9gjggclqb.apps.googleusercontent.com",
  });

  const logWithGoogle = async () => {
    try {
      await promptAsync();
    } catch (e) {
      console.log(e);
    }
    dispatch(login(user));
    navigation.navigate("HomeScreen");
  };

  const onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("User does not exist anymore.");
              return;
            }
            const user = firestoreDocument.data();
            dispatch(login(user));
            storeData(user);
            navigation.navigate("HomeScreen");
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    console.log(response?.type);
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      userLoginInfo();
    }
  }, [response, token]);

  const userLoginInfo = async () => {
    axios
      .get(
        "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" +
          response.authentication.accessToken
      )
      .then(function (response) {
        const userDetails = response.data;
        console.log("User Details: ", userDetails);
        dispatch(login(userDetails));
        storeData(userDetails);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //Async Storage

  const storeData = async (user) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView
      style={tw`bg-black w-full h-full items-center justify-center`}
    >
      <View style={tw``}>
        <View style={tw`justify-center items-center mt-[-30px]`}>
          <Image style={tw`w-50 h-50 mb-[-70]`} source={Health} />
          <Text style={tw`p-3 mt-3 w-[250px] text-center text-white`}>
            Track your way to a healthier you with our app.{" "}
          </Text>
        </View>
        <View style={tw`items-center justify-center py-2`}>
          <Divider
            style={tw`w-[170px] items-center justify-center`}
            color={"black"}
          />
        </View>
        <View style={tw`px-5 py-3`}>
          <TextInput
            style={inputsStyles.textInput}
            placeholder="john@gmail.com"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEmail(text)}
            value={email}
            color="white"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={inputsStyles.textInput}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            color="white"
            placeholder="min. 8 characters"
            onChangeText={(text) => setPassword(text)}
            value={password}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        </View>
        <View style={tw`items-center justify-center`}>
          <TouchableOpacity style={tw`w-90 rounded-full p-2`}>
            <Button
              style={tw`bg-[#E0FE0E] rounded rounded-full h-13 items-center justify-center`}
              type="clear"
              titleStyle={{ color: "black" }}
              title="Log in"
              onPress={onLoginPress}
            />
          </TouchableOpacity>
        </View>

        <View style={tw`py-3 items-center flex-row justify-center py-6`}>
          <Divider style={tw`w-[80px] items-center justify-center `} />
          <Text style={tw`text-gray-400 mx-3`}>or</Text>
          <Divider style={tw`w-[80px] items-center justify-center `} />
        </View>
        <View style={tw`items-center justify-center`}>
          <TouchableOpacity style={tw`bg-black w-90 rounded-full`}>
            <Button
              type="clear"
              icon={
                <Ionicons
                  name="logo-google"
                  size={24}
                  color="white"
                  style={tw`mx-2`}
                />
              }
              titleStyle={{ color: "white" }}
              buttonStyle={tw`bg-gray-600 bg-opacity-50 backdrop-filter backdrop-blur-md  rounded rounded-full h-13 items-center justify-center`}
              title="Sign in with Google"
              onPress={logWithGoogle}
            />
          </TouchableOpacity>
        </View>
        <View style={tw`items-center justify-center`}>
          <TouchableOpacity
            style={tw`border w-90 text-black rounded-full mt-3`}
          >
            <Button
              type="clear"
              icon={
                <AntDesign
                  name="apple1"
                  size={24}
                  color="white"
                  style={tw`mx-2`}
                />
              }
              buttonStyle={tw`bg-gray-600 bg-opacity-50 backdrop-filter backdrop-blur-md  rounded rounded-full h-13 items-center justify-center`}
              titleStyle={{ color: "white" }}
              title="Sign in with Apple"
              // onPress={onLoginPress}
            />
          </TouchableOpacity>
        </View>
        <View style={tw`flex-row items-center py-3 justify-center`}>
          <Text style={tw` items-center py-3 text-white`}>Not a Member?</Text>
          <Button
            title="Sign Up"
            type="clear"
            onPress={() => navigation.navigate(RegisterScreen)}
          />
        </View>
        <View style={tw`py-5 mx-[35px]`}></View>
      </View>
    </SafeAreaView>
  );
};

const inputsStyles = StyleSheet.create({
  text: {
    marginTop: 13,
    color: "black",
  },
  textInput: {
    padding: 18,
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 50,
    marginTop: 5,
  },
});

export default LoginScreen;
