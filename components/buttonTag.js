import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MyIcon from './icons/index';
import { Icon } from 'react-native-elements';
import theme from '../constants/theme';

export default ButtonTag = ( props ) => {

    const { subData, isButton, data, onPress, name } = props;

    return (
            <TouchableOpacity 
                onPress={onPress}
            >
                <View style={styles.tag}>
                    <MyIcon
                        name={name}
                        color={theme.colors.whiteColor}
                        size={24}
                    />
                    <Text style={styles.tagText}>{subData} {data}</Text>
                    {isButton && (
                        <Icon
                            name='chevron-forward'
                            type='ionicon'
                            color={theme.colors.whiteColor}
                            size={20}
                        />
                    )}
                </View>
            </TouchableOpacity>
    )
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
    },
});