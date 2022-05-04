import { StyleSheet, Text, View, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Main from "../Templates/main";
import { useSelector } from "react-redux";
import { RootState } from "../../store/modules";
import { useDispatch } from "react-redux";
import { showLoaderAsync } from "../../store/modules/mainLoader";
import { withNavigation } from "react-navigation";

type Props = {
  navigation: any;
  route: object;
};

const MainContainer = ({ navigation, route }: Props) => {
  const isLoading = useSelector(
    (state: RootState) => state.mainLoader.isLoading
  );

  const dispatch = useDispatch();

  const onStartLoading = (state: boolean) => {
    dispatch(showLoaderAsync(state));
  };
  useEffect(() => {
    navigation.addListener("focus", () => {
      onStartLoading(false);
    });
  }, [navigation]);

  return (
    <Main onRefresh={() => onStartLoading(true)} navigation={navigation} />
  );
};

export default MainContainer;

const styles = StyleSheet.create({});
