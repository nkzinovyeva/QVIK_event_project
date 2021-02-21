import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Text, View, Pressable, Image, Dimensions } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import Colors from "../constants/colors";
import moment from "moment";

const { width } = Dimensions.get("screen");

export default function Screen({ navigation }) {

  //constants
  const [restaurants, setRestaurants] = useState([]);
  const dataUrl = 'https://qvik.herokuapp.com/api/v1/restaurants';

  useEffect(() => {
    getRestaurants();
  }, []);

  //header component

  function LogoTitle() {
    return (
      <View style={{ alignSelf: "flex-start", alignItems: 'flex-start', fontFamily: 'System', color: "#FFFFFF" }}>
        <Text style={{ fontSize: 32, fontFamily: 'System', color: "#FFFFFF" }}>Late Bites</Text>
      </View>
    );
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: props => <LogoTitle {...props} />,
      headerBackground: () => (
        <Image
          style={{ width: width, height: 150, }}
          source={require('../assets/restPic.jpg')}
        //source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/20150826_2130_MG_0302_c_Jussi_Hellsten.jpg/1920px-20150826_2130_MG_0302_c_Jussi_Hellsten.jpg'}}
        />
      ),
      headerRight: () => (
        <Pressable onPress={filter}>
          <Icon name='filter-variant' type='material-community' color='white' marginRight={20} />
        </Pressable>
      ),
    });
  }, [navigation]);

  const filter = () => {
  }

  //get restaurants
  const getRestaurants = () => {
    fetch(dataUrl)
      .then((response) => response.json())
      .then((jsondata) => {
        setRestaurants(jsondata.data);
      })
      .catch((error) => {
        Alert.alert('Error', error);
      });
  }

  const renderItem = ({ item }) => {

    //const now = moment().format('HH:mm:ss');
    const now = "20:00:00";

    var time = "";
    var status = "";
    var closed = "";

    if (item.closeTime > now && now > item.openTime) {
      closed = false;
      status = "Open till";
      time = moment(item.closeTime, "HH:mm:ss").format('LT');
    }
    else {
      closed = true;
      status = "Closed till";
      time = moment(item.openTime, "HH:mm:ss").format('LT');
    }

    return (
      <TouchableOpacity
        onPress={() => { }}
      >
        <ListItem bottomDivider >
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.location}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Content style={{ alignItems: 'flex-end', }}>
            <ListItem.Subtitle style={{ color: closed ? "red" : "#007AFF" }}>{status}</ListItem.Subtitle>
            <ListItem.Subtitle style={{ color: closed ? "red" : "#007AFF" }}>{time}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron
            color={closed ? "red" : "#007AFF"} />
        </ListItem>
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
    marginTop: 10,
    //justifyContent: "center",
    alignContent: "center",
    backgroundColor: 'white',
  },
});