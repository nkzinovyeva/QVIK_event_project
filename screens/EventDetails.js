import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, View, Dimensions, SafeAreaView, Text } from 'react-native';
import Colors from "../constants/colors";

import AppHeader from "../components/header";

export default function EventDetailsScreen({ route, navigation }) {
  
  const { title, subTitle, tags, item } = route.params;

  //get the width of the screen
  const { width } = Dimensions.get("screen");

  const dataUrl = 'https://qvik.herokuapp.com/api/v1/events/' + route.params.id;
  const [event, setEvent] = useState('');

  useEffect(() => {
    getEvent();
  }, []);

  //header component 
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => 
        <AppHeader
          item={item}
          tags={tags}
          img={require('../assets/eventPic.jpg')}
          title={title} 
          subTitle={subTitle}
          leftButton={true}
          rightButton={true} 
          navigation={navigation}
          clickableTag={false}
        />,
    });
  }, [navigation]);

  const getEvent = () => {
    const url = dataUrl;
    fetch(url)
      .then((response) => response.json())
      .then((jsondata) => {
        setEvent(jsondata.data);
        //console.log(jsondata.data)
      })
      .catch((error) => {
        Alert.alert('Error', error);
      });
  };

  if (!event) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    )
  }
  else {
    return (
      <SafeAreaView style={styles.screen}>
          
        <View style={{}}>
          <ScrollView showsHorizontalScrollIndicator={true} >
            <Text style={{ fontSize: 24, padding: 16, lineHeight: 30, color: Colors.blueColor, backgroundColor: Colors.backwhite }}>{event.shortDescription}</Text>
            <Text style={{ fontSize: 16, padding: 16, lineHeight: 30, backgroundColor: Colors.backwhite }}>{event.fullDescription}</Text>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backwhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tag: {
    backgroundColor: '#007AFF',
    padding: 10,
    margin: 5,
    borderRadius: 16
  },
  tagText: {
    color: 'white',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    flexDirection: 'row',
  },
});