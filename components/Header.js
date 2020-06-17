import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <TitleText style={styles.headerTitle}>{props.title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90 /* 90px */,
    paddingTop: 36,
    justifyContent: "center",
    alignItems: "center",

    ...Platform.select({
      ios: {
        backgroundColor: Colors.light,
        borderBottomColor: Colors.dark,
        borderBottomWidth: 1,
      },
      android: {
        backgroundColor: Colors.primary,
        borderBottomColor: "transparent",
        borderBottomWidth: 0,
      },
    }),
  },
  headerIOS: {
    backgroundColor: Colors.light,
    borderBottomColor: Colors.dark,
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
    borderBottomColor: "transparent",
    borderBottomWidth: 0,
  },
  headerTitle: {
    color: Platform.OS === "android" ? Colors.light : Colors.primary,
  },
});

export default Header;
