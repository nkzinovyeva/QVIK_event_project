import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import moment from "moment";
import AppHeader from "../components/header";
import { useSelector, useDispatch } from 'react-redux';
import { getRestaurants } from '../redux/actions';
import AppList from "../components/listItem";

export default function Screen({ navigation }) {

  //constants
  const { restaurants, filteredRests } = useSelector(state => state.eventsReducer);
  const dispatch = useDispatch();

  const fetchRestaurants = () => dispatch(getRestaurants());

  useEffect(() => {
    fetchRestaurants();
    console.log(restaurants);
  }, []);


  //header component 
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () =>
        <AppHeader
          tags={restaurants.allTags}
          img={require('../assets/restPic.jpg')}
          title="Late Bites"
          subTitle="@Helsinki region"
          leftButton={false}
          rightButton={false}
          clickableTag={true}
          rests={true}
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
        onPress={() => { navigation.navigate('Restaurant', item) }}
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
    <SafeAreaView >
      <FlatList
        data={filteredRests.restaurants && filteredRests.restaurants.length > 0 ? filteredRests.restaurants : restaurants.restaurants}
        renderItem={renderItem}
        keyExtractor={(item, index) => index + item}
      />
    </SafeAreaView>
  );
}