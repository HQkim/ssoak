import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { kakaoDelete } from "../../apis/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  navigation: any;
  route: object;
};

const OtherSetting = (props: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const deleteAccount = async () => {
    await kakaoDelete();
    await AsyncStorage.removeItem("accessToken");
    props.navigation.navigate("main");
  };
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 15 }}>
        기타
      </Text>
      <View style={{ marginTop: 15 }}>
        <TouchableOpacity onPress={() => console.log("문의하기")}>
          <Text>문의하기</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 15 }}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text>회원탈퇴</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderBottomColor: "#d7d4d4",
          borderBottomWidth: 1,
          marginTop: 15,
        }}
      ></View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              회원탈퇴시 회원정보가 삭제됩니다.
            </Text>
            <Text style={styles.modalText}>정말 탈퇴하시겠습니까?</Text>
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => console.log("삭제")}
              >
                <Text style={styles.textStyle}>탈퇴하기</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>돌아가기</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OtherSetting;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});
