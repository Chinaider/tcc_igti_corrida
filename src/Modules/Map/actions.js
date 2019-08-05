import { SET_REGION, SET_COORDINATES ,START_WALK, STOP_WALK } from './constants';

export const setRegion = (region:any) => {
    return dispatch => {
        dispatch({
            type: SET_REGION,
            payload: {
                region: region
            }
        })
    };
};

export const setCoordinates = (coordinates:any[]) => {
    return dispatch => {
        dispatch({
            type: SET_COORDINATES,
            payload: {
                coordinates
            }
        })
    };
};

export const startWalk = () => {
    return dispatch => {
        dispatch({
            type: START_WALK,
            payload: {}
        })
    };
};

export const stopWalk = () => {
    return dispatch => {
        dispatch({
            type: STOP_WALK,
            payload: {}
        })
    };
};
