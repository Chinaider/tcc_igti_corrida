import React, {Component} from 'react';
import { View, PixelRatio } from 'react-native';
import { connect } from 'react-redux';
import { actions, States } from '../../Modules';
import MapView, {  Marker, AnimatedRegion, Polyline } from 'react-native-maps';
import MapDetails from '../MapDetails';
import haversine from "haversine";

const latitudeDelta = 0.0083;
const longitudeDelta = 0.0084;

const styleMap = [
    {
        "featureType": "poi",
        "stylers": [
            {
                "color": "#c0c0c0"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
];
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

    mapa(initialRegion){
        return (<MapView
            ref={el => this.mapView = el}
            style={{flex:1,marginLeft:1}}
            initialRegion={initialRegion}
            followsUserLocation={true}
            showsUserLocation={true}
            loadingEnabled={true}
            loadingIndicatorColor="#FFFFFF"
            loadingBackgroundColor="#000000"
            rotateEnabled={false}
            scrollEnabled={false}
            pitchEnabled={false}
            showsMyLocationButton={true}
            zoomEnabled={true}
            zoomTapEnabled={true}
            zoomControlEnabled={false}
            showsTraffic={false}
            onMapReady={() => {
                console.log(this.mapView);
                this.mapView.map.setNativeProps({ style: {...this.props.style, marginLeft: 0} });
            }}
        >
            {this.direcao()}
        </MapView>);
    }

    render(){
        this.comecarCorrida();
        const {  initialRegion } = this.state;
        return (
            <View style={{flex:1}}>
                {(Object.keys(initialRegion).length != 0) && this.mapa(initialRegion)}
                <MapDetails km={parseFloat(this.state.distanceTravelled).toFixed(2)}/>
            </View>
        )
    }

    comecarCorrida = () => {
        const pixelMargin = PixelRatio.getPixelSizeForLayoutSize(50);
        if(this.props.startWalk && !this.watchID){
            this.watchID = navigator.geolocation
                .watchPosition(({coords: {latitude, longitude}}) => {
                    const { distanceTravelled, prevLatLng } = this.state;
                    const newCoordinate = {latitude, longitude};
                    let newCords = Object.assign([],this.state.cords);
                    newCords.push(newCoordinate);
                        if(newCords.length >= 4 && newCords.length % 4 === 0){
                            this.mapView.fitToCoordinates(newCords,{
                                edgePadding:{
                                    right: pixelMargin,
                                    left: pixelMargin,
                                    top: pixelMargin,
                                    bottom: pixelMargin
                                }
                            });
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
        setCoordinates: (coordinates) => dispatch(actions.map.setCoordinates(coordinates)),
        loading: (bool:boolean,text = 'Carregando Mapa') => dispatch(actions.app.loading(bool,text))
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
