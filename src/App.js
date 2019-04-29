import React, {Component} from 'react';
import RootStack from './Config/Routes';


/**
 * Redux
 **/
import { Provider } from 'react-redux';
import  configureStore  from './Config/Store';

/**
 * Tema
 */
import { Root, StyleProvider } from 'native-base';
import material from './Config/Temas/variables/material';
import getTheme from './Config/Temas/components';


type Props = {};
export default class App extends Component<Props> {

  constructor(){
      super();

      this.state = {
        store: configureStore(() => {})
      };
  }

  render() {
    return (
        <StyleProvider style={getTheme(material)}>
            <Provider store={this.state.store}>
                <Root>
                    <RootStack/>
                </Root>
            </Provider>
        </StyleProvider>
    );
  }
}

function mapStateToProps(state) {
    
}

function mapDispatchToProps(dispatch) {
    return {
        doLogin: (usuario,senha) => dispatch(actions)
    }
}

