import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Dimensions,
  FlatList,
  AsyncStorage
} from 'react-native';
import {
  Thumbnail,
} from 'native-base';
import { format } from 'date-fns';
import AutoHeightWebView from 'react-native-autoheight-webview'
import Button from 'apsl-react-native-button';
import axios from 'axios';
// import AsyncStorage from '@react-native-community/async-storage';

export default class ArticleView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleData: [],
      dateCreated: new Date(),
      date: "",
      commentData: [],
      newComment: "",
      userEmailId: "",
      reloadComments: false,
    }
  }
  async componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen;
    await this.setState({ articleData: this.props.navigation.state.params.articleData.item });
    await AsyncStorage.getItem('user_email').then((userEmail) => {
      if (userEmail) {
        this.setState({ userEmailId: userEmail });
        // console.log("User email: " + this.state.userEmailId);
      }
    });
    var date = new Date(this.state.articleData.created_at);
    this.setState({ dateCreated: new Date(date) });
    // console.log(this.state.dateCreated)
    this.setState({ date: format(this.state.dateCreated, 'Do MMM') });
    await this.handleCommentRequest();
  }

  async handleCommentRequest() {
    const instance = axios.create({
      baseURL: 'http://165.22.213.1/',
      timeout: 1500,
    });
    // console.log("lolol");/
    await instance
      .get('blog/' + this.state.articleData.id + '/comments/', {}, { withCredentials: true })
      .then(async response => {
        await this.setState({ commentData: response.data });
        // console.log(response);
        // console.log("XD");
        // console.log(this.state.commentData);
        this.setState({ blogData: true });
      })
      .catch(async error => {
        // console.log(error);
        await this.handleCommentRequest();
      });
    //this.checkLoginAuth();
    //this.render();
  }

  renderComments = (data) => {
    return (
      <View style={{ flexDirection: "row", marginBottom: "2%", alignContent: "flex-start" }}>
        <Thumbnail small source={require('../res/avatar.jpg')} />
        <View flexDirection="column">
          <Text style={{ marginHorizontal: "5%", justifyContent: "center", color: "#208de1ff" }}>
            {data.item.author}
          </Text>
          <Text style={{ marginHorizontal: "5%", justifyContent: "center" }}>
            {data.item.text}
          </Text>
        </View>
      </View>
    )
  }

  async handleCommentPost() {
    if (this.state.newComment == '') {
      return
    }
    else {
      const instance = axios.create({
        baseURL: 'http://165.22.213.1/',
        timeout: 1500,
      });
      // console.log("lolol");
      const commentData = {
        text: this.state.newComment,
        user: this.state.userEmailId,
      };

      await instance
        .post('blog/' + this.state.articleData.id + '/comments/post/', commentData)
        .then(async response => {
          //await this.setState({ commentData: response.data });
          // console.log(response);
          // console.log("XD comment posted");
          //console.log(this.state.commentData);
          this.setState({ newComment: "" });
          await this.handleCommentRequest();
          this.setState({ reloadComments: !this.state.reloadComments })
        })
        .catch(error => console.log(error));
      //this.checkLoginAuth();
      //this.render();
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>
              {/* {console.log(this.state.articleData)} */}
              {this.state.articleData.title}
            </Text>
          </View>
          <View style={styles.articleImage}>
            <Image source={{ uri: this.state.articleData.post_img }} style={styles.titleImage} />
          </View>
          <Text style={styles.authorText}>
            {'Author: ' + this.state.articleData.author}
          </Text>
          <Text>
            {this.state.date}
          </Text>
          <View style={{ flex: 0.06 }}></View>
          <AutoHeightWebView
            bounces={false}
            scrollEnabled={true}
            source={{ html: this.state.articleData.content }}
            scalesPageToFit={false}
            style={{ width: "99%" }}
          />
          {/* {console.log(this.state.articleData.content)} */}
          <Text style={styles.commentHeader}>
            {'Comments: '}
          </Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.commentData}
            extraData={this.state.reloadComments}
            keyExtractor={(article, id) => id.toString()}
            renderItem={data => this.renderComments(data)}
          />
          <View style={{ flexDirection: "row", marginTop: "3%", }}>
            <Thumbnail small source={require('../res/avatar.jpg')} />
            <View style={{ flex: 1, alignItems: "stretch" }}>
              <TextInput placeholder={"Type Something"} autoCapitalize={"none"} autoCorrect={false}
                style={styles.inputText} onChangeText={(text) => this.setState({ newComment: text })}
                value={this.state.newComment} multiline={true} numberOfLines={4} />
            </View>
          </View>
          <Button style={styles.commentButton} textStyle={styles.buttonText}
            onPress={() => this.handleCommentPost()}>
            Post
            </Button>
        </ScrollView>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    marginHorizontal: "7%",
  },
  titleView: {
    marginTop: "5%",
    marginBottom: "2%"
  },
  titleText: {
    fontWeight: "700",
    fontSize: 27,
    textTransform: "capitalize"
  },
  articleImage: {
    height: Dimensions.get('window').height * 0.25,
    width: Dimensions.get('window').width * 0.86,
    alignSelf: "center",
    backgroundColor: "blue",
    justifyContent: "center",
    alignContent: "center"
  },
  inputText: {
    flex: 1,
    borderWidth: 1,
    alignSelf: "center",
    borderRadius: 6,
    marginHorizontal: "2%",
    textAlignVertical: 'top',
    marginBottom: "2%",
    alignItems: "stretch",
    width: "96%"
  },
  titleImage: {
    flex: 1,
    resizeMode: "cover",
  },
  commentButton: {
    shadowColor: 'rgba(0, 128, 255, 0.21)',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 25,
    borderRadius: 25,
    borderColor: "#208de1",
    backgroundColor: '#208de1',
    width: "30%",
    alignSelf: "flex-end",
    marginRight: "2.5%"
  },
  authorText: {
    color: '#208de1ff',
    marginVertical: "2%"
  },
  commentHeader: {
    marginVertical: "2%",
    fontSize: 22
  },
  buttonText: {
    color: "white",
    fontWeight: "700"
  },
});