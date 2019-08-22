import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {
  Card,
  CardItem,
} from 'native-base';
import axios from 'axios';

export default class Magazines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      magazineDictionary: [],
      magData: false,
    }
  }
  async componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    await this.handleMagazineRequest();
  }

  async handleMagazineRequest() {
    const instance = axios.create({
      baseURL: 'http://165.22.213.1/',
      timeout: 1500,
    });

    console.log("lolol");
    await instance
      .get('files/magazines/')
      .then(async response => {
        await this.setState({ magazineDictionary: response.data });
        console.log(response);
        console.log("XD");
        console.log(this.state.magazineDictionary);
        this.setState({ magData: true });
      })
      .catch(async error => {
        console.log(error);
        await this.handleMagazineRequest();
      });
    //this.checkLoginAuth();
    //this.render();
  }

  renderMagazinePage(data) {
    this.props.navigation.navigate('MagazinePage', {magazineData : data})
  }

  renderMagazineCards = (data) => {
    return (
      <TouchableOpacity onPress={() => this.renderMagazinePage(data.item)} style={{marginHorizontal: "5%", marginVertical: "2%",
      width: Dimensions.get('window').width/2.5 }} >
          <Card style={{ margin: "5%",flex: 1}}>
            <CardItem cardBody>
                {console.log(data.item.thumbnail)}
                  <Image source={{uri: data.item.thumbnail}} 
                  style={{resizeMode:"cover", height: 250, flex: 1}} />
            </CardItem>
            <CardItem>
              <Text style={{textTransform: "capitalize"}}>
                {data.item.title}
              </Text>
            </CardItem>
          </Card>
      </TouchableOpacity>
    )
  }

  render() {
    if (!this.state.magData) {
      return (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <View style={styles.body}>
        <StatusBar backgroundColor={"#2d808cff"}></StatusBar>
        <View style={styles.headerView}>
          <Text style={styles.headerText} >Magazines</Text>
        </View>
        <FlatList
                horizontal={false}
                showsVerticalScrollIndicator={false}
                numColumns= {2}
                decelerationRate={0}
                snapToAlignment={"center"}
                data={this.state.magazineDictionary}
                extraData={this.state}
                keyExtractor={(article, id) => id.toString()}
                renderItem={data => this.renderMagazineCards(data)}
              />
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
    flex: 1
  },
  body: {
    flex: 1
  },
});