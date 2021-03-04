import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, View, ImageBackground, FlatList, Pressable, TouchableOpacity, Image, Dimensions, SafeAreaView, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { ListItem, } from 'react-native-elements';
import Colors from "../constants/colors";
import moment from "moment";
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

/*
//possible to use external component:

  <View style={{ height: 150 }}>
        <ImageBackground source={require('../assets/mainPic.jpg')}
          style={styles.image}
        >
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Icon
              name='chevron-back'
              type='ionicon'
              color='white'
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={{ flex: 4, justifyContent: 'center', }}>
            <Text style={{ fontSize: 32, fontFamily: 'System', color: Colors.whiteColor, marginTop: 25 }}>{event.title}</Text>
            <Text style={{ fontSize: 16, fontFamily: 'System', color: Colors.whiteColor }}>{event.eventVenues[0].venue.name}, {moment(event.startDate).format("MMM Do")} - {moment(event.endDate).format("Do YYYY")}</Text>
            <View>
              <ScrollView style={{}}
                horizontal={true}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
              >
                <View style={styles.tag}>
                  <Text style={styles.tagText}>No smoking</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>No smoking</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>No smoking</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>No smoking</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>No smoking</Text>
                </View>
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
        </View>


        <StatusBar hidden={true} /> 
        <AppHeader 
            tags={tags}
            img={require('../assets/eventPic.jpg')}
            title={event.title} 
            subTitle={event.eventVenues[0].venue.name + ", " + moment(event.startDate).format("MMM Do") + "-" + moment(event.endDate).format("Do YYYY")}
            backButton={true}
            adminButton={true}
            navigation={navigation}
          />

 //React.useLayoutEffect(() => {
 //   navigation.setOptions({ 
   //   headerShown: false});
 // }, [navigation]);

        // //header component 
  // function LogoTitle() {
  //   return (
  //     <View style={{ alignItems: 'flex-start' }}>
  //       <Text style={{ fontSize: 32, fontFamily: 'System', color: Colors.whiteColor }}>{event.title}</Text>
  //       <Text style={{ fontSize: 16, fontFamily: 'System', color: Colors.whiteColor }}> {moment(event.startDate).format("MMM Do")} - {moment(event.endDate).format("Do YYYY")}</Text>
  //       <SafeAreaView style={styles.screen}>
  //         <ScrollView style={{}}
  //           horizontal={true}
  //           automaticallyAdjustContentInsets={true}>
  //           <View style={styles.tag}>
  //             <Text style={styles.tagText}>No smoking</Text>
  //           </View>
  //           <View style={styles.tag}>
  //             <Text style={styles.tagText}>No smoking</Text>
  //           </View>
  //           <View style={styles.tag}>
  //             <Text style={styles.tagText}>No smoking</Text>
  //           </View>
  //           <View style={styles.tag}>
  //             <Text style={styles.tagText}>No smoking</Text>
  //           </View>

  //         </ScrollView>
  //       </SafeAreaView>

  //     </View>
  //   );
  // }

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: <LogoTitle />,
  //     headerBackground: () => (
  //       <Image
  //         style={{ width: width, height: 150, }}
  //         source={require('../assets/mainPic.jpg')}
  //       />
  //     ),
  //     // headerRight: () => (
  //     //     <Pressable onPress={filter}>
  //     //         <Icon name='filter-variant' type='material-community' color='white' marginRight={20} />
  //     //     </Pressable>
  //     // ),
  //   });
  // }, 1000);
  */
