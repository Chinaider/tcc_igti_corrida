import { LOGIN, CADASTRO_SUCESSO, ERROR } from "./constants";
import { app } from '../App/index';
import messages from '../../Config/Firebase/messages';
import firebase from 'firebase';

export const login = (usuarioEmail:string,usuarioSenha:string) => {
    return dispatch => {
        dispatch({
            type: LOGIN,
            payload: {
                email: usuarioEmail,
                senha: usuarioSenha
            }
        });
    };
};

export const efetuarCadastro = (nome:string,email:string,senha:string) => {
    return dispatch => {
        dispatch(app.actions.loading(true));
        firebase.auth().createUserWithEmailAndPassword(email,senha)
            .then(user => {
                dispatch({
                    type: CADASTRO_SUCESSO,
                    payload:{
                        email: email,
                        nome: nome,
                        senha: senha
                    }
                });
            })
            .catch(error => {
                dispatch({
                    type: ERROR,
                    payload:{
                        error: messages[error.code]
                    }
                })
            }).finally(() => dispatch(app.actions.loading(false)));
    }
};
