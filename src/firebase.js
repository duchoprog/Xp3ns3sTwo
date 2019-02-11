/* import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";
import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/database";

class firebase {
  constructor() {
    this.init();
    this.observeAuth();
  }

  init = () =>
    firebase.initializeApp({
      apiKey: "AIzaSyBacD3Wr_VkCUE5Y_8sKjcrNGfD1Ip6ozk",
      authDomain: "xp3ns3s.firebaseapp.com",
      databaseURL: "https://xp3ns3s.firebaseio.com",
      projectId: "xp3ns3s",
      storageBucket: "xp3ns3s.appspot.com",
      messagingSenderId: "405858279693"
    });

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    if (!user) {
      try {
        // 4.
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref("ops");
  }
}
firebase.shared = new firebase();

export default firebase;
 */
