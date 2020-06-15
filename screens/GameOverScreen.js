import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";

import BodyText from "../components/BodyText";

import Colors from "../constants/colors";
import DefaultStyles from "../constants/default-styles";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.titleText}>CONGRATULATIONS!</Text>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/game-over.png")}
          style={styles.image}
          resizeMode="cover" /* default */
        />
      </View>
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
  imageContainer: {
    marginVertical: 20,
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: Colors.primary,
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%" },
});

export default GameOverScreen;
