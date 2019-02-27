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
import Modal from "react-native-modal";

class Ops extends Component {
  constructor(props) {
    super(props);

    this.state = {
      monto: 0,
      cta: "",
      fecha: "",
      lat: 12,
      long: 21,
      motivo: "",
      detalle: "",
      modalVisible: false,
      posi: "",
      origenes: {},
      destinos: {},
      pickerOriVisible: false,
      pickerDesVisible: false,
      nuevoVis: false,
      mapus: {},
      nuevo: ""
    };
  }

  componentWillMount() {
    this.leerOrigenes();
  }

  leerOrigenes() {
    var origenes = {};
    var mapus = {};
    var cont = 0;
    const { currentUser } = firebase.auth();
    firebase
      .database()
      .ref(`/${currentUser.uid}/origenes`)
      .on("value", snapshot => {
        origenes = snapshot.val();
        Object.keys(origenes).map(function(key) {
          cont += 1;
          mapus[cont] = key;
          //console.warn(cont, mapus);
        });
        this.setState({ mapus: mapus });
        console.warn(this.state.mapus);
      });
  }
  iosOrigen() {
    this.setState({
      pickerOriVisible: true
    });
  }

  iosDestino() {
    this.setState({
      pickerDesVisible: true
    });
  }
  resetState() {
    console.warn("reset");
    this.setState({
      monto: "",
      cta: "",
      fecha: "",
      motivo: "",
      detalle: ""
    });
  }

  guardarOp() {
    this.setState({
      modalVisible: false,
      monto: parseInt(this.state.monto)
    });

    const { monto, cta, fecha, motivo, detalle, posi } = this.state;
    //console.warn(monto, cta, fecha, motivo);
    const { currentUser } = firebase.auth();
    firebase
      .database()
      .ref(`/${currentUser.uid}/ops`)
      .push({ monto, cta, fecha, motivo, detalle, posi });

    this.resetState();
  }

  renderPicker() {
    if (Platform.OS === "ios") {
      return (
        <View>
          <View style={styles.iosPickerStyle}>
            <Button title="Origen" onPress={this.iosOrigen.bind(this)} />
          </View>
          <View style={styles.iosPickerStyle}>
            <Button
              style={styles.iosPickerStyle}
              title="Destino"
              onPress={this.iosDestino.bind(this)}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <View style={styles.pickerViewStyle}>
            <Text />
            <Text style={styles.text}>Cuenta origen</Text>
            <Picker
              selectedValue={this.state.cta}
              style={styles.pickerStyle}
              onValueChange={itemValue => this.setState({ cta: itemValue })}
              itemStyle={{ height: 22 }}
            >
              <Picker.Item label="Elegi!" value="Elegi" />
              <Picker.Item label="CCGalicia!" value="CCGalicia" />
              <Picker.Item label="CCBBVA" value="CCBBVA" />
              <Picker.Item label="Verdes" value="Verdes" />
            </Picker>
          </View>

          <View style={styles.pickerViewStyle}>
            <Text style={styles.text}>Mapus</Text>
            <Picker
              selectedValue={this.state.cta}
              style={styles.pickerStyle}
              onValueChange={itemValue => {
                if (itemValue == "destinos" || itemValue == "origenes") {
                  console.warn(itemValue);
                  this.setState({ nuevoVis: true });
                } else {
                  this.setState({ cta: itemValue });
                }
              }}
              itemStyle={{ height: 22 }}
            >
              <Picker.Item label="Elegi!" value="Elegi" />
              {Object.keys(this.state.mapus).map((key, value) => {
                return (
                  <Picker.Item
                    label={this.state.mapus[key]}
                    value={value}
                    key={value}
                  />
                ); //if you have a bunch of keys value pair
              })}
              <Picker.Item label="Nuevo" value="destinos" />
            </Picker>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.nuevoVis}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View>
                <View style={styles.viewStyle}>
                  <TextInput
                    placeholder="nueva categoría"
                    value={this.state.nuevo}
                    style={styles.inputStyle}
                    onChangeText={text => this.setState({ nuevo: text })}
                  />
                </View>
                <Button title="aceptar" onPress={() => {}} />
                <Button
                  title="ni ahí"
                  onPress={() => {
                    this.setState({ nuevo: "", nuevoVis: false });
                  }}
                />
              </View>
            </Modal>
          </View>

          <View style={styles.pickerViewStyle}>
            <Text style={styles.text}>Motivo</Text>
            <Picker
              selectedValue={this.state.motivo}
              style={styles.pickerStyle}
              onValueChange={itemValue => this.setState({ motivo: itemValue })}
            >
              <Picker.Item label="Elegi!" value="Elegi" />
              <Picker.Item label="Nafta!" value="Nafta" />
              <Picker.Item label="Joda" value="Joda" />
              <Picker.Item label="Super" value="Super" />
            </Picker>
          </View>
        </View>
      );
    }
  }
  render() {
    //console.warn(this.state.origenes);
    const ahora = new Date();
    const montoString = `${this.state.monto.toString()}`;
    const position = `https://www.google.com/maps/place/ ${this.state.lat},${
      this.state.long
    }`;
    const text = `Guardando:
    *Monto:${this.state.monto}
    *Cuenta: ${this.state.cta}
    *Motivo: ${this.state.motivo}
    *Fecha: ${this.state.fecha}
    *Lugar: ${position}
    *Detalle:${this.state.detalle}
    `;

    updateCta = cta => {
      this.setState({ cta: cta });
    };

    findCoordinates = () => {
      navigator.geolocation.getCurrentPosition(
        position => {
          const location = JSON.stringify(position);
          lat = JSON.stringify(position.coords.latitude);
          long = JSON.stringify(position.coords.longitude);

          this.setState({ lat: lat, long: long, position: position });
          var position = `https://www.google.com/maps/place/ ${
            this.state.lat
          },${this.state.long}`;
          this.setState({ posi: position });
        },
        error => Alert.alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    };

    return (
      <ScrollView style={{ flex: 1 }} behavior="padding" enabled>
        <View style={{ flex: 1 }}>
          <Button
            style={styles.btStyle}
            title=" sumar 1000 (21/2b)"
            onPress={() => {
              nuevoMonto = (parseInt(this.state.monto) + 1000).toString();

              this.setState({ monto: nuevoMonto }, () => {});
            }}
          />
          <View style={{ topBorder: 2, height: 2 }} />

          <Button
            style={styles.btStyle}
            title=" sumar 100"
            onPress={() => {
              nuevoMonto = (parseInt(this.state.monto) + 100).toString();

              this.setState({ monto: nuevoMonto }, () => {});
            }}
          />
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.montoStyle}>$</Text>

            <TextInput
              style={{
                flex: 1,
                fontSize: 25,
                backgroundColor: "white"
              }}
              value={montoString}
              onChangeText={text => {
                this.setState({ monto: text });
              }}
            />
          </View>
          {/* <Text>{text}</Text> */}

          <View>{this.renderPicker()}</View>

          <View style={{ flexDirection: "row" }}>
            <Text style={styles.montoStyle}>Detalle:</Text>

            <TextInput
              style={{
                flex: 1,
                fontSize: 25,
                backgroundColor: "white"
              }}
              value={this.state.detalle}
              onChangeText={text => {
                this.setState({ detalle: text });
              }}
            />
          </View>
          <Button
            style={styles.btStyle}
            title="guarda"
            onPress={() => {
              let fecha = new Date();
              let lat = findCoordinates();

              this.findCoordinates;
              monto = 0;
              this.setState({ fecha: fecha, modalVisible: true });
            }}
          />

          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={{ marginTop: 22 }}>
              <View>
                <Text style={{ fontSize: 20 }}>{text}</Text>
                <View
                  style={{
                    backgroundColor: "lightgreen",
                    padding: 10,
                    flexDirection: "row"
                  }}
                >
                  <TouchableHighlight
                    style={styles.modBtStyle}
                    onPress={this.guardarOp.bind(this)}
                  >
                    <Text style={{ alignSelf: "center" }}>Dale</Text>
                  </TouchableHighlight>

                  <TouchableHighlight
                    style={styles.modBtStyle}
                    onPress={() => {
                      this.setState({ modalVisible: false });
                    }}
                  >
                    <Text style={{ alignSelf: "center" }}>NO!</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            backdropColor="black"
            animationType="slide"
            transparent={false}
            visible={this.state.pickerOriVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View>
              <View style={styles.pickerViewStyle}>
                <Text />
                <Text style={styles.text}>Cuenta origen</Text>
                <Picker
                  selectedValue={this.state.cta}
                  style={styles.pickerStyle}
                  onValueChange={itemValue =>
                    this.setState({ cta: itemValue, pickerOriVisible: false })
                  }
                  itemStyle={{ height: 22 }}
                >
                  <Picker.Item label="Elegi!" value="Elegi" />
                  <Picker.Item label="CCGalicia!" value="CCGalicia" />
                  <Picker.Item label="CCBBVA" value="CCBBVA" />
                  <Picker.Item label="Verdes" value="Verdes" />
                </Picker>
              </View>
            </View>
          </Modal>

          <Modal
            backdropColor="black"
            animationType="slide"
            transparent={false}
            visible={this.state.pickerDesVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View>
              <View style={styles.pickerViewStyle}>
                <Text />
                <Text style={styles.text}>Cuenta destino</Text>
                <Picker
                  selectedValue={this.state.motivo}
                  style={styles.pickerStyle}
                  onValueChange={itemValue =>
                    this.setState({
                      motivo: itemValue,
                      pickerDesVisible: false
                    })
                  }
                  itemStyle={{ height: 22 }}
                >
                  <Picker.Item label="Elegi!" value="Elegi" />
                  <Picker.Item label="Nafta!" value="Nafta" />
                  <Picker.Item label="Joda" value="Joda" />
                  <Picker.Item label="Super" value="Super" />
                </Picker>
              </View>
            </View>
          </Modal>

          <View style={{ height: 333, marginTop: 20 }}>
            <Button title="Logout" onPress={() => this.props.logout()} />
          </View>
        </View>
      </ScrollView>
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
  btStyle: {
    margin: 10
  },
  iosPickerStyle: {
    margin: 2
  },
  pickerViewStyle: {
    height: 44,
    margin: 5,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "black"
  },
  text: {
    fontSize: 15,
    color: "black",
    flex: 1
  },
  pickerStyle: {
    flex: 1
  },
  montoStyle: {
    fontSize: 25,
    backgroundColor: "white",
    borderWidth: 0,
    borderColor: "black",
    color: "black",
    padding: 5
  },
  modBtStyle: {
    flex: 1,
    backgroundColor: "lightblue",
    margin: 5,
    padding: 10
  }
};

export default Ops;
