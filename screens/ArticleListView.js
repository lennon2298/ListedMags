import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Card,
  CardItem,
  Thumbnail,
} from 'native-base';
import axios from 'axios';

export default class Magazines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articlesDictionary: [],
      articleData: false,
      categoryDictionary: [],
    }
  }
  async componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    await this.handleCategoryRequest();
    this.handleArticleListRequest();
  }

  async handleCategoryRequest() {
    //const endpoint = this.props.create ? 'register' : 'login';
    const instance = axios.create({
      baseURL: 'http://165.22.213.1/',
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
      .catch(async error => {
          console.log(error);
          await this.handleCategoryRequest();
        });
    //this.checkLoginAuth();
    //this.render();
  }

  async handleArticleListRequest() {
    const instance = axios.create({
      baseURL: 'http://165.22.213.1/',
      timeout: 1500,
    });

    console.log("lolol");
    console.log("Category data prop" + this.props.navigation.state.params.categoryData)
    await instance
      .get('blog/categories/post/list/' + this.props.navigation.state.params.categoryData + '/')
      .then(async response => {
        await this.setState({ articlesDictionary: response.data });
        console.log("Category data prop" + this.props.navigation.state.params.categoryData)
        console.log(response);
        console.log("XD");
        console.log(this.state.articlesDictionary);
        this.setState({ articleData: true });
      })
      .catch(async error => {
          console.log(error);
          await this.handleArticleListRequest();
        });
    //this.checkLoginAuth();
    //this.render();
  }

  renderArticleView(data) {
    this.props.navigation.navigate('ArticleView', {articleData : data})
  }

  renderArticleListCards = (data) => {
    return (
      <TouchableWithoutFeedback onPress={() => this.renderArticleView(data)}>
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
                {console.log(this.state.categoryDictionary[this.props.navigation.state.params.categoryData - 1].cat_name)}
                {this.state.categoryDictionary[this.props.navigation.state.params.categoryData - 1].cat_name}
              </Text>
            </View>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    if (!this.state.articleData) {
      return (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    else if(Object.keys(this.state.articlesDictionary).length === 0){
      return (
        <View style={styles.body}>
          <StatusBar backgroundColor={"#2d808cff"}></StatusBar>
          <View style={styles.headerView}>
            <Text style={styles.headerText} >Articles</Text>
          </View>
          <Card style={{ margin: "5%", marginHorizontal: "5%" }}>
          <CardItem >
            <View style={{alignItems: "center", flex: 1}}>
            <Text>
              No Data Found
            </Text>
            </View>
          </CardItem>
        </Card>
        </View>
      );
    }
    return (
      <View style={styles.body}>
        <StatusBar backgroundColor={"#2d808cff"}></StatusBar>
        <View style={styles.headerView}>
          <Text style={styles.headerText} >Articles</Text>
        </View>
        <FlatList
                horizontal={false}
                showsVerticalScrollIndicator={false}
                decelerationRate={0}
                snapToAlignment={"center"}
                data={this.state.articlesDictionary}
                extraData={this.state}
                keyExtractor={(article, id) => id.toString()}
                renderItem={data => this.renderArticleListCards(data)}
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