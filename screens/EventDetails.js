import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, View, Dimensions, SafeAreaView, Text } from 'react-native';
import Colors from "../constants/colors";
import moment from "moment";
import theme from '../constants/theme';

import { useSelector } from 'react-redux';

import AppHeader from "../components/header";

export default function EventDetailsScreen({ route, navigation }) {
  
  const { parent } = useSelector(state => state.eventsReducer);

  const event = route.params;

  let date = moment(event.startDate, "YYYY-MM-DD")
  let time = moment(event.startTime, "HH:mm:ss").format('LT');
  let duration = moment(event.endTime, "HH:mm:ss").diff(moment(event.startTime, "HH:mm:ss"), 'minutes')

  /*----- TO CHANGE TO REDUX LATER------*/

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

  /*----- TO CHANGE TO REDUX LATER------*/

  //header component 
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => 
        <AppHeader
          item={event}
          tags={event.inheritedTags.concat(event.tags)}
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

  if (!eventData) {
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
            <ButtonTag
              isButton={true}
              name={'ios-location'}
              onPress={() => navigation.navigate("Stage", eventData.stage.stage_id) }
              data={eventData.stage.name}
              subData = {parent.venue}
            />
          {eventData.presenters.map((item, index) =>
              <ButtonTag
                key={index + item}
                isButton={true}
                name={'volume-high'}
                onPress={() => navigation.navigate("Presenter", item.presenter_id) }
                data={item.name}
              />
          )}
          {eventData.restaurants.map((item, index) =>
              <ButtonTag
                key={index + item}
                isButton={true}
                name={'ios-restaurant'}
                onPress={() => navigation.navigate('Restaurant', item.restaurantId) }
                data={item.name}
              />
          )}
          <Text style={styles.title}>{eventData.shortDescription}</Text>
          <Text style={styles.text}>{eventData.fullDescription}</Text>
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
});