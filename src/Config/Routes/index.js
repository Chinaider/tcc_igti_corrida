import { createStackNavigator, createAppContainer } from 'react-navigation';

//telas
import Autenticacao  from './../../Views/Autenticacao';
import Cadastro from './../../Views/Cadastro';
import Home from './../../Views/Home';

const AppNavigator = createStackNavigator(
    {
        Login: { screen: Autenticacao },
        Cadastro: { screen: Cadastro },
        Home: { screen: Home }
    },
    {
        index: 0,
        initialRouteName: "Home",
        headerMode: "none"
    }
);
const RootStack = createAppContainer(AppNavigator);
export default RootStack;
