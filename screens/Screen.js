import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Pressable, Image, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from "../assets/constants/colors";

const { width } = Dimensions.get("screen");

export default function Screen({navigation}) {
  
  //header component
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <Image
          style={{ width: width, height: 150,}}
          source={require('../assets/mainPic.jpg')}
          //source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/20150826_2130_MG_0302_c_Jussi_Hellsten.jpg/1920px-20150826_2130_MG_0302_c_Jussi_Hellsten.jpg'}}
        />
      ),
      headerRight: () => (
        <Pressable onPress={filter}>
          <Icon name='filter-variant' type='material-community' color ='white' marginRight={20}/>
        </Pressable>
      ),
    });
  }, [navigation]);

  const filter = () => {
  }

  return (
    <View style={styles.container}>
      <Text>this is the screen</Text>
      <StatusBar style="light" />
    </View>
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
});