import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  FlatList,
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
import Cards from './Card'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleDictionary: [],
      reloadKey: 0,
      title: "adniandw",
      blogData: false,
      blogIterator: 0,
      blogLength: 0,
    }
  }
  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    // setTimeout(() => this.handleArticleRequest(), 1000);
    //this.setState({blogData: false});
    this.handleArticleRequest();
  }

  async handleArticleRequest() {
    //const endpoint = this.props.create ? 'register' : 'login';
    const instance = axios.create({
      baseURL: 'http://192.168.43.228:8000/',
      timeout: 1500,
    });

    //alert("xs");
    console.log("lolol");
    await instance
      .get('blog/')
      .then(async response => {
        //this.state.articleDictionary = responseJson.data;
        await this.setState({ articleDictionary: response.data });
        //this.state.articleDictionary = JSON.parse(response.data);
        //AsyncStorage.setItem('user_id', JSON.stringify(response.data));
        //const user = AsyncStorage.getItem('user_id');
        //console.log(user.key);
        // We set the returned token as the default authorization header
        //axios.defaults.headers.common.Authorization = this.state.token;
        console.log(response);
        console.log("XD");
        console.log(this.state.articleDictionary);
        console.log(this.state.articleDictionary[0].post_cat);
        var len = Object.keys(this.state.articleDictionary).length;
        console.log(len);
        this.setState({ blogLength: len });
        //this.setState({loginAuth: true});
        //console.log(axios.defaults.headers.common.Authorization.key);
        //this.props.navigation.navigate('Home');
        this.setState({ blogData: true });
      })
      .catch(error => console.log(error));
    //this.checkLoginAuth();
    //this.render();
  }

  resetBlogFetch() {
    this.setState({ blogData: false });
    //continue;
  }


  render() {
    if (!this.state.blogData) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} key={this.state.reloadKey}>
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
              data={this.state.articleDictionary}
              extraData={this.state}
              keyExtractor={(article, id) => id.toString()}
              renderItem={data =>
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
                        {data.item.post_cat}
                      </Text>
                    </View>
                  </CardItem>
                </Card>
              }
            />
          </View>
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
});