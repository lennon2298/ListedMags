import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import Button from 'apsl-react-native-button';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Toast, { DURATION } from 'react-native-easy-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      validated: false,
      firstName: "",
      lastName: "",
      loginAuth: false,
      token: {},
      userTokenId: {},
      isLoading: false,
    }
  }

  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    //axios.defaults.baseURL = 'http://192.168.225.27:8000/rest/auth/';
    axios.defaults.timeout = 5000;
    setTimeout(() => SplashScreen.hide(), 1000);
  }

  handleUnhandledTouches() {
    Keyboard.dismiss(0);
  }

  validate = (text) => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      // console.log("Email is Not Correct");
      this.setState({ email: text })
      return false;
    }
    else {
      this.setState({ email: text })
      console.log("Email is Correct");
    }
  }

  async checkLoginAuth() {
    if (this.state.loginAuth) {
      //alert("Authenticated");
      // console.log("Authenticated\n" + this.state.email + "\n" + "\n" + this.state.token.key);
      this.setState({isLoading: false})
      await setTimeout(() => this.setState({isLoading: false}), 1000);
      this.props.navigation.navigate('App');
    }
    else {
      //alert("Not Authenticated\n" + this.state.email + "\n" + this.state.password);
      //alert()
      console.log("Not Authenticated\n" + this.state.email + "\n" +
        this.state.password + "\n");
      this.setState({isLoading: false})
      //this.props.navigation.navigate('App');
    }
  }

  async handleRequest() {
    //const endpoint = this.props.create ? 'register' : 'login';
    const instance = axios.create({
      baseURL: 'http://165.22.213.1/rest/auth/',
      timeout: 1500,
    });
    const payload = { email: this.state.email, password: this.state.password }

    //if (this.props.create) {
    //  payload.first_name = this.state.firstName;
    //  payload.last_name = this.state.lastName;
    //}
    //alert("xs");
    // console.log("lolol");
    await instance
      .post('login/', payload)
      .then(response => {
        this.state.token = response.data;
        AsyncStorage.setItem('user_id', JSON.stringify(response.data));
        AsyncStorage.setItem('user_email', this.state.email);
        const user = AsyncStorage.getItem('user_id');
        // console.log(user);
        const userEmail = AsyncStorage.getItem('user_email');
        // console.log("userEmail" + userEmail);
        // console.log("USER EMAIL: " + userEmail);
        // We set the returned token as the default authorization header
        axios.defaults.headers.common['Authorization'] = "Token " + this.state.token.key;
        // console.log(response);
        // console.log(this.state.token);
        // console.log("XD");
        this.setState({ loginAuth: true });
        this.setState({isLoading: true})
        // console.log(axios.defaults.headers.common.Authorization);
        //this.props.navigation.navigate('Home');
      })
      .catch(error => {
        // console.log(error);
        if (error.response) {
          // console.log("error data" + error.response.data);
          // console.log("error status" + error.response.status);
          // console.log("error header" + error.response.headers);
          this.refs.toast.show('Username or Password incorrect!');
        } else if (error.request) {
          // console.log("error request" + error.request);
          this.refs.toast.show('Network Error');
        } else {
          // console.log('Error', error.message);
        }
        // console.log(error.config);
      });
    this.checkLoginAuth();
  }
  async handleLogoutRequest() {
    const instance = axios.create({
      baseURL: 'http://165.22.213.1/rest/auth/',
      timeout: 1500,
    });
    await instance
      .post('logout/')
      .catch(error => console.log(error))
  }

  render() {
    if(this.state.isLoading) {
      return (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAwareScrollView resetScrollToCoords={{x: 0, y: 0}} contentContainerStyle={styles.body}>
          <Image source={require('../res/logo.png')} style={styles.logoImage} />
          <View style={styles.loginBody}>
            <Text style={styles.loginText} allowFontScaling={true} maxFontSizeMultiplier={5}>Login</Text>
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
            onChangeText={(text) => this.setState({ password: text })} value={this.state.password} />
          <Button style={styles.loginButton} textStyle={styles.buttonText} onPress={this.handleRequest.bind(this)}>
            Log in
          </Button>
          <Toast ref="toast" />
        </KeyboardAwareScrollView>
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
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000040"
  },
});