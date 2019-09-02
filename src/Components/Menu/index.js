import React, {Component} from 'react';
import { Alert } from 'react-native';
import { Icon,View, Text, Drawer, List, ListItem, Left, Right,Content } from "native-base";
import { connect } from 'react-redux';
import { actions, States } from '../../Modules';
import styles from './style';

class SideBar extends Component {


    logout(){
        Alert.alert(
            'Sair da aplicação',
            'Tem certeza que deseja sair?',
            [
                {
                    text: 'Não',
                    style: 'cencel',
                    onPress: () => {}
                },
                {
                    text:'Sim',
                    onPress: () => this.props.userLogout()
                }
            ]
        );
    }

    render(){
        return (
            <View style={[ styles.container, { backgroundColor: '#fff' } ]}>
                <Content>
                    <List>
                        <ListItem>
                            <Left>
                                <Text>Historico</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text>Usar Pontos</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem button onPress={() => { this.logout() }}>
                            <Left>
                                <Text style={{color: 'red'}}>Sair</Text>
                            </Left>
                            <Right>
                                <Icon type="Ionicons" name="log-out" />
                            </Right>
                        </ListItem>
                    </List>
                </Content>
                <View style={{position:'absolute',bottom:5,right:5}}>
                    <Text style={{fontSize: 9,color:"#b6b6b6"}}>Versão 1.0</Text>
                </View>
            </View>
        );
    }
};

function mapDispatchToProps(dispatch) {
    return {
        userLogout: () => dispatch(actions.autenticacao.logOutUser())
    };
};

function mapStateToProps(state : States) {return {};};

SideBar = connect(mapStateToProps,mapDispatchToProps)(SideBar);

export default class Menu extends Component{

    componentDidMount() {
        this.props.onRef(this);
    }
    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };

    render() {
        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SideBar navigator={this.navigator} />}
                onClose={() => this.closeDrawer()}>
                {this.props.children}
            </Drawer>
        );
    }
}

