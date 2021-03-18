import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View,FlatList, TouchableOpacity, SafeAreaView, Text  } from 'react-native';
import Colors from "../constants/colors";
import moment from "moment";
import { useSelector } from 'react-redux';
import AppList from "../components/listItem";
import theme from '../constants/theme';


export default function MyScheduleScreen({navigation}) {

  const { setupData, favourites } = useSelector(state => state.eventsReducer);

  favourites.sort((a, b) =>
    a.startDate > b.startDate || a.startTime > b.startTime
      ? 1
      : -1
  )

  //header component 
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => 
        <AppHeader 
          tags={setupData.allEventTags}
          //img={require('../assets/mainPic.jpg')}
          img={{uri: setupData.eventImage}}
          title="My schedule" 
          subTitle={setupData.venue + ', ' + (moment(setupData.startDate).format("MMM Do") +  " - " + moment(setupData.endDate).format("Do YYYY"))}
          leftButton={false}
          rightButton={false}
          clickableTag={false}
        />
    });
  }, [navigation]);

//render the event
  const Event = ({item}) => {

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
            navigation.navigate("Event", item )}
        >
        <AppList
            leftIcon={true}
            iconColor={Colors.blackColor}
            title={item.title}
            subtitle={item.stage.name}
            rightTopSubtitle={moment(item.startDate, "YYYY-MM-DD").format('ll')}
            rightBottomSubtitle={moment(item.startTime, "HH:mm:ss").format('LT')}
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
            <Text style={styles.replacementText}>
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
    backgroundColor: theme.colors.backWhite,
    paddingTop: StatusBar.currentHeight,
  },
  replacementText: {
    color: theme.colors.grayColor, 
    fontSize: 18, 
    alignSelf: "center", 
    marginTop: 50
  }
}
);