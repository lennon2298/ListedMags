import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';


export default class Home extends Component {
    constructor(props) {
		super(props);
    }
    componentDidMount() {
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
  }
  render() { 
    return (
      <View style={styles.body}>
        <StatusBar backgroundColor={"#2d808cff"}></StatusBar>
          <View style={styles.barView}>
            <Text>Home Screen</Text>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    test: {
      alignItems: "center",
      width: "33%",
      aspectRatio: 2.5/1,
    },
    barView: {
      alignItems: "center",
      margin: "auto",
      flex: 1,
      marginTop: "20%",
    },
    barImage: {
      flex: 1,
      resizeMode: 'contain',
      margin: 0,
      padding: 0,
    },
    nxtImage: {
      resizeMode: "contain",
      padding: 0,
      margin: 0,
      width: "33%",
      height: "8%",
    },
    startImage: {
      resizeMode: "contain",
      padding: 0,
      margin: 0,
      flex:1
    },
    body: {
      flex: 1
    },
  });