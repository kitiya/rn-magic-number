import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Alert,
  FlatList,
  Dimensions,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import { ScreenOrientation } from "expo";
// import * as ScreenOrientation from "expo-screen-orientation";

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
  const [availableDeviceHeight, setAvailaleDeviceHeight] = useState(
    Dimensions.get("window").height
  );
  const [availableDeviceWidth, setAvailaleDeviceWidth] = useState(
    Dimensions.get("window").width
  );
  const lowerLimit = useRef(1);
  const upperLimit = useRef(100);

  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  useEffect(() => {
    if (currentGuess === userChoice) {
      Alert.alert(
        "Congratulations!",
        "You got the magic number right.",
        [
          {
            text: "Yeah!",
            onPress: () => console.log("OK"),
            style: "cencel",
          },
        ],
        { cancelale: true }
      );

      onGameOver(pastGuesses.length);
    }

    console.log(lowerLimit.current, " - ", upperLimit.current);
  }, [currentGuess, userChoice, onGameOver]);

  useEffect(() => {
    const updateLayout = () => {
      setAvailaleDeviceHeight(Dimensions.get("window").height);
      setAvailaleDeviceWidth(Dimensions.get("window").width);
    };

    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  }, [Dimensions]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert(
        "Don't lie!",
        "You know that this is wrong...",
        [
          {
            text: "Sorry!",
            onPress: () => console.log("Don't lie!"),
            style: "cencel",
          },
        ],
        { cancelale: true }
      );
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

  let listContainerStyle = styles.renderListItemContainer;
  if (availableDeviceWidth < 350) {
    listContainerStyle = {
      ...listContainerStyle,
      ...styles.renderListItemContainerSM,
    };
  }

  let buttonContainerStyle = styles.buttonContainer;
  if (availableDeviceHeight < 600) {
    buttonContainerStyle = {
      ...buttonContainerStyle,
      ...styles.buttonContainerSM,
    };
  }

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <BodyText>Opponent's Guess</BodyText>

        <View style={styles.controls}>
          <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
        <View style={listContainerStyle}>
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
  }
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
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
  },
  buttonContainer: {
    // marginTop: Dimensions.get("window").height > 600 ? 20 : 10,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    width: 400,
    maxWidth: "90%",
  },
  buttonContainerSM: {
    marginTop: 10,
  },
  renderListItemContainer: {
    width: "60%",
    marginTop: 20,
    flex: 1,
  },
  renderListItemContainerSM: {
    width: "80%",
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
