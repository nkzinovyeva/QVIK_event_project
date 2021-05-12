import React from "react";
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  Dimensions,
} from "react-native";
import moment from "moment";
import AppHeader from "../components/header";
import AppTagButton from "../components/tagButton";
import theme from "../constants/theme";
import { useSelector } from "react-redux";

const { width } = Dimensions.get("screen");

/****
 * SCREEN FOR THE SPECIFIC STAGE
 ****/

export default function StagesDetails({ route, navigation }) {
  //constants
  const { stages } = useSelector((state) => state.eventsReducer);
  const { venues } = useSelector((state) => state.eventsReducer);
  const stageId = route.params;

  //get exact stage and venue from the lists
  const stage = stages.filter((stage) => stage.stageId === stageId)[0];
  const venue = venues.filter(
    (venue) => venue.venueId === stage.venue.venueId
  )[0];

  //header component
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <AppHeader
          item={stage}
          tags={[]}
          title={`${stage.venue.name}, ${stage.name}`}
          subTitle={stage.location}
          leftButton={true}
          rightButton={true}
          navigation={navigation}
          clickableTag={false}
        />
      ),
    });
  }, [navigation]);

  //rendering the stage details
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView showsHorizontalScrollIndicator={true}>
        <ScrollView style={styles.tagContainer} horizontal={true}>
          {stage.events.map((item, index) => (
            <AppTagButton
              key={index + item}
              isButton={true}
              name={"star"}
              onPress={() => navigation.push("Event", item.eventId)}
              data={`"${item.title}", ${moment(item.startDate).format(
                "ddd"
              )}, ${moment(item.startTime, "HH:mm:ss").format("LT")}`}
            />
          ))}
        </ScrollView>
        <Text style={styles.title}>TRANSPORTATION</Text>
        <Text style={styles.text}>{venue.transportation}</Text>
        <Text style={styles.title}>FACILITIES</Text>
        <Text style={styles.text}>{venue.facilities}</Text>
        <Text style={styles.title}>ADDRESS</Text>
        <Text style={styles.text}>{venue.address}</Text>
        <Text style={styles.title}>CONTACT</Text>
        <Text style={styles.text}>{venue.contact}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.backWhite,
    alignItems: "flex-start",
    justifyContent: "flex-start",
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
    borderBottomWidth: 0.5,
    borderColor: "grey",
    width: width,
    backgroundColor: "white",
  },
});
