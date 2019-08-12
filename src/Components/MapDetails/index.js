import React,{Component} from 'react';
import { View, Text, Button, Icon } from 'native-base';
import  LinearGradient  from 'react-native-linear-gradient';
import moment from 'moment';
import styles  from './style';
import { connect } from 'react-redux';
import { actions, States } from '../../Modules';

class MapDetails extends Component{

    constructor(props){
        super(props);
        this.state = {
            timer: null,
            start: 0,
            time: 0
        };
    }
    render(){
        const { startWalk } = this.props;
        (startWalk) ? this.startTimer() : this.stopTimer();
        return (
            <View style={styles.card} shadowColor={'#000'} shadowOffset={{width: 0, height: 10}} shadowOpacity={0.4} shadowRadius={20}>
                <LinearGradient pointerEvents="none" colors={ ['rgba(252, 252, 252,0)', 'rgba(252, 252, 252,0.8)', 'rgba(252, 252, 252,1)', 'rgba(252, 252, 252,1)'] } style={ { height: 20, position: 'absolute', top: -10, left: 0, right: 0 } } />
                { (startWalk) ? this.telaPararCorrida() :  this.telaIniciarCorrida()}
            </View>
        );
    }

    telaIniciarCorrida(){
        return (
            <View>
                <View style={styles.cardHeader}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.cardLabel}>PONTOS ACUMULADOS</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.cardContent}>
                    <Text style={{fontSize: 44, color: '#EC242E'}}>12.035</Text>
                </View>
                <View style={styles.cardContent}>
                    <View style={{flex: 1,alignItems: 'flex-start'}}>
                        <Text style={styles.cardLabel}>DISTÂNCIA TOTAL</Text>
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
                    <Button large rounded iconRight style={styles.buttonRed} onPress={() => this.props.iniciarCorrida()}>
                        <Text style={ styles.buttonRedText }>COMEÇAR</Text>
                    </Button>
                </View>
            </View>
        )
    }

    telaPararCorrida(){
        const { time } = this.state;
        const show = (!time) ? '00:00:00' : time.format('HH:mm:ss');
        return (
            <View>
                <View style={styles.cardContent}>

                    <View style={{flex: 4,alignItems: 'flex-start',left:0,position: 'relative'}}>
                        <Text style={ [styles.text, { fontSize: 58,textAlign: 'left' }] }>{this.props.km}
                            <Text style={ [styles.text, { fontSize: 34 }] }> KM</Text>
                        </Text>
                    </View>

                    <View style={{flex:3,alignItems: 'flex-end'} }>
                        <Text style={ [styles.text, { fontSize: 34, color: '#f02733' }] }>{this.props.points} <Icon style={{fontSize: 18,color:'#f02733' }} type={"FontAwesome5"} name="gem"/></Text>
                        <Text style={ [styles.text, { fontSize: 22,color: '#adadad'}] }>
                            <Icon style={[styles.text, { fontSize: 22,color: '#adadad' }]} name="timer"/> {show}
                        </Text>
                    </View>
                </View>
                <View style={styles.cardContent}>
                    <Button large rounded iconRight style={styles.buttonRed} onPress={() => this.props.pararCorrida()}>
                        <Text style={ styles.buttonRedText }>PARAR</Text>
                    </Button>
                </View>
            </View>
        );
    }

    startTimer(){
        if(this.state.timer == null){
            const start = moment();
            const timer = setInterval(() => {
                let diffNow = moment().diff(start);
                this.setState({time:moment.utc(diffNow)});
            },1000);
            this.setState({start: start,timer:timer});
        }
    }

    stopTimer(){
        if(this.state.timer){
            clearInterval(this.state.timer);
            this.setState({
                timer: null,
                start: 0,
                time: 0
            });
        }
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
