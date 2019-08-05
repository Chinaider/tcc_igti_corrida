import React, {Component} from 'react';

/**
 * Rotas
 */
import RootStack from './Config/Routes';


/**
 * Redux
 **/
import { Provider } from 'react-redux';
import  configureStore  from './Config/Store';
import { actions } from './Modules'
/**
 * Tema
 */
import { Root, StyleProvider } from 'native-base';
import material from './Config/Temas/variables/material';
import getTheme from './Config/Temas/components';

/**
 * Firebase
 */
import initializeAppFirebase from './Config/Firebase';

/**
 * Loading
 */
import { Loading } from 'react-native-easy-loading';

type Props = {};
export default class App extends Component<Props> {

  constructor(){
      super();
      this.state = {
        store: configureStore(() => {})
      };
      this.state.store.dispatch(actions.app.checkAccessLocation());
  }

  componentWillMount(): void {
      initializeAppFirebase();
  }

    render() {
    return (
        <StyleProvider style={getTheme(material)}>
            <Provider store={this.state.store}>
                <Root>
                    <RootStack/>
                    <Loading />
                </Root>
            </Provider>
        </StyleProvider>
    );
  }
}

