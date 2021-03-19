import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback} from 'react';
import { StyleSheet, TouchableOpacity, SafeAreaView, Text, SectionList, View } from 'react-native';
import { Icon } from 'react-native-elements';

import Colors from "../constants/colors";
import moment from "moment";
import { useSelector, useDispatch } from 'react-redux';
import { getEvents, getRestaurants, getPresenters, getStages, addTimestamp } from '../redux/actions';
import AppHeader from "../components/header";
import AppList from "../components/listItem";
import theme from '../constants/theme';
import { useIsConnected } from 'react-native-offline';

export default function EventsScreen({ navigation }) {
  
  const isConnected = useIsConnected();

  //loading the data
  const { events, setupData, filteredEvents, timestamp } = useSelector(state => state.eventsReducer);
  const dispatch = useDispatch();

  const fetchEvents = () => dispatch(getEvents());
  const fetchRestaurants = () => dispatch(getRestaurants());
  const fetchPresenters = () => dispatch(getPresenters());
  const fetchStages = () => dispatch(getStages());
  const updateTimestamp = () => dispatch(addTimestamp(moment().format("MMM Do, h:mm a")));

  useEffect(() => {
    fetchEvents();
    fetchRestaurants();
    fetchPresenters();
    fetchStages();
    {isConnected ? updateTimestamp() : {} }
  }, []);


  //header component 
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () =>
        <AppHeader
          tags={setupData.allEventTags}
          //img={require('../assets/mainPic.jpg')}
          img={setupData.eventImage}
          title={setupData.title} 
          subTitle={setupData.venue + ', ' + (moment(setupData.startDate).format("MMM Do") +  " - " + moment(setupData.endDate).format("Do YYYY"))}
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
          navigation.navigate("Event", item.eventId) // TO PASS TO THE EVENT PAGE
        }
      >
        <AppList
          leftIcon={true}
          iconColor={Colors.blackColor}
          title={item.title}
          subtitle={item.stage.name}
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
      {isConnected ? (
        <Text></Text>
      ) : (
        <View style={styles.offlineContainer}>
          <View style={{ flexDirection: "row",}}>
            <Icon size={15} name={'exclamationcircle'} type={'antdesign'} color={theme.colors.blackColor}/>
            <Text style={styles.offlineText}>  Offline</Text>
          </View>
          <Text style={styles.offlineText}>Last Update {timestamp}</Text>
        </View>
      )}
      <View>
        <SectionList
          sections={filteredEvents && filteredEvents.length > 0 ? filteredEvents : events}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => <Event item={item} />}
          renderSectionHeader={({ section: { dateAsTitle } }) => (
            <Text style={styles.listTitle}>{moment(dateAsTitle, "YYYY-MM-DD").format('dddd').toUpperCase()}</Text>
          )}
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
  },
  offlineContainer: {
    flexDirection: "row",
    backgroundColor: theme.colors.lightgrayColor,
    justifyContent: "space-between", 
    padding: 16,
    borderBottomWidth: 0.5,
    borderColor: 'grey',
  },
  offlineText: {
    fontSize: theme.fontSizes.listSubtitle,
    color: theme.colors.blackColor,
    fontWeight: "600", 
  },
}
);