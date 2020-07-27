import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import {
  Card,
  CardItem,
  Body,
} from 'native-base';
import Button from 'apsl-react-native-button'

export default class Magazines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      magData: [],
    }
  }
  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    this.setState({ magData: this.props.navigation.state.params.magazineData });
  }

  renderMagazine(data) {
    this.props.navigation.navigate('MagazineView', { magazineData: data })
  }

  render() {
    return (
      <View style={styles.body}>
        <StatusBar backgroundColor={"#208de1"}></StatusBar>
        <View style={styles.headerView}>
          <Text style={styles.headerText} >Magazines</Text>
        </View>
        <Card>
          <CardItem>
            <Image source={{ uri: this.state.magData.thumbnail }} style={{ height: 200, width: 150 }} />
            <View style={{ marginHorizontal: "5%", marginVertical: "2%", alignSelf: "flex-start" }}>
              <Text style={{ fontWeight: "700", fontSize: 22, textTransform: "capitalize" }}>
                {/* {console.log(this.state.magData.title)} */}
                {this.state.magData.title}
              </Text>
            </View>
          </CardItem>
          <CardItem>
            <View style={{ flex: 1 }}>
              <Button style={styles.loginButton} textStyle={styles.buttonText}
                onPress={() => this.renderMagazine(this.state.magData.id)}>
                Read Now
            </Button>
            </View>
          </CardItem>
        </Card>
        <Card>
          <CardItem header bordered>
            <Text style={{ fontWeight: "700", fontSize: 22, }}>Details</Text>
          </CardItem>
          <CardItem bordered >
            <Body>
              <Text>
                {this.state.magData.description}
              </Text>
            </Body>
          </CardItem>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontWeight: "700",
    fontSize: 24,
    color: "#CC3333",
  },
  headerView: {
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    height: "7%",
    borderBottomColor: "rgba(230, 230, 230, 0.7)",
    borderBottomWidth: 2.5,
    shadowColor: 'rgba(0, 128, 255, 0.9)',
  },
  activityIndicator: {
    justifyContent: "center",
    alignItems: "center"
  },
  loginButton: {
    width: "60%",
    shadowColor: 'rgba(0, 128, 255, 0.21)',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    borderRadius: 25,
    borderColor: "#208de1",
    backgroundColor: '#208de1',
    alignSelf: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: "700"
  },
  startImage: {
    resizeMode: "contain",
    padding: 0,
    margin: 0,
    flex: 1
  },
  body: {
    flex: 1
  },
});