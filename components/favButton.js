import React from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from "../constants/colors";
import { useSelector, useDispatch } from 'react-redux';
import { addFavourite, removeFavourite } from '../redux/actions';


const AppFavButton = ({item, text, color}) => {

    const { favourites } = useSelector(state => state.eventsReducer);
    const dispatch = useDispatch();
    
    const addToFavouriteList = event => dispatch(addFavourite(event));

    const removeFromFavouriteList = event => dispatch(removeFavourite(event));

    const handleAddFavourite = event => {
        addToFavouriteList(event);
        Alert.alert("The event is saved in Favourites")
    };

    const handleRemoveFavourite = event => {
        removeFromFavouriteList(event);
        Alert.alert("The event is removed from Favourites")
    };

    const ifExists = event => {
        if (favourites.filter(item => item.eventId === event.eventId).length > 0) {
            return true;
        }
        return false;
    };

    return (
        <TouchableOpacity
            style={{ justifyContent: 'space-between', flexDirection: "row", }}
            onPress={() =>
                ifExists(item) ? handleRemoveFavourite(item) : handleAddFavourite(item)
            }
            >
            <Icon
                size={22}
                name={ifExists(item) ? 'star-sharp' : 'star-outline'}
                type='ionicon'
                color={color}
            />
            {text ? <Text style={{color: Colors.whiteColor, fontSize: 16, paddingTop: 4, paddingLeft: 5}}>{text}</Text> : null }
        </TouchableOpacity>
    )
    
}
export default AppFavButton;