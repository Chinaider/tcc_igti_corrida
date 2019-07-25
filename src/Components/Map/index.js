import React, {Component} from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { actions, States } from '../../Modules';
import MapView, {  Marker, AnimatedRegion, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import MapDetails from '../MapDetails';

const latitudeDelta = 0.0143;
const longitudeDelta = 0.0134;

class Map extends Component{

    constructor(props){
        super(props);
    }

    async componentDidMount(): void {
        this.pegarPosicaoAtual();
    }

    componentWillUnmount() {
       this.pararCorrida();
    }

    direcao(){
        const {  startWalk, coordinates, region } = this.props;
        if(!startWalk || coordinates.length == 0){
            return;
        }//animated cordinate
        return (
            <View>
                <Polyline coordinates={Object.assign([],coordinates)}  strokeWidth={3} />
            </View>
        );
    }

    render(){
        this.comecarCorrida();
        const {  region } = this.props;
        return (
            <View style={{flex:1}}>
                <MapView
                    style={{flex:1}}
                    initialRegion={region}
                    provider={PROVIDER_GOOGLE}
                    followsUserLocation={true}
                    showsUserLocation={true}
                    loadingEnabled={true}
                    loadingIndicatorColor="#FFFFFF"
                    loadingBackgroundColor="#000000"
                    rotateEnabled={false}
                    scrollEnabled={false}
                    pitchEnabled={false}
                >
                    {this.direcao()}
                </MapView>
                <MapDetails/>
            </View>
        )
    }

    comecarCorrida = () => {
        const { coordinates, startWalk } = this.props;
        if(startWalk){
            this.watchID = navigator.geolocation
                .watchPosition(({coords: {latitude, longitude}}) => {
                    if(coordinates.length >= 1){
                        var last = coordinates[coordinates.length-1];
                        if(last.latitude === latitude && last.longitude === longitude){
                            return;
                        }
                        const newCoordinate = {
                            latitude,
                            longitude
                        };
                        this.props.setCoordinates(coordinates.concat(newCoordinate));
                        console.log('china aqui');
                        console.log(coordinates);

                    }
                }
                ,(error) => {console.log(error)}
                ,{
                        enableHighAccuracy: true,
                        timeout: 2000,
                        maximumAge: 0,
                        distanceFilter: 25
                });
            return;
        }
        this.pararCorrida();
    }

    pararCorrida(){
        if(this.watchID){
            navigator.geolocation.clearWatch(this.watchID);
        }
    }

    pegarPosicaoAtual(){
        navigator.geolocation.getCurrentPosition(
            ({coords: {latitude, longitude}}) => {
                const data = {
                    latitude,
                    longitude,
                    latitudeDelta,
                    longitudeDelta};
                this.props.setRegion(data);
                this.setState({regiao:new AnimatedRegion(data)});
            },
            () => {},
            {
                timeout: 2000,
                enableHighAccuracy: true,
                maximumAge: 1000
            });
    }
}


function mapDispatchToProps(dispatch) {
    return {
        setCoordinates: (coordinates) => dispatch(actions.map.setCoordinates(coordinates)),
        setRegion: (region) => dispatch(actions.map.setRegion(region))
    };
}

function mapStateToProps(state : States) {
    const { region, startWalk, coordinates } = state.map;
    return {
        region,
        startWalk,
        coordinates
    };
};

Map = connect(
    mapStateToProps,
    mapDispatchToProps
)(Map);
export default Map;
