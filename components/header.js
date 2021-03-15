import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ImageBackground, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from "../constants/colors";
import AppFavButton from "../components/favButton";
import { useSelector, useDispatch } from 'react-redux';
import { filterByTag, filterRestsByTag } from '../redux/actions';
import theme from '../constants/theme';

const { width } = Dimensions.get("screen");

export default AppHeader = (props) => {

  //console.log('header props', props)

  const { title, subTitle, img, tags, navigation, clickableTag, item, rests } = props;

  //ordinary tag bar
  const Tag = () => {
    return (
      tags.map((item, index) =>
        <View key={index + item} style={styles.tagContainer} >
          <View style={{ ...styles.tag, ...{ borderColor: theme.colors.whiteColor } }}>
            <Text style={styles.tagText}>#{item}</Text>
          </View>
        </View>
      )
    )
  }

  /*-----code-block for filtering with clickable tag bar -------------*/

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

  const ClickableTag = () => {
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

  /*-----end of filtering with clickable tag bar ------- */


  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={img} style={styles.image} >

        <View style={styles.upperContainer}>
          {!props.leftButton
            ? <Text style={styles.replacementText}></Text>
            : <AppFavButton item={item} text="My Schedule" color={Colors.whiteColor} />
          }

          {!props.rightButton
            ? <Text style={styles.replacementText}></Text>
            : <Icon
              name='close'
              type='ionicon'
              color='white'
              onPress={props.rightButton ? () => navigation.goBack() : {}}
            />
          }

        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subTitle}</Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
          //contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
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
  mainContainer: {
    height: 210,
    paddingTop: StatusBar.currentHeight,
  },
  image: {
    width: width,
    height: 210,
  },
  upperContainer: {
    justifyContent: 'space-between',
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 50,
  },
  textContainer: {
    justifyContent: 'center',
    flexDirection: "column",
    paddingTop: 10,
  },
  title: {
    color: theme.colors.whiteColor,
    fontSize: theme.fontSizes.headerTitle,
    marginLeft: 15
  },
  subtitle: {
    color: theme.colors.whiteColor,
    fontSize: theme.fontSizes.headerSubtitle,
    marginLeft: 15
  },
  replacementText: {
    paddingTop: 10
  },
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