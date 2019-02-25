import React, { Component } from "react";
import { View, TextInput, Button, Text, ActivityIndicator } from "react-native";
import firebase from "@firebase/app";
class LoginForm extends Component {
  state = {
    mail: "",
    pass: "",
    error: "",
    loading: false
  };

  onButtonPress() {
    this.setState({ loading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.mail, this.state.pass)
      .then(this.onLoginOk.bind(this))
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.mail, this.state.pass)
          .then(this.onLoginOk.bind(this))
          .catch(() => {
            this.setState({ error: "Fallo el logins", loading: false });
          });
      });
  }

  onLoginOk() {
    this.setState({ loading: false, mail: "", pass: "" });
  }
  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator size="small" />;
    }
    return <Button onPress={this.onButtonPress.bind(this)} title="ingresar" />;
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <TextInput
          placeholder="mail"
          value={this.state.mail}
          style={styles.inputStyle}
          onChangeText={mail => this.setState({ mail: mail, error: "" })}
        />
        <TextInput
          placeholder="pass"
          style={styles.inputStyle}
          value={this.state.pass}
          style={styles.inputStyle}
          onChangeText={pass => this.setState({ pass: pass, error: "" })}
        />
        <View>{this.renderButton()}</View>
        <Text style={styles.errorStyle}>{this.state.error}</Text>
      </View>
    );
  }
}
const styles = {
  inputStyle: {
    backgroundColor: "#ffe",
    margin: 2,
    borderWidth: 1,
    fontSize: 25
  },
  viewStyle: {
    backgroundColor: "#ffe",
    padding: 10,
    borderWidth: 1
  },
  errorStyle: {
    color: "red",
    fontSize: 20,
    alignSelf: "center"
  }
};

export default LoginForm;
