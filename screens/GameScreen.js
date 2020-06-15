import React, { useState, useRef, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return rndNum;
};

const GameScreen = (props) => {
  const { userChoice, onGameOver } = props;

  const [currentGuess, setCurrentGuses] = useState(
    generateRandomBetween(1, 100, userChoice)
  );
  const [rounds, setRounds] = useState(0);
  const lowerLimit = useRef(1);
  const upperLimit = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      Alert.alert("Congratulations!", "You got the magic number right.", {
        text: "Yeah",
        style: "cencel",
      });

      onGameOver(rounds);
    }

    console.log(lowerLimit.current, " - ", upperLimit.current);
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      upperLimit.current = currentGuess;
    } else if (direction === "greater") {
      lowerLimit.current = currentGuess;
    }

    const nextNumber = generateRandomBetween(
      lowerLimit.current,
      upperLimit.current,
      currentGuess
    );

    setCurrentGuses(nextNumber);
    setRounds((currentRounds) => currentRounds + 1);
  };
  return (
    <View style={styles.screen}>
      <BodyText>Opponent's Guess</BodyText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          LOWER
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
          GREATER
        </MainButton>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 10, alignItems: "center" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 400,
    maxWidth: "90%",
  },
});

export default GameScreen;
