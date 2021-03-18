import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator} from '@react-navigation/stack';
import EventsScreen from "../screens/EventsScreen";
import EventsDetails from "../screens/EventDetails";
import RestsScreen from "../screens/RestaurantsScreen";
import MySchedule from "../screens/MyScheduleScreen";
import { Icon } from 'react-native-elements';
import Colors from "../constants/colors";
import RestDetails from '../screens/RestDetails';
import PresenterDetails from '../screens/PresenterDetails';
import StageDetails from '../screens/StageDetails';

//default options for the screens || check later if needed
const defaultNavOptions =  {
  headerStyle: {
    height: 185,
    //backgroundColor: Colors.backwhite,
   },
  headerTintColor: Colors.whiteColor,
  headerTitleStyle: {
    fontSize: 32,  
    fontFamily: 'System', 
    color: Colors.whiteColor
  },
  headerLeft: null,
}

// main events stack 
const eventsStack = createStackNavigator();

function EventsStackScreen() {
    return (
      <eventsStack.Navigator headerMode= "screen" screenOptions={() => (defaultNavOptions)}  >
        <eventsStack.Screen name="Events" component={EventsScreen} />
        <eventsStack.Screen name="Event" component={EventsDetails} />
        <eventsStack.Screen name="Restaurant" component={RestDetails} />
        <eventsStack.Screen name="Presenter" component={PresenterDetails} />
        <eventsStack.Screen name="Stage" component={StageDetails} />
      </eventsStack.Navigator>
    );
}


const myScheduleStack = createStackNavigator();

function MyScheduleStackScreen() {
    return (
        <myScheduleStack.Navigator headerMode= "screen" screenOptions={() => (defaultNavOptions)}  >
            <myScheduleStack.Screen name="My Schedule" component={MySchedule} />
            <myScheduleStack.Screen name="Event" component={EventsDetails} />
            <myScheduleStack.Screen name="Restaurant" component={RestDetails} />
            <myScheduleStack.Screen name="Presenter" component={PresenterDetails} />
            <myScheduleStack.Screen name="Stage" component={StageDetails} />
      </myScheduleStack.Navigator>
    );
}


const restStack = createStackNavigator();

function RestaurantsStackScreen() {
    return (
      <restStack.Navigator headerMode= "screen" screenOptions={() => (defaultNavOptions)}  >
        <restStack.Screen name="Late Bites" component={RestsScreen}  />
        <restStack.Screen name="Restaurant" component={RestDetails}  />
        <restStack.Screen name="Event" component={EventsDetails}  />
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
        <MainNav.Screen key="1" name="My Schedule" component={MyScheduleStackScreen}  options={{unmountOnBlur: true}} />
        <MainNav.Screen key="2" name="Events" component={EventsStackScreen} options={{unmountOnBlur: true}} />
        <MainNav.Screen key="3" name="Late Bites" component={RestaurantsStackScreen} />
      </MainNav.Navigator>
  );
}