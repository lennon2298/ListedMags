import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Linking,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import Button from 'apsl-react-native-button';
import SocialButton from 'rtg-rn-social-buttons';
import {google, facebook} from 'react-native-simple-auth';
import axios from 'axios';
// import OAuthManager from 'react-native-oauth';

// const config =  {
//   google: {
//     client_id: '457262287809-hs217glngmohqdd7v03q2c114lb3p00n.apps.googleusercontent.com',
//     client_secret: 'WkH_C1ZXrUVAIG8Dd2V86TW-'    
//   },
//   facebook: {
//     client_id: 'YOUR_CLIENT_ID',
//     client_secret: 'YOUR_CLIENT_SECRET'
//   }
// }
// // Create the manager
// const manager = new OAuthManager('ListedMag')

// // configure the manager
// manager.configure(config);

const googleConfig = {
  appId: '457262287809-t8tdnpr7iqrhfhnmpo6glare4ehuf6tj.apps.googleusercontent.com',
  callback: 'com.listedmagazines:/callback',
}

const facebookConfig = {
  appId: '2339211222800047',
  callback: 'fb2339211222800047://authorize',
}

export default class LoginHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      RegisterAuth: false,
    }
  }
  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    setTimeout(() => SplashScreen.hide(), 1000);
    Linking.addEventListener('url', this._handleOpenURL);
    //this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
  }

  _handleOpenURL(event) {
    console.log(event.url);
  }

  handleGoogleLogin = () => {
    console.log("inside google login")
    google(googleConfig)
      .then((info) => {
        console.log(info);
        //this.setState({userId: info.credentials.access_token});
        this.setState({userId: info.credentials.access_token});
        this.handleRegisterRequest();
      })
      .catch((error) => {
        console.log(error)
      });
  }

  handleFacebookLogin = () => {
    console.log("inside facebook login")
    facebook(facebookConfig)
      .then((info) => {
        console.log(info);
        //this.setState({userId: info.credentials.access_token});
        this.setState({userId: info.credentials.access_token});
        this.handleRegisterRequest();
      })
      .catch((error) => {
        console.log(error)
      });
  }

  checkRegisterAuth() {
    if(this.state.RegisterAuth)
    {
      //alert("Authenticated");
      console.log("Authenticated\n" + this.state.email + "\n" +
       this.state.password + "\n" + this.state.token.key);
      this.props.navigation.navigate('App');
    }
    else{
      //alert("Not Authenticated\n" + this.state.email + "\n" + this.state.password);
      //alert()
      alert("Not Authenticated\n" + this.state.email + "\n" +
       this.state.password + "\n");
    }
  }

  async handleRegisterRequest() {
    //const endpoint = this.props.create ? 'register' : 'login';
    const instance = axios.create({
      baseURL: 'http://192.168.2.209:8000/',
      timeout: 5000,
    });
    //const payload = { email: this.state.email, password1: this.state.password, password2: this.state.password2 }
    const payload = {access_token: this.state.userId}
    //if (this.props.create) {
    //  payload.first_name = this.state.firstName;
    //  payload.last_name = this.state.lastName;
    //}
    //alert("xs");
    console.log("lolol");
    await instance
      .post('rest/auth/facebook/', payload)
      .then(response => {
        this.state.token = response.data;
        AsyncStorage.setItem('user_id', JSON.stringify(response.data));
        const user = AsyncStorage.getItem('user_id');
        console.log(user.key);
        // We set the returned token as the default authorization header
        axios.defaults.headers.common = {'Authorization': 'Bearer ' + JSON.stringify(this.state.token)};
        console.log(response);
        console.log("XD");
        this.setState({RegisterAuth: true});
        console.log(axios.defaults.headers.common.Authorization);
        //this.props.navigation.navigate('Home');
      })
      .catch(error => console.log(error));

      //this.checkLoginAuth();
      this.checkRegisterAuth();
  }

  render() {
    return (
      <View style={styles.body}>
        <View style={styles.body}>
          <View style={styles.upperHalfBody}>
            <Image source={require('../res/logo.png')} style={styles.logoImage} />
          </View>
          <View style={styles.lowerHalfBody}>
            <View style={styles.body}>
              <Button style={styles.loginButton} textStyle={styles.buttonText} onPress={() => this.props.navigation.navigate('LoginPage')} >
                Log in
              </Button>
              <Button style={styles.loginButton} textStyle={styles.buttonText} onPress={() => this.props.navigation.navigate('SignupPage')} >
                Sign up
              </Button>
              <View style={styles.loginBody}>
                <Text style={styles.loginText} allowFontScaling={true} maxFontSizeMultiplier={5}>or</Text>
              </View>
              <SocialButton type='facebook' text='Continue with Facebook' action={this.handleFacebookLogin} />
              <SocialButton type="google" text='Continue with Google' style={styles.loginButton} 
              action={this.handleGoogleLogin} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignContent: "center"
  },
  upperHalfBody: {
    flex: 0.35,
    justifyContent: "center",
    alignItems: "center"
  },
  lowerHalfBody: {
    flex: 0.75,
    alignItems: "center",
    alignContent: "center",
  },
  loginButton: {
    height: "10%",
    width: "80%",
    shadowColor: 'rgba(0, 128, 255, 0.21)',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    borderRadius: 5,
    borderColor: "#208de1",
    backgroundColor: '#208de1',
    marginLeft: "auto",
    justifyContent: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: "700"
  },
  logoImage: {
    width: "75%",
    resizeMode: "contain"
  },
  loginBody: {
    flex: 0.08,
    alignItems: "center",
    marginBottom: "5%",
    alignContent: "center",
  },
  loginText: {
    color: '#000000',
    fontFamily: 'Segoe UI',
    fontSize: 22,
  },
});