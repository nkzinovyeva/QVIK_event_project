import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Text, SectionList } from 'react-native';
import Colors from "../constants/colors";
import moment from "moment";
import { useSelector, useDispatch } from 'react-redux';
import { getEvents } from '../redux/actions';
import AppHeader from "../components/header";
import AppList from "../components/listItem";

//get the width of the screen
const { width } = Dimensions.get("screen");

export default function EventsScreen({ navigation }) {

  //constants
  const { events, parent, filteredEvents } = useSelector(state => state.eventsReducer);
  const dispatch = useDispatch();

  const fetchEvents = () => dispatch(getEvents());

  useEffect(() => {
    fetchEvents();
  }, []);

  //header component 
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () =>
        <AppHeader
          tags={parent.allTags}
          img={require('../assets/mainPic.jpg')}
          title={parent.title} 
          subTitle={parent.venue + ', ' + (moment(parent.startDate).format("MMM Do") +  " - " + moment(parent.endDate).format("Do YYYY"))}
          leftButton={false}
          rightButton={false}
          clickableTag={true}
        />,
    });
  }, [navigation]);

  //render the event
  const Event = ({ item }) => {

    //variables to pass to the event-page
    let date = moment(item.startDate, "YYYY-MM-DD")
    let time = moment(item.startTime, "HH:mm:ss").format('LT');
    let duration = moment(item.endTime, "HH:mm:ss").diff(moment(item.startTime, "HH:mm:ss"), 'minutes')
    let venue = parent.venue
    let title = item.title
    let stage = item.stage
    let id = item.eventId
    let tags = [...item.tags, `Hosted by ${item.presenters}`, `${venue}, ${stage}`, item.inheritedTags ]

    //code-block to check the passed/future events
    let nowTime = moment().format('HH:mm:ss');
    let nowDate = moment().format('YYYY-MM-DD');

    var passed = "";
    if (item.startDate > nowDate || item.startTime > nowTime ) {
      passed = false;
    } else {
      passed = true;
    }

    let rightBottomSubtitle = duration + " min";

    return ( 
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Event", 
            { 
              id: id,
              title: title, 
              subTitle: `@${venue}, ${date.format('ddd')}, ${date.format("MMM Do")}, ${time}, ${duration} min`, 
              tags: tags,
              item: item
            }) // TO PASS TO THE EVENT PAGE
        }
      >
        <AppList
          leftIcon={true}
          iconColor={Colors.blackColor}
          title={title}
          subtitle={stage}
          rightTopSubtitle={time}
          rightBottomSubtitle={rightBottomSubtitle}
          passed={passed}
          item={item}
        />
      </TouchableOpacity>
    );
  }
 
  return ( 
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={filteredEvents.subEvents && filteredEvents.subEvents.length > 0 ? filteredEvents.subEvents : events.subEvents}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Event item={item} />}
        renderSectionHeader={({ section: { dateAsTitle } }) => (
          <Text style={{ fontSize: 20, color: Colors.grayColor, backgroundColor: Colors.backwhite, marginLeft: 35, padding: 16 }}>{moment(dateAsTitle, "YYYY-MM-DD").format('dddd').toUpperCase()}</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backwhite,
    
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