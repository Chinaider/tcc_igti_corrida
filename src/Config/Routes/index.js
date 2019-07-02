import { createStackNavigator, createAppContainer } from 'react-navigation';

//telas
import Autenticacao  from './../../Views/Autenticacao';
import Cadastro from './../../Views/Cadastro';
import Home from './../../Views/Home';
import Feed from './../../Views/Feed';

const AppNavigator = createStackNavigator(
    {
        Login: { screen: Autenticacao },
        Cadastro: { screen: Cadastro },
        Home: { screen: Home },
        Feed: { screen: Feed }
    },
    {
        index: 0,
        initialRouteName: "Feed",
        headerMode: "none"
    }
);
const RootStack = createAppContainer(AppNavigator);
export default RootStack;
