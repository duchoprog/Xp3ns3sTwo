import React, { Component } from "react";
import { View, Text } from "react-native";
import Ops from "./src/Ops";
import firebase from "@firebase/app";
import "@firebase/auth";
import LoginForm from "./src/LoginForm";

class App extends Component {
  state = { loggedIn: false };
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyBacD3Wr_VkCUE5Y_8sKjcrNGfD1Ip6ozk",
      authDomain: "xp3ns3s.firebaseapp.com",
      databaseURL: "https://xp3ns3s.firebaseio.com",
      projectId: "xp3ns3s",
      storageBucket: "xp3ns3s.appspot.com",
      messagingSenderId: "405858279693"
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderApp() {
    if (this.state.loggedIn) {
      return (
        <View style={styles.opsStyle}>
          <Ops />
        </View>
      );
    } else {
      return (
        <View style={styles.opsStyle}>
          <LoginForm />
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <View style={styles.titleStyle}>
          <Text>XP3NS3S</Text>
        </View>
        <View style={{ flex: 1 }}>{this.renderApp()}</View>
      </View>
    );
  }
}

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
