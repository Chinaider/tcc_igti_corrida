import React,{Component} from 'react';
import { View, Text, Button, Icon } from 'native-base';
import { Dimensions } from 'react-native';
import  LinearGradient  from 'react-native-linear-gradient';
import moment from 'moment';
import styles  from './style';
import { connect } from 'react-redux';
import { actions, States } from '../../Modules';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

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
            <View style={styles.card}  shadowColor={'#000'} shadowOffset={{width: 0, height: 10}} shadowOpacity={0.4} shadowRadius={20}>
                <LinearGradient pointerEvents="none" colors={ ['rgba(252, 252, 252,0)', 'rgba(252, 252, 252,0.8)', 'rgba(252, 252, 252,1)', 'rgba(252, 252, 252,1)'] } style={ { height: 20, position: 'absolute', top: -10, left: 0, right: 0 } } />
                { (startWalk) ? this.telaPararCorrida() :  this.telaIniciarCorrida()}
            </View>
        );
    }

    telaIniciarCorrida(){
        const { totalTime, totalDistance, totalPoints } = this.props;
        const distance = (totalDistance == 0) ? '0.00' : totalDistance;
        const time = (totalTime == 0) ? '00:00:00' : totalTime;
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
                    <Text style={{fontSize: 44, color: '#f8664f'}}>{totalPoints}</Text>
                </View>
                <View style={styles.cardContent}>
                    <View style={{flex: 1,alignItems: 'flex-start'}}>
                        <Text style={styles.cardLabel}>DISTÂNCIA TOTAL</Text>
                        <Text style={[styles.cardText,{alignItems:'center'}]}>
                            {distance}
                            <Text style={styles.cardTextSmall}>KM</Text>
                        </Text>
                    </View>
                    <View style={{flex: 1,alignItems: 'flex-end'}}>
                        <Text style={styles.cardLabel}>TEMPO TOTAL</Text>
                        <Text style={styles.cardText}>
                            {time}
                        </Text>
                    </View>
                </View>
                <View style={styles.cardContent}>
                    <Button large rounded iconRight disabled={(!this.props.mapReady)} style={styles.buttonRed} onPress={() => this.props.iniciarCorrida()}>
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
                        <Text style={ [styles.text, { fontSize: 34, color: '#f8664f' }] }>{this.props.points} <Icon style={{fontSize: 18,color:'#f8664f' }} type={"FontAwesome5"} name="gem"/></Text>
                        <Text style={ [styles.text, { fontSize: 22,color: '#adadad'}] }>
                            <Icon style={[styles.text, { fontSize: 22,color: '#adadad' }]} name="timer"/> {show}
                        </Text>
                    </View>
                </View>
                <View style={styles.cardContent}>
                    <Button large rounded iconRight style={styles.buttonRed} onPress={() => this.parar(time,this.props.km,this.props.points,moment().format(),this.props.uid)}>
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


    parar(time,distance,points,date,uid){
        const timeString = (!time)  ? '00:00:00' : time.format('HH:mm:ss');
        this.stopTimer();
        const {totalTime, totalPoints, totalDistance} = this.props;
        this.props.pararCorrida(timeString,distance,points,date,uid,totalTime,totalPoints,totalDistance);
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
        pararCorrida: (time,distance,points,date,uid,totalTime,totalPoints,totalDistance) => dispatch(actions.map.stopWalk(time,distance,points,date,uid,totalTime,totalPoints,totalDistance))
    };
}

function mapStateToProps(state : States) {
    const {startWalk, region} = state.map;
    const { uid, totalDistance, totalPoints, totalTime } = state.autenticacao;
    return {
        startWalk,
        region,
        uid,
        totalDistance,
        totalPoints,
        totalTime
    };
}

MapDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(MapDetails);

export default MapDetails;
