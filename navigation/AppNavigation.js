import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator} from '@react-navigation/stack';
import EventsScreen from "../screens/EventsScreen";
import Screen from "../screens/Screen";
import MySchedule from "../screens/MyScheduleScreen";
import { Icon } from 'react-native-elements';
import Colors from "../assets/constants/colors";

//default options for the screens
const defaultNavOptions =  {
  headerStyle: {
    height: 150,
    backgroundColor: Colors.backwhite,
  },
  headerTintColor: Colors.whiteColor,
  headerTitleStyle: {
    //fontWeight: 'bold',
    fontSize: 32,
    alignSelf: 'center',
    justifyContent: 'center',
    fontFamily: 'System',
  },
  headerBackTitleStyle: {
  }
}

// main events stack 
const eventsStack = createStackNavigator();

function EventsStackScreen() {
    return (
      <eventsStack.Navigator screenOptions={() => (defaultNavOptions)}  >
        <eventsStack.Screen name="Night(s) of Arts" component={EventsScreen} />
        <eventsStack.Screen name="MySchedule" component={MySchedule} />
      </eventsStack.Navigator>
    );
}

// mySchedule stack  - fake at this moment
const myScheduleStack = createStackNavigator();

function MyScheduleStackScreen() {
    return (
        <myScheduleStack.Navigator screenOptions={() => (defaultNavOptions)}  >
            <myScheduleStack.Screen name="My Schedule" component={MySchedule} />
            <myScheduleStack.Screen name="Events" component={Screen} />
      </myScheduleStack.Navigator>
    );
}

// restorants stack - fake at this moment
const restStack = createStackNavigator();

function restorantsStackScreen() {
    return (
      <restStack.Navigator screenOptions={() => (defaultNavOptions)}  >
        <restStack.Screen name="Events" component={Screen}  />
        <restStack.Screen name="My Schedule" component={MySchedule} />
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

            if (route.name === 'My Schedule') {
                iconName = 'star-outline';
                iconType = 'material-community';
            } else if (route.name === 'Events') {
              iconName = 'drama-masks';
              iconType = 'material-community';
            } else if (route.name === 'Late Bites') {
                iconName = 'fast-food-outline';
                iconType = 'ionicon';
            } 

            return <Icon name={iconName} type={iconType} size={size} color={color}/>
          },
        })}
        initialRouteName="Events"
        tabBarOptions={{
          activeTintColor: Colors.blueColor,
          inactiveTintColor: Colors.grayColor,
          style: { 
            backgroundColor: Colors.whiteColor,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowColor: Colors.grayColor,
            shadowOpacity: 2,
            shadowRadius: 2,
            elevation: 2,
            //borderTopWidth: 1,
            //top: 1,
            },
        }}
      >
        <MainNav.Screen key="1" name="My Schedule" component={MyScheduleStackScreen} />
        <MainNav.Screen key="2" name="Events" component={EventsStackScreen} />
        <MainNav.Screen key="3" name="Late Bites" component={restorantsStackScreen} />
      </MainNav.Navigator>
  );

}