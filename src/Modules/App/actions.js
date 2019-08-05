import { LOADING, SET_PERMISSION } from './constants';
import { PermissionsAndroid } from 'react-native';
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

export const checkAccessLocation = () => {
    return async dispatch => {
        const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );
        dispatch({
            type: SET_PERMISSION,
            payload: {
                accessFineLocation: granted
            }
        });
    }
};

export const sendRequestPermission = () => {
    return async dispatch => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.ACCESS_FINE_LOCATION,
            {
                title:'Permissão para acessar a localização',
                message: `Para monitorar suas caminhadas o acesso a sua localização é necessaria.`,
                buttonNegative: 'Não Permitir',
                buttonPositive: 'Permitir',
            }
        );
        dispatch({
            type: SET_PERMISSION,
            payload: {
                accessFineLocation: (granted === PermissionsAndroid.RESULTS.GRANTED)
            }
        });
    };
};
