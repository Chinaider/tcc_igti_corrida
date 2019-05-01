import { LOGIN, CADASTRO_SUCESSO, ERROR } from "./constants";
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
                console.log('=== ERROR ===');
                console.log(error);
                console.log(messages);
                dispatch({
                    type: ERROR,
                    payload:{
                        error: messages[error.code]
                    }
                })
            });
    }
};
