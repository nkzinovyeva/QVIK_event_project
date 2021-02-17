import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View,FlatList, Pressable, TouchableOpacity, Image, Dimensions, SafeAreaView  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
import {ListItem, Avatar} from 'react-native-elements';
import Colors from "../assets/constants/colors";

//get the width of the screen
const { width } = Dimensions.get("screen");

export default function EventsScreen({navigation}) {

  //constants
  const [allEvents, setAllEvents] = useState([]);
  
  useEffect(() => {
    getAllEvents();
  }, []);
  
  //header component
  React.useLayoutEffect(() => {
    navigation.setOptions({
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
    const url = 'https://qvik.herokuapp.com/api/v1/events';
    fetch(url)
    .then((response) => response.json())
    .then((jsondata) => { 
      setAllEvents(jsondata.data);
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
    alert("The event saved to Favourites")
  } catch (e) {
    alert("Error in saving data");
  }
}

// remove data
const removeData = async(key)=>{
  const keyStr = key.toString()
  try {
      await AsyncStorage.removeItem(keyStr);
      alert("Removed from Favourites")
    }
    catch (e) {
      alert("Error in removing data");
    }
};

//render the event
const Event = (props) => {

  const { id, title, location, date, duration } = props
  const [favourite, setFavourite] = useState(false)

  //handle saving/unsaving the event to Favourites 
  const handleFavouriteClick = () => {
    setFavourite(!favourite)
      if (favourite) {
        storeData(id, { id, title, location, date, duration, favourite});
      }
      else if (!favourite) {
        removeData(id)
      }
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Event details", id)
      }
    >
      <ListItem bottomDivider >
        <Icon 
          name={favourite ? 'star-outline' : 'star-sharp'}
          type='ionicon'
          onPress={handleFavouriteClick}
        /> 
        <ListItem.Content>
          <ListItem.Title>{title}</ListItem.Title>
          <ListItem.Subtitle>{location}</ListItem.Subtitle>
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
              //renderItem={({item}) => <Item item = {item}/>}
              renderItem={({item}) => (<Event id={item.event_id} title={item.shortDescription} location={item.category} date={item.startTime}duration='60 min'/>)}
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
    marginTop: 60,
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