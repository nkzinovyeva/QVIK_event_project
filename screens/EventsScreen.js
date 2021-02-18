import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View,FlatList, Pressable, TouchableOpacity, Image, Dimensions, SafeAreaView, Text  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
import {ListItem,} from 'react-native-elements';
import Colors from "../assets/constants/colors";
import moment from "moment";

//get the width of the screen
const { width } = Dimensions.get("screen");

export default function EventsScreen({navigation}) {

  //constants
  const [mainEvent, setMainEvent] = useState({});
  const [allEvents, setAllEvents] = useState([]);
  const dataUrl = 'https://qvik.herokuapp.com/api/v1/events';

  const [venue, setVenue] = useState('Suvialahti');
  //const venue = mainEvent.eventVenues[0].venue['name']

  useEffect(() => {
    getAllEvents();
  }, []);
  
  //header component 
  function LogoTitle() {
    return (
      <View style={{alignItems: 'flex-start'}}>
        <Text style={{fontSize: 32,  fontFamily: 'System', color: Colors.whiteColor}}>{mainEvent.title}</Text>
        <Text style={{fontSize: 16,  fontFamily: 'System', color: Colors.whiteColor}}>{venue}, {moment(mainEvent.startDate).format("MMM Do")} - {moment(mainEvent.endDate).format("Do YYYY")}</Text>
      </View>
    );
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: <LogoTitle />,
      headerBackground: () => (
        <Image
          style={{ width: width, height: 150,}}
          source={require('../assets/mainPic.jpg')}
        />
      ),
      headerRight: () => (
        <Pressable onPress={filter}>
          <Icon name='filter-variant' type='material-community' color ='white' marginRight={20}/>
        </Pressable>
      ),
    });
  }, 1000);

  //possible filtering function
  const filter = () => {
  }

  // get all events
  const getAllEvents = () => {
    const url = dataUrl;
    fetch(url)
    .then((response) => response.json())
    .then((jsondata) => {
      setMainEvent(jsondata.data.parentEvent)
      setAllEvents(jsondata.data.subEvents);  
      if (Object.keys(mainEvent).length === 0) {
        setMainEvent(jsondata.data.parentEvent)
      } 
    })
    .catch((error) => { 
        Alert.alert('Error', error); 
    });
  };


// store data in Favourites
const storeData = async (key, value) => {
  const keyStr = key.toString()
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(keyStr, jsonValue)
    Alert.alert("The event is saved in Favourites")
  } catch (e) {
    Alert.alert("Error in saving data");
  }
}

// remove data
const removeData = async(key)=>{
  const keyStr = key.toString()
  try {
      await AsyncStorage.removeItem(keyStr);
      Alert.alert("The event is removed from Favourites")
    }
    catch (e) {
      Alert.alert("Error in removing data");
    }
};


//render the event
const Event = ({item}) => {

  let nowTime = moment().format('HH:mm:ss');
  let nowDate = moment().format('YYYY-MM-DD');
  let time = moment(item.startTime, "HH:mm:ss").format('LT');
  let duration = moment(item.endTime, "HH:mm:ss").diff(moment(item.startTime, "HH:mm:ss"), 'minutes')
  let stage = item.eventStages[0].stage['name']
  let title = item.title
  let id = item.eventId
  
  var passed = "";

    if (item.startTime > nowTime && item.startDate > nowDate) {
      passed = false;
    }
    else {
      passed = true;
    }
    
  const [favourite, setFavourite] = useState(false) 

  //handle saving/unsaving the event to Favourites 
  const handleFavouriteClick = () => {
    setFavourite(!favourite)
      if (!favourite) {
        storeData(id, { id, title, stage, venue, time, duration, favourite });
      }
      else if (favourite) {
        removeData(id)
      }
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Event details", id) // TO PASS TO THE EVENT PAGE
      }
    >
      <ListItem bottomDivider >
        <Icon 
          name={!favourite ? 'star-outline' : 'star-sharp'}
          type='ionicon'
          onPress={handleFavouriteClick}
        /> 
        <ListItem.Content>
          <ListItem.Title>{title}</ListItem.Title>
          <ListItem.Subtitle>{stage}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content style={{ alignItems: 'flex-end', }}>
            <ListItem.Subtitle style={{ color: passed ? Colors.blueColor : Colors.blackColor }}>{time}</ListItem.Subtitle>
            <ListItem.Subtitle style={{ color: passed ? Colors.blueColor : Colors.blackColor }}>{duration} min</ListItem.Subtitle>
          </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  );
}

//return flatlist
  return (
      <SafeAreaView style={styles.screen}>
        <View style={{ }}>
          <FlatList 
              data={allEvents}
              keyExtractor={(item, index) => item + index} 
              renderItem={({item}) => <Event item={item}/>}
          />
        </View>
      </SafeAreaView> 
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backwhite,
    paddingTop: StatusBar.currentHeight,
  },
  
}
);
/*
preparation for sectionlist:

var startDate = mainEvent.startDate
  var endDate = mainEvent.endDate

  function enumerateDaysBetweenDates (startDate, endDate){
    let date = []
    while(moment(startDate) <= moment(endDate)){
      date.push(startDate);
      startDate = moment(startDate).add(1, 'days').format("YYYY-MM-DD");
    }
    return date;
  }
  
  console.log("print", JSON.stringify(enumerateDaysBetweenDates(startDate, endDate)))

  for (let item of enumerateDaysBetweenDates(startDate, endDate)) {
    const regex = /\>(.*?)\</
    stock[item.id] = item.DATAPAYLOAD.match(regex)[1];
  }


//marginHorizontal: 16
<SectionList
              sections={DATA}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => <Event 
              id={item.eventId} 
              title={item.title} 
              //location={item.eventStages[0].stage.name}
              date={item.startTime}
              duration='60 min'
            />}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.header}>{title}</Text>
              )}
          /> item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24
  },
  screen: {
    flex: 1,
    marginTop: 10,
    //justifyContent: "center",
    alignContent: "center",
    backgroundColor: 'white',
  }, 
          */
         /*
  const DATA = [
    {
      title: "Main dishes",
      data: allEvents
    },
    {
      title: "Sides",
      data: allEvents
    },
    {
      title: "Drinks",
      data: allEvents
    },
    {
      title: "Desserts",
      data: allEvents
    }
  ];
  
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  

 for (let item of data.response) {
  const regex = /\>(.*?)\</
  //const check = data.DATAPAYLOAD.
  stock[item.id.toLowerCase()] = item.DATAPAYLOAD.match(regex)[1];
}
*/