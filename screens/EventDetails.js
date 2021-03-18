import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, View, Dimensions, SafeAreaView, Text } from 'react-native';
import Colors from "../constants/colors";
import moment from "moment";
import theme from '../constants/theme';

import { useSelector } from 'react-redux';

import AppHeader from "../components/header";

export default function EventDetailsScreen({ route, navigation }) {
  
  const { setupData } = useSelector(state => state.eventsReducer);

  const event = route.params;

  let date = moment(event.startDate, "YYYY-MM-DD")
  let time = moment(event.startTime, "HH:mm:ss").format('LT');
  let duration = moment(event.endTime, "HH:mm:ss").diff(moment(event.startTime, "HH:mm:ss"), 'minutes')

  /*----- TO CHANGE TO REDUX LATER------*/
/*
  const dataUrl = 'https://qvik.herokuapp.com/api/v1/events/' + route.params.eventId;
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    getEventData();
  }, []);

  const getEventData = () => {
    const url = dataUrl;
    fetch(url)
      .then((response) => response.json())
      .then((jsondata) => {
        setEventData(jsondata.data);
        //console.log(jsondata.data)
      })
      .catch((error) => {
        Alert.alert('Error', error);
      });
  };
*/
  /*----- TO CHANGE TO REDUX LATER------*/

  //header component 
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => 
        <AppHeader
          item={event}
          tags={event.inheritedTags.concat(event.eventTags)}
          img={require('../assets/eventPic.jpg')}
          title={event.title} 
          subTitle={date.format('ddd') + ", " + date.format("MMM Do") + ", " + time + ", " + duration + 'min'}
          leftButton={true}
          rightButton={true} 
          navigation={navigation}
          clickableTag={false}
        />,
    });
  }, [navigation]);

  if (!event) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    )
  }
  else {
    return (
      <SafeAreaView style={styles.screen}>
        <ScrollView showsHorizontalScrollIndicator={true} >
          <ScrollView
            style={styles.tagContainer}
            horizontal={true}>
              <ButtonTag
                isButton={true}
                name={'ios-location'}
                onPress={() => navigation.navigate("Stage", event.stage.stageId) }
                data={event.stage.name}
                subData = {setupData.venue}
              />
          </ScrollView>
          <ScrollView
            style={styles.tagContainer}
            horizontal={true}>
              {event.presenters.map((item, index) =>
                  <ButtonTag
                    key={index + item}
                    isButton={true}
                    name={'volume-high'}
                    onPress={() => navigation.navigate("Presenter", item.presenterId) }
                    data={item.name}
                  />
              )}
          </ScrollView>
          <ScrollView
            style={styles.tagContainer}
            horizontal={true}>
              {event.restaurants.map((item, index) =>
                  <ButtonTag
                    key={index + item}
                    isButton={true}
                    name={'ios-restaurant'}
                    onPress={() => navigation.push('Restaurant', item.restaurantId) }
                    data={item.name}
                  />
              )}
          </ScrollView>
          <Text style={styles.title}>{event.shortDescription}</Text>
          <Text style={styles.text}>{event.fullDescription}</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backwhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
      fontSize: theme.fontSizes.detailsTitle,
      fontFamily: theme.fonts.fontFamily,
      margin: 16
  },
  text: {
      fontSize: theme.fontSizes.detailsText,
      fontFamily: theme.fonts.fontFamily,
      lineHeight: 30,
      margin: 16,
      marginTop: 0,
  },
  tagContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: 'grey',
    width: '100%',
    backgroundColor: 'white'
}
});