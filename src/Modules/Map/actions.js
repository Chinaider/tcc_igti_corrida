import { SET_REGION, START_WALK, STOP_WALK } from './constants';

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

export const startWalk = (start:boolean,origin:any) => {
    return dispatch => {
        dispatch({
            type: START_WALK,
            payload: {
                startWalk: start,
                origin
            }
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
