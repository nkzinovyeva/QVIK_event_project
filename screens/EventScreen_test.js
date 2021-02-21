mport { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View,FlatList, Pressable, TouchableOpacity, Image, Dimensions, SafeAreaView, Text, SectionList  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
import {ListItem,} from 'react-native-elements';
import Colors from "../constants/colors";
import moment from "moment";

//get the width of the screen
const { width } = Dimensions.get("screen");

export default function EventsScreen({navigation}) {

  //constants
  const dataUrl = 'https://qvik.herokuapp.com/api/v1/events';
  const [mainEvent, setMainEvent] = useState({});
  const [allEvents, setAllEvents] = useState([]);
  const [sortedEvents, setSortedEvents] = useState([]);
  const [venue, setVenue] = useState('');

  //header component 
  const LogoTitle = () => {
    return (
        <View style={{alignItems: 'flex-start'}}>
          <Text style={{fontSize: 32,  fontFamily: 'System', color: Colors.whiteColor}}>{mainEvent.title}</Text>
          <Text style={{fontSize: 16,  fontFamily: 'System', color: Colors.whiteColor}}>{venue}, {moment(mainEvent.startDate).format("MMM Do")} - {moment(mainEvent.endDate).format("Do YYYY")}</Text>
        </View>
    );
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <LogoTitle/>,
      headerBackground: () => (
        <Image
          style={{ width: width, height: 150,}}
          source={require('../assets/mainPic.jpg')}
        />
      ),
    });
  }, [navigation]);
  

  //hooks
  useEffect(() => {
    getAllEvents();
    getSortedEvents(); // function to refactor the data with whe titles
  }, []);

  // get all events
  const getAllEvents = () => {
    const url = dataUrl;
    fetch(url)
    .then((response) => response.json())
    .then((jsondata) => {
        setAllEvents(jsondata.data.subEvents);
        setMainEvent(jsondata.data.parentEvent)
        setVenue(jsondata.data.parentEvent.eventVenues[0].venue.name)
      }
    )
    .catch((error) => { 
        Alert.alert('Error', error); 
    });
  };

  //****--------------------------****//
  // block for the refactoring data (get sorted by dates + title)

  async function makeSort(arr) {

    const groups = arr.reduce((groups, event) => {
      const date = event.startDate
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(event);
      return groups;
    }, {});

    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        events: groups[date]
      };
    });

    return groupArrays;

  }
  
  async function getSortedEvents() {
    console.log('Im here too')
    let result = await makeSort(allEvents);
    setSortedEvents(result); // 
   }

//***----------------------***//


// store data in Favourites || to be moved to functions
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

// remove data from Favorites || to be moved to functions
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
  } else {
    passed = true;
  }
    
  const [favourite, setFavourite] = useState(false)  // flag used for the star icon

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

  return ( // 'passed' should be '!passed' (to change after tests!)
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

//****--------------------------****//
// function to delay rendering

  const Delayed = ({ children, waitBeforeShow = 1000 }) => {
    const [isShown, setIsShown] = useState(false);
  
    useEffect(() => {
      setTimeout(() => {
        setIsShown(true);
      }, waitBeforeShow);
    }, [waitBeforeShow]);
  
    return isShown ? children : null;
  };

//****--------------------------****//

//return flatlist
  return (
      <SafeAreaView style={styles.screen}>
        <Delayed>
          <View style={{ }}>
            <FlatList 
                data={allEvents}
                keyExtractor={(item, index) => item + index} 
                renderItem={({item}) => <Event item={item}/>}
            />

            <SectionList
                sections={sortedEvents}
                keyExtractor={(item, index) => item + index}
                renderItem={({item}) => <Event item={item}/>}
                renderSectionHeader={({ section: { date } }) => (<Text>{date}</Text>)}
            />

          </View>
        </Delayed>
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
//****--------------------------****
DIFFERENT APROACH TO HAVE A TITLED LIST:

fetch ParentEvent -> calculate dates it lasts -> fetch data from API by dates

DATA sample = [
    {
      title: "date", (momentsjs to convert to dayweek)
      data: [event1,event2..]
    },
    ...
];

get dates:

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
  
  console.log(JSON.stringify(enumerateDaysBetweenDates(startDate, endDate)))

  for (let item of enumerateDaysBetweenDates(startDate, endDate)) {
    
  }

 ////** timeout for the rendering
  
const [show, setShow] = useState(false)

  useEffect(()=>{
    const timeout = setTimeout(() => {
      setShow(!show)
    }, 5000);
    return ()=> clearTimeout(timeout)
  },[show])


*/