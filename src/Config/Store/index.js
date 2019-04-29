import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import ReduxThunk from 'redux-thunk';
import autenticacao from './../../Modules/Autenticacao/reducer';
import { reducer as formReducer } from 'redux-form';


export default function configureStore(onCompletion: () => void):any {

    const reducers = {
        form:formReducer,
        autenticacao
    };

    const store = createStore(
        combineReducers(reducers),
        {},
        applyMiddleware(ReduxThunk));

    return store;
}
