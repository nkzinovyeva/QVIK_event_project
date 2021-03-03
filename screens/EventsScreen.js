import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Alert, StyleSheet, View, FlatList, ImageBackground, TouchableOpacity, Image, Dimensions, SafeAreaView, Text, SectionList, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { ListItem, } from 'react-native-elements';
import Colors from "../constants/colors";
import moment from "moment";
import { useSelector, useDispatch } from 'react-redux';
import { getEvents, addFavourite, removeFavourite } from '../redux/actions';
import AppHeader from "../components/header";
import AppList from "../components/listItem";

//get the width of the screen
const { width } = Dimensions.get("screen");

export default function EventsScreen({ navigation }) {

  //constants
  const { events, favourites, parent } = useSelector(state => state.eventsReducer);
  const dispatch = useDispatch();

  const fetchEvents = () => dispatch(getEvents());

  useEffect(() => {
    fetchEvents();
    console.log("events ", events)
  }, []);

  const addToFavouriteList = event => dispatch(addFavourite(event));
  const removeFromFavouriteList = event => dispatch(removeFavourite(event));

  const handleAddFavourite = event => {
    addToFavouriteList(event);
    Alert.alert("The event is saved in Favourites")
  };

  const handleRemoveFavourite = event => {
    removeFromFavouriteList(event);
    Alert.alert("The event is removed from Favourites")
  };

  const ifExists = event => {
    if (favourites.filter(item => item.eventId === event.eventId).length > 0) {
      return true;
    }
    return false;
  };

  //let tags = ["No smoking", "No smoking", "No smoking", "No smoking", "No smoking", "No smoking"];

  //header component 
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () =>
        <AppHeader
          tags={parent.allTags}
          img={require('../assets/mainPic.jpg')}
          title={parent.title}
          subTitle={parent.venue + ', ' + (moment(parent.startDate).format("MMM Do") + " - " + moment(parent.endDate).format("Do YYYY"))}
          backButton={false}
          adminButton={true}
        />,
    });
  }, [navigation]);

  //render the event
  const Event = ({ item }) => {

    console.log('item', item)

    //variables to pass to the event-page
    let date = moment(item.startDate, "YYYY-MM-DD")
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

    let rightBottomSubtitle = duration + " min";

    return ( // passed should be !passed (to change after tests!)
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Event", { id: id, title: title, subTitle: `@${venue}, ${date.format('ddd')}, ${date.format("MMM Do")}, ${time}, ${duration} min`, tags: tags }) // TO PASS TO THE EVENT PAGE
        }
      >
        <AppList
          leftIcon={true}
          iconName={ifExists(item) ? 'star-sharp' : 'star-outline'}
          iconAction={() => ifExists(item) ? handleRemoveFavourite(item) : handleAddFavourite(item)}
          title={title}
          subtitle={stage}
          rightTopSubtitle={time}
          rightBottomSubtitle={rightBottomSubtitle}
          passed={passed}
        />
        {/* <ListItem bottomDivider >
        <TouchableOpacity
          onPress={() =>
            ifExists(item) ? handleRemoveFavourite(item) : handleAddFavourite(item)
          }
        >
          <Icon
            size={22}
            name={ifExists(item) ? 'star-sharp' : 'star-outline'}
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
      </ListItem> */}
      </TouchableOpacity>
    );
  }

  //return flatlist
  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={events.subEvents}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Event item={item} />}
        renderSectionHeader={({ section: { dateAsTitle } }) => (
          <Text style={{ fontSize: 20, color: Colors.grayColor, backgroundColor: Colors.backwhite }}>{moment(dateAsTitle, "YYYY-MM-DD").format('dddd')}</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backwhite,
    //paddingTop: StatusBar.currentHeight,
  },
  tag: {
    backgroundColor: Colors.blueColor,
    padding: 6,
    margin: 5,
    borderRadius: 10
  },
  tagText: {
    color: Colors.whiteColor,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    padding: 10,
  },
}
);

/*
//alternative header
  let tags = ["No smoking", "No smoking", "No smoking","No smoking","No smoking","No smoking"];

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false});
  }, [navigation]);

  return (
      <SafeAreaView style={styles.container}>
        <AppHeader
          tags={tags}
          img={null}
          //title={events.parentEvent.title}
          //subTitle={events.parentEvent.eventVenues[0].venue.name + ', ' + (moment(events.parentEvent.startDate).format("MMM Do") +  " - " + moment(events.parentEvent.endDate).format("Do YYYY"))}
          backButton={false}
          adminButton={true}
        />
          <View style={{ }}>
            <FlatList
                data={events.subEvents}
                keyExtractor={item => item.eventId.toString()}
                renderItem={({item}) => <Event item={item}/>}
            />
          </View>
      </SafeAreaView>
    );
*/