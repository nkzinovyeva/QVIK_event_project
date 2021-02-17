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
      allEvents.forEach(item => {item.favourite = false})
      console.log(allEvents)
    })
    .catch((error) => { 
        Alert.alert('Error', error); 
    }); 
  };
  
// store data
const storeData = async (key, value) => {
  const keyStr = key.toString()
  console.log (key, value)
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(keyStr, jsonValue)
    alert("Data saved")
  } catch (e) {
    alert("Error in saving data");
  }
}

// remove data
const removeData = async(key)=>{
  const keyStr = key.toString()
  try {
      await AsyncStorage.removeItem(keyStr);
      alert("Removed")
    }
    catch (e) {
      alert("Error");
    }
    console.log('Done.')
};

//Render Items 
const Item = ({item}) => {

  //conditional rendering for the icon (doesnt work yet!!!!)
  const name = () => {
    if (item.favourite) {
      return 'star-sharp'
    } 
    return 'star-outline'
  }

  //function to save/unsave the item
  const handleFavouriteClick = () => {
    item.favourite = !item.favourite, 
    console.log(item.favourite)
      if (item.favourite) {
        console.log('Im ready to save')
        storeData(item.event_id, item);
      }
      else if (!item.favourite) {
      console.log('Im ready to unsave')
      removeData(item.event_id)
      }
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Event details", item.event_id)
      }
    >
      <ListItem bottomDivider >
        <Icon 
          //name={item.favourite ? 'star-sharp' : 'star-outline'}
          name={name()}
          type='ionicon'
          onPress={handleFavouriteClick}
        /> 
        <ListItem.Content>
          <ListItem.Title>{item.shortDescription}</ListItem.Title>
          <ListItem.Subtitle>{item.category}</ListItem.Subtitle>
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
              renderItem={({item}) => <Item item = {item}/>}
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