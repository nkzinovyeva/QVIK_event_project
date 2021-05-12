import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import EventsScreen from "../screens/EventsScreen";
import EventsDetails from "../screens/EventDetails";
import RestsScreen from "../screens/RestaurantsScreen";
import MySchedule from "../screens/MyScheduleScreen";
import { Icon } from "react-native-elements";
import theme from "../constants/theme";
import RestDetails from "../screens/RestaurantDetails";
import PresenterDetails from "../screens/PresenterDetails";
import StageDetails from "../screens/StageDetails";

/****
 * COMPONENT FOR THE NAVIGATION
 ****/

//default options for the screens || check later if needed
const defaultNavOptions = {
  headerStyle: {
    height: 185,
  },
  headerTintColor: theme.colors.whiteColor,
  headerTitleStyle: {
    fontSize: 32,
    fontFamily: "System",
    color: theme.colors.whiteColor,
  },
  headerLeft: null,
};

// main events stack
const eventsStack = createStackNavigator();

function EventsStackScreen() {
  return (
    <eventsStack.Navigator headerMode="screen">
      <eventsStack.Screen name="Events" component={EventsScreen} />
      <eventsStack.Screen name="Event" component={EventsDetails} />
      <eventsStack.Screen name="Restaurant" component={RestDetails} />
      <eventsStack.Screen name="Presenter" component={PresenterDetails} />
      <eventsStack.Screen name="Stage" component={StageDetails} />
    </eventsStack.Navigator>
  );
}

// favourite events stack
const myScheduleStack = createStackNavigator();

function MyScheduleStackScreen() {
  return (
    <myScheduleStack.Navigator headerMode="screen">
      <myScheduleStack.Screen name="My Schedule" component={MySchedule} />
      <myScheduleStack.Screen name="Event" component={EventsDetails} />
      <myScheduleStack.Screen name="Restaurant" component={RestDetails} />
      <myScheduleStack.Screen name="Presenter" component={PresenterDetails} />
      <myScheduleStack.Screen name="Stage" component={StageDetails} />
    </myScheduleStack.Navigator>
  );
}

// restaurants stack
const restStack = createStackNavigator();

function RestaurantsStackScreen() {
  return (
    <restStack.Navigator headerMode="screen">
      <restStack.Screen name="Late Bites" component={RestsScreen} />
      <restStack.Screen name="Restaurant" component={RestDetails} />
      <restStack.Screen name="Event" component={EventsDetails} />
    </restStack.Navigator>
  );
}

//bottomTab navigation
const MainNav = createBottomTabNavigator();

export default function AppNav() {
  return (
    <MainNav.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName, iconType;

          if (route.name === "My Schedule") {
            iconName = "star-outline";
            iconType = "material-community";
          } else if (route.name === "Events") {
            iconName = "drama-masks";
            iconType = "material-community";
          } else if (route.name === "Late Bites") {
            iconName = "fast-food-outline";
            iconType = "ionicon";
          }

          return (
            <Icon name={iconName} type={iconType} size={size} color={color} />
          );
        },
      })}
      initialRouteName="Events"
      tabBarOptions={{
        activeTintColor: theme.colors.blueColor,
        inactiveTintColor: theme.colors.grayColor,
        style: {
          backgroundColor: theme.colors.whiteColor,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowColor: theme.colors.grayColor,
          shadowOpacity: 2,
          shadowRadius: 2,
          elevation: 2,
        },
      }}
    >
      <MainNav.Screen
        key="1"
        name="My Schedule"
        component={MyScheduleStackScreen}
        options={{ unmountOnBlur: true }}
      />
      <MainNav.Screen
        key="2"
        name="Events"
        component={EventsStackScreen}
        options={{ unmountOnBlur: true }}
      />
      <MainNav.Screen
        key="3"
        name="Late Bites"
        component={RestaurantsStackScreen}
      />
    </MainNav.Navigator>
  );
}