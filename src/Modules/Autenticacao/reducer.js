import { handleActions } from 'redux-actions';
import { LOGIN_SUCESSO, CADASTRO_SUCESSO, ERROR } from './constants';

export type AutenticacaoState = {
    email: string,
    senha: string,
    nome:string,
    error:string,
    logged:boolean
};

const initialState: AutenticacaoState = {
    email: '',
    senha: '',
    nome: '',
    error: '',
    logged: false
};

export default  handleActions({
   [LOGIN_SUCESSO]: (state: AutenticacaoState,action): AutenticacaoState => {
       return {...state,nome: action.payload.nome,email: action.payload.email,logged:action.payload.logged};
   },
   [CADASTRO_SUCESSO]: (state:AutenticacaoState,action):AutenticacaoState => {
       return {...state,nome: action.payload.nome,email: action.payload.email,logged:action.payload.logged};
   },
   [ERROR]: (state:AutenticacaoState,action):AutenticacaoState => {
       return {...state,senha:'',error: action.payload.error}
   },
},initialState);
