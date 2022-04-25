import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Swing } from "react-native-animated-spinkit";
import * as Font from "expo-font";

const LogoImage = require("../../../assets/loading/loadingImg.jpg");

const loading = () => {
  const [font, setFont] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        DoHyeonRegular: require("../../../assets/fonts/DoHyeon-Regular.ttf"),
      });
      setFont(true);
    }
    loadFonts();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={LogoImage} style={styles.logoImg} />
      {font ? <Text style={styles.title}>내 손 안에 경매장</Text> : null}
      {font ? <Text style={styles.mainTitle}>쏙</Text> : null}
      <Swing color="#ffff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#719DD7",
    alignItems: "center",
  },
  logoImg: {
    width: 250,
    height: 250,
    borderRadius: 300,
    marginTop: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    color: "#ffff",
    fontFamily: "DoHyeonRegular",
  },
  mainTitle: {
    fontSize: 50,
    color: "#ffff",
    marginTop: 10,
    marginBottom: 70,
    fontFamily: "DoHyeonRegular",
  },
  swing: {
    color: "#ffff",
  },
});

export default loading;
