import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, View, Dimensions, SafeAreaView, Text, } from 'react-native';
import moment from "moment";
import { useIsConnected } from 'react-native-offline';
import AppFavButton from "../components/favButton";
import AppHeader from "../components/header";
import AppOfflineBar  from "../components/oflineBar"
import theme from '../constants/theme';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get("screen");

export default function EventDetailsScreen({ route, navigation }) {
 
  const isConnected = useIsConnected();

  const eventId = route.params;
  const { events, setupData, timestamp } = useSelector(state => state.eventsReducer);
 
  //get exact event from list of events
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
  let imgurl = "https://qvik.herokuapp.com/api/v1/images/"+event.image.imageId;
  console.log(imgurl);

  //header component 
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () =>
        <AppHeader
          item={event}
          tags={event.inheritedTags.concat(event.eventTags)}
          //img={require('../assets/eventPic.jpg')}
          img={imgurl}
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
        {isConnected ? (
          null
          ) : (
          <AppOfflineBar timestamp = {timestamp} />
        )}
        <ScrollView showsHorizontalScrollIndicator={true} >
          <ScrollView
            style={styles.tagContainer}
            horizontal={true}>
            <ButtonTag
              isButton={true}
              name={'compass'}
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
                name={'mic'}
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
                name={'food'}
                onPress={() => navigation.push('Restaurant', item.restaurantId)}
                data={item.name}
              />
            )}
          </ScrollView>
          <Text style={styles.title}><AppFavButton item={event} color={theme.colors.blackColor} size={22} />  {event.shortDescription}</Text>
          <Text style={styles.text}>{event.fullDescription}</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.backWhite,
  },
  title: {
    fontSize: theme.fontSizes.detailsTitle,
    fontFamily: theme.fonts.fontFamily,
    margin: 16,
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
    width: width,
    backgroundColor: 'white',
  }
});