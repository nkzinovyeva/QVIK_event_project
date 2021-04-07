import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { filterEventsByTag, filterRestsByTag } from '../redux/actions';
import theme from '../constants/theme';
import MyIcon from './icons/index';

/****
 * COMPONENT FOR THE FILTERING
****/

export default AppFilter = (props) => {

  //constants
  let {rests, tags} = props;
  const { eventTags, events, setupData, restsTags, restaurants } = useSelector(state => state.eventsReducer);
  const dispatch = useDispatch();
  
  const eventfilter = (tag, eventsArray) => dispatch(filterEventsByTag(tag, eventsArray));
  const restFilter = (tag, restaurantsArray) => dispatch(filterRestsByTag(tag, restaurantsArray));
  
  //adding the tag
  const handleAddTag = t => {
      if (rests) {
          let temp = JSON.parse(JSON.stringify(restaurants));
          restFilter([...restsTags, t], temp);
      }
      else {
          let temp = JSON.parse(JSON.stringify(events));
          eventfilter([...eventTags, t], temp);
      }
  };

  //removing the tag
  const handleRemoveTag = t => {
      if (rests) {
          let temp = JSON.parse(JSON.stringify(restaurants));
          restFilter(restsTags.filter((tag) => tag !== t), temp);
      }
      else {
          let temp = JSON.parse(JSON.stringify(events));
          eventfilter(eventTags.filter((tag) => tag !== t), temp);
      }
  };
  
  //check if the tag exists in the list of tags
  const ifExistsTag = t => {
      if (rests) {
          if (restsTags.filter(item => item === t).length > 0) {
              return true;
          }
          return false;
          }
      else {
          if (eventTags.filter(item => item === t).length > 0) {
              return true;
          }
          return false;
      }
  };
  
  //check if the event tag is a common for all events
  const ifParentTag = t => {
      if (setupData.eventTags.filter(tag => tag === t).length > 0) {
      return true;
      }
      return false;
  };

  //rendering
  return (
    tags.map((item, index) =>
      <TouchableOpacity
        key={index + item}
        onPress={() =>
          ifExistsTag(item) ? handleRemoveTag(item) : handleAddTag(item)
        } >
        <View style={styles.tagContainer} >
          <View style={{
            ...styles.tag,
            ...{
              backgroundColor: ifExistsTag(item) || ifParentTag(item) ? theme.colors.blueColor : null,
              borderColor: ifExistsTag(item) || ifParentTag(item) ? theme.colors.blueColor : theme.colors.whiteColor,
              flexDirection: 'row'
            }
          }} >
            {ifExistsTag(item) || ifParentTag(item)
              ? <MyIcon name={'check'} color={theme.colors.whiteColor} size={20}/> 
              : <Text></Text>
            }
            <Text style={styles.tagText}>{item}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  )
}


const styles = StyleSheet.create({
    tagContainer: {
      paddingTop: 20
    },
    tag: {
      padding: 4,
      margin: 8,
      borderRadius: 16,
      borderWidth: 1
    },
    tagText: {
      color: theme.colors.whiteColor,
      fontSize: theme.fontSizes.tagText
    },
  });