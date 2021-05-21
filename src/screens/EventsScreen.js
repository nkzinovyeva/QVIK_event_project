import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, SafeAreaView, Text, SectionList, ScrollView, View } from 'react-native';
import moment from "moment";
import { useIsConnected } from 'react-native-offline';
import { useSelector, useDispatch } from 'react-redux';
import { getLastUpdate, getEvents, getRestaurants, getPresenters, getStages, addTimestamp, getVenues, setUpdateTimestamp } from '../redux/actions';
import AppHeader from "../components/header";
import AppList from "../components/listItem";
import AppOfflineBar  from "../components/offlineBar"
import theme from '../constants/theme';

/****
 * MAIN SCREEN FOR THE LIST OF EVENTS
****/

export default function EventsScreen({ navigation }) {
  
  //check the Internet connection
  const isConnected = useIsConnected();

  //loading the data and constants
  const { events, setupData, filteredEvents, timestamp, lastUpdate, lastUpdateTimestamp } = useSelector(state => state.eventsReducer);
  const dispatch = useDispatch();

  const fetchLastUpdate = () => dispatch(getLastUpdate());
  const fetchEvents = () => dispatch(getEvents());
  const fetchRestaurants = () => dispatch(getRestaurants());
  const fetchPresenters = () => dispatch(getPresenters());
  const fetchStages = () => dispatch(getStages());
  const fetchVenues = () => dispatch(getVenues());
  const updateTimestamp = () => dispatch(addTimestamp(moment().format("MMM Do, h:mm a")));
  const setLastUpdateTimestamp = () => dispatch(setUpdateTimestamp(moment().format('YYYY-MM-DDTHH:mm:ss.SSS'))); //the format need to be agreed with the BE

  //constant for tags
  const allTags = setupData.allEventTags || [];

  useEffect(() => {
    fetchLastUpdate();
    if (!moment(lastUpdate).isAfter(lastUpdateTimestamp)) {
      fetchEvents();
      fetchRestaurants();
      fetchPresenters();
      fetchStages();
      fetchVenues();
      setLastUpdateTimestamp();
    }
    {isConnected ? updateTimestamp() : {} }
  }, []);


  //header component 
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () =>
        <AppHeader
          tags={allTags}
          title={setupData.title} 
          subTitle={setupData.venue + ', ' + (moment(setupData.startDate).format("MMM Do") +  " - " + moment(setupData.endDate).format("Do YYYY"))}
          leftButton={false}
          rightButton={false}
          clickableTag={true}
        />,
    });
  }, [navigation]);

  filteredEvents.map(group => {
    group.data.sort((a, b) => {
      if (a.startDate === b.startDate) {
        if (a.startTime > b.startTime) return 1;
        else return -1;
      } else {
        if (a.startDate > b.startDate) return 1;
        else return -1;
      }
    });
  })

  events.map(group => {
    group.data.sort((a, b) => {
      if (a.startDate === b.startDate) {
        if (a.startTime > b.startTime) return 1;
        else return -1;
      } else {
        if (a.startDate > b.startDate) return 1;
        else return -1;
      }
    });
  })

  //render the event item
  const Event = ({ item }) => {
    
    //check the passed/future state
    let nowTime = moment().format('HH:mm:ss');
    let nowDate = moment().format('YYYY-MM-DD');

    let status = "active";
    if (item.active === false ) {
      status = "canceled";
    }
    else if (item.startDate < nowDate || item.startDate == nowDate && item.startTime > nowTime  ) {
      status = "passed";
    }

    let duration = moment(item.endTime, "HH:mm:ss").diff(moment(item.startTime, "HH:mm:ss"), 'minutes')
    let rightBottomSubtitle = duration + " min";

    return ( 
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Event", item.eventId) // TO PASS TO THE EVENT PAGE
        }
      >
        <AppList
          leftIcon={true}
          iconColor={theme.colors.blackColor}
          title={item.title}
          subtitle={item.stage.name}
          rightTopSubtitle={moment(item.startTime, "HH:mm:ss").format('LT')}
          rightBottomSubtitle={rightBottomSubtitle}
          status={status}
          item={item}
        />
      </TouchableOpacity>
    );
  }
  
 
  //render the list of events
  return ( 
    <SafeAreaView style={styles.container}>
      {isConnected ? (
        null
      ) : (
        <AppOfflineBar timestamp = {timestamp} />
      )}
      <View>
        <SectionList
          sections={filteredEvents && filteredEvents.length > 0 ? filteredEvents : events}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => <Event item={item} />}
          // The code below is used when it's necessary to separate the list with the headers 
          renderSectionHeader = {({ section: { dateAsTitle }}) => (
           <Text style={styles.listTitle}>{moment(dateAsTitle, "YYYY-MM-DD").format('dddd, ll').toUpperCase()}</Text>)}
        />
      </View>
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