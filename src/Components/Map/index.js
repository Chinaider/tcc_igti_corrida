import React, {Component} from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { actions, States } from '../../Modules';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import MapDetails from '../MapDetails';
import Directions from '../Directions';

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

    render(){
        this.comecarCorrida();
        const { coordinates , region ,  startWalk } = this.props;
        return (
            <View style={{flex:1}}>
                <MapView
                    style={{flex:1}}
                    initialRegion={region}
                    showsUserLocation={true}
                    loadingEnabled={true}
                    loadingIndicatorColor="#FFFFFF"
                    loadingBackgroundColor="#000000"
                    rotateEnabled={false}
                    scrollEnabled={false}
                    pitchEnabled={false}
                >
                    {(startWalk && coordinates && coordinates.length >= 1) && (
                        <Directions
                            origin={coordinates[0]}
                            waypoints={(coordinates.length > 2) ? coordinates.slice(1,-1) : null}
                            destination={coordinates[coordinates.length-1]}
                            onReady={() => {}}
                        />
                    )}
                </MapView>
                <MapDetails/>
            </View>
        )
    }

    comecarCorrida(){
        if(this.props.startWalk){
            this.watchID = navigator.geolocation
                .watchPosition(({coords: {latitude, longitude}}) => {
                    if(this.props.coordinates.length >= 1){
                        const { coordinates } = this.props;
                        const newCoordinate = {
                            latitude,
                            longitude,
                            latitudeDelta,
                            longitudeDelta
                        };
                        if(coordinates.length === 1){
                            this.props.setRegion(newCoordinate);
                        }
                        coordinates.push(newCoordinate);
                        this.props.setCoordinates(coordinates);
                    }
                }
                ,(error) => {console.log(error)}
                ,{
                    timeout: 2000,
                    enableHighAccuracy: true,
                    maximumAge: 1000,
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
                this.props.setRegion({
                    latitude,
                    longitude,
                    latitudeDelta,
                    longitudeDelta,
                });
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
