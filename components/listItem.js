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
        status,
        item } = props;

    const getStatus = (status) => {
        if (status == "active") {
            return 1
        }
        else if (status == "passed") {
            return 2
        }
        else if (status == "canceled") {
            return 3
        }
        else if (status == "closed") {
            return 4
        }
    }
        
    return (
        <ListItem bottomDivider >
            {leftIcon && <AppFavButton item={item} color={iconColor} /> }
            <ListItem.Content>
                <ListItem.Title style={[
                    (getStatus(status) == 1) ? styles.title : {},
                    (getStatus(status) == 2) ? styles.passedTitle : styles.title,
                    (getStatus(status) == 3) ? styles.canceledTitle : {},
                    ]}>{title}</ListItem.Title>
                <ListItem.Subtitle style={[
                    (getStatus(status) == 1) ? styles.subtitle : {},
                    (getStatus(status) == 2) ? styles.passedSubtitle : styles.subtitle,
                    (getStatus(status) == 3) ? styles.canceledSubtitle : styles.subtitle,
                    ]} >{status !== "canceled" ? subtitle : 'The event is canceled'}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Content style={styles.rightContent}>
                <ListItem.Subtitle style={[
                    (getStatus(status) == 1) ? styles.rightSubtitle : {},
                    (getStatus(status) == 2) ? styles.passedRightSubtitle : styles.rightSubtitle,
                    (getStatus(status) == 3) ? styles.canceledRightSubtitle : {},
                    (getStatus(status) == 4) ? styles.closedRightSubtitle : {},
                    ]}>{rightTopSubtitle}</ListItem.Subtitle>
                <ListItem.Subtitle style={[
                    (getStatus(status) == 1) ? styles.rightSubtitle : {},
                    (getStatus(status) == 2) ? styles.passedRightSubtitle : styles.rightSubtitle,
                    (getStatus(status) == 3) ? styles.canceledRightSubtitle : {},
                    (getStatus(status) == 4) ? styles.closedRightSubtitle : {},
                    ]}>{rightBottomSubtitle}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron
                color={[
                    (getStatus(status) == 1) ? theme.colors.blueColor : {},
                    (getStatus(status) == 2) ? theme.colors.lightgrayColor : {},
                    (getStatus(status) == 3) ? theme.colors.lightgrayColor : {},
                    (getStatus(status) == 4) ? theme.colors.redColor : {},
                    ]} />
        </ListItem>
    )

}

const styles = StyleSheet.create({
    title: {
        color: theme.colors.blackColor,
        fontSize: theme.fontSizes.listTitle  
    },
    passedTitle: {
        color: theme.colors.grayColor,
        fontSize: theme.fontSizes.listTitle  
    },
    canceledTitle: {
        color: theme.colors.grayColor,
        fontSize: theme.fontSizes.listTitle  
    },
    subtitle: {
        color: theme.colors.grayColor,
        fontSize: theme.fontSizes.listSubtitle
    },
    passedSubtitle: {
        color: theme.colors.grayColor,
        fontSize: theme.fontSizes.listSubtitle
    },
    canceledSubtitle: {
        color: theme.colors.redColor,
        fontSize: theme.fontSizes.listSubtitle
    },
    rightContent: {
        alignItems: 'flex-end',
    },
    rightSubtitle: {
        color: theme.colors.blueColor,
        fontSize: theme.fontSizes.listSubtitle
    },
    passedRightSubtitle: {
        color: theme.colors.grayColor,
        fontSize: theme.fontSizes.listSubtitle
    },
    canceledRightSubtitle: {
        color: theme.colors.grayColor,
        fontSize: theme.fontSizes.listSubtitle
    },
    closedRightSubtitle: {
        color: theme.colors.redColor,
        fontSize: theme.fontSizes.listSubtitle
    },
});