import { StyleSheet, Dimensions, View } from "react-native";
import React from "react";
import SkeletonContent from "react-native-skeleton-content";

type Props = {};

const DescriptionSkeleton = (props: Props) => {
  const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get("window");
  return (
    <View>
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
            width: ScreenHeight / 10,
            height: ScreenHeight / 50,
            marginLeft: Dimensions.get("window").height / 60,
            marginTop: Dimensions.get("window").height / 60,
            marginBottom: Dimensions.get("window").height / 200,
          },
          {
            width: ScreenWidth * 0.8,
            height: ScreenHeight / 30,
            marginLeft: Dimensions.get("window").height / 60,
            marginBottom: Dimensions.get("window").height / 200,
          },
          {
            width: ScreenWidth * 0.8,
            height: ScreenHeight / 50,
            marginLeft: Dimensions.get("window").height / 60,
            marginBottom: Dimensions.get("window").height / 200,
          },
        ]}
        isLoading={true}
      />
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
            width: ScreenWidth * 0.9,
            height: ScreenHeight / 10,
            marginLeft: Dimensions.get("window").height / 60,
            marginTop: Dimensions.get("window").height / 60,
            marginBottom: Dimensions.get("window").height / 200,
          },
          {
            width: ScreenWidth * 0.9,
            height: ScreenHeight / 10,
            marginLeft: Dimensions.get("window").height / 60,
            marginTop: Dimensions.get("window").height / 60,
            marginBottom: Dimensions.get("window").height / 200,
          },
        ]}
        isLoading={true}
      />
    </View>
  );
};

export default DescriptionSkeleton;

const styles = StyleSheet.create({});
