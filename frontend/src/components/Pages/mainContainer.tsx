import { StyleSheet, Text, View, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Main from "../Templates/main";
import { useSelector } from "react-redux";
import { RootState } from "../../store/modules";
import { useDispatch } from "react-redux";
import { dataFetchAsync, dataReset } from "../../store/modules/mainLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  navigation: any;
  route: object;
};

const MainContainer = ({ navigation, route }: Props) => {
  const isLoading = useSelector(
    (state: RootState) => state.mainLoader.isLoading,
  );
  let prev;
  const data = useSelector((state: RootState) => state.mainLoader.data);

  const [normalPage, setNormalPage] = useState(1);
  const [livePage, setLivePage] = useState(1);
  const dispatch = useDispatch();

  const onStartLoading = () => {
    dispatch(dataFetchAsync({ keyword: "NORMAL", page: normalPage }));
    setTimeout(() => {
      dispatch(dataFetchAsync({ keyword: "LIVE", page: livePage }));
    }, 2000);
    setNormalPage(normalPage + 1);
    setLivePage(livePage + 1);
  };

  // useEffect(() => {
  //   navigation.addListener("focus", () => {
  //     onRefresh();
  //   });
  // }, [navigation]);

  const onRefresh = () => {
    dispatch(dataReset());
    dispatch(dataFetchAsync({ keyword: "LIVE", page: livePage }));
    setTimeout(() => {
      dispatch(dataFetchAsync({ keyword: "NORMAL", page: normalPage }));
    }, 2000);
  };

  const onScrollLive = () => {
    dispatch(dataFetchAsync({ keyword: "LIVE", page: livePage }));
    setLivePage(livePage + 1);
  };

  const onScrollNormal = () => {
    dispatch(dataFetchAsync({ keyword: "NORMAL", page: normalPage }));
    setNormalPage(normalPage + 1);
  };

  useEffect(() => {
    onStartLoading();
  }, []);

  return (
    <Main
      onRefresh={() => onRefresh()}
      navigation={navigation}
      onScrollLive={() => onScrollLive()}
      onScrollNormal={() => onScrollNormal()}
    />
  );
};

export default MainContainer;

const styles = StyleSheet.create({});
