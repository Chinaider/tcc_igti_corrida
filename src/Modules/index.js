import { AutenticacaoState, autenticacao } from './Autenticacao';
import { AppState, app } from './App';

export type States = {
    autenticacao:AutenticacaoState,
    app: AppState
};

export const reducers = {
    autenticacao: autenticacao.reducer,
    app: app.reducer
};

export const actions = {
    autenticacao: autenticacao.actions,
    app: app.actions
};

export { autenticacao, app };
