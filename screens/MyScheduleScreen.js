import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, StyleSheet, View,FlatList, TouchableOpacity, Image, Dimensions, SafeAreaView, Text  } from 'react-native';
import { Icon } from 'react-native-elements';
import {ListItem} from 'react-native-elements';
import Colors from "../constants/colors";
import moment from "moment";
import { useSelector, useDispatch } from 'react-redux';
import { removeFavourite } from '../redux/actions';
import AppList from "../components/listItem";

//get the width of the screen
const { width } = Dimensions.get("screen");

export default function MyScheduleScreen({navigation}) {

  const { parent, favourites } = useSelector(state => state.eventsReducer);

  favourites.sort((a, b) =>
    a.startDate > b.startDate
      ? 1
      : -1
  )

  //header component 
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => 
        <AppHeader 
          tags={parent.allTags}
          img={require('../assets/mainPic.jpg')}
          title="My schedule" 
          subTitle={parent.venue + ', ' + (moment(parent.startDate).format("MMM Do") +  " - " + moment(parent.endDate).format("Do YYYY"))}
          leftButton={false}
          rightButton={false}
          clickableTag={false}
        />
    });
  }, [navigation]);

//render the event
  const Event = ({item}) => {

    //variables to pass to the event-page
    let date = moment(item.startDate, "YYYY-MM-DD")
    let time = moment(item.startTime, "HH:mm:ss").format('LT');
    let duration = moment(item.endTime, "HH:mm:ss").diff(moment(item.startTime, "HH:mm:ss"), 'minutes')
    let venue = parent.venue
    let title = item.title
    let stage = item.stage
    let id = item.eventId
    let tags = [...item.tags, `Hosted by ${item.presenters}`, `${venue}, ${stage}`, item.inheritedTags ]


    //code-block to check the passed/future events
    let nowTime = moment().format('HH:mm:ss');
    let nowDate = moment().format('YYYY-MM-DD');
    var passed = "";
      if (item.startDate > nowDate || item.startTime > nowTime ) {
        passed = false;
      } else {
        passed = true;
      }
    return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Event", 
              { 
                id: id,
                title: title, 
                subTitle: `@${venue}, ${date.format('ddd')}, ${date.format("MMM Do")}, ${time}, ${duration} min`, 
                tags: tags,
                item: item
              }) // TO PASS TO THE EVENT PAGE
          }
        >
        <AppList
            leftIcon={true}
            iconColor={Colors.blackColor}
            title={title}
            subtitle={stage}
            rightTopSubtitle={date.format('ll')}
            rightBottomSubtitle={time}
            passed={passed}
            item={item}

          />
      </TouchableOpacity>
    );
  }

  //return flatlist
  return (
      <SafeAreaView style={styles.container}>
          <View style={{ }}>
          {favourites.length === 0 ? (
            <Text style={{ color: Colors.grayColor, fontSize: 18, alignSelf: "center", marginTop: 50 }}>
              Add events to favourite list
            </Text>
          ) : (
            <FlatList 
                data={favourites}
                keyExtractor={item => item.eventId.toString()} 
                renderItem={({item}) => <Event item={item}/>}
            />
            )}
          </View>
      </SafeAreaView> 
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backwhite,
    paddingTop: StatusBar.currentHeight,
  }, 
}
);