import {LOGIN, MODIFICA  } from "./constants";
/**
 * Logica aqui, como se fosse uma model
 *
 * **/

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
