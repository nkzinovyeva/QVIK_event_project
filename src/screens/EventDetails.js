import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  Text,
  Alert,
} from "react-native";
import moment from "moment";
import { useIsConnected } from "react-native-offline";
import { useSelector } from "react-redux";
import AppFavButton from "../components/favButton";
import AppHeader from "../components/header";
import AppOfflineBar from "../components/offlineBar";
import AppTagButton from "../components/tagButton";
import theme from "../constants/theme";
import { IMAGES_URL } from "../config";

const { width } = Dimensions.get("screen");

/****
 * SCREEN FOR THE SPECIFIC EVENT
 ****/

export default function EventDetailsScreen({ route, navigation }) {
  //check the Internet connection
  const isConnected = useIsConnected();

  //constants
  const eventId = route.params;
  const { events, setupData, timestamp, restaurants } = useSelector(
    (state) => state.eventsReducer
  );

  //get exact event from the list of events
  let event = {};
  events.map((block) => {
    block.data.map((ev) => {
      if (ev.eventId === eventId) {
        event = ev;
      }
    });
  });

  //constants for tags
  const inheritedTags = event.inheritedTags || [];
  const tags = event.eventTags || [];

  //header's fields data
  let date = moment(event.startDate, "YYYY-MM-DD");
  let time = moment(event.startTime, "HH:mm:ss").format("LT");
  let duration = moment(event.endTime, "HH:mm:ss").diff(
    moment(event.startTime, "HH:mm:ss"),
    "minutes"
  );
  let imgurl = null;
  let src = null;
  if (event.image) {
    imgurl = IMAGES_URL + event.image.imageId;
  } else {
    src = require("../assets/default_img.jpg");
  }

  //header component
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <AppHeader
          item={event}
          tags={inheritedTags.concat(tags)}
          img={imgurl}
          source={src}
          title={event.title}
          subTitle={
            date.format("ddd") +
            ", " +
            date.format("MMM Do") +
            ", " +
            time +
            ", " +
            duration +
            "min"
          }
          leftButton={true}
          rightButton={true}
          navigation={navigation}
          clickableTag={false}
        />
      ),
    });
  }, [navigation]);

  //notification for the canceled event
  if (event.active !== true) {
    Alert.alert("The event is canceled!");
  }

  //render
  if (!event) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.screen}>
        {isConnected ? null : <AppOfflineBar timestamp={timestamp} />}
        <ScrollView showsHorizontalScrollIndicator={true}>
          {event.stage.name !== "No Stage" ? (
            <ScrollView style={styles.tagContainer} horizontal={true}>
              <AppTagButton
                isButton={true}
                name={"compass"}
                onPress={() => navigation.push("Stage", event.stage.stageId)}
                data={event.stage.name}
                subData={setupData.venue}
              />
            </ScrollView>
          ) : (
            <View></View>
          )}
          {event.presenters ? (
            <ScrollView style={styles.tagContainer} horizontal={true}>
              {event.presenters.map((item, index) => (
                <AppTagButton
                  key={index + item}
                  isButton={true}
                  name={"mic"}
                  onPress={() => navigation.push("Presenter", item.presenterId)}
                  data={item.name}
                />
              ))}
            </ScrollView>
          ) : (
            <View style={styles.tagContainer}>
              <Text style={styles.replacementText}>
                No presenters linked to this event
              </Text>
            </View>
          )}

          {event.restaurants ? (
            <ScrollView style={styles.tagContainer} horizontal={true}>
              {event.restaurants.map((item, index) => (
                <AppTagButton
                  key={index + item}
                  isButton={true}
                  name={"food"}
                  onPress={() =>
                    navigation.push("Restaurant", item.restaurantId)
                  }
                  data={item.name}
                />
              ))}
            </ScrollView>
          ) : (
            restaurants.length !== 0 && (
              <View style={styles.tagContainer}>
                <Text style={styles.replacementText}>
                  No restaurants linked to this event
                </Text>
              </View>
            )
          )}

          <Text style={styles.title}>
            <AppFavButton
              item={event}
              color={theme.colors.blackColor}
              size={22}
            />{" "}
            {event.shortDescription}
          </Text>
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
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderColor: "grey",
    width: width,
    backgroundColor: "white",
  },
  replacementText: {
    color: theme.colors.grayColor,
    fontSize: theme.fontSizes.detailsText,
    fontFamily: theme.fonts.fontFamily,
    margin: 5,
  },
});
