import React, {Component} from 'react';
import { View} from 'react-native';
import { connect } from 'react-redux';
import { actions, States } from '../../Modules';
import MapView, {  Marker, AnimatedRegion, Polyline } from 'react-native-maps';
import MapDetails from '../MapDetails';
import haversine from "haversine";

const latitudeDelta = 0.0143;
const longitudeDelta = 0.0134;
class Map extends Component{

    constructor(props){
        super(props);
        this.state = {
            cords: [],
            distanceTravelled: 0,
            prevLatLng: {},
            initialRegion:{}
        };
    }

    async componentDidMount(): void {
        this.pegarPosicaoAtual();
    }

    componentWillUnmount() {
       this.pararCorrida();
    }

    direcao(){
        const {  startWalk } = this.props;
        if(!startWalk || this.state.cords.length == 0){
            return;
        }
        return (
            <View>
                <Polyline coordinates={Object.assign([],this.state.cords)}  strokeWidth={3} />
            </View>
        );
    }

    render(){
        this.comecarCorrida();
        const {  initialRegion } = this.state;
        if(Object.keys(initialRegion).length == 0){
            return <View/>;
        }
        return (
            <View style={{flex:1}}>
                <MapView
                    style={{flex:1,height: 500,position: 'relative'}}
                    initialRegion={initialRegion}
                    followsUserLocation={true}
                    showsUserLocation={true}
                    loadingEnabled={true}
                    loadingIndicatorColor="#FFFFFF"
                    loadingBackgroundColor="#000000"
                    rotateEnabled={false}
                    scrollEnabled={false}
                    pitchEnabled={false}
                    showsMyLocationButton={false}
                    zoomEnabled={false}
                    zoomTapEnabled={false}
                    zoomControlEnabled={false}
                    showsTraffic={false}
                    ref={el => this.mapView = el}
                >
                    {this.direcao()}
                </MapView>
                <MapDetails/>
            </View>
        )
    }

    comecarCorrida = () => {
        if(this.props.startWalk && !this.watchID){
            this.watchID = navigator.geolocation
                .watchPosition(({coords: {latitude, longitude}}) => {
                    const { distanceTravelled, prevLatLng } = this.state;
                    const newCoordinate = {latitude, longitude};
                    let newCords = Object.assign([],this.state.cords);
                    newCords.push(newCoordinate);
                        if(newCords.length > 2){
                            this.mapView.filToCoordinates(newCords);
                        }
                    this.setState({
                        cords:newCords,
                        distanceTravelled: distanceTravelled + this.calcularDistancia(newCoordinate,prevLatLng),
                        prevLatLng: newCoordinate
                    });

                }
                ,(error) => {console.log(error)}
                ,{
                        enableHighAccuracy: true,
                        timeout: 0,
                        maximumAge: 0,
                        distanceFilter: 25
                });
            return;
        }
    }

    pararCorrida(){
        if(this.watchID){
            navigator.geolocation.clearWatch(this.watchID);
        }
    }

    pegarPosicaoAtual(){
        console.log(navigator);
        navigator.geolocation.getCurrentPosition(
            ({coords: {latitude, longitude}}) => {
                const data = {
                    latitude,
                    longitude,
                    latitudeDelta,
                    longitudeDelta};
                this.setState({initialRegion:data});
            },
            (error) => {console.log(error)},
            {
                timeout: 50000,
                enableHighAccuracy: true,
                maximumAge: 1000
            });
    }

    calcularDistancia = (newCordinate,prevLatLng) => {
        return haversine(prevLatLng, newCordinate) || 0;
    }
}


function mapDispatchToProps(dispatch) {
    return {
        setCoordinates: (coordinates) => dispatch(actions.map.setCoordinates(coordinates))
    };
}

function mapStateToProps(state : States) {
    const {  startWalk, coordinates } = state.map;
    return {
        startWalk,
        coordinates
    };
};

Map = connect(
    mapStateToProps,
    mapDispatchToProps
)(Map);
export default Map;
