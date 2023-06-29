import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../src/redux/userSlice";
import { isSignedInCheck } from "../src/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import FoodScreen from "../screens/FoodScreen";
import AddRecipeScreen from "../screens/AddRecipeScreen";
import BMRCalculator from "../screens/BMI&BMR/BMRCalculator";
import ResultBMRScreen from "../screens/BMI&BMR/ResultBMRScreen";
import RecipesScreen from "../screens/RecipesScreen";
import WorkoutListScreen from "../screens/WorkoutListScreen";
import InfoScreen from "../screens/InfoScreen";
import AddActivityScreen from "../screens/AddActivityScreen";
import ActivityScreen from "../screens/ActivityScreen";
import ProfileScreen from "../screens/ProfileScreen";
import UserWorkoutScreen from "../screens/UserWorkoutScreen";
import RecipeScreen from "../screens/RecipeScreen";
import RunningScreen from "../screens/RunningScreen";

const Stack = createNativeStackNavigator();

const AuthScreens = [
  { name: "WelcomeScreen", component: WelcomeScreen },
  { name: "RegisterScreen", component: RegisterScreen },
  { name: "LoginScreen", component: LoginScreen },
];

const AppScreens = [
  { name: "HomeScreen", component: HomeScreen },
  { name: "FoodScreen", component: FoodScreen },
  { name: "AddRecipeScreen", component: AddRecipeScreen },
  { name: "BMR Calculator", component: BMRCalculator },
  { name: "ResultBMRScreen", component: ResultBMRScreen },
  { name: "RecipesScreen", component: RecipesScreen },
  { name: "WorkoutListScreen", component: WorkoutListScreen },
  { name: "InfoScreen", component: InfoScreen },
  { name: "AddActivityScreen", component: AddActivityScreen },
  { name: "ActivityScreen", component: ActivityScreen },
  { name: "ProfileScreen", component: ProfileScreen },
  { name: "UserWorkoutScreen", component: UserWorkoutScreen },
  { name: "RecipeScreen", component: RecipeScreen },
  { name: "RunningScreen", component: RunningScreen },
];

const NavigationComponent = () => {
  const isSignedIn = useSelector((state) => state.user.value.isSignedIn);
  const dispatch = useDispatch();

  console.log("Is?", isSignedIn);

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then((value) => {
        if (value !== null) {
          dispatch(isSignedInCheck(true));
          dispatch(login(value));
        }
      })
      .catch((error) => {
        console.error("Error retrieving user data:", error);
      });
  }, []);

  const screens = isSignedIn ? AppScreens : AuthScreens;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {screens.map((screen) => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={{ headerShown: false }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationComponent;
