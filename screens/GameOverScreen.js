import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import BodyText from "../components/BodyText";

import Colors from "../constants/colors";
import DefaultStyles from "../constants/default-styles";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.titleText}>CONGRATULATIONS!</Text>
      <BodyText>The magic number was: {props.userNumber}</BodyText>
      <BodyText>Number of rounds: {props.roundsNumber}</BodyText>
      <Button title="NEW GAME" onPress={props.onRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: Colors.light,
  },
});

export default GameOverScreen;
