import { LOADING } from './constants';
import {  EasyLoading } from 'react-native-easy-loading';
export const loading = (loading: boolean) => {
    return dispatch => {
        (loading) ? EasyLoading.show('Aguarde...') : EasyLoading.dismis();
        dispatch({
            type: LOADING,
            payload:{
                loading
            }
        })
    };
};
