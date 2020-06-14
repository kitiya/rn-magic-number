import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";

const NumberContainer = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: Colors.primary,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    fontSize: 32,
    color: Colors.light,
    fontWeight: "bold",
  },
});

export default NumberContainer;
