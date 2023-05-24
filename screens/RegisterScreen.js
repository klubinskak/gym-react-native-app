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
import { Button } from "react-native-elements";
import React, { useState } from "react";
import Health from "../assets/Health.png";
import { Divider } from "@rneui/themed";
import tw from "twrnc";
import { firebase } from "../src/firebase/config";
import { register } from "../src/redux/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";





const RegisterScreen = ({navigation}) => {
  const [displayName, setdisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();


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
            dispatch(register(data))
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
    <SafeAreaView style={tw`bg-black h-full`}>
      <View style={tw`bg-black py-10`}>
        <View style={tw`justify-center items-center mt-[-60px]`}>
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
          <Text style={inputsStyles.text}>First Name</Text>
          <TextInput
            style={inputsStyles.textInput}
            placeholder="first name"
            color="white"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setdisplayName(text)}
            value={displayName}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <Text style={inputsStyles.text}>E-mail</Text>

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
          <Text style={inputsStyles.text}>Confirm Password</Text>

          <TextInput
            style={inputsStyles.textInput}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            color="white"
            placeholder="confirm password"
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
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
              title="Register Now"
              onPress={onRegisterPress}
            />
          </TouchableOpacity>
        </View>

        <View style={tw`py-3 w-full items-center`}>
          <Divider style={tw`w-[150px]`} />
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
              title="Sign up with Google"
              onPress={onRegisterPress}
            />
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
              title="Sign up with Apple"
              onPress={onRegisterPress}
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

export default RegisterScreen;
