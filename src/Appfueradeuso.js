import React from "react";
import { View, Text } from "react-native";
import Ops from "./Ops";

const App = () => {
  return (
    <View style={styles.viewStyle}>
      <View style={styles.titleStyle}>
        <Text>XP3NS3S</Text>
      </View>
      <View style={styles.opsStyle}>
        <Ops />
      </View>
    </View>
  );
};

export default App;
styles = {
  viewStyle: {
    flex: 1,
    backgroundColor: "#ddd"
  },
  titleStyle: {
    //flex: 1,
    padding: 20,
    alignSelf: "center",
    backgroundColor: "#aaffff",
    heigth: "20%"
  },
  opsStyle: {
    padding: 10,
    flex: 5,
    borderWidth: 4,
    borderColor: "#000000"
  }
};
