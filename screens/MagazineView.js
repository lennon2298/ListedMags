import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import WebView from 'react-native-webview';

export default class MagazineView extends Component {
  render() {
    const url = "http://165.22.213.1/files/magazines/" + this.props.navigation.state.params.magazineData + "/";
    //const sampleUrl = this.props.navigation.state.params.magazineData;
    //const sampleUrl = 'https://www.google.com/'
    return (
      <View style={{flex: 1}}>
        {console.log("XDXDXDXD")}
        {console.log(url)}
        <WebView
          bounces={false}
          scrollEnabled={true}
          zoomable={false}
          source={{ uri: url }} />
      </View>
    );
  }
}