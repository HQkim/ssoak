import { StyleSheet, Text, View, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Main from "../Templates/main";
import { useSelector } from "react-redux";
import { RootState } from "../../store/modules";
import { useDispatch } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import {
  dataFetchAsync,
  dataReset,
  dataFetchAsyncWithoutLoader,
} from "../../store/modules/mainLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  navigation: any;
  route: object;
};

const MainContainer = ({ navigation, route }: Props) => {
  const isLoading = useSelector(
    (state: RootState) => state.mainLoader.isLoading
  );

  // const data = useSelector((state: RootState) => state.mainLoader.data);

  const [normalPage, setNormalPage] = useState(1);
  const [livePage, setLivePage] = useState(1);
  const dispatch = useDispatch();

  const onRefresh = () => {
    dispatch(dataReset());
    dispatch(dataFetchAsync({ keyword: "LIVE", page: 1 }));
    dispatch(dataFetchAsync({ keyword: "NORMAL", page: 1 }));
    setNormalPage(2);
    setLivePage(2);
  };

  // const onScrollLive = (e) => {
  //   dispatch(dataFetchAsyncWithoutLoader({ keyword: "LIVE", page: livePage }));
  //   setLivePage(livePage + 1);
  // };

  // const onScrollNormal = () => {
  //   dispatch(
  //     dataFetchAsyncWithoutLoader({ keyword: "NORMAL", page: normalPage }),
  //   );
  //   setNormalPage(normalPage + 1);
  // };

  // useEffect(() => {
  //   return () => {
  //     onRefresh();
  //   };
  // }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      onRefresh();
    });
    return unsubscribe;
  }, [navigation]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     onRefresh();
  //   }, [])
  // );

  useEffect(() => {
    console.log(livePage, normalPage);
  }, [livePage, normalPage]);

  return (
    <Main
      onRefresh={() => onRefresh()}
      navigation={navigation}
      // onScrollLive={(e) => onScrollLive(e)}
      // onScrollNormal={(e) => onScrollNormal(e)}
    />
  );
};

export default MainContainer;

const styles = StyleSheet.create({});
