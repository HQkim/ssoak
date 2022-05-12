import { StyleSheet, Text, View, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Main from "../Templates/main";
import { useSelector } from "react-redux";
import { RootState } from "../../store/modules";
import { useDispatch } from "react-redux";
import {
  dataFetchAsync,
  dataReset,
  dataFetchAsyncWithoutLoader,
  dataFetchFirstAsync,
} from "../../store/modules/mainLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  navigation: any;
  route: object;
};

const MainContainer = ({ navigation, route }: Props) => {
  const { isLoading, normalPageAvailable, livePageAvailable } = useSelector(
    (state: RootState) => state.mainLoader
  );
  const { item } = useSelector((state: RootState) => state.detail);

  // const data = useSelector((state: RootState) => state.mainLoader.data);

  const [normalPage, setNormalPage] = useState(1);
  const [livePage, setLivePage] = useState(1);
  const dispatch = useDispatch();

  const onRefresh = () => {
    dispatch(dataReset());
    dispatch(dataFetchFirstAsync());
    setNormalPage(2);
    setLivePage(2);
  };

  const onScrollLive = () => {
    if (livePageAvailable) {
      dispatch(
        dataFetchAsyncWithoutLoader({ keyword: "LIVE", page: livePage })
      );
      setLivePage(livePage + 1);
    }
  };

  const onScrollNormal = () => {
    if (normalPageAvailable) {
      dispatch(
        dataFetchAsyncWithoutLoader({ keyword: "NORMAL", page: normalPage })
      );
      setNormalPage(normalPage + 1);
    }
  };
  useEffect(() => {
    onRefresh();
  }, []);
  // navigation.addListener("focus", () => {
  //   console.log(item, "################");
  // });

  // navigation.addListener("blur", () => {
  //   dispatch(dataReset());
  // });

  // useEffect(() => {
  //   console.log(livePage, normalPage);
  // }, [livePage, normalPage]);

  const getToken = async () => {
    const token = await AsyncStorage.getItem("accessToken", (err, res) => {
      console.log(res);
    });
  };

  return (
    <Main
      onRefresh={onRefresh}
      navigation={navigation}
      onScrollLive={onScrollLive}
      onScrollNormal={onScrollNormal}
    />
  );
};

export default MainContainer;

const styles = StyleSheet.create({});
