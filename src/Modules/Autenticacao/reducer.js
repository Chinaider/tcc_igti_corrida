import { handleActions } from 'redux-actions';
import { LOGIN_SUCESSO, CADASTRO_SUCESSO, ERROR, UPDATE_USER,USER_LOGOUT } from './constants';

export type AutenticacaoState = {
    email: string,
    senha: string,
    nome:string,
    uid:string,
    totalDistance:string|number,
    totalPoints: number,
    totalTime:string|number,
    error:string,
    logged:boolean
};

const initialState: AutenticacaoState = {
    email: '',
    senha: '',
    nome: '',
    error: '',
    uid: '',
    totalDistance:0,
    totalPoints: 0,
    totalTime:0,
    logged: false
};

export default  handleActions({
   [LOGIN_SUCESSO]: (state: AutenticacaoState,action): AutenticacaoState => {
       return {...state,nome: action.payload.nome,
           email: action.payload.email,
           logged:action.payload.logged,
           uid:action.payload.uid,
           totalDistance:action.payload.totalDistance,
           totalPoints: action.payload.totalPoints,
           totalTime:action.payload.totalTime};
   },
   [CADASTRO_SUCESSO]: (state:AutenticacaoState,action):AutenticacaoState => {
       return {...state,
           nome: action.payload.nome,
           email: action.payload.email,
           logged:action.payload.logged,
           uid:action.payload.uid,
           totalDistance:action.payload.totalDistance,
           totalPoints: action.payload.totalPoints,
           totalTime:action.payload.totalTime};
   },
   [UPDATE_USER]: (state:AutenticacaoState,action):AutenticacaoState => {
       return {...state,
           totalDistance:action.payload.totalDistance,
           totalPoints: action.payload.totalPoints,
           totalTime:action.payload.totalTime};
   },
   [USER_LOGOUT]:(state:AutenticacaoState,action):AutenticacaoState => {
       return initialState;
   },
   [ERROR]: (state:AutenticacaoState,action):AutenticacaoState => {
       return {...state,senha:'',error: action.payload.error}
   },
},initialState);
