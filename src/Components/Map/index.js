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

    componentWillUnmount() {
       this.pararCorrida();
    }

    render(){
        this.comecarCorrida();
        const { region, origin, startWalk } = this.props;
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
                    {(startWalk && (origin != null) && origin.latitude != region.latitude) && (
                        <Directions
                            origin={origin}
                            destination={region}
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
                    const newCoordinate = {
                        latitude,
                        longitude,
                        latitudeDelta,
                        longitudeDelta
                    };
                   this.props.setRegion(newCoordinate);
                }
                ,(error) => {console.log(error)}
                ,{
                    timeout: 2000,
                    enableHighAccuracy: true,
                    maximumAge: 1000,
                    distanceFilter: 10
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
}


function mapDispatchToProps(dispatch) {
    return {
        setRegion: (region) => dispatch(actions.map.setRegion(region))
    };
}

function mapStateToProps(state : States) {
    const { region, startWalk, origin } = state.map;
    return {
        region,
        startWalk,
        origin
    };
};

Map = connect(
    mapStateToProps,
    mapDispatchToProps
)(Map);
export default Map;
