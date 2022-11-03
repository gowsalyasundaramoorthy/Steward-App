import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomePage from "../screens/homePage";

import Camerapage from "../component/cameraPage";
import MemberPage from "../component/memberPage";

const screens = {
  HomePage: {
    screen: HomePage,
  },

  MemberPagee: {
    screen: MemberPage,
  },
  Camerapage: {
    screen: Camerapage,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
