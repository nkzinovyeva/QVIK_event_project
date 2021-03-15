import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import Colors from "../constants/colors";
import AppHeader from "../components/header";
import theme from '../constants/theme';
import ButtonTag from '../components/buttonTag';
import moment from "moment";

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
                    title={restaurant.name}
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
                <ButtonTag
                    onPress={() => { console.log('I dont know what to do with that') }}
                    isButton={true}
                    icon='compass'
                    text={restaurant.location}
                />
            </View>
            <View style={styles.tagContainer}>
                <ScrollView
                    horizontal={true}>
                    <ButtonTag
                        isButton={false}
                        icon='time'
                        text={moment(restaurant.openTime, "HH:mm:ss").format('HH:mm') + '-' + moment(restaurant.closeTime, "HH:mm:ss").format('HH:mm')}
                    />
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
    }
});