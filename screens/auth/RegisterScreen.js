import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import React, { useState, useEffect } from "react";
import { Divider } from "@rneui/themed";
import { firebase } from "../../src/firebase/config";
import { register } from "../../src/redux/userSlice";
import { useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import Health from "../../assets/Health.png";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const RegisterScreen = ({ navigation }) => {
  const [displayName, setdisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  //google

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

    dispatch(register(user));
    navigation.navigate("HomeScreen");
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
        const user = {
          displayName: userDetails.given_name,
          email: userDetails.email,
          id: userDetails.sub,
          password: "",
          picture: userDetails.picture,
          auth: "google",
        };

        const usersRef = firebase.firestore().collection("users");
        const email = userDetails.email;

        // Check if user with the same email already exists
        usersRef
          .where("email", "==", email)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.empty) {
              usersRef
                .doc(user.uid)
                .set(userDetails)
                .then(() => {
                  console.log("User added to Firestore successfully!");
                  setUser(userDetails);
                  storeData(userDetails);
                })
                .catch((error) => {
                  console.log("Error adding user to Firestore: ", error);
                });
            } else {
              console.log(
                "User with the same email already exists. Skip adding to the database."
              );
            }
          })
          .catch((error) => {
            console.log("Error querying Firestore: ", error);
          });

        dispatch(register(userDetails));
        storeData(userDetails);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const storeData = async (user) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (e) {
      console.log(e);
    }
  };

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          password,
          displayName,
        };
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            dispatch(register(data));
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

  return (
    <SafeAreaView style={tw`h-full justify-center items-center bg-black`}>
      <View style={tw`py-10`}>
        <View style={tw`justify-center items-center mt-[-60px]`}>
          <Image style={tw`w-50 h-50 mb-[-70]`} source={Health} />
          <Text style={tw`p-3 mt-3 w-[250px] text-center text-white `}>
            Track your way to a healthier you with our app.{" "}
          </Text>
        </View>
        <View style={tw`items-center justify-center py-2`}>
          <Divider
            style={tw`w-[170px] items-center justify-center`}
            color={"white"}
          />
        </View>
        <View style={tw`px-5 py-3`}>
          <TextInput
            style={inputsStyles.textInput}
            placeholder="First name"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setdisplayName(text)}
            value={displayName}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />

          <TextInput
            style={inputsStyles.textInput}
            placeholder="john@gmail.com"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEmail(text)}
            value={email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />

          <TextInput
            style={inputsStyles.textInput}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder="min. 8 characters"
            onChangeText={(text) => setPassword(text)}
            value={password}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={inputsStyles.textInput}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder="confirm password"
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        </View>
        <View style={tw`items-center justify-center`}>
          <TouchableOpacity style={tw`w-90 rounded-full p-2`}>
            <Button
              color="white"
              style={tw`bg-[#E0FE0E] rounded rounded-full h-13 items-center justify-center`}
              type="clear"
              titleStyle={{ color: "black" }}
              title="Sign up"
              onPress={onRegisterPress}
            />
          </TouchableOpacity>
        </View>

        <View style={tw`py-3 items-center flex-row justify-center`}>
          <Divider style={tw`w-[150px]`} />
          <Text style={tw`text-gray-400 mx-3`}>or</Text>
          <Divider style={tw`w-[150px]`} />
        </View>
        <View style={tw`items-center justify-center`}>
          <TouchableOpacity style={tw`bg-black w-90 rounded-full `}>
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
              buttonStyle={tw`rounded rounded-full h-13 items-center justify-center bg-gray-600 bg-opacity-50 backdrop-filter backdrop-blur-md`}
              title="Sign up with Google"
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
              buttonStyle={tw`bg-gray-600 bg-opacity-50 backdrop-filter backdrop-blur-md rounded rounded-full h-13 items-center justify-center`}
              titleStyle={{ color: "white" }}
              title="Sign up with Apple"
              // onPress={onLoginPress}
            />
          </TouchableOpacity>
        </View>
        <View style={tw`py-5 mx-[35px]`}></View>
      </View>
    </SafeAreaView>
  );
};

const inputsStyles = StyleSheet.create({
  text: {
    marginTop: 13,
  },
  textInput: {
    padding: 18,
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 50,
    marginTop: 10,
  },
});

export default RegisterScreen;
