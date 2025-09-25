import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useSelector } from "react-redux";
import LoginScreen from "../screens/LoginScreen";
import MoviesScreen from "../screens/MoviesScreen";
import { RootState } from "../store";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const auth = useSelector((state: RootState) => state.auth);
  const hasCredentials = !!(auth.email && auth.password);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!hasCredentials ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="Movies" component={MoviesScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
