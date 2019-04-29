import { AutenticacaoState, autenticacao } from './Autenticacao';

export type States = {
    autenticacao:AutenticacaoState
};

export const reducers = {
    autenticacao: autenticacao.reducer
};

export const actions = {
    autenticacao: autenticacao.actions
};

export { autenticacao }