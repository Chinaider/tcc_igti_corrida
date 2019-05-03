import { createStackNavigator, createAppContainer } from 'react-navigation';

//telas
import Autenticacao  from './../../Views/Autenticacao';
import Cadastro from './../../Views/Cadastro';

const AppNavigator = createStackNavigator(
    {
        Login: { screen: Autenticacao },
        Cadastro: { screen: Cadastro }
    },
    {
        index: 0,
        initialRouteName: "Login",
        headerMode: "none"
    }
);

const RootStack = createAppContainer(AppNavigator);

export default RootStack;
