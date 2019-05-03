import { handleActions } from 'redux-actions';
import { LOGIN, CADASTRO_SUCESSO, ERROR } from './constants';

export type AutenticacaoState = {
    email: string,
    senha: string,
    nome:string,
    error:string
};

const initialState: AutenticacaoState = {
    email: '',
    senha: '',
    nome: '',
    error: ''
};

export default  handleActions({
   [LOGIN]: (state: AutenticacaoState,action): AutenticacaoState => {
       return state;
   },
   [CADASTRO_SUCESSO]: (state:AutenticacaoState,action):AutenticacaoState => {
       return {...state,nome: action.payload.nome,email: action.payload.email,senha: action.payload.senha};
   },
   [ERROR]: (state:AutenticacaoState,action):AutenticacaoState => {
       return {...state,senha:'',error: action.payload.error}
   },
},initialState);
