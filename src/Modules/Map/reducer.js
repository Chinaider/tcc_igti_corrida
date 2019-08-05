import { handleActions } from 'redux-actions';
import { SET_REGION, SET_COORDINATES ,START_WALK, STOP_WALK } from './constants';

export type MapState = {
    region:any,
    coordinates:any[],
    startWalk:boolean
};

const initalState: MapState = {
    region: null,
    coordinates: [],
    startWalk: false
};


export default handleActions({
    [SET_REGION]: (state:MapState,action):MapState => {
        return {...state,region: action.payload.region}
    },
    [SET_COORDINATES]: (state:MapState,action):MapState => {
        return {...state,coordinates: action.payload.coordinates}
    },
    [START_WALK]: (state:MapState,action):MapState => {
     return {...state,startWalk:true}
    },
    [STOP_WALK]:(state:MapState,action):MapState => {
        return {...state,startWalk:false,coordinates:[]}
    }
},initalState);
