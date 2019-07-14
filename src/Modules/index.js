import { AutenticacaoState, autenticacao } from './Autenticacao';
import { AppState, app } from './App';
import { MapState, map } from './Map';

export type States = {
    autenticacao:AutenticacaoState,
    app: AppState,
    map: MapState
};

export const reducers = {
    autenticacao: autenticacao.reducer,
    app: app.reducer,
    map: map.reducer
};

export const actions = {
    autenticacao: autenticacao.actions,
    app: app.actions,
    map: map.actions
};

export { autenticacao, app, map };
