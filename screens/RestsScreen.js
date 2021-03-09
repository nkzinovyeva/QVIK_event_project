import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, FlatList, SafeAreaView, TouchableOpacity, View, Dimensions } from 'react-native';
import Colors from "../constants/colors";
import moment from "moment";
import AppHeader from "../components/header";
import { useSelector, useDispatch } from 'react-redux';
import { getRestaurants } from '../redux/actions';
import AppList from "../components/listItem";

const { width } = Dimensions.get("screen");

export default function Screen({ navigation }) {

  //constants
  const { restaurants } = useSelector(state => state.eventsReducer);
  const dispatch = useDispatch();

  const fetchRestaurants = () => dispatch(getRestaurants());

  useEffect(() => {
    fetchRestaurants();
  }, []);

  let tags = ["Fine-dine", "Tag1", "Tag2", "Tag3", "Tag4", "Tag5", "Tag3", "Tag4", "Tag5"];

  //header component 
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () =>
        <AppHeader
          tags={tags}
          img={require('../assets/restPic.jpg')}
          title="Late Bites"
          subTitle="@Helsinki region"
          leftButton={false}
          rightButton={false}
          clickableTag={false}  
        />,
    });
  }, [navigation]);

  const renderItem = ({ item }) => {

    const now = moment().format('HH:mm:ss');
    
    var time = "";
    var status = "";
    var closed = "";

    if (item.closeTime > now && now > item.openTime) {
      closed = true;
      status = "Open till";
      time = moment(item.closeTime, "HH:mm:ss").format('LT');
    }
    else {
      closed = false;
      status = "Closed till";
      time = moment(item.openTime, "HH:mm:ss").format('LT');
    }

    return (

      <TouchableOpacity
        onPress={() => { }}
      >
        <AppList
          leftIcon={false}
          title={item.name}
          subtitle={`${item.location}, ${item.venue.name}`}
          rightTopSubtitle={status}
          rightBottomSubtitle={time}
          passed={!closed}
        />
      </TouchableOpacity>
    )

  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={{}}>
        <FlatList
          data={restaurants}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
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
    //justifyContent: "center",
    alignContent: "center",
    backgroundColor: 'white',
  },
});