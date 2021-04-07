import React from 'react';
import { Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { addFavourite, removeFavourite } from '../redux/actions';
import theme from '../constants/theme';

/****
 * COMPONENT FOR THE FAVOURITE BUTTON
****/

const AppFavButton = ({item, text, color, size}) => {

    //constants
    const { favourites } = useSelector(state => state.eventsReducer);
    const dispatch = useDispatch();
    
    //adding to favourite list
    const addToFavouriteList = event => dispatch(addFavourite(event));

    const handleAddFavourite = event => {
            addToFavouriteList(event);
            Alert.alert("The event is saved in Favourites")
        };
    
    //removing from favourite list
    const removeFromFavouriteList = event => dispatch(removeFavourite(event));

    const handleRemoveFavourite = event => {
        removeFromFavouriteList(event);
        Alert.alert("The event is removed from Favourites")
    };

    //check the existing event in favourite list
    const ifExists = event => {
        if (favourites.filter(item => item.eventId === event.eventId).length > 0) {
            return true;
        }
        return false;
    };

    //rendering
    return (
        <TouchableOpacity
            style={styles.mainContainer}
            onPress={() =>
                ifExists(item) ? handleRemoveFavourite(item) : handleAddFavourite(item)
            }
            >
            <Icon
                size={size ? size : 22}
                name={ifExists(item) ? 'star-sharp' : 'star-outline'}
                type='ionicon'
                color={color}
            />
            {text ? <Text style={styles.text}>{text}</Text> : null }
        </TouchableOpacity>
    )
    
}
export default AppFavButton;

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: "flex-start", 
        flexDirection: "row",
    },
    text: {
        color: theme.colors.blueColor, 
        fontSize: theme.fontSizes.headerSubtitle, 
        paddingTop: 4, 
        paddingLeft: 5
    },
});