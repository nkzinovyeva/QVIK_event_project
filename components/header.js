import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from "../constants/colors";
import AppFavButton from "../components/favButton";
import AppFilter from "../components/filter"
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

  return (
    <View style={styles.mainContainer}>
      <Image source={img} style={styles.image} />

        <View style={styles.overlay} />
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
              ? <AppFilter tags={tags} rests={rests} />
              : <Tag />
            }
          </ScrollView>
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
    backgroundColor: 'rgba(50,50,50, 0.4)',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(50,50,50, 0.4)',
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