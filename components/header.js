import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ImageBackground, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from "../constants/colors";
import AppFavButton from "../components/favButton"

import { useSelector, useDispatch } from 'react-redux';
import { filterByTag } from '../redux/actions';

const { width } = Dimensions.get("screen");

export default AppHeader = (props) => {

  //console.log('header props', props)

  const { title, subTitle, img, tags, navigation, clickableTag, item } = props;

  //ordinary tag bar
  const Tag = () =>  {
    return (
      tags.map((item, index)=>
        <View key={index + item} style={{paddingTop: 20}} >
          <View style={styles.tag}>
            <Text style={styles.tagText}>#{item}</Text>
          </View>
        </View>
        )
      )
  }

  /*-----code-block for filtering with clickable tag bar -------------*/

  const { tag, events, parent } = useSelector(state => state.eventsReducer);
  const dispatch = useDispatch();

  const filter = (tag, eventsArray) => dispatch(filterByTag(tag, eventsArray));

  const handleAddTag = t => {
    let temp = JSON.parse(JSON.stringify(events));
    filter([...tag, t], temp);
  };

  const handleRemoveTag = t => {
    let temp = JSON.parse(JSON.stringify(events));
    filter(tag.filter((tag)=> tag !== t), temp);
  };

  const ifExistsTag = t => {
    if (tag.filter(item => item === t).length > 0) {
      return true;
    }
      return false;
  };

  const ifParentTag = t => {  
    if (parent.tags.filter(tag => tag === t).length > 0) {
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
            <View style={{paddingTop: 20}} >
              <View  style={{
                backgroundColor: ifExistsTag(item) || ifParentTag(item) ? Colors.blueColor : null, 
                borderColor: ifExistsTag(item) || ifParentTag(item) ? Colors.blueColor : Colors.whiteColor, 
                padding: 4, 
                margin: 8, 
                borderRadius: 16, 
                borderWidth: 1 }}
              >
                <Text style={{color: Colors.whiteColor, fontSize: 16}}>{item}</Text>
              </View>
            </View>
        </TouchableOpacity>
      )
    )
  }
  
  /*-----end of filtering with clickable tag bar ------- */

  
  return (
    <View style={{ height: 210 }}>
      <ImageBackground source={img} style={{ width: width, height: 210}}  >
          
        <View style={{ justifyContent: 'space-between', flexDirection: "row", paddingLeft: 10, paddingRight: 10, paddingTop: 50 }}>
          {!props.leftButton 
            ? <Text style={{ paddingTop: 10}}></Text>
            : <AppFavButton item={item} text="My Schedule" color={Colors.whiteColor} />
          }

          {!props.rightButton 
            ? <Text></Text>
            : <Icon
                  name='close'
                  type='ionicon'
                  color='white'
                  onPress={props.rightButton ? () => navigation.goBack() : {} }
                />
          }

        </View>

        <View style={{  justifyContent: 'center', flexDirection: "column", paddingTop: 10 }}>
          <Text style={{ fontSize: 32, fontFamily: 'System', color: Colors.whiteColor, marginLeft: 15 }}>{title}</Text>
          <Text style={{ fontSize: 16, fontFamily: 'System', color: Colors.whiteColor, marginLeft: 15 }}>{subTitle}</Text>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            >
              {clickableTag 
                ? <ClickableTag /> 
                : <Tag /> 
              } 
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
      //backgroundColor: Colors.blueColor,
      padding: 4,
      margin: 8,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: Colors.whiteColor,
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
});