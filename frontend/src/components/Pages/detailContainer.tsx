// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   Dimensions,
//   ScrollView,
//   Image,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import Pagerview from "react-native-pager-view";
// import {
//   PinchGestureHandler,
//   PinchGestureHandlerGestureEvent,
//   State,
// } from "react-native-gesture-handler";
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   useAnimatedGestureHandler,
// } from "react-native-reanimated";

// type Props = {};

// const { height: ScreenHeight } = Dimensions.get("window");

// const DetailContainer = ({ route, navigation }: any) => {
//   useEffect(() => {
//     //data fetching
//     console.log(
//       "Current item id: " + route.params.id + " (needs data fetching!!)",
//     );
//   }, []);

//   const scale = useSharedValue(1);

//   const onZoomEvent =
//     useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
//       onActive: (event) => {
//         scale.value = event.scale;
//       },
//     });

//   const AnimatedImage = Animated.createAnimatedComponent(Image);

//   const AnimatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ scale: scale.value }],
//     };
//   });

//   return (
//     <SafeAreaView style={{ flex: 1, borderWidth: 0 }}>
//       <Pagerview style={styles.cardBox}>
//         <PinchGestureHandler>
//           <AnimatedImage
//             source={require("../../../assets/temp.jpg")}
//             style={[{ flex: 1 }, AnimatedStyle]}
//           />
//         </PinchGestureHandler>

//         <View style={styles.page} key="2">
//           <Text>Second page</Text>
//         </View>
//         <View style={styles.page} key="3">
//           <Text>Third page</Text>
//         </View>
//       </Pagerview>
//     </SafeAreaView>
//   );
// };

// export default DetailContainer;

// const styles = StyleSheet.create({
//   cardBox: {
//     height: ScreenHeight / 4,
//     backgroundColor: "#333333",
//   },
//   page: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
