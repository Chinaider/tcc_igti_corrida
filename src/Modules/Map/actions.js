import { SET_REGION, START_WALK } from './constants';

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

export const startWalk = (start:boolean) => {
    return dispatch => {
        dispatch({
            type: START_WALK,
            payload: {
                startWalk: start
            }
        })
    };
};
