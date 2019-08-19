import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import Button from 'apsl-react-native-button';
import SocialButton from 'rtg-rn-social-buttons';
//import OAuthManager from 'react-native-oauth';



export default class LoginHome extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    setTimeout(() => SplashScreen.hide(), 1000);
  }

  // handleSocialLogin() {
  //   const config =  {
  //     google: {
  //       consumer_key: "457262287809-3hm9kqjftiigd13sm0qb67qqi2pellob.apps.googleusercontent.com",
  //       consumer_secret: 'Fj0Oe4YAXiRZDORm6Aj5OCcx'
  //     },
  //     facebook: {
  //       client_id: 'YOUR_CLIENT_ID',
  //       client_secret: 'YOUR_CLIENT_SECRET'
  //     }
  //   }
  //   // Create the manager
  //   const manager = new OAuthManager('ListedMag')
  //   // configure the manager
  //   manager.configure(config);
  // }

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
              <SocialButton type='facebook' text='Continue with Facebook' />
              <SocialButton type="google" text='Continue with Google' style={styles.loginButton} />
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