import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  LayoutAnimation,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import Border from "../../Atoms/Borders/border";
import MoreButton from "../../Atoms/Buttons/moreButton";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get("window");

const AuctionDescription = ({ item }) => {
  const [showMore, setShowMore] = useState(false);
  const [showDivider, setShowDivier] = useState<boolean>(true);

  const navigation = useNavigation();
  const onTextLayout = useCallback((e) => {
    setShowDivier(e.nativeEvent.lines.length < 2);
  }, []);
  const handleMoreClick = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowMore(!showMore);
  };
  const onClickHeart = () => {
    console.warn("찜");
  };
  const onBid = () => {
    navigation.navigate("auction", {
      item: item,
    });
  };
  return (
    <View>
      <View style={styles.box}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{
              uri: item.user.profileImageUrl,
            }}
            style={styles.imgContainer}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontWeight: "100", marginBottom: 2 }}>판매자</Text>
            <Text style={styles.typography}>{item.user.name}</Text>
          </View>
        </View>
        <Ionicons
          name={"heart-outline"}
          size={ScreenWidth / 9}
          color={"#EA759A"}
          onPress={onClickHeart}
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.category}>
          <Text style={{ color: "#ffffff" }}>{item.category}</Text>
        </View>
      </View>
      <Border style={styles.border} />
      <View style={styles.box}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AntDesign
            name={"creditcard"}
            size={ScreenWidth / 18}
            style={{ marginRight: 5 }}
          />
          <Text style={styles.title}>시초가</Text>
        </View>

        <Text style={styles.title}>500,000원</Text>
      </View>
      <View style={styles.box}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AntDesign
            name={"creditcard"}
            size={ScreenWidth / 18}
            style={{ marginRight: 5 }}
          />
          <Text style={styles.title}>현재 입찰가</Text>
        </View>
        <Text style={styles.title}>550,000원</Text>
      </View>
      <Text
        style={styles.description}
        numberOfLines={showMore ? 100 : 4}
        onTextLayout={onTextLayout}
      >
        {item.description}
      </Text>
      {!showDivider && (
        <MoreButton
          handleMoreClick={handleMoreClick}
          style={styles.dividerContainer}
          showMore={showMore}
        />
      )}
      <View style={{ alignItems: "center", padding: ScreenHeight / 50 }}>
        <TouchableOpacity style={styles.buttonContainer} onPress={onBid}>
          <Text style={styles.textContainer}>입찰하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuctionDescription;

const styles = StyleSheet.create({
  description: {
    fontSize: ScreenWidth / 23,
    fontWeight: "200",
    marginTop: 25,
    marginLeft: ScreenWidth / 20,
    marginRight: ScreenWidth / 20,
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: ScreenWidth / 30,
    paddingLeft: ScreenWidth / 20,
    paddingRight: ScreenWidth / 20,
  },
  dividerContainer: {
    width: ScreenWidth / 1.1,
    alignSelf: "center",
  },
  title: {
    fontSize: ScreenWidth / 21,
    fontWeight: "300",
  },
  typography: {
    fontSize: ScreenWidth / 25,
    fontWeight: "300",
  },
  category: {
    width: ScreenWidth / 3.5,
    height: ScreenHeight / 20,
    backgroundColor: "#F8A33E",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  imgContainer: {
    width: ScreenWidth / 7,
    height: ScreenWidth / 7,
    borderRadius: 100,
  },
  border: {
    marginTop: ScreenWidth / 30,
    marginBottom: ScreenWidth / 50,
    borderBottomWidth: 1,
    width: ScreenWidth / 1.1,
    alignSelf: "center",
    borderColor: "#d7d4d4",
  },
  buttonContainer: {
    backgroundColor: "#0176B7",
    width: "100%",
    borderRadius: 5,
    height: ScreenHeight / 17,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    color: "#ffffff",
    fontWeight: "200",
    fontSize: ScreenHeight / 40,
  },
});
