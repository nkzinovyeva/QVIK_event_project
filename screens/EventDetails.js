import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, View, Dimensions, SafeAreaView, Text } from 'react-native';
import Colors from "../constants/colors";
import AppFavButton from "../components/favButton";
import moment from "moment";
import theme from '../constants/theme';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get("screen");

import AppHeader from "../components/header";

export default function EventDetailsScreen({ route, navigation }) {

  const { events, setupData } = useSelector(state => state.eventsReducer);

  const eventId = route.params;
 
  let event = {}
  events.map((block) => {
    block.data.map((ev) => {
      if (ev.eventId === eventId) {
        event = ev;
      }
    })
  })

  let date = moment(event.startDate, "YYYY-MM-DD")
  let time = moment(event.startTime, "HH:mm:ss").format('LT');
  let duration = moment(event.endTime, "HH:mm:ss").diff(moment(event.startTime, "HH:mm:ss"), 'minutes')

  //header component 
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () =>
        <AppHeader
          item={event}
          tags={event.inheritedTags.concat(event.eventTags)}
          //img={require('../assets/eventPic.jpg')}
          img={event.image}
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
              onPress={() => navigation.push("Stage", event.stage.stageId)}
              data={event.stage.name}
              subData={setupData.venue}
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
                onPress={() => navigation.push("Presenter", item.presenterId)}
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
                onPress={() => navigation.push('Restaurant', item.restaurantId)}
                data={item.name}
              />
            )}
          </ScrollView>
          <Text style={styles.title}>{event.shortDescription}</Text>
          <View style={styles.buttonContainer}>
            <AppFavButton item={event} text="My Schedule" color={theme.colors.blackColor} />
          </View>
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
  buttonContainer: {
    marginLeft: 16,
    marginBottom: 16,
    marginTop: 0,
  },
  tagContainer: {
    //flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: 'grey',
    width: width,
    backgroundColor: 'white'
  }
});