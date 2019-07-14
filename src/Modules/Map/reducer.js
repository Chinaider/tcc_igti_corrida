import { handleActions } from 'redux-actions';
import { SET_REGION, START_WALK } from './constants';

export type MapState = {
    region:any,
    startWalk:boolean
};

const initalState: MapState = {
    region: null,
    startWalk: false
};


export default handleActions({
    [SET_REGION]: (state:MapState,action):MapState => {
        return {...state,region: action.payload.region}
    },
    [START_WALK]: (state:MapState,action):MapState => {
     return {...state,startWalk:action.payload.startWalk}
    }
},initalState);
