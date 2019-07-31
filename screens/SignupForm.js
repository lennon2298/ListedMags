import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import Button from 'apsl-react-native-button'


export default class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email :"",
      password:"",
      validated: false ,
       }
  }
  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    setTimeout(() => SplashScreen.hide(), 1000);
  }

  handleUnhandledTouches() {
    Keyboard.dismiss(0);
  }
  validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      this.setState({ email: text })
      return false;
    }
    else {
      this.setState({ email: text })
      console.log("Email is Correct");
    }
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.body}>
          <Image source={require('../res/logo.png')} style={styles.logoImage} />
          <View style={styles.loginBody}>
            <Text style={styles.loginText} allowFontScaling={true} maxFontSizeMultiplier={5}>Register</Text>
          </View>
          <View style={{ width: "80%", alignItems: "flex-start" }}>
            <Text>E-mail</Text>
          </View>
          <TextInput placeholder={"Email"} style={styles.loginInput} autoCapitalize={"none"} autoCorrect={false}
            autoCompleteType={"email"} onChangeText={(text) => this.validate(text)} value={this.state.email} />
          <View style={{ width: "80%", alignItems: "flex-start" }}>
            <Text>Password</Text>
          </View>
          <TextInput placeholder={"Password"} style={styles.loginInput} autoCapitalize={"none"} autoCorrect={false}
            autoCompleteType={"password"} secureTextEntry={true} 
            onChangeText={(text) => this.setState({ password: text })} value={this.state.password}/>
          <View style={{ width: "80%", alignItems: "flex-start" }}>
            <Text>Re-enter Password</Text>
          </View>
          <TextInput placeholder={"Password"} style={styles.loginInput} autoCapitalize={"none"} autoCorrect={false}
            autoCompleteType={"password"} secureTextEntry={true} 
            onChangeText={(text) => this.setState({ password: text })} value={this.state.password}/>
          <Button style={styles.loginButton} textStyle={styles.buttonText}>
            Log in
          </Button>
          <Text>
            Already a member? login
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: '#000000',
    fontFamily: 'Segoe UI',
    fontWeight: '700',
    fontSize: 27,
  },
  loginBody: {
    flex: 0.08,
    width: "30%",
    alignItems: "center",
    marginTop: "5%",
    marginBottom: "10%"
  },
  loginInput: {
    height: "6%",
    width: "80%",
    shadowColor: 'rgba(0, 128, 255, 0.21)',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    borderRadius: 5,
    borderColor: '#208de1',
    borderStyle: 'solid',
    borderWidth: 1,
    alignContent: "center",
    justifyContent: "center",
    marginBottom: "4%",
    marginTop: "2%"
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    justifyContent: "center"
  },
  logoImage: {
    width: "75%",
    resizeMode: "contain",
    marginBottom: "5%"
  },
  loginButton: {
    height: "7%",
    width: "80%",
    shadowColor: 'rgba(0, 128, 255, 0.21)',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    borderRadius: 5,
    borderColor: "#208de1",
    backgroundColor: '#208de1',
    marginLeft: "10%",
    justifyContent: "center"
  },
});