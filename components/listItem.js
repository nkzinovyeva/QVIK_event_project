import React from 'react';
import { ListItem } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import theme from '../constants/theme';
import AppFavButton from "../components/favButton"

export default AppList = (props) => {
    
    const { 
        leftIcon, 
        iconColor,
        title, 
        subtitle, 
        rightTopSubtitle, 
        rightBottomSubtitle, 
        passed,
        item } = props;

    return (
        <ListItem bottomDivider >
            {leftIcon && <AppFavButton item={item} color={iconColor} /> }
            <ListItem.Content>
                <ListItem.Title style={styles.title}>{title}</ListItem.Title>
                <ListItem.Subtitle style={styles.subtitle} >{subtitle}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Content style={styles.rightContent}>
                <ListItem.Subtitle style={{ fontSize: theme.fontSizes.listSubtitle, color: !passed ? theme.colors.blueColor : theme.colors.redColor}}>{rightTopSubtitle}</ListItem.Subtitle>
                <ListItem.Subtitle style={{ fontSize: theme.fontSizes.listSubtitle, color: !passed ? theme.colors.blueColor : theme.colors.redColor }}>{rightBottomSubtitle}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron
                color={!passed ? theme.colors.blueColor : theme.colors.redColor} />
        </ListItem>
    )

}

const styles = StyleSheet.create({
    title: {
        color: theme.colors.blackColor,
        fontSize: theme.fontSizes.listTitle
    },
    subtitle: {
        color: theme.colors.grayColor,
        fontSize: theme.fontSizes.listSubtitle
    },
    rightContent: {
        alignItems: 'flex-end'
    },
    // rightSubtitle: {
    //     fontSize: theme.fontSizes.listSubtitle,
    //     color: {color}
    // },

});