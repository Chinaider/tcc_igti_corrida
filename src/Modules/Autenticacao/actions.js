import { LOGIN_SUCESSO, CADASTRO_SUCESSO, ERROR } from "./constants";
import { app } from '../App/index';
import messages from '../../Config/Firebase/messages';
import firebase, {User} from 'firebase';

export const login = (email:string,senha:string) => {
    return dispatch => {
        dispatch(app.actions.loading(true));
        firebase.auth().signInWithEmailAndPassword(email,senha)
            .then((user:User) => {
               dispatch({
                   type: LOGIN_SUCESSO,
                   payload: {
                       email,
                       logged: true,
                       nome: user.displayName,
                   }
               });
            }).catch(error => {
                let msg  =  messages[error.code];
                msg = (typeof msg == "undefined") ? 'Falha ao realizar operação' : msg;
                dispatch(app.actions.loading(false));
                dispatch({
                    type: ERROR,
                    payload:{
                        error: msg
                    }
                })
            }).finally(() => dispatch(app.actions.loading(false)));
    };
};

export const efetuarCadastro = (nome:string,email:string,senha:string) => {
    return dispatch => {
        dispatch(app.actions.loading(true));
        firebase.auth().createUserWithEmailAndPassword(email,senha)
            .then((user:User) => {
                user.updateProfile({
                    displayName: nome
                }).then(() => {
                    dispatch({
                        type: CADASTRO_SUCESSO,
                        payload:{
                            email: email,
                            nome: nome,
                            senha: senha,
                            logged: true
                        }
                    });
                }).catch(error => {
                    user.delete();
                    dispatch({
                        type: ERROR,
                        payload:{
                            error: messages[error.code]
                        }
                    })
                }).finally(() => dispatch(app.actions.loading(false)));
            })
            .catch(error => {
                dispatch(app.actions.loading(false));
                dispatch({
                    type: ERROR,
                    payload:{
                        error: messages[error.code]
                    }
                })
            });
    }
};

export const sessionUserActive = (nome:string,email:string) => {
    return dispatch => {
        dispatch({
            type: LOGIN_SUCESSO,
            payload: {
                email,
                nome,
                logged: true,
            }
        });
    };
};
