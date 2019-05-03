import { handleActions } from 'redux-actions';
import { LOADING } from './constants';

export type AppState = {
  loading: boolean
};

const initalState: AppState = {
    loading: false
};

export default handleActions({
    [LOADING]: (state:AppState,action):AppState => {
        return {...state,loading: action.payload.loading}
    }
}, initalState);
