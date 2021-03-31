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

  //header component 
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () =>
        <AppHeader
          tags={setupData.allRestaurantTags}
          //img={require('../assets/restPic.jpg')}
          img={setupData.restaurantImage}
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
    var message = "";
    var status = "closed";

    if (item.closeTime > now && now > item.openTime) {
      status = "active";
      message = "Open till";
      time = moment(item.closeTime, "HH:mm:ss").format('LT');
    }
    else {
      //closed = false;
      message = "Closed till";
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
          rightTopSubtitle={message}
          rightBottomSubtitle={time}
          status={status}
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