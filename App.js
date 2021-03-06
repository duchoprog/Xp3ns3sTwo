import React, { Component } from "react";
import { View, Text } from "react-native";
import Ops from "./src/Ops";
import firebase from "@firebase/app";
import "@firebase/auth";
import LoginForm from "./src/LoginForm";
import { YellowBox } from "react-native";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

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
  logout() {
    firebase
      .auth()
      .signOut()
      .then(function() {
        this.setState({ loggedIn: false });
      })
      .catch(function(error) {
        // An error happened
      });
  }

  renderApp() {
    if (this.state.loggedIn) {
      return (
        <View style={styles.opsStyle}>
          <Ops logout={this.logout.bind(this)} />
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
    const miUrl = "https://xp3ns3s.firebaseio.com";
    return (
      <View style={styles.viewStyle}>
        <View style={styles.titleStyle}>
          <Text>XP3NS3S! </Text>
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
    flex: 1,
    borderTopWidth: 1,
    borderColor: "#000000"
  }
};
