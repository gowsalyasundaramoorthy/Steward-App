import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomePage from "../screens/homePage";

import MemberPage from "../component/memberPage";

const screens = {
  HomePage: {
    screen: HomePage,
  },

  MemberPage: {
    screen: MemberPage,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
