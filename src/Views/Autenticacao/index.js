import React, {Component} from "react";
import { View, Text } from 'native-base';
import { connect } from 'react-redux';
import { actions, States } from '../../Modules';


class AutenticacaoView extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <View>
                <Text>Autenticação</Text>
            </View>
        )
    }

}

function mapDispatchToProps(dispatch) {
    return {
        doLogin: (usuario,senha) => dispatch(actions.autenticacao.login(usuario,senha))
    };
}


function mapStateToProps(state : States) {
    return {
       email: state.autenticacao.email,
       senha: state.autenticacao.senha
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AutenticacaoView);
