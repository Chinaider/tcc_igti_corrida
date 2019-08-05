import React,{Component} from 'react';
import { View, Text, Button } from 'native-base';
import Card from './../Card';
import  LinearGradient  from 'react-native-linear-gradient'
import styles  from './style';
import { connect } from 'react-redux';
import { actions, States } from '../../Modules';

class MapDetails extends Component{

    render(){
        const { startWalk } = this.props;
        return (
            <Card>
                <LinearGradient pointerEvents="none" colors={ ['rgba(252, 252, 252,0)', 'rgba(252, 252, 252,0.8)', 'rgba(252, 252, 252,1)', 'rgba(252, 252, 252,1)'] } style={ { height: 20, position: 'absolute', top: -10, left: 0, right: 0 } } />
                <View style={styles.cardHeader}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.cardLabel}>PONTOS ACUMULADOS</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.cardContent}>
                    <Text style={{fontFamily: 'bebas-neue', fontSize: 44, color: '#ec242e'}}>12.035</Text>
                </View>
                <View style={styles.cardContent}>
                    <View style={{flex: 1,alignItems: 'flex-start'}}>
                        <Text style={styles.cardLabel}>DISTANCIA TOTAL</Text>
                        <Text style={[styles.cardText,{alignItems:'center'}]}>
                            27.81
                            <Text style={styles.cardTextSmall}>KM</Text>
                        </Text>
                    </View>
                    <View style={{flex: 1,alignItems: 'flex-end'}}>
                        <Text style={styles.cardLabel}>TEMPO TOTAL</Text>
                        <Text style={styles.cardText}>
                             21:55:11
                        </Text>
                    </View>
                </View>
                <View style={styles.cardContent}>
                    <Button large rounded iconRight style={styles.buttonRed} onPress={() => this.props.iniciarCorrida(true,[this.props.region])}>
                        <Text style={ styles.buttonRedText }>COMEÇAR</Text>
                    </Button>
                </View>
            </Card>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        iniciarCorrida:() => dispatch(actions.map.startWalk()),
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
