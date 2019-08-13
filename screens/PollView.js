import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  ActivityIndicator
} from 'react-native';
import Button from 'apsl-react-native-button'
import axios from 'axios';

export default class PollView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pollData: [],
      choicesDictionary: [],
      responseDictionary: [],
      pollRecieved: false,
      choicesRecieved: false,
      choiceSelected: false,
      choiceIterator: 0,
    }
  }
  async componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen;
    this.handlePollRequest();
    this.handleChoiceRequest();
  }

  async handlePollRequest() {
    //const endpoint = this.props.create ? 'register' : 'login';
    const instance = axios.create({
      baseURL: 'http://192.168.2.209:8000/polls',
      timeout: 1500,
    });

    //alert("xs");
    console.log("lolol");
    await instance
      .get('/' + this.props.navigation.state.params.pollData + '/')
      .then(async response => {
        //this.state.articleDictionary = responseJson.data;
        await this.setState({ pollData: response.data });
        console.log(response);
        console.log("XD");
        console.log(this.state.pollData);
        this.setState({ pollRecieved: true });
      })
      .catch(error => console.log(error));
    //this.checkLoginAuth();
    //this.render();
  }

  async handleChoiceRequest() {
    //const endpoint = this.props.create ? 'register' : 'login';
    const instance = axios.create({
      baseURL: 'http://192.168.2.209:8000/polls',
      timeout: 1500,
    });

    //alert("xs");
    console.log("lolol");
    await instance
      .get(+this.props.navigation.state.params.pollData + '/choices/')
      .then(async response => {
        //this.state.articleDictionary = responseJson.data;
        await this.setState({ choicesDictionary: response.data });
        console.log(response);
        console.log("XD");
        console.log(this.state.choicesDictionary);
        this.setState({ choicesRecieved: true });
      })
      .catch(error => console.log(error));
    //this.checkLoginAuth();
    //this.render();
  }

  async handleChoiceSubmit(choice) {
    //const endpoint = this.props.create ? 'register' : 'login';
    const instance = axios.create({
      baseURL: 'http://192.168.2.209:8000/polls',
      timeout: 1500,
    });

    //alert("xs");
    console.log("lolol");
    console.log(choice)
    const url = '/' + this.props.navigation.state.params.pollData + '/choices/' + choice + '/';
    console.log('http://192.168.2.209:8000/polls' + url);
    await instance
      .post(url, { withCredentials: true })
      .then(async response => {
        //this.state.articleDictionary = responseJson.data;
        await this.setState({ responseDictionary: response.data });
        console.log(response);
        console.log("XD");
        console.log(this.state.responseDictionary);
        await this.setState({choiceSelected: true})
      })
      .catch(error => console.log(error));
    //this.checkLoginAuth();
    //this.render();
  }

  renderChoiceButtons(data) {
    if(this.state.choiceSelected){
      return(
        <Button style={styles.choiceButton} textStyle={styles.buttonText}
        onPress={() => {}}>
        {console.log(data.item)}
        {console.log(this.state.responseDictionary[data.index].votes)}
        {data.item.choice + '     \tvotes: ' + this.state.responseDictionary[data.index].votes}
        </Button>
      )
    }
    return(
      <Button style={styles.choiceButton} textStyle={styles.buttonText}
      onPress={() => this.handleChoiceSubmit(data.item.id)}>
      {console.log(data)}
      {data.item.choice}
      </Button>
    )
  }
  

  render() {
    if (!this.state.pollRecieved && !this.state.choicesRecieved) {
      return (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={"#208de1"}></StatusBar>
        <View style={styles.headerView}>
          <Text style={styles.headerText} >Polls</Text>
        </View>
        <View style={styles.pollCard}>
          <View style={styles.pollQues}>
            <Text style={styles.pollText}>
              {"Q. " + this.state.pollData.question_text}
            </Text>
          </View>
          <View style={styles.pollChoices}>
            <View style={styles.buttonChoices}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.choicesDictionary}
                extraData={this.state}
                keyExtractor={(article, id) => id.toString()}
                renderItem={(data, keyExtractor) => this.renderChoiceButtons(data, keyExtractor)}
              />
            </View>
          </View>
        </View>
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
  pollText: {
    fontWeight: "700",
    fontSize: 24,
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
  pollCard: {
    marginVertical: "7%",
    alignSelf: "center",
    width: Dimensions.get('window').width/1.15,
    height: Dimensions.get('window').height/2.2,
    shadowColor: 'rgba(14, 12, 25, 0.31)',
    shadowRadius: 10,
    borderRadius: 25,
    borderColor: 'rgba(14, 12, 25, 0.21)',
    borderWidth: 1,
    elevation: 2,
  },
  pollQues: {
    margin: "4%",
  },
  pollChoices: {
    flex: 1, 
    justifyContent: "flex-end"
  },
  buttonChoices: {
    alignContent: "flex-start",
    justifyContent: "flex-end",
    marginHorizontal: "4%",
    alignSelf: "auto"
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  choiceButton: {
    shadowColor: 'rgba(0, 128, 255, 0.21)',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 25,
    borderRadius: 25,
    borderColor: "#208de1",
    backgroundColor: '#208de1',
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