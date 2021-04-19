import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, SafeAreaView, Text } from 'react-native';
import moment from "moment";
import { useSelector } from 'react-redux';
import AppList from "../components/listItem";
import theme from '../constants/theme';

/****
 * SCREEN FOR THE FAVOURITE EVENTS
****/

export default function MyScheduleScreen({ navigation }) {

  //constants
  const { setupData, favourites } = useSelector(state => state.eventsReducer);

  //sorting the list of favourites
  favourites.sort((a, b) => {
    if (a.startDate === b.startDate) {
      if (a.startTime > b.startTime)
        return 1;
      else return -1;
    }
    else {
      if (a.startDate > b.startDate)
        return 1;
      else return -1;
    }
  }
  )

  //header component 
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () =>
        <AppHeader
          img={setupData.eventImage}
          //img={require('../assets/mainPic.jpg')}
          //img={{uri: setupData.eventImage}}
          title="My schedule"
          subTitle={setupData.title + ', ' + setupData.venue + ', ' + (moment(setupData.startDate).format("MMM Do") + " - " + moment(setupData.endDate).format("Do YYYY"))}
          leftButton={false}
          rightButton={false}
          clickableTag={false}
          tags={[]}
        />
    });
  }, [navigation]);

  //render the event
  const Event = ({ item }) => {

    //check the passed/future state of events
    let nowTime = moment().format('HH:mm:ss');
    let nowDate = moment().format('YYYY-MM-DD');

    var status = "active";
    if (item.active == false) {
      status = "canceled";
    }
    else if (item.startDate < nowDate || item.startDate == nowDate && item.startTime > nowTime) {
      status = "passed";
    }

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Event", item.eventId)}
      >
        <AppList
          leftIcon={true}
          iconColor={theme.colors.blackColor}
          title={item.title}
          subtitle={item.stage.name}
          rightTopSubtitle={moment(item.startDate, "YYYY-MM-DD").format('ll')}
          rightBottomSubtitle={moment(item.startTime, "HH:mm:ss").format('LT')}
          status={status}
          item={item}
        />
      </TouchableOpacity>
    );
  }

  //render the list of favourites
  return (
    <SafeAreaView style={styles.container}>
      {favourites.length === 0 ? (
        <Text style={styles.replacementText}>
          Add events to favourite list
        </Text>
      ) : (
        <FlatList
          data={favourites}
          keyExtractor={item => item.eventId.toString()}
          renderItem={({ item }) => <Event item={item} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backWhite,
    //paddingTop: StatusBar.currentHeight,
  },
  replacementText: {
    color: theme.colors.grayColor,
    fontSize: 18,
    alignSelf: "center",
    marginTop: 50
  }
}
);