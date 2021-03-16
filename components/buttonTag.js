import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import theme from '../constants/theme';

export default ButtonTag = ( props ) => {

    const { subData, isButton, data, onPress, name } = props;

    return (
        <View 
            style={styles.tagContainer} >
            <ScrollView
                horizontal={true}>
                <TouchableOpacity 
                    onPress={onPress}
                >
                    <View style={styles.tag}>
                        <Icon
                            name={name}
                            type='ionicon'
                            color='white'
                        />
                        <Text style={styles.tagText}> {subData} {data}</Text>
                        {isButton && (
                            <Icon
                                name='chevron-forward'
                                type='ionicon'
                                color='white'
                            />
                        )}
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
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
    tagContainer: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: 'grey',
        width: '100%',
        backgroundColor: 'white'
    }
});