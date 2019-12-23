import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";
import { Platform, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import Logon from "../screens/Logon";
import SignUp from "../screens/SignUp";
import About from "../screens/About";
import Contact from "../screens/Contact";
//import MimesScreen from "../screens/MimesScreen";
//import MimeDetailScreen from "../screens/MimeDetailScreen";
import SearchScreen from "../screens/SearchScreen";
import StartScreen from "../screens/StartScreen";
import TrendingScreen from "../screens/TrendingScreen";
//import MapScreen from "../screens/MapScreen";
//import BusMapScreen from "../screens/BusMapScreen_xx";
import MasterMapScreen from "../screens/MasterMapScreen";
import Colors from "../constants/Colors";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.a_navbar : ""
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold"
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans"
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,

  headerTitle: "Home"
};

// const MimeNavigator = createStackNavigator(
//   {
//     Logon: Logon,
//     Trending: TrendingScreen,
//     Mimes: MimesScreen,
//     //Mimes: TrendingScreen,
//     MimeDetail: MimeDetailScreen
//   },

//   {
//     defaultNavigationOptions: defaultStackNavOptions
//   }
// );
//const xxMainTabs = createBottomTabNavigator({
//   SearchTabs: {
//     screen: SearchNavigator,
//     navigationOptions: {
//       tabBarLabel: "Search"
//     }
//   },
//   Mimes: {
//     screen: MimeScreensNavigator,
//     navigationOptions: {
//       tabBarLabel: "Mimes"
//     }
//   },
//   Trending: {
//     screen: TrendingScreen,
//     navigationOptions: {
//       tabBarLabel: "Other"
//     }
//   }
// });

const BusScreensNavigator = createStackNavigator(
  {
    //r BusTrack: BusMapScreen
    BusTrack: MasterMapScreen
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const SearchNavigator = createStackNavigator(
  {
    Filters: SearchScreen
    // Maps: MapScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const StartNavigator = createStackNavigator(
  {
    Start: StartScreen
    // Filters: SearchScreen
    // Maps: MapScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const TrendingNavigator = createStackNavigator(
  {
    Trending: TrendingScreen
    //MimeDetail: MimeDetailScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

// const tabScreenConfig = {
//   SearchTabs: {
//     // screen: SearchNavigator,
//     screen: StartNavigator,
//     navigationOptions: {
//       tabBarIcon: tabInfo => {
//         return (
//           <Ionicons name="ios-search" size={25} color={tabInfo.tintColor} />
//         );
//       },
//       tabBarColor: Colors.primaryColor,
//       tabBarLabel:
//         Platform.OS === "android" ? (
//           <Text style={{ fontFamily: "open-sans-bold" }}>Search</Text>
//         ) : (
//           "Start"
//         ),
//       tabBarOnPress: ev => {
//         console.log("we have a tab pressed event");
//         navigation.navigate("Logon");
//       }
//     }
//   },

const tabScreenConfig = {
  SearchTabs: {
    // screen: SearchNavigator,
    screen: StartNavigator,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-bus" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Search</Text>
        ) : (
          "Buses"
        )
      //   ,
      // tabBarOnPress: ev => {
      //   console.log("we have a tab pressed event");
      //   navigation.navigate("Start", { date: new Date() });
      // }
    })
  },

  Maps: {
    //screen: TrendingNavigator,
    screen: BusScreensNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-pin" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Mimes</Text>
        ) : (
          "Map"
        )
    }
  },
  Trending: {
    screen: TrendingNavigator,

    //screen: TrendingScreen,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-construct" size={25} color={tabInfo.tintColor} />
        );
      },

      tabBarColor: Colors.accentColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Other</Text>
        ) : (
          "Other"
        )
    }
  }
};

//

const MainTabs =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: "white",
        shifting: true,
        barStyle: {
          backgroundColor: Colors.a_navbar
        }
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "open-sans"
          },
          activeTintColor: Colors.accentColor
        }
      });

const AuthStack = createStackNavigator(
  { Logon: Logon, SignUp: SignUp },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);
const AboutStack = createStackNavigator({ About: About });
const ContactStack = createStackNavigator({ Contact: Contact });
const MainDrawer = createDrawerNavigator({
  Logon: AuthStack,
  About: AboutStack,
  Contact: ContactStack
});

const AppModalStack = createStackNavigator(
  {
    App: MainDrawer
    // Auth: {
    //   screen: AuthStack
    // }
  },
  {
    // mode: "modal",
    headerMode: "none"
  }
);

//createSwitchNavigator
//createDrawerNavigator
const TopNavigator = createSwitchNavigator(
  {
    //filters: MimesTabNavigator,
    //Logout: AuthStack,
    Logon: AppModalStack,
    Filters: {
      //screen: FiltersNavigator,
      screen: MainTabs,

      //screen: MainTabs,
      // screen: MimesTabNavigator,
      navigationOptions: {
        drawerLabel: "Search"
      }
    },

    Buses: {
      //screen: MimeNavigator,
      screen: MainTabs,
      // screen: MimesTabNavigator,
      navigationOptions: {
        drawerLabel: "Buses"
      }
    },

    TrendingNav: {
      screen: TrendingNavigator,
      navigationOptions: {
        drawerLabel: "Other"
      }
    }
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: "open-sans-bold"
      }
    }
    //  ,
    //  {initialRouteName: "Mimes"}
  }
);

//export default createAppContainer(MimeMainNavigator);

// good
//export default createAppContainer(MimesNavigator);

export default createAppContainer(TopNavigator);
