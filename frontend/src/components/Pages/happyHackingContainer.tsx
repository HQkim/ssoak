import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HappyHacking from "./happyHacking";
import {
  increase,
  decreaseAsync,
  increaseByAsync,
} from "../../store/modules/counter";
import { useSelector } from "react-redux";
import { RootState } from "../../store/modules";
import { useDispatch } from "react-redux";

const happyHackingContainer = () => {
  const value = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(increase());
  };
  const onDecrease = () => {
    dispatch(decreaseAsync());
  };
  const onIncreaseBy = (diff: number) => {
    dispatch(increaseByAsync(diff));
  };

  return (
    <HappyHacking
      value={value}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onIncreaseBy={onIncreaseBy}
    />
  );
};

export default happyHackingContainer;

const styles = StyleSheet.create({});
