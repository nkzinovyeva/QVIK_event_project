import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import theme from '../constants/theme';

export default AppOfflineBar = ({timestamp}) => {

    return (
        <View style={styles.offlineContainer}>
          <View style={{ flexDirection: "row",}}>
            <Icon size={15} name={'exclamationcircle'} type={'antdesign'} color={theme.colors.blackColor}/>
            <Text style={styles.offlineText}>  Offline</Text>
          </View>
          <Text style={styles.offlineText}>Last Update {timestamp}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    offlineContainer: {
      flexDirection: "row",
      backgroundColor: theme.colors.lightgrayColor,
      justifyContent: "space-between", 
      padding: 16,
      borderBottomWidth: 0.5,
      borderColor: 'grey',
    },
    offlineText: {
      fontSize: theme.fontSizes.listSubtitle,
      color: theme.colors.blackColor,
      fontWeight: "600", 
    },
  }
  );