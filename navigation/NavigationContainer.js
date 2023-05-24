import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import FoodScreen from "../screens/FoodScreen";
import AddRecipeScreen from "../screens/AddRecipeScreen";
import BMRCalculator from "../screens/BMRCalculator";
import ResultBMRScreen from "../screens/ResultBMRScreen";
import MyDrawer from "./Drawer";
import RecipesScreen from "../screens/RecipesScreen";
import WorkoutListScreen from "../screens/WorkoutListScreen";

const Stack = createNativeStackNavigator();

const NavigationComponent = () => {
  const isSignedIn = useSelector((state) => state.user.value.isSignedIn);

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
  ];

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        {isSignedIn ? (
          <>
            <Stack.Group
              name="AppGroup"
              component={MyDrawer}
              options={{ headerShown: false }}
            />
            {AppScreens.map((screen) => (
              <Stack.Screen
                key={screen.name}
                name={screen.name}
                component={screen.component}
                options={{ headerShown: false }}
              />
            ))}
          </>
        ) : (
          <>
            {AuthScreens.map((screen) => (
              <Stack.Screen
                key={screen.name}
                name={screen.name}
                component={screen.component}
                options={{ headerShown: false }}
              />
            ))}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationComponent;
