import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, View, SafeAreaView, Text } from 'react-native';
import Colors from "../constants/colors";
import { Icon } from 'react-native-elements';
import AppHeader from "../components/header";
import theme from '../constants/theme';

export default function RestDetails({ route, navigation }) {

    const restaurant = route.params;

    //header component 
    React.useLayoutEffect(() => {
        navigation.setOptions({
            header: () =>
                <AppHeader
                    item={restaurant}
                    tags={restaurant.allTags}
                    img={require('../assets/eventPic.jpg')}
                    title={restaurant.venue.name}
                    subTitle={restaurant.location}
                    leftButton={false}
                    rightButton={true}
                    navigation={navigation}
                    clickableTag={false}
                />,
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.tagContainer}>
                <View style={styles.tag}>
                    <Icon
                        name='compass'
                        type='ionicon'
                        color='white'
                    />
                    <Text style={styles.tagText}>{restaurant.location}</Text>
                </View>
            </View>
            <View style={styles.tagContainer}>
                <ScrollView
                    horizontal={true}>
                    <View style={styles.tag}>
                        <Icon
                            name='time'
                            type='ionicon'
                            color='white'
                        />
                        <Text style={styles.tagText}>Fri 10:00-22:00</Text>
                    </View>
                </ScrollView>
            </View>
            <ScrollView style={{ backgroundColor: 'white', width: '100%' }}
                showsHorizontalScrollIndicator={true}>
                <Text style={styles.title}>{restaurant.shortDescription.toUpperCase()}</Text>
                <Text style={styles.text}>{restaurant.fullDescription}</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backwhite,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: theme.fontSizes.detailsTitle,
        fontFamily: theme.fonts.fontFamily,
        margin: 16
    },
    text: {
        fontSize: theme.fontSizes.detailsText,
        fontFamily: theme.fonts.fontFamily,
        lineHeight: 30,
        margin: 16,
        marginTop: 0,
    },
    tagContainer: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: 'grey',
        width: '100%',
        backgroundColor: 'white'
    },
    tag: {
        flexDirection: 'row',
        backgroundColor: theme.colors.blueColor,
        alignItems: 'center',
        padding: 4,
        margin: 5,
        borderRadius: 16
    },
    tagText: {
        color: 'white',
        fontFamily: theme.fonts.fontFamily,
        fontSize: theme.fontSizes.tagText,
    }
});