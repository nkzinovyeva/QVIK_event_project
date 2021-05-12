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
import theme from "../constants/theme";
import AppTagButton from "../components/tagButton";
import { useSelector } from "react-redux";

const { width } = Dimensions.get("screen");

/****
 * SCREEN FOR THE SPECIFIC RESTAURANT
 ****/

export default function RestDetails({ route, navigation }) {
  //constants
  const { restaurants } = useSelector((state) => state.eventsReducer);
  const restaurantId = route.params;

  //get exact restaurant from the list of restaurants
  const restaurant = restaurants.restaurants.filter(
    (rest) => rest.restaurantId === restaurantId
  )[0];

  //constant for tags
  const tags = restaurant.allCuisines || [];

  //header component
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <AppHeader
          item={restaurant}
          tags={tags}
          title={restaurant.name}
          subTitle={restaurant.location}
          leftButton={true}
          rightButton={true}
          navigation={navigation}
          clickableTag={false}
        />
      ),
    });
  }, [navigation]);

  //rendering the restaurant details
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView showsHorizontalScrollIndicator={true}>
        <ScrollView style={styles.tagContainer} horizontal={true}>
          <AppTagButton
            isButton={true}
            name={"compass"}
            data={restaurant.location}
          />
        </ScrollView>
        <ScrollView style={styles.tagContainer} horizontal={true}>
          <AppTagButton
            isButton={false}
            name={"sharp"}
            data={
              moment(restaurant.openTime, "HH:mm:ss").format("HH:mm") +
              "-" +
              moment(restaurant.closeTime, "HH:mm:ss").format("HH:mm")
            }
          />
        </ScrollView>
        <Text style={styles.title}>
          {restaurant.shortDescription.toUpperCase()}
        </Text>
        <Text style={styles.text}>{restaurant.fullDescription}</Text>
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
