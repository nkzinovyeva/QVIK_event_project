import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import theme from '../constants/theme';

export default ButtonTag = (props) => {

    const { onPress, icon, isButton, text } = props;

    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <View style={styles.tag}>
                <Icon
                    name={icon}
                    type='ionicon'
                    color='white'
                />
                <Text style={styles.tagText}>{text}</Text>
                {isButton && (
                    <Icon
                        name='chevron-forward'
                        type='ionicon'
                        color='white'
                    />
                )}
            </View>
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
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