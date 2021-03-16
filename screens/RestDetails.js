import React from 'react';
import { ScrollView, StyleSheet, SafeAreaView, Text } from 'react-native';
import Colors from "../constants/colors";
import AppHeader from "../components/header";
import theme from '../constants/theme';
import ButtonTag from '../components/buttonTag';
import moment from "moment";

export default function RestDetails({ route, navigation }) {

    const restaurantId = route.params;

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
        <SafeAreaView style={styles.screen}>
            <ScrollView showsHorizontalScrollIndicator={true}>
                <ButtonTag
                    isButton={true}
                    name={'ios-location'}
                    data={restaurant.location}
                />
                <ButtonTag
                    isButton={false}
                    name={'time'}
                    data={moment(restaurant.openTime, "HH:mm:ss").format('HH:mm') + '-' + moment(restaurant.closeTime, "HH:mm:ss").format('HH:mm')}
                />
                <Text style={styles.title}>{restaurant.shortDescription.toUpperCase()}</Text>
                <Text style={styles.text}>{restaurant.fullDescription}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
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
    }
});