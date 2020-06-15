import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>GAME OVER SCREEN</Text>
      <Text>Number of rounds: {props.roundsNumber}</Text>
      <Text>The magic number was: {props.userNumber}</Text>
      <Button title="NEW GAME" onPress={props.onRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center", backgroundColor: "orange" },
});

export default GameOverScreen;
