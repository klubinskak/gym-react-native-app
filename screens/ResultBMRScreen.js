import { View, Text, SafeAreaView, TouchableOpacity, Button } from "react-native";
import React, {useState, useEffect} from "react";
import tw from "twrnc";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";


const ResultBMRScreen = ({route}) => {
  const [message, setMessage] = useState('');
  const [state, setState] = useState({
    status: '',
    color: '',
  })
  const { userInfo } = useSelector((state) => state.userInfo)

  useEffect(() => {
    checkBMI(userInfo.BMI);
  })

  const checkBMI = (BMI) => {
    if(BMI > 18.5 && BMI < 25) {
      setMessage('You have a normal body weight. Good job!');
      state.status = 'NORMAL'
      state.color = 'green-500'
    } if (BMI < 18.5) {
      setMessage('You have underweight body weight.')
      state.status = 'UNDERWEIGHT'
      state.color = 'red-500'
    } if (BMI> 25) {
      setMessage('You have overweight body weight.')
      state.status= 'OVERWEIGHT';
      state.color = 'orange-500'
    }
  }

  return (
    <SafeAreaView style={tw`bg-[#ced4da] h-full`}>
      <Navbar route={route}/>
      <View style={tw`flex justify-center p-3`}>
        <View style={tw`bg-black h-150 justify-center items-center`}>
        <Text style={tw`text-4xl text-white font-bold mb-12`} >Your results</Text>
        <View>
          <Text style={tw`text-white mb-3 text-center`}>Your caloric needs </Text>
          <Text style={tw`font-bold text-white text-6xl text-center`}>{userInfo.BMR}</Text>
        </View>
        <Text style={tw`font-bold text-${state.color} text-xl mb-5 mt-10`}>{state.status}</Text>
        <Text
          style={tw`text-6xl font-bold text-white`}
        >
          {userInfo.BMI}
        </Text>
        <Text style={tw`text-white mb-1`}>Normal BMI range:</Text>
        <Text style={tw`text-white mb-4`}>18,5 - 25 kg/m2</Text>
        <Text style={tw`text-white mb-2 w-60 text-center`}>{message}</Text>
        </View>
      </View>
      <TouchableOpacity
            style={tw`bg-[#a3b18a] text-white rounded-full p-3 m-3 mt-6`}
          >
            <Button
              color="white"
              style={tw`bg-[#a3b18a] text-white rounded rounded-full h-13 items-center justify-center`}
              type="clear"
              titleStyle={{ color: "white"}}
              title="Re-calculate your BMR & BMI"
            />
          </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ResultBMRScreen;
