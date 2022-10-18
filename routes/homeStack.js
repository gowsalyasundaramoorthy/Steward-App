import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomePage from "../screens/homePage";
import AddPhotoPage from "../screens/addPhotoPage";
import * as React from "react";

const screens = {
  HomePage: {
    screen: HomePage,
  },
  AddPhotoPage: {
    screen: AddPhotoPage,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
