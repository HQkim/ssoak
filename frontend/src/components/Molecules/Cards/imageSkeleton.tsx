import { StyleSheet, Dimensions, View } from "react-native";
import React from "react";
import SkeletonContent from "react-native-skeleton-content";

type Props = {};

const ImageSkeleton = (props: Props) => {
  const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SkeletonContent
        containerStyle={{
          width: ScreenHeight / 3,
          alignItems: "center",
          justifyContent: "center",
        }}
        animationType="shiver"
        // animationDirection="horizontalLeft"
        layout={[
          {
            width: ScreenHeight / 1,
            height: ScreenHeight / 1,
          },
        ]}
        isLoading={true}
      />
    </View>
  );
};

export default ImageSkeleton;

const styles = StyleSheet.create({});
