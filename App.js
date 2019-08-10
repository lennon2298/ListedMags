import React from 'react';
import {
  Image,
  TouchableOpacity
} from 'react-native';
import { 
  createStackNavigator, createDrawerNavigator, 
  createAppContainer, createSwitchNavigator, 
  DrawerActions } from "react-navigation";
import LoginForm from './screens/LoginForm';
import LoginHome from './screens/LoginHome';
import SignupForm from './screens/SignupForm';
import Home from './screens/Home';
import NewHome from './screens/NewHome';

const LoginNavigator = createStackNavigator(
  {
    Home: Home,
    LoginHome: LoginHome,
    LoginPage: LoginForm,
    SignupPage: SignupForm
  },
  {
    initialRouteName: "LoginHome",
    headerMode: 'none',
  }
);

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Home,
    },
    NewHome: {
      screen: NewHome,
    },
  },
  {
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
    DrawerStack: { screen: DrawerNavigator,  }
  }, 
  {
    headerMode: 'float',
    defaultNavigationOptions: ({navigation}) => ({
      headerTitle: (
        <Image source={require('./res/logo.png')} resizeMode={'contain'} 
          style={{width: "50%", alignSelf: "center", marginHorizontal: "20%"}} />
      ),
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Image source={require('./res/drawer.png')} style={{marginLeft: 10}} />
        </TouchableOpacity>
      ),
      headerRight: (
        <Image source={require('./res/subscribe.png')} style={{marginRight: 10}} />
      ),
    }),
  }
);

export default createAppContainer(createSwitchNavigator(
  {
    App: AppNavigator,
    Auth: LoginNavigator,
  },
  {
    initialRouteName: 'Auth',
  }
));