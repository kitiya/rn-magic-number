import React, { useState, useRef, useEffect } from "react";
import { View, Alert, ScrollView, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";
import { Colors } from "react-native/Libraries/NewAppScreen";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return rndNum;
};

const renderListItem = (listLength, itemData) => (
  <View style={styles.renderListItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const GameScreen = (props) => {
  const { userChoice, onGameOver } = props;

  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuses] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const lowerLimit = useRef(1);
  const upperLimit = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      Alert.alert("Congratulations!", "You got the magic number right.", {
        text: "Yeah",
        style: "cencel",
      });

      onGameOver(pastGuesses.length);
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
      lowerLimit.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(
      lowerLimit.current,
      upperLimit.current,
      currentGuess
    );

    setCurrentGuses(nextNumber);
    setPastGuesses((currentPastGuesses) => [
      nextNumber.toString(),
      ...currentPastGuesses,
    ]);
  };
  return (
    <View style={styles.screen}>
      <BodyText>Opponent's Guess</BodyText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.renderListItemContainer}>
        {/* <ScrollView contentContainerStyle={styles.renderListItemWrapper}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView> */}

        <FlatList
          contentContainerStyle={styles.renderListItemWrapper}
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
        />
      </View>
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
  renderListItemContainer: {
    marginTop: 20,
    width: "60%",
    flex: 1,
  },
  renderListItemWrapper: {
    // alignItems: "center",
    justifyContent: "flex-end",
    flexGrow: 1,
  },
  renderListItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: Colors.dark,
    borderWidth: 1,
    backgroundColor: Colors.light,
  },
});

export default GameScreen;
