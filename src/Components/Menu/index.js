import React, {Component} from 'react';
import {Icon,View, Text, Drawer, List, ListItem, Left, Right,Content  } from "native-base";
import styles from './style';

class SideBar extends Component {
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
                        <ListItem>
                            <Left>
                                <Text>Sair</Text>
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
