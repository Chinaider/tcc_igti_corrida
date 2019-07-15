import React from 'react';
import MapViewDirectionsDestination from 'react-native-maps-directions';

const Directions = ({destination, origin, onReady}) => (
    <MapViewDirectionsDestination
        destination={destination}
        origin={origin}
        onReady={onReady}
        apikey="AIzaSyDv-V-nXF4wVygqvu4dV8JNdr1rlsPY_b8"
        strokeWidth={3}
        strokeColor="#222"
    />
);

export default Directions;
