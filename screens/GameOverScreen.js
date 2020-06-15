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
          // source={require("../assets/images/game-over.png")} // loading a local image
          source={{
            uri:
              "https://cdn.pixabay.com/photo/2018/02/12/20/57/sky-3149114_960_720.jpg",
          }}
          style={styles.image}
          resizeMode="cover" /* 'cover' is a default value */
          fadeDuration={300}
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed{" "}
          <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
          guess the number{" "}
          <Text style={styles.highlight}>{props.userNumber}</Text>
        </BodyText>
      </View>

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
    borderColor: Colors.dark,
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%" },
  resultContainer: {
    margin: 20,
  },
  resultText: { textAlign: "center", fontSize: 20 },
  highlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
});

export default GameOverScreen;
