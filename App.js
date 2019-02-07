import React from "react";
import { View, Text } from "react-native";
import Ops from "./src/Ops";

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
    backgroundColor: "#ddd",
    marginTop: 20
  },
  titleStyle: {
    //flex: 1,
    padding: 20,
    alignSelf: "center",
    backgroundColor: "#aaffff"
  },
  opsStyle: {
    padding: 10,
    flex: 5,
    borderTopWidth: 1,
    borderColor: "#000000"
  }
};
