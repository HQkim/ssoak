import { View } from "react-native";
import React, { useEffect, useState } from "react";
import Loading from "../Templates/loading";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "../Organisms/Navigation";
import { StyleSheet } from "react-native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
// import DetailContainer from "./detailContainer";

const loadingContainer = () => {
  const [isLoading, setIsLoading] = useState(true);

  // main 페이지의 api 연결되면 수정 예정
  useEffect(() => {
    setTimeout(function () {
      setIsLoading(true);
    }, 3000);
    setIsLoading(false);
  }, []);

  const Stack = createStackNavigator();

  // const CombinedStack = () => {
  //   return (
  //     <Stack.Navigator initialRouteName=""/>
  //   )
  // }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <NavigationContainer>
          <BottomTabs />
        </NavigationContainer>
      ) : (
        <Loading />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

export default loadingContainer;
