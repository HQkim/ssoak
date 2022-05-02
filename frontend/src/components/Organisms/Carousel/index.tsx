import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useRef, useState } from "react";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
type Props = {};

const index = ({ imageUrls, style }: any) => {
  const zoomableViewRef: any = useRef([]);

  return (
    <>
      {imageUrls.map((url, idx) => (
        <View style={style} key={idx}>
          <ReactNativeZoomableView
            bindToBorders={true}
            doubleTapZoomToCenter={true}
            maxZoom={1.5}
            ref={(element) => (zoomableViewRef.current[idx] = element)}
            onZoomEnd={() => zoomableViewRef.current[idx]!.zoomTo(1)}
            pinchToZoomInSensitivity={9}
            pinchToZoomOutSensitivity={9}
            zoomCenteringLevelDistance={1.5}
          >
            <Image
              source={{
                uri: url,
              }}
              resizeMode="contain"
              style={{ width: Dimensions.get("window").width / 1, flex: 1 }}
            />
          </ReactNativeZoomableView>
        </View>
      ))}
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
