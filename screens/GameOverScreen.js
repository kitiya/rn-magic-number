import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";

import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";

import Colors from "../constants/colors";
import DefaultStyles from "../constants/default-styles";

const GameOverScreen = (props) => {
  return (
    <ScrollView>
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

        <MainButton onPress={props.onRestart}>{"NEW GAME"}</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: 20,
    alignItems: "center",
    backgroundColor: Colors.light,
  },
  imageContainer: {
    // marginVertical: 20,
    // width: 300,
    // height: 300,
    // borderRadius: 150,
    marginTop: Dimensions.get("window").height * 0.03, // 3% of the device height
    width: Dimensions.get("window").width * 0.75,
    height: Dimensions.get("window").width * 0.75,
    borderRadius: (Dimensions.get("window").width * 0.75) / 2,
    borderWidth: 3,
    borderColor: Colors.dark,
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%" },
  resultContainer: {
    marginVertical: Dimensions.get("window").height * 0.03, // 3% of the device height
  },
  resultText: {
    textAlign: "center",
    //  fontSize: 20
    fontSize: Dimensions.get("window").height < 400 ? 16 : 20,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
});

export default GameOverScreen;
