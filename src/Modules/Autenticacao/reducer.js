import { handleActions } from 'redux-actions'
import { LOGIN } from './constants';

export type AutenticacaoState = {
    email: string,
    senha: string,
    nome:string
};

const initialState: AutenticacaoState = {
    email: '',
    senha: '',
    nome: ''
};

export default  handleActions({
   [LOGIN]: (state: AutenticacaoState,action): AutenticacaoState => {
       return state;
   }
},initialState);
