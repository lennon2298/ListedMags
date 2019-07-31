import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import LoginForm from './screens/LoginForm';
import LoginHome from './screens/LoginHome';
import SignupForm from './screens/SignupForm';
import Home from './screens/Home';

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

const AppNavigator = createStackNavigator({
  Home: {
    screen: LoginHome
  }
},
{
  initialRouteName: "Home",
  headerMode: 'none',
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