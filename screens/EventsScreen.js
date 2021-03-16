import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Text, SectionList } from 'react-native';
import Colors from "../constants/colors";
import moment from "moment";
import { useSelector, useDispatch } from 'react-redux';
import { getEvents, getRestaurants } from '../redux/actions';
import AppHeader from "../components/header";
import AppList from "../components/listItem";
import theme from '../constants/theme';

//get the width of the screen
const { width } = Dimensions.get("screen");

export default function EventsScreen({ navigation }) {

  //constants
  const { events, parent, filteredEvents } = useSelector(state => state.eventsReducer);
  const dispatch = useDispatch();

  const fetchEvents = () => dispatch(getEvents());
  const fetchRestaurants = () => dispatch(getRestaurants());

  useEffect(() => {
    fetchEvents();
    fetchRestaurants();
    
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
    
    //code-block to check the passed/future events
    let nowTime = moment().format('HH:mm:ss');
    let nowDate = moment().format('YYYY-MM-DD');

    var passed = "";
    if (item.startDate > nowDate || item.startTime > nowTime ) {
      passed = false;
    } else {
      passed = true;
    }

    let duration = moment(item.endTime, "HH:mm:ss").diff(moment(item.startTime, "HH:mm:ss"), 'minutes')
    let rightBottomSubtitle = duration + " min";

    return ( 
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Event", item) // TO PASS TO THE EVENT PAGE
        }
      >
        <AppList
          leftIcon={true}
          iconColor={Colors.blackColor}
          title={item.title}
          subtitle={item.stage}
          rightTopSubtitle={moment(item.startTime, "HH:mm:ss").format('LT')}
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
        renderItem={({item}) => <Event item={item} />}
        renderSectionHeader={({ section: { dateAsTitle } }) => (
          <Text style={styles.listTitle}>{moment(dateAsTitle, "YYYY-MM-DD").format('dddd').toUpperCase()}</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backWhite, 
  },
  listTitle: {
    fontSize: theme.fontSizes.eventTitle,
    color: theme.colors.grayColor, 
    backgroundColor: theme.colors.backWhite, 
    marginLeft: 35, 
    padding: 16
  }
}
);