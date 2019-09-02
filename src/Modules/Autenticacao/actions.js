import { LOGIN_SUCESSO, CADASTRO_SUCESSO, ERROR, UPDATE_USER, USER_LOGOUT } from "./constants";
import { app } from '../App/index';
import messages from '../../Config/Firebase/messages';
import firebase, {User} from 'firebase';
import FirebaseService  from './../../Services/firebase';

export const login = (email:string,senha:string) => {
    return dispatch => {
        dispatch(app.actions.loading(true));
        firebase.auth().signInWithEmailAndPassword(email,senha)
            .then((user:User) => {
                var service  = new FirebaseService();
                var payload = {email,nome: user.displayName,logged: true,uid: user.uid,totalDistance:0,totalPoints: 0,totalTime: 0};
                service.checkExistsAndCreateUser(uid)
                    .then((response) => {
                        if(response.type == 2){
                            payload = Object.assign({},payload,response.data);
                        }
                        dispatch({
                            type: LOGIN_SUCESSO,
                            payload
                        });
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
                    var service = new FirebaseService();
                    service.setUserData(user.uid)
                        .then(() => {
                            dispatch({
                                type: CADASTRO_SUCESSO,
                                payload:{
                                    email,
                                    nome,
                                    senha,
                                    logged: true,
                                    totalDistance:0,
                                    totalPoints: 0,
                                    totalTime:0
                                }
                            });
                        }).catch(() => {
                            user.delete();
                            dispatch({
                                type: ERROR,
                                payload:{
                                    error: 'Falha ao criar usuário.'
                                }
                            });
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

export const sessionUserActive = (nome:string,email:string,uid:string) => {
    return dispatch => {
        var service  = new FirebaseService();
        var payload = {email,nome,logged: true,uid,totalDistance:0,totalPoints: 0,totalTime: 0};
        service.checkExistsAndCreateUser(uid)
            .then((response) => {
                if(response.type == 2){
                    payload = Object.assign({},payload,response.data);
                }
                dispatch({
                    type: LOGIN_SUCESSO,
                    payload
                });
        });


    };
};

export const updateUser = (totalDistance,totalPoints,totalTime) => {
  return dispatch => {
      dispatch({
          type: UPDATE_USER,
          payload: {
              totalTime,
              totalDistance,
              totalPoints
          }
      })
  };
};

export const logOutUser = () => {
  return dispatch => {
      dispatch(app.actions.loading(true));
      firebase.auth().signOut().finally(function () {
          dispatch(app.actions.loading(false));
          dispatch({
              type: USER_LOGOUT,
              payload:{}
          });
      });

  }
};
