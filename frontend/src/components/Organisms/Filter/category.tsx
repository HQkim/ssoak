import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import RadioButton from "../../Atoms/Buttons/radioButton";
import Typography from "../../Atoms/Typographies/typography";

type Props = {
  getSelectInformation: Function;
  navigation: any;
  route: object;
};
const { height: ScreenHeight } = Dimensions.get("window");
const { width: ScreenWidth } = Dimensions.get("window");

const Category = (props: Props) => {
  const [select, setSelect] = useState(true);
  const onSelect = () => {
    setSelect(!select);
    props.getSelectInformation(select);
  };
  return (
    <View>
      <View style={{ height: ScreenHeight / 20 }}>
        <Text style={{ fontSize: ScreenHeight / 45 }}>카테고리</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={onSelect}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select ? <RadioButton /> : null}
          </View>
          <Typography title="디지털기기" style={styles.fontStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSelect}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select ? null : <RadioButton />}
          </View>
          <Typography title="생활가전" style={styles.fontStyle} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginTop: 30 }}>
        <TouchableOpacity
          onPress={onSelect}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select ? <RadioButton /> : null}
          </View>
          <Typography title="가구/인테리어" style={styles.fontStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSelect}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select ? null : <RadioButton />}
          </View>
          <Typography title="유아동" style={styles.fontStyle} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginTop: 30 }}>
        <TouchableOpacity
          onPress={onSelect}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select ? <RadioButton /> : null}
          </View>
          <Typography title="생활/가공식품" style={styles.fontStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSelect}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select ? null : <RadioButton />}
          </View>
          <Typography title="유아도서" style={styles.fontStyle} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginTop: 30 }}>
        <TouchableOpacity
          onPress={onSelect}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select ? <RadioButton /> : null}
          </View>
          <Typography title="스포츠/레져" style={styles.fontStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSelect}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select ? null : <RadioButton />}
          </View>
          <Typography title="여성잡화" style={styles.fontStyle} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginTop: 30 }}>
        <TouchableOpacity
          onPress={onSelect}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select ? <RadioButton /> : null}
          </View>
          <Typography title="여성의류" style={styles.fontStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSelect}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select ? null : <RadioButton />}
          </View>
          <Typography title="남성패션/잡화" style={styles.fontStyle} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginTop: 30 }}>
        <TouchableOpacity
          onPress={onSelect}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select ? <RadioButton /> : null}
          </View>
          <Typography title="게임/취미" style={styles.fontStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSelect}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select ? null : <RadioButton />}
          </View>
          <Typography title="뷰티/미용" style={styles.fontStyle} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginTop: 30 }}>
        <TouchableOpacity
          onPress={onSelect}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select ? <RadioButton /> : null}
          </View>
          <Typography title="반려동물용품" style={styles.fontStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSelect}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select ? null : <RadioButton />}
          </View>
          <Typography title="도서/티켓/음반" style={styles.fontStyle} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginTop: 30 }}>
        <TouchableOpacity
          onPress={onSelect}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select ? <RadioButton /> : null}
          </View>
          <Typography title="식물" style={styles.fontStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSelect}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select ? null : <RadioButton />}
          </View>
          <Typography title="기타" style={styles.fontStyle} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderBottomColor: "#d7d4d4",
          borderBottomWidth: 1,
          marginTop: 10,
        }}
      ></View>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  radioButton: {
    height: ScreenHeight / 35,
    width: ScreenHeight / 35,
    borderRadius: ScreenHeight / 50,
    borderWidth: 1,
    borderColor: "#b8b4b4",
    alignItems: "center",
    justifyContent: "center",
  },
  fontStyle: {
    fontWeight: "300",
    marginLeft: ScreenHeight / 130,
    fontSize: ScreenHeight / 50,
  },
});
