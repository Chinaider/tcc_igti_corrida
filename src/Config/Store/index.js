import { createStore, applyMiddleware, combineReducers } from "redux";
import ReduxThunk from 'redux-thunk';
import autenticacao from './../../Modules/Autenticacao/reducer';
import app from './../../Modules/App/reducer';
import map from './../../Modules/Map/reducer';
import { reducer as formReducer } from 'redux-form';


export default function configureStore(onCompletion: () => void):any {

    const reducers = {
        form:formReducer,
        autenticacao,
        app,
        map
    };

    const store = createStore(
        combineReducers(reducers),
        {},
        applyMiddleware(ReduxThunk));

    return store;
}
