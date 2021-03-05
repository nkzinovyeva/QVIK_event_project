import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ImageBackground, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from "../constants/colors";

import { useSelector, useDispatch } from 'react-redux';
import { addFavourite, removeFavourite, addTag, removeTag, filterEvents } from '../redux/actions';

const { width } = Dimensions.get("screen");

export default AppHeader = (props) => {

  //console.log('header props', props)

  const { title, subTitle, img, tags, navigation, clickableTag, item } = props;

  //ordinary tag bar
  const Tag = () =>  {
    return (
      tags.map((item, index)=> 
          <View key={index + item} style={styles.tag}>
            <Text style={styles.tagText}>{item}</Text>
          </View>)
      )
  }

  /*-----code-block for the clickable tag bar-------------*/

  const { tag, favourites,events } = useSelector(state => state.eventsReducer);
  const dispatch = useDispatch();

  const filter = (events, tag) => dispatch(filterEvents(events, tag));

  const addTheTag = tag => dispatch(addTag(tag));
  const removeTheTag = tag => dispatch(removeTag(tag));

  const handleAddTag = t => {
    addTheTag(t);
    //Here with the logs you can see that the first time you press a tag
    //The events are normal but the tags are empty

    //If you press another tag events are modified like filteredEvents and tags are the same
    //That what you pass in the filter function below
    console.log("---------EVENTS-----------");
    console.log(events);
    console.log("---------TAGS-----------");
    console.log(tag);
    //Here it works once and only if its hard coded
    //filter(events, ["Child-friendly","Online event"]);

    //Here the tag array is empty for some reason
    //filter(events, tag);
    
    //Here it works but only with one tag
    filter(events, [t]);
  };

  const handleRemoveTag = t => {
    removeTheTag(t);
    filter(events, tag);
  };

  const ifExistsTag = t => {
    if (tag.filter(tag => tag === t).length > 0) {
      return true;
    }
      return false;
  };

  const ClickableTag = () =>  {
    return (
      tags.map((item, index)=> 
      <TouchableOpacity
          key={index + item}
          onPress={() =>
            ifExistsTag(item) ? handleRemoveTag(item) : handleAddTag(item)
          } >
          <View  style={{backgroundColor: ifExistsTag(item) ? Colors.blueColor : null, padding: 4, margin: 8, borderRadius: 16, borderColor:  ifExistsTag(item) ? Colors.blueColor : Colors.whiteColor, borderWidth: 1.5 }}>
            <Text style={{color: Colors.whiteColor, fontSize: 16}}>{item}</Text>
          </View></TouchableOpacity>)
      )
  }
  
  /*-----end of clickable tag------- */

  /*-----code-block for handling favourites-------- NEED TO BE REFACTORED!!! -----*/

  const addToFavouriteList = event => dispatch(addFavourite(event));
  const removeFromFavouriteList = event => dispatch(removeFavourite(event));

  const handleAddFavourite = event => {
    addToFavouriteList(event);
    Alert.alert("The event is saved in Favourites")
  };

  const handleRemoveFavourite = event => {
    removeFromFavouriteList(event);
    Alert.alert("The event is removed from Favourites")
  };

  const ifExists = event => {
    if (favourites.filter(item => item.eventId === event.eventId).length > 0) {
      return true;
    }
      return false;
  };

  const FavButton = () => {
    return (
      <TouchableOpacity
        style={{ justifyContent: 'space-between', flexDirection: "row", }}
          onPress={() =>
            ifExists(item) ? handleRemoveFavourite(item) : handleAddFavourite(item)
          }
        >
          <Icon
            size={22}
            name={ifExists(item) ? 'star-sharp' : 'star-outline'}
            type='ionicon'
            color={Colors.whiteColor}
          />
          <Text style={{color: Colors.whiteColor, fontSize: 16, paddingTop: 4, paddingLeft: 5}}>My Schedule</Text>
        </TouchableOpacity>
    )
  } 

  return (
    <View style={{ height: 185 }}>
      <ImageBackground source={img} style={{ width: width, height: 185}}  >
          
        <View style={{ justifyContent: 'space-between', flexDirection: "row", paddingLeft: 10, paddingRight: 10, paddingTop: 50 }}>
          {!props.leftButton ? (<Text></Text> ) 
          : ( <FavButton />
          )}
          {!props.rightButton ? (<Text></Text> ) 
          : ( <Icon
                name='close'
                type='ionicon'
                color='white'
                onPress={props.rightButton ? () => navigation.goBack() : {} }
              />
          )}
        </View>

        <View style={{ flex: 4, justifyContent: 'center', flexDirection: "column" }}>
          <Text style={{ fontSize: 32, fontFamily: 'System', color: Colors.whiteColor, marginLeft: 15 }}>{title}</Text>
          <Text style={{ fontSize: 16, fontFamily: 'System', color: Colors.whiteColor, marginLeft: 15 }}>{subTitle}</Text>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            >
            {clickableTag ? <ClickableTag/> : <Tag /> } 
            </ScrollView>
        </View>

      </ImageBackground>
  </View>
  )
} 

 const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.backwhite,
      paddingTop: StatusBar.currentHeight,
    }, 
    tag: {
      backgroundColor: Colors.blueColor,
      padding: 6,
      margin: 8,
      borderRadius: 16,
    },
    tagText: {
      color: Colors.whiteColor,
      fontSize: 16
    },
    image: {
      flex: 1,
      width: width,
      height: 160,
      resizeMode: "cover",
      paddingTop: 10,
    },
  }
  );


  /* how to use: 

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false});
  }, [navigation]);


    let tags = ["No smoking", "No smoking", "No smoking", "No smoking", "No smoking", "No smoking"];

        <AppHeader 
          tags={tags}
          img={null}
          title={events.parentEvent.title} 
          subTitle={events.parentEvent.eventVenues[0].venue.name + ', ' + (moment(events.parentEvent.startDate).format("MMM Do") +  " - " + moment(events.parentEvent.endDate).format("Do YYYY"))}
          backButton={false}
          adminButton={true}
        />
  */