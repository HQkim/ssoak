import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import SkeletonContent from "react-native-skeleton-content";

type Props = {};

const SliderSkeleton = (props: Props) => {
  const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");
  return (
    <SkeletonContent
      containerStyle={{
        flex: 1,
        width: ScreenHeight / 6,
        margin: 10,
      }}
      animationType="shiver"
      duration={2000}
      // animationDirection="horizontalLeft"
      layout={[
        {
          width: ScreenWidth * 0.89,
          height: ScreenHeight / 6,
          marginLeft: ScreenHeight / 60,
          marginTop: ScreenHeight / 60,
          marginBottom: ScreenHeight / 200,
        },
        {
          width: ScreenWidth * 0.89,
          height: ScreenHeight / 6,
          marginLeft: ScreenHeight / 60,
          marginTop: ScreenHeight / 60,
          marginBottom: ScreenHeight / 200,
        },
        {
          width: ScreenWidth * 0.89,
          height: ScreenHeight / 6,
          marginLeft: ScreenHeight / 60,
          marginTop: ScreenHeight / 60,
          marginBottom: ScreenHeight / 200,
        },
        {
          width: ScreenWidth * 0.89,
          height: ScreenHeight / 6,
          marginLeft: ScreenHeight / 60,
          marginTop: ScreenHeight / 60,
          marginBottom: ScreenHeight / 200,
        },
      ]}
      isLoading={true}
    />
  );
};

export default SliderSkeleton;

const styles = StyleSheet.create({});
