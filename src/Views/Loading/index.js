import React, {Component} from 'react';
import { View, Text } from 'native-base';
import { ActivityIndicator, StyleSheet } from 'react-native';
import firebase, {User} from 'firebase';
import { connect } from 'react-redux';
import { actions, States } from '../../Modules';

class Loading extends Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user:User) => {
            if(user){
                this.props.sessionUserActive(user.email,user.displayName);
                this.props.navigation.navigate('Feed');
                return;
            }
            this.props.navigation.navigate('Home');
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Carregando</Text>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sessionUserActive: (nome,email) => dispatch(actions.autenticacao.sessionUserActive(nome,email))
    };
}

function mapStateToProps(state : States) {
    const logged = state.autenticacao.logged;
    return {
        logged
    }
}

Loading = connect(
    mapStateToProps,
    mapDispatchToProps
)(Loading);

export default Loading;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
