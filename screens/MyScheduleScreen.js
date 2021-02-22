import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, StyleSheet, View,FlatList, TouchableOpacity, Image, Dimensions, SafeAreaView, Text  } from 'react-native';
import { Icon } from 'react-native-elements';
import {ListItem} from 'react-native-elements';
import Colors from "../constants/colors";
import moment from "moment";
import { useSelector, useDispatch } from 'react-redux';
import { removeFavourite } from '../redux/actions';

//get the width of the screen
const { width } = Dimensions.get("screen");

export default function MyScheduleScreen({navigation}) {

  const { parent, favourites } = useSelector(state => state.eventsReducer);
  const dispatch = useDispatch();

  const removeFromFavouriteList = event => dispatch(removeFavourite(event));

  const handleRemoveFavourite = event => {
    removeFromFavouriteList(event);
    Alert.alert("The event is removed from Favourites")
  };

  //header component 
  const LogoTitle = () => {
    return (
        <View style={{alignItems: 'flex-start'}}>
          <Text style={{fontSize: 32, fontFamily: 'System', color: Colors.whiteColor}}>My schedule</Text>
          <Text style={{fontSize: 16, fontFamily: 'System', color: Colors.whiteColor}}>{parent.venue}, {moment(parent.startDate).format("MMM Do")} - {moment(parent.endDate).format("Do YYYY")}</Text>
        </View>
    );
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <LogoTitle/>,
      headerBackground: () => (
        <Image
          style={{ width: width, height: 150,}}
          source={require('../assets/mainPic.jpg')}
        />
      ),
    });
  }, [navigation]);

//render the event
const Event = ({item}) => {

  let nowTime = moment().format('HH:mm:ss');
  let nowDate = moment().format('YYYY-MM-DD');
  let time = moment(item.startTime, "HH:mm:ss").format('LT');
  let duration = moment(item.endTime, "HH:mm:ss").diff(moment(item.startTime, "HH:mm:ss"), 'minutes')
  let stage = item.eventStages[0].stage['name']
  let title = item.title
  let id = item.eventId
  
  var passed = "";
  if (item.startTime > nowTime && item.startDate > nowDate) {
    passed = false;
  } else {
    passed = true;
  }
    
  return ( // passed should be !passed (to change after tests!)
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Event details", id) // TO PASS TO THE EVENT PAGE
      }
    >
      <ListItem bottomDivider >
      <TouchableOpacity
        onPress={() => handleRemoveFavourite(item)}
      >
        <Icon
          size={24}
          name='star-sharp'
          type='ionicon'
        />
      </TouchableOpacity>
        <ListItem.Content>
          <ListItem.Title>{title}</ListItem.Title>
          <ListItem.Subtitle>{stage}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content style={{ alignItems: 'flex-end', }}> 
            <ListItem.Subtitle style={{ color: passed ? Colors.blueColor : Colors.blackColor }}>{time}</ListItem.Subtitle>
            <ListItem.Subtitle style={{ color: passed ? Colors.blueColor : Colors.blackColor }}>{duration} min</ListItem.Subtitle>
          </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  );
}

//return flatlist
  return (
      <SafeAreaView style={styles.container}>
          <View style={{ }}>
          {favourites.length === 0 ? (
            <Text style={{ color: Colors.grayColor, fontSize: 18, alignSelf: "center", marginTop: 50 }}>
              Add events to favourite list
            </Text>
          ) : (
            <FlatList 
                data={favourites}
                keyExtractor={item => item.eventId.toString()} 
                renderItem={({item}) => <Event item={item}/>}
            />
            )}
          </View>
      </SafeAreaView> 
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backwhite,
    paddingTop: StatusBar.currentHeight,
  }, 
}
);