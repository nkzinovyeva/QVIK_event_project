import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import moment from "moment";
import AppHeader from "../components/header";
import { useSelector } from 'react-redux';
import AppList from "../components/listItem";

export default function RestsScreen({ navigation }) {

  //constants
  const { restaurants, filteredRests, setupData } = useSelector(state => state.eventsReducer);

  console.log('rests', restaurants)

  //header component 
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () =>
        <AppHeader
          tags={setupData.allRestaurantTags}
          //img={require('../assets/restPic.jpg')}
          img={{uri: setupData.restaurantImage}}
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
        onPress={() => { navigation.navigate('Restaurant', item.restaurantId) }}
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