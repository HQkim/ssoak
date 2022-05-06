import { StyleSheet, Dimensions, View } from "react-native";
import React from "react";
import SkeletonContent from "react-native-skeleton-content";

const AuctionBidSkeleton = () => {
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
            width: ScreenWidth * 0.89,
            height: ScreenHeight / 15,
            marginLeft: Dimensions.get("window").height / 60,
            marginTop: Dimensions.get("window").height / 15,
            marginBottom: Dimensions.get("window").height / 30,
          },
          {
            width: ScreenWidth * 0.89,
            height: ScreenHeight / 20,
            marginLeft: Dimensions.get("window").height / 60,
            marginBottom: Dimensions.get("window").height / 200,
          },
          {
            width: ScreenWidth * 0.89,
            height: ScreenHeight / 30,
            marginLeft: Dimensions.get("window").height / 60,
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
            width: ScreenWidth * 0.89,
            height: ScreenHeight / 9,
            marginLeft: Dimensions.get("window").height / 60,
            marginTop: Dimensions.get("window").height / 120,
            marginBottom: Dimensions.get("window").height / 200,
          },
          {
            width: ScreenWidth * 0.89,
            height: ScreenHeight / 9,
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

export default AuctionBidSkeleton;

const styles = StyleSheet.create({});
