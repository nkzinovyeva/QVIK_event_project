import React from 'react';
import { ScrollView, StyleSheet, SafeAreaView, Text } from 'react-native';
import Colors from "../constants/colors";
import AppHeader from "../components/header";
import theme from '../constants/theme';
import moment from "moment";
import { useSelector } from 'react-redux';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get("screen");

export default function PresenterDetails({ route, navigation }) {

    const { presenters, parent } = useSelector(state => state.eventsReducer);
    const presenterId = route.params;
    const presenter = presenters.filter((presenter) => presenter.presenterId === presenterId)[0];
  
    //header component 
    React.useLayoutEffect(() => {
        navigation.setOptions({
            header: () =>
                <AppHeader
                    item={presenter}
                    //tags={parent.tags}
                    img={require('../assets/presenterPic.jpg')}
                    title={presenter.name}
                    subTitle={presenter.contact}
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
                <ScrollView
                    style={styles.tagContainer}
                    horizontal={true}>
                    {presenter.events.map((item, index) =>
                        <ButtonTag
                            key={index + item}
                            isButton={true}
                            name={'attach-sharp'}
                            onPress={() => navigation.push("Event", item.eventId) }
                            data={`"${item.title}", ${moment(item.startDate).format("ddd")}, ${moment(item.startTime, "HH:mm:ss").format('LT')}`}
                        />
                    )}
                </ScrollView>
                <Text style={styles.title}>{presenter.shortDescription.toUpperCase()}</Text>
                <Text style={styles.text}>{presenter.fullDescription}</Text>
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
    },
    tagContainer: {
      //flexDirection: 'row',
      borderBottomWidth: 0.5,
      borderColor: 'grey',
      width: width,
      backgroundColor: 'white'
  }
});