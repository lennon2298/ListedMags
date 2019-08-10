import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  AsyncStorage,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import Button from 'apsl-react-native-button';
import axios from 'axios';

export default class LoginForm extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email : "",
      password: "",
      validated: false,
      firstName: "",
      lastName: "",
      loginAuth: false,
      token: {},
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

  checkLoginAuth() {
    if(this.state.loginAuth)
    {
      //alert("Authenticated");
      console.log("Authenticated\n" + this.state.email + "\n" + "\n" + this.state.token.key);
      this.props.navigation.navigate('App');
    }
    else{
      //alert("Not Authenticated\n" + this.state.email + "\n" + this.state.password);
      //alert()
      console.log("Not Authenticated\n" + this.state.email + "\n" +
       this.state.password + "\n");
      //this.props.navigation.navigate('App');
    }
  }

  async handleRequest() {
    //const endpoint = this.props.create ? 'register' : 'login';
    const instance = axios.create({
      baseURL: 'http://192.168.43.228:8000/rest/auth/',
      timeout: 1500,
    });
    const payload = { email: this.state.email, password: this.state.password }

    //if (this.props.create) {
    //  payload.first_name = this.state.firstName;
    //  payload.last_name = this.state.lastName;
    //}
    //alert("xs");
    console.log("lolol");
    await instance
      .post('login/', payload)
      .then(response => {
        this.state.token = response.data;
        AsyncStorage.setItem('user_id', JSON.stringify(response.data));
        const user = AsyncStorage.getItem('user_id');
        console.log(user.key);
        // We set the returned token as the default authorization header
        axios.defaults.headers.common.Authorization = {'Authorization': `Bearer ${this.state.token}`};
        console.log(response);
        console.log("XD");
        this.setState({loginAuth: true});
        console.log(axios.defaults.headers.common.Authorization);
        //this.props.navigation.navigate('Home');
      })
      .catch(error => console.log(error));

      this.checkLoginAuth();
  }
  async handleLogoutRequest() {
    const instance = axios.create({
      baseURL: 'http://192.168.43.228:8000/rest/auth/',
      timeout: 1500,
    });
    await instance
      .post('logout/')
      .catch(error =>  console.log(error))
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.body}>
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
            onChangeText={(text) => this.setState({ password: text })} value={this.state.password}/>
          <Button style={styles.loginButton} textStyle={styles.buttonText} onPress={this.handleRequest.bind(this)}>
            Log in
          </Button>
          <Text>
            Forgotten Password? Reset now
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