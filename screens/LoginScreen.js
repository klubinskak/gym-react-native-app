import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import React, { useState, useEffect } from "react";
import tw from "twrnc";
import { Button } from "react-native-elements";
import Health from "../assets/Health.png";
import { Divider } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../src/firebase/config";
import RegisterScreen from "./RegisterScreen";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useDispatch } from "react-redux";
import { login } from "../src/redux/userSlice";
import axios from 'axios';





WebBrowser.maybeCompleteAuthSession();


const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();


  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '488526852775-8rdfggiprj07hqgrdmggvpdr72rq3aul.apps.googleusercontent.com',
    iosClientId: '488526852775-oscrj16d2jt52j5avd5jhpuck1gkm0et.apps.googleusercontent.com',
    expoClientId: "488526852775-cj6sqi4pvb66arrukp2sd2j9gjggclqb.apps.googleusercontent.com"
  });

  const logWithGoogle =  async () => {
    try {
      await promptAsync();
    } catch (e) {
      console.log(e)
    }
    dispatch(login(user))
    navigation.navigate('HomeScreen');
  }

  
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
            dispatch(register(user));
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
    console.log(response?.type)
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      userLoginInfo();
    }
  }, [response, token]);


  const userLoginInfo = async () => {
    axios.get('https://www.googleapis.com/oauth2/v3/userinfo?access_token='+response.authentication.accessToken)
    .then(function(response){
        const userDetails = response.data
        console.log("User Details: ", userDetails)
        dispatch(login(userDetails))
    }).catch((e) => {
      console.log(e);
    })
  }

  return (
    <SafeAreaView
      style={tw`bg-black w-full h-full items-center justify-center`}
    >
      <View style={tw`bg-black`}>
        <View style={tw`justify-center items-center mt-[-30px]`}>
          <Image style={tw`w-50 h-50 mb-[-70]`} source={Health} />
          <Text style={tw`p-3 mt-3 w-[250px] text-center text-white`}>
            Track your way to a healthier you with our app.{" "}
          </Text>
        </View>
        <View style={tw`items-center justify-center py-2`}>
          <Divider
            style={tw`w-[170px] items-center justify-center`}
            color={"white"}
          />
        </View>
        <View style={tw`px-5 py-2`}>
          <Text style={inputsStyles.text}>E-mail</Text>

          <TextInput
            style={inputsStyles.textInput}
            placeholder="john@gmail.com"
            placeholderTextColor="#aaaaaa"
            color="white"
            onChangeText={(text) => setEmail(text)}
            value={email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <Text style={inputsStyles.text}>Password</Text>

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
          <TouchableOpacity
            style={tw`bg-black w-90 text-white rounded-full p-2`}
          >
            <Button
              color="white"
              style={tw`bg-[#a3b18a] text-white rounded rounded-full h-13 items-center justify-center`}
              type="clear"
              titleStyle={{ color: "white" }}
              title="Log in"
              onPress={onLoginPress}
            />
          </TouchableOpacity>
        </View>

        <View style={tw`py-5 items-center justify-center`}>
          <Divider style={tw`w-[80px] items-center justify-center `} />
        </View>
        <View style={tw`items-center justify-center`}>
          <TouchableOpacity style={tw`bg-black w-90 text-white rounded-full`}>
            <Button
              type="clear"
              icon={
                <Icon name="google" style={tw`m-2`} size={20} color="black" />
              }
              titleStyle={{ color: "black" }}
              buttonStyle={tw`bg-white mb-2 rounded rounded-full h-13 items-center justify-center`}
              color="black"
              title="Sign in with Google"
              onPress={logWithGoogle} />
          </TouchableOpacity>
        </View>
        <View style={tw`items-center justify-center`}>
          <TouchableOpacity style={tw`border w-90 text-black rounded-full`}>
            <Button
              type="clear"
              icon={
                <Icon name="apple" style={tw`m-2`} size={20} color="black" />
              }
              buttonStyle={tw`bg-white rounded rounded-full h-13 items-center justify-center`}
              titleStyle={{ color: "black" }}
              title="Sign in with Apple"
              // onPress={onLoginPress}
            />
          </TouchableOpacity>
        </View>
        <View style={tw`flex-row items-center py-3 justify-center`}>
          <Text style={tw`text-white items-center py-3`}>Not a Member?</Text>
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
    color: "white",
  },
  textInput: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 50,
    marginTop: 5,
  },
});

export default LoginScreen;
