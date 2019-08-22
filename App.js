import React from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { 
  createStackNavigator, createDrawerNavigator, 
  createAppContainer, createSwitchNavigator, 
  DrawerActions, DrawerItems } from "react-navigation";
import LoginForm from './screens/LoginForm';
import LoginHome from './screens/LoginHome';
import SignupForm from './screens/SignupForm';
import Home from './screens/Home';
import Magazines from './screens/Magazines';
import AuthLoading from './screens/AuthLoading';
import MagazineView from './screens/MagazineView';
import MagazinePage from './screens/MagazinePage';
import PollView from './screens/PollView';
import ArticleView from './screens/ArticleView';
import ArticleListView from './screens/ArticleListView';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const LoginNavigator = createStackNavigator(
  {
    LoginHome: LoginHome,
    LoginPage: LoginForm,
    SignupPage: SignupForm
  },
  {
    initialRouteName: "LoginHome",
    headerMode: 'none',
  }
);


const DrawerWithLogoutButton = (props) => (
  <ScrollView contentContainerStyle={{flex: 1,  flexDirection: 'column', justifyContent: 'space-between' }}>
    <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
    </SafeAreaView>
    <TouchableOpacity style={{height: "7%", justifyContent: "center", 
      alignItems: "center", backgroundColor: "#208DE1"}} onPress={() => {
        AsyncStorage.clear();
        axios.defaults.headers.common['Authorization'] = '';
        props.navigation.navigate('Auth');
      }} >
      <View>
        <Text style={{color: "#ffffff", fontWeight: "700"}}>
          Logout
        </Text>
      </View>
    </TouchableOpacity>
  </ScrollView>
);

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Home,
    },
    Magazine: {
      screen: Magazines,
    },
  },
  {
    unmountInactiveRoutes: true,
    contentComponent: DrawerWithLogoutButton,
    drawerBackgroundColor: 'rgba(250,250,250,.9)',
    overlayColor: 'rgba(255,255,255,.3)',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#208DE1',
    },
  }
);

const AppNavigator = createStackNavigator(
  {
    DrawerStack: { screen: DrawerNavigator },
    MagazineView: { screen: MagazineView },
    MagazinePage: { screen: MagazinePage },
    PollView: { screen: PollView },
    ArticleView: { screen: ArticleView },
    ArticleListView: { screen: ArticleListView },
  },
  {
    headerMode: 'float',
    defaultNavigationOptions: ({navigation}) => ({
      unmountInactiveRoutes: true,
      headerTitle: (
        <Image source={require('./res/logo.png')} resizeMode={'contain'} 
          style={{width: "50%", alignSelf: "center", marginHorizontal: "20%"}} />
      ),
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Image source={require('./res/drawer.png')} style={{marginLeft: 10}} />
        </TouchableOpacity>
      ),
      
    }),
  }
);

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: AppNavigator,
    Auth: LoginNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));