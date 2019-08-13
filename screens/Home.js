import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import {
  Header,
  Container,
  Input,
  Item,
  Button,
  Left,
  Card,
  CardItem,
  Thumbnail,
} from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleDictionary: [],
      addDictionary: [],
      categoryDictionary: [],
      pollDictionary: [],
      reloadKey: 0,
      blogData: false,
      addsData: false,
      userTokenId: [],
    }
  }
  async componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen;
    await AsyncStorage.getItem('user_id').then((userId) => {
      if (userId) {
        this.setState({ userTokenId: JSON.parse(userId) });
        console.log(this.state.userTokenId);
        axios.defaults.headers.common['Authorization'] = "Token " + this.state.userTokenId.key;
        console.log(axios.defaults.headers.common.Authorization);
      }
    });

    await this.handleCategoryRequest();
    this.handleArticleRequest();
    this.handleAddRequest();
    this.handlePollRequest();
    SplashScreen.hide();
  }

  async handleArticleRequest() {
    const instance = axios.create({
      baseURL: 'http://192.168.2.209:8000/',
      timeout: 1500,
    });
    console.log("lolol");
    await instance
      .get('blog/', {}, { withCredentials: true })
      .then(async response => {
        await this.setState({ articleDictionary: response.data });
        console.log(response);
        console.log("XD");
        console.log(this.state.articleDictionary);
        this.setState({ blogData: true });
      })
      .catch(error => console.log(error));
    //this.checkLoginAuth();
    //this.render();
  }

  async handleAddRequest() {
    //const endpoint = this.props.create ? 'register' : 'login';
    const instance = axios.create({
      baseURL: 'http://192.168.2.209:8000/',
      timeout: 1500,
    });

    //alert("xs");
    console.log("lolol");
    await instance
      .get('adds/')
      .then(async response => {
        //this.state.articleDictionary = responseJson.data;
        await this.setState({ addDictionary: response.data });
        console.log(response);
        console.log("XD");
        console.log(this.state.addDictionary);
        this.setState({ addData: true });
      })
      .catch(error => console.log(error));
    //this.checkLoginAuth();
    //this.render();
  }

  async handleCategoryRequest() {
    //const endpoint = this.props.create ? 'register' : 'login';
    const instance = axios.create({
      baseURL: 'http://192.168.2.209:8000/',
      timeout: 1500,
    });

    //alert("xs");
    console.log("lolol");
    await instance
      .get('blog/categories')
      .then(async response => {
        //this.state.articleDictionary = responseJson.data;
        await this.setState({ categoryDictionary: response.data });
        console.log(response);
        console.log("XD");
        console.log(this.state.categoryDictionary);
        this.setState({ categoryData: true });
      })
      .catch(error => console.log(error));
    //this.checkLoginAuth();
    //this.render();
  }

  async handlePollRequest() {
    //const endpoint = this.props.create ? 'register' : 'login';
    const instance = axios.create({
      baseURL: 'http://192.168.2.209:8000/',
      timeout: 1500,
    });

    //alert("xs");
    console.log("lolol");
    await instance
      .get('polls/')
      .then(async response => {
        //this.state.articleDictionary = responseJson.data;
        await this.setState({ pollDictionary: response.data });
        console.log(response);
        console.log("XD");
        console.log(this.state.pollDictionary);
      })
      .catch(error => console.log(error));
    //this.checkLoginAuth();
    //this.render();
  }

  resetBlogFetch() {
    this.setState({ blogData: false });
    //continue;
  }

  renderArticleCards = (data) => {
    return (
      <TouchableWithoutFeedback onPress={() => { }}>
        <Card style={{ margin: "5%", marginHorizontal: "5%" }}>
          <CardItem>
            <Thumbnail square large source={{ uri: data.item.post_img }} />
            <View style={{ marginHorizontal: "5%", }}>
              <Text style={{ fontWeight: "700", fontSize: 22, }}>
                {console.log(data.item.title)}
                {data.item.title}
              </Text>
              <Text >
                {console.log(data.item.post_cat)}
                {this.state.categoryDictionary[data.item.post_cat].cat_name}
              </Text>
            </View>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
    )
  }

  renderAddsCards = (data) => {
    return (
      <TouchableOpacity onPress={() => { }}>
        <Card style={{ marginHorizontal: "5%", }}>
            {console.log(data.item.thumbnail)}
              <Image source={{ uri: data.item.thumbnail }}
                style={{ resizeMode: "cover", 
                height: Dimensions.get('window').height * 0.17, width: Dimensions.get('window').width * 0.5 }} />
        </Card>
      </TouchableOpacity>
    )
  }

  renderPollCards = (data) => {
    return (
      <View style={{width: Dimensions.get('window').width/1.4}} >
        <TouchableOpacity onPress={() => this.renderPollView(data.item.id)} >
          <Card style={{ marginVertical: "3%", marginHorizontal: "2%" }}>
            <CardItem>
              <View style={{ flex: 1 }}>
                <Text style={{fontWeight: "700", fontSize: 18}}>
                  {data.item.question_text}
                </Text>
              </View>
              <Text>
                {data.item.responses}
              </Text>
            </CardItem>
          </Card>
        </TouchableOpacity>
      </View>
    )
  }

  renderPollView(data) {
    this.props.navigation.navigate('PollView', {pollData : data})
  }

  renderCategoryCard = (data) => {
    return (
      <TouchableOpacity onPress={() => { }}>
        <CardItem>
          {console.log(data.item.thumbnail)}
          <Thumbnail large source={{ uri: data.item.thumbnail }} />
        </CardItem>
      </TouchableOpacity>
    )
  }

  render() {
    if (!this.state.blogData && !this.state.addsData) {
      return (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}
        accessible={false} key={this.state.reloadKey}>
        <Container>
          <Header searchBar rounded>
            <Item>
              <Input placeholder="Search" />
            </Item>
            <Left>
              <Button light rounded full style={styles.buttonStyle}>
                <Text>Search</Text>
              </Button>
            </Left>
          </Header>
          <View>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              decelerationRate={0}
              snapToAlignment={"center"}
              data={this.state.addDictionary}
              extraData={this.state}
              keyExtractor={(article, id) => id.toString()}
              renderItem={data => this.renderAddsCards(data)}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.pollHeader}>
              Polls
            </Text>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              decelerationRate={0}
              snapToAlignment={"center"}
              data={this.state.pollDictionary}
              extraData={this.state}
              keyExtractor={(article, id) => id.toString()}
              renderItem={data => this.renderPollCards(data)}
            />
            <Card>
              <Text style={styles.cardHeader}>Categories</Text>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                decelerationRate={0}
                snapToAlignment={"center"}
                data={this.state.categoryDictionary}
                extraData={this.state}
                keyExtractor={(article, id) => id.toString()}
                renderItem={data => this.renderCategoryCard(data)}
              />
            </Card>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.articleDictionary}
              extraData={this.state}
              keyExtractor={(article, id) => id.toString()}
              renderItem={data => this.renderArticleCards(data)}
            />
          </ScrollView>
        </Container>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginLeft: "7%",
    height: "71%"
  },
  cardHeader: {
    marginHorizontal: "5%",
    fontWeight: "700",
    marginTop: "1%",
  },
  pollHeader: {
    marginHorizontal: "5%",
    fontWeight: "700",
    marginTop: "1%",
    fontSize: 18,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});