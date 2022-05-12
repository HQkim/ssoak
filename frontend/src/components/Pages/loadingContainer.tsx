import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Loading from "../Templates/loading";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "../Organisms/Navigation";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { kakaoProfile } from "../../apis/auth";
import { get, getDatabase, ref, set } from "firebase/database";

const LoadingContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState();
  const [userAvatar, setUserAvatar] = useState();

  // main 페이지의 api 연결되면 수정 예정
  useEffect(() => {
    getProfile();
    setTimeout(function () {
      setIsLoading(true);
    }, 1000);
    setIsLoading(false);
  }, []);
  const findUser = async () => {
    const database = getDatabase();
    const mySnapshot = await get(ref(database, `users/${userId}`));
    return mySnapshot.val();
  };
  useEffect(() => {
    if (userId) {
      const loadFb = async () => {
        const database = getDatabase();
        const user = await findUser();
        if (!user) {
          const newUserObj = {
            userId: userId,
            avatar: userAvatar,
          };
          set(ref(database, `users/${userId}`), newUserObj);

          // set friends list change listener
          const myUserRef = ref(database, `users/${userId}`);
        }
      };
      try {
        loadFb();
      } catch (error) {
        console.error(error);
      }
    }
  }, [userId]);

  const getProfile = async () => {
    const token = await AsyncStorage.getItem(
      "accessToken",
      async (err, res: any) => {
        if (res) {
          await kakaoProfile().then((res) => {
            setUserAvatar(res.data.profileImageUrl);
            setUserId(res.data.seq);
          });
        }
      },
    );
  };

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

export default LoadingContainer;
