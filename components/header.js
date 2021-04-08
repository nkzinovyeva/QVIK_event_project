import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import theme from '../constants/theme';
import CacheImage from './CacheImage';
import AppFilter from "../components/filter"
import MyIcon from './icons/index';
import { Platform } from 'react-native';

const { width } = Dimensions.get("screen");

/****
 * COMPONENT FOR THE HEADER
****/

export default AppHeader = (props) => {

  //constants
  const { title, subTitle, img, tags, navigation, clickableTag, item, rests } = props;

  //ordinary tag 
  const Tag = () => {
    if (Array.isArray(tags)) {
      return (
        tags.map((item, index) =>
          <View key={index + item} style={styles.tagContainer} >
            <View style={{ ...styles.tag, ...{ borderColor: theme.colors.whiteColor } }}>
              <MyIcon name={'check'} color={theme.colors.whiteColor} size={20} />
              <Text style={styles.tagText}>{item}</Text>
            </View>
          </View>
        )
      )
    } else {
      return (<Text style={styles.replacementText}></Text>)
    }
  }

  //clickable tag 
  return (
    <View style={styles.mainContainer}>
      {/* <Image source={img} style={styles.image} /> */}
      <CacheImage uri={img} style={styles.image} />
      <View style={styles.overlay}>
        <View style={styles.upperContainer}>

          {!props.leftButton
            ? <Text style={styles.replacementText}></Text>
            : <Icon
              name='chevron-back'
              type='ionicon'
              color='white'
              onPress={props.rightButton ? () => navigation.goBack() : {}}
            />
          }

          {!props.rightButton
            ? <Text style={styles.replacementText}></Text>
            : <Icon
              name='close'
              type='ionicon'
              color='white'
              onPress={props.rightButton ? () => navigation.popToTop() : {}}
            />
          }
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subTitle}</Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
          >
            {clickableTag
              ? <AppFilter tags={tags} rests={rests} />
              : <Tag />
            }
          </ScrollView>
        </View>
      </View>
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
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    //backgroundColor: 'rgba(50,50,50, 0.4)',
  },
  upperContainer: {
    justifyContent: 'space-between',
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: Platform.OS === 'android' ? 40 : 50
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
    flexDirection: 'row',
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