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

  let tags = ["No smoking", "No smoking", "No smoking", "No smoking", "No smoking", "No smoking"];

  //header component 
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => 
        <AppHeader 
          tags={parent.allTags}
          img={require('../assets/mainPic.jpg')}
          title="My schedule" 
          subTitle={parent.venue + ', ' + (moment(parent.startDate).format("MMM Do") +  " - " + moment(parent.endDate).format("Do YYYY"))}
          backButton={false}
          adminButton={true} 
        />,
    });
  }, [navigation]);

//render the event
const Event = ({item}) => {

  
  //variables to pass to the event-page
  let date = moment(item.startDate, "YYYY-MM-DD").format('dddd')
  let time = moment(item.startTime, "HH:mm:ss").format('LT');
  let duration = moment(item.endTime, "HH:mm:ss").diff(moment(item.startTime, "HH:mm:ss"), 'minutes')
  let venue = parent.venue
  let title = item.title
  let stage = item.stage
  let id = item.eventId
  let tags = item.tags

  //code-block to check the passed/future events
  let nowTime = moment().format('HH:mm:ss');
  let nowDate = moment().format('YYYY-MM-DD');
  var passed = "";
  if (item.startTime > nowTime && item.startDate > nowDate) {
    passed = false;
  } else {
    passed = true;
  }
    
  return ( // passed should be !passed (to change after tests!)
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Event", {id:id, title:title, subTitle:`@${venue}, ${date}, ${time}, ${duration} min`, tags:tags } ) // TO PASS TO THE EVENT PAGE
      }
    >
      <ListItem bottomDivider >
      <TouchableOpacity
        onPress={() => handleRemoveFavourite(item)}
      >
        <Icon
            size={22}
            name='star-sharp'
            type='ionicon'
          />
        </TouchableOpacity>
        <ListItem.Content style={{ alignItems: 'flex-start' }}>
          <ListItem.Title style={{ color: Colors.blackColor, fontSize: 16 }}>{title}</ListItem.Title>
          <ListItem.Subtitle style={{ color: Colors.grayColor, fontSize: 14 }}>{stage}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content style={{ alignItems: 'flex-end'}}> 
            <ListItem.Subtitle style={{ fontSize: 14, color: passed ? Colors.blueColor : Colors.blackColor }}>{time}</ListItem.Subtitle>
            <ListItem.Subtitle style={{ fontSize: 14, color: passed ? Colors.blueColor : Colors.blackColor }}>{duration} min</ListItem.Subtitle>
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