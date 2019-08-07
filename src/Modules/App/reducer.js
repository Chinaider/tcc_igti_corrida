import { handleActions } from 'redux-actions';
import { LOADING, SET_PERMISSION } from './constants';

export type AppState = {
  loading: boolean,
  accessFineLocation:boolean
};

const initalState: AppState = {
    loading: false,
    accessFineLocation: false
};

export default handleActions({
    [LOADING]: (state:AppState,action):AppState => {
        return {...state,loading: action.payload.loading}
    },
    [SET_PERMISSION]: (state:AppState,action):AppState => {
        return {...state,loading: action.payload.accessFineLocation}
    }
}, initalState);
