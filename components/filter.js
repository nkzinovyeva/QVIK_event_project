import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { filterByTag, filterRestsByTag } from '../redux/actions';
import theme from '../constants/theme';

export default AppFilter = (props) => {

    let {rests, tags} = props
    
    const { tag, events, parent, restsTags, restaurants } = useSelector(state => state.eventsReducer);
    const dispatch = useDispatch();
    
    const filter = (tag, eventsArray) => dispatch(filterByTag(tag, eventsArray));
    const restFilter = (tag, restaurantsArray) => dispatch(filterRestsByTag(tag, restaurantsArray));
    
    const handleAddTag = t => {
        if (rests) {
            let temp = JSON.parse(JSON.stringify(restaurants));
            restFilter([...restsTags, t], temp);
        }
        else {
            let temp = JSON.parse(JSON.stringify(events));
            filter([...tag, t], temp);
        }
    };

    const handleRemoveTag = t => {
        if (rests) {
            let temp = JSON.parse(JSON.stringify(restaurants));
            restFilter(restsTags.filter((tag) => tag !== t), temp);
        }
        else {
            let temp = JSON.parse(JSON.stringify(events));
            filter(tag.filter((tag) => tag !== t), temp);
        }
    };
    
    const ifExistsTag = t => {
        if (rests) {
            if (restsTags.filter(item => item === t).length > 0) {
                return true;
            }
            return false;
            }
        else {
            if (tag.filter(item => item === t).length > 0) {
                return true;
            }
            return false;
        }
    };
    
    const ifParentTag = t => {
        if (parent.tags.filter(tag => tag === t).length > 0) {
        return true;
        }
        return false;
    };

  //const ClickableTag = () => {
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
                borderColor: ifExistsTag(item) || ifParentTag(item) ? theme.colors.blueColor : theme.colors.whiteColor
              }
            }} >
              <Text style={styles.tagText}>{item}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    )
  }
//}


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