import React from "react";
import { ListItem } from "react-native-elements";
import { StyleSheet, Dimensions } from "react-native";
import theme from "../constants/theme";
import AppFavButton from "./favButton";

const { width } = Dimensions.get("screen");

/****
 * COMPONENT FOR THE LIST
 ****/

export default AppList = (props) => {
  //constants
  const {
    leftIcon,
    iconColor,
    title,
    subtitle,
    rightTopSubtitle,
    rightBottomSubtitle,
    status,
    item,
  } = props;

  let chevronColor = theme.colors.grayColor;
  let starColor = iconColor;
  let statusNumber;

  //check the status of the item
  if (status == "active") {
    chevronColor = theme.colors.blueColor;
    statusNumber = 1;
  } else if (status == "passed") {
    starColor = theme.colors.grayColor;
    statusNumber = 2;
  } else if (status == "canceled") {
    starColor = theme.colors.grayColor;
    statusNumber = 3;
  } else if (status == "closed") {
    chevronColor = theme.colors.redColor;
    statusNumber = 4;
  }

  //rendering
  return (
    <ListItem bottomDivider>
      {leftIcon && <AppFavButton item={item} color={starColor} />}
      <ListItem.Content>
        <ListItem.Title
          style={[
            statusNumber == 1 ? styles.title : {},
            statusNumber == 2 ? styles.passedTitle : styles.title,
            statusNumber == 3 ? styles.canceledTitle : {},
          ]}
        >
          {title}
        </ListItem.Title>
        <ListItem.Subtitle
          style={[
            statusNumber == 1 ? styles.subtitle : {},
            statusNumber == 2 ? styles.passedSubtitle : styles.subtitle,
            statusNumber == 3 ? styles.canceledSubtitle : styles.subtitle,
          ]}
        >
          {status !== "canceled" ? subtitle : "The event is canceled"}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Content style={styles.rightContent}>
        <ListItem.Subtitle
          style={[
            statusNumber == 1 ? styles.rightSubtitle : {},
            statusNumber == 2
              ? styles.passedRightSubtitle
              : styles.rightSubtitle,
            statusNumber == 3 ? styles.canceledRightSubtitle : {},
            statusNumber == 4 ? styles.closedRightSubtitle : {},
          ]}
        >
          {rightTopSubtitle}
        </ListItem.Subtitle>
        <ListItem.Subtitle
          style={[
            statusNumber == 1 ? styles.rightSubtitle : {},
            statusNumber == 2
              ? styles.passedRightSubtitle
              : styles.rightSubtitle,
            statusNumber == 3 ? styles.canceledRightSubtitle : {},
            statusNumber == 4 ? styles.closedRightSubtitle : {},
          ]}
        >
          {rightBottomSubtitle}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron color={chevronColor} />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  title: {
    color: theme.colors.blackColor,
    fontSize: theme.fontSizes.listTitle,
    width: (width / 3) * 2,
  },
  passedTitle: {
    color: theme.colors.grayColor,
    fontSize: theme.fontSizes.listTitle,
  },
  canceledTitle: {
    color: theme.colors.grayColor,
    fontSize: theme.fontSizes.listTitle,
  },
  subtitle: {
    color: theme.colors.grayColor,
    fontSize: theme.fontSizes.listSubtitle,
    width: (width / 3) * 2,
  },
  passedSubtitle: {
    color: theme.colors.grayColor,
    fontSize: theme.fontSizes.listSubtitle,
  },
  canceledSubtitle: {
    color: theme.colors.redColor,
    fontSize: theme.fontSizes.listSubtitle,
  },
  rightContent: {
    alignItems: "flex-end",
  },
  rightSubtitle: {
    color: theme.colors.blueColor,
    fontSize: theme.fontSizes.listSubtitle,
  },
  passedRightSubtitle: {
    color: theme.colors.grayColor,
    fontSize: theme.fontSizes.listSubtitle,
  },
  canceledRightSubtitle: {
    color: theme.colors.grayColor,
    fontSize: theme.fontSizes.listSubtitle,
  },
  closedRightSubtitle: {
    color: theme.colors.redColor,
    fontSize: theme.fontSizes.listSubtitle,
  },
});
