import React,{Component} from 'react';
import { Container,Button,Text, Icon, View } from 'native-base';
import style  from './style';
import { connect } from 'react-redux';
import { actions, States } from '../../Modules';

class MapDetails extends Component{

    render(){
        const { startWalk } = this.props;
        return (
            <Container style={style.container}>
                { (startWalk) ? this.telaPatarCorrida() :  this.telaInicarCorrida()}
            </Container>
        );
    }

    telaInicarCorrida(){
        return (
            <View>
                <Text> Começar a Correr </Text>
                <Button large rounded success iconRight style={style.botao} onPress={() => this.props.iniciarCorrida(true,[this.props.region])}>
                    <Text>Iniciar</Text>
                    <Icon name='play'/>
                </Button>
            </View>
        );
    }

    telaPatarCorrida(){
        return (
            <View>
                <Text> Parar de Correr </Text>
                <Button large rounded danger iconRight style={style.botao} onPress={() => this.props.pararCorrida()}>
                    <Text>Parar</Text>
                    <Icon name='pause'/>
                </Button>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        iniciarCorrida:(startWalk:boolean,coordinates:any) => dispatch(actions.map.startWalk(startWalk,coordinates)),
        pararCorrida: () => dispatch(actions.map.stopWalk())
    };
}

function mapStateToProps(state : States) {
    const {startWalk, region} = state.map;
    return {
        startWalk,
        region
    };
}

MapDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(MapDetails);

export default MapDetails;
