import React, { Component } from "react";
import firebase from "firebase";
import {
  View,
  Text,
  Button,
  Picker,
  TextInput,
  ScrollView,
  TouchableHighlight,
  Platform
} from "react-native";

class addToList extends Component {
  render() {
    return (
      <View>
        <Text>Agregar a {this.props.lista}</Text>
      </View>
    );
  }
}

export default addToList;
