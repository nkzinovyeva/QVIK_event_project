import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View,FlatList, Pressable, TouchableOpacity, Image, Dimensions, SafeAreaView, Text  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
import {ListItem, Avatar} from 'react-native-elements';
import Colors from "../assets/constants/colors";
import moment from "moment";

//get the width of the screen
const { width } = Dimensions.get("screen");

export default function EventsScreen({navigation}) {

  //constants
  const [mainEvent, setMainEvent] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const dataUrl = 'https://qvik.herokuapp.com/api/v1/events';
  
  useEffect(() => {
    getAllEvents();
  }, []);
  
  //header component

  function LogoTitle() {
    return (
      <View style={{alignSelf: "flex-start", alignItems: 'flex-start', fontFamily: 'System', color:"#FFFFFF"}}>
        <Text style={{fontSize: 32,  fontFamily: 'System', color:"#FFFFFF"}}>{mainEvent.title}</Text>
        <Text style={{fontSize: 16,  fontFamily: 'System', color:"#FFFFFF"}}>@Helsinki, {moment(mainEvent.startDate).format("MMM Do")} - {moment(mainEvent.endDate).format("Do YYYY")}</Text>
      </View>
    );
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: props => <LogoTitle {...props} />,
      headerBackground: () => (
        <Image
          style={{ width: width, height: 150,}}
          source={require('../assets/mainPic.jpg')}
          //source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/20150826_2130_MG_0302_c_Jussi_Hellsten.jpg/1920px-20150826_2130_MG_0302_c_Jussi_Hellsten.jpg'}}
        />
      ),
      headerRight: () => (
        <Pressable onPress={filter}>
          <Icon name='filter-variant' type='material-community' color ='white' marginRight={20}/>
        </Pressable>
      ),
    });
  }, [navigation]);

  //possible filtering function
  const filter = () => {
  }
  
  // get all events
  const getAllEvents = () => {
    const url = dataUrl;
    fetch(url)
    .then((response) => response.json())
    .then((jsondata) => { 
      setMainEvent(jsondata.data["Parent Event"]);
      setAllEvents(jsondata.data["Sub events"]);
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
const Event = (props) => {

  //const { id, title, location, date, duration } = props
  const [favourite, setFavourite] = useState(false)

  const venue = mainEvent.event_venues[0].venue.name

  //handle saving/unsaving the event to Favourites 
  const handleFavouriteClick = () => {
    setFavourite(!favourite)
      if (!favourite) {
        storeData(props.id, { props, venue, favourite });
      }
      else if (favourite) {
        removeData(props.id)
      }
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Event details", props.id)
      }
    >
      <ListItem bottomDivider >
        <Icon 
          name={!favourite ? 'star-outline' : 'star-sharp'}
          type='ionicon'
          onPress={handleFavouriteClick}
        /> 
        <ListItem.Content>
          <ListItem.Title>{props.title}</ListItem.Title>
          <ListItem.Subtitle>{venue}, {props.location}</ListItem.Subtitle>
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
              renderItem={({item}) => (
                <Event 
                  id={item.event_id} 
                  title={item.title} 
                  location={item.event_stages[0].stage.name}
                  date={item.startTime}
                  duration='60 min'
                />
              )}
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
  },
  screen: {
    flex: 1,
    marginTop: 10,
    //justifyContent: "center",
    alignContent: "center",
    backgroundColor: 'white',
  },
});

/*
React.useLayoutEffect(() => {
  navigation.setOptions({
    headerRight: () => (
      <Pressable onPress={filter}>
        <Icon name='sign-out-alt' type='font-awesome-5' color ='white' marginRight={20}/>
      </Pressable>
    ),
  });
}, [navigation]);
*/