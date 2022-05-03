import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  LayoutAnimation,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useState } from "react";
import MoreButton from "../../Atoms/Buttons/moreButton";
import CountDown from "../../Atoms/Typographies/countDown";
import GeneralButton from "../../Atoms/Buttons/generalButton";
import NumberFormat from "react-number-format";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
type Props = {};

const index = ({ item, descStyle, titleStyle }) => {
  const [showMore, setShowMore] = useState(false);
  const [showDivider, setShowDivier] = useState<boolean>(true);
  const [currentCost, setCurrentCost] = useState<string>("15000");
  const [bidRightNow, setBidRightNow] = useState<string>("15000");
  const [bidAssignValue, setBidAssignValue] = useState<string>("15000");

  const navigation = useNavigation();
  const handleMoreClick = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowMore(!showMore);
  };

  const onHandleChatOpen = () => {
    navigation.navigate("auctionChat", {
      id: item.id,
    });
  };

  const handleOnchangebidRightNow = (e: any) => {
    setBidRightNow(e.nativeEvent.text);
  };

  const handleOnchangebidAssignValue = (e: any) => {
    setBidAssignValue(e.nativeEvent.text);
  };

  const onTextLayout = useCallback((e) => {
    setShowDivier(e.nativeEvent.lines.length < 2);
  }, []);

  const handlebidRightNow = () => {
    Alert.alert("왜 눌렀슈?" + bidRightNow);
  };

  const handlebidAssignValue = () => {
    Alert.alert("이건 또 왜 눌렀슈?" + bidAssignValue);
  };
  return (
    <View style={{ paddingBottom: Dimensions.get("window").height / 20 }}>
      <Text style={styles.type}>
        {item.type === "normal" ? "일반 경매" : "실시간 경매"}
      </Text>
      <Text style={titleStyle} numberOfLines={2}>
        {item.title}
      </Text>
      <View style={styles.badges}>
        <Text style={styles.typography}>{item.user.name}</Text>
        <Text style={styles.typography}>
          최소 입찰가 :{" "}
          {item.minbid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
        </Text>
      </View>
      <View
        style={{
          ...styles.divider,
          ...styles.dividerContainer,
        }}
      />
      <Text
        style={descStyle}
        numberOfLines={showMore ? 100 : 2}
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
      <View style={styles.itemInformationContainer}>
        <Text style={styles.information}>종료까지 남은 시간 : </Text>
        <CountDown style={styles.information} />
      </View>
      <View style={styles.itemInformationContainer}>
        <Text style={styles.information}>현재 입찰가 : </Text>
        <TextInput
          editable={false}
          maxLength={15}
          value={currentCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          style={styles.textArea}
          textAlign="center"
        />
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 0.2 }} />
        </View>
      </View>
      <View
        style={{
          ...styles.divider,
          ...styles.dividerContainer,
        }}
      />
      <View style={styles.itemInformationContainer}>
        <Text style={styles.information}>즉시 입찰가 : </Text>
        <TextInput
          editable={false}
          maxLength={15}
          value={""}
          style={styles.textArea}
          textAlign="center"
          editable={false}
          keyboardType="numeric"
          onChange={handleOnchangebidRightNow}
        >
          <NumberFormat
            value={bidRightNow}
            thousandSeparator={true}
            displayType={"text"}
            renderText={(value: number, props: any) => <Text>{value}</Text>}
            onValueChange={(values) => {
              const { formattedValue, value } = values;
              setBidRightNow(value);
            }}
          />
        </TextInput>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 0.1 }} />
          <GeneralButton
            styles={{ box: styles.bidButton, text: styles.bidText }}
            text={"즉시입찰"}
            onPress={handlebidRightNow}
          >
            <AntDesign
              name="upcircleo"
              size={18}
              color="white"
              style={{ marginRight: 10 }}
            />
          </GeneralButton>
        </View>
      </View>
      <View style={styles.itemInformationContainer}>
        <Text style={styles.information}>지정 입찰가 : </Text>
        <TextInput
          editable={false}
          maxLength={15}
          value={""}
          style={styles.textArea}
          textAlign="center"
          editable={true}
          keyboardType="numeric"
          onChange={handleOnchangebidAssignValue}
        >
          <NumberFormat
            value={bidAssignValue}
            thousandSeparator={true}
            displayType={"text"}
            renderText={(value, props) => <Text>{value}</Text>}
            onValueChange={(values) => {
              const { formattedValue, value } = values;
              setBidAssignValue(value);
            }}
          />
        </TextInput>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 0.1 }} />
          <GeneralButton
            styles={{ box: styles.bidButton, text: styles.bidText }}
            text={"입찰하기"}
            onPress={handlebidAssignValue}
          >
            <AntDesign
              name="upcircleo"
              size={18}
              color="white"
              style={{ marginRight: 10 }}
            />
          </GeneralButton>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1 }} />

        <GeneralButton
          styles={{ box: styles.startChatBox, text: styles.startChatText }}
          onPress={onHandleChatOpen}
          text="채팅방 참여"
        />
        <View style={{ flex: 1 }} />
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  type: {
    color: "red",
    fontSize: 15,
    marginLeft: Dimensions.get("window").height / 60,
    marginTop: Dimensions.get("window").height / 60,
    marginBottom: Dimensions.get("window").height / 200,
  },
  badges: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  typography: {
    marginTop: Dimensions.get("window").height / 100,
    marginLeft: Dimensions.get("window").height / 50,
    marginRight: Dimensions.get("window").height / 50,
  },
  divider: {
    borderBottomColor: "#aaaaaa",
    borderBottomWidth: 1,
    marginTop: Dimensions.get("window").height / 100,
    marginBottom: Dimensions.get("window").height / 100,
  },
  dividerContainer: {
    width: Dimensions.get("window").width * 0.95,
    alignSelf: "center",
  },
  information: {
    flex: 1,
    fontSize: 22,
  },
  itemInformationContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: Dimensions.get("window").height / 100,
  },
  textArea: {
    flex: 1.5,
    borderRadius: 20,
    borderWidth: 0.5,
    height: 24,
  },
  bidButton: {
    flex: 0.9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0176B7",
    height: 26,
    borderRadius: 20,
    borderWidth: 0.5,
  },
  bidText: {
    color: "white",
  },
  startChatBox: {
    flex: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0176B7",
    height: Dimensions.get("window").height / 20,
    marginTop: Dimensions.get("window").height / 50,
    borderRadius: 9999,
    borderWidth: 0.5,
  },
  startChatText: {
    color: "white",
    fontSize: 20,
  },
});
