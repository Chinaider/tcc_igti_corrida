import { SET_REGION, SET_COORDINATES ,START_WALK, STOP_WALK } from './constants';
import { app } from '../App/index';
import { autenticacao } from '../Autenticacao/index';
import { States } from '../index';
import  FirebaseService  from './../../Services/firebase';

const sunDistance = (distance1,distance2) => {
    var distancia  = parseFloat(distance1);
    var distancia2 = parseFloat(distance2);
    return parseFloat(distancia+distancia2).toFixed(2);
};

const sunTimers = (time1,time2) => {
    if(time1 == 0){
        time1 =  "00:00:00";
    }
    if(time2 == 0){
        time2 = "00:00:00";
    }
    var hour=0;
    var minute=0;
    var second=0;
    var splitTime1= time1.split(':');
    var splitTime2= time2.split(':');
    hour = parseInt(splitTime1[0])+parseInt(splitTime2[0]);
    minute = parseInt(splitTime1[1])+parseInt(splitTime2[1]);
    second = parseInt(splitTime1[2])+parseInt(splitTime2[2]);
    hour = hour + minute/60;
    minute = minute%60;
    minute = minute + second/60;
    second = second%60;
    hour = parseInt(hour);
    minute = parseInt(minute);
    second =  parseInt(second);
    hour = (hour.toString().length == 1) ? "0"+hour : hour;
    minute = (minute.toString().length == 1) ? "0"+minute : minute;
    second = (second.toString().length == 1) ? "0"+second : second;
    return `${hour}:${minute}:${second}`;
}


export const setRegion = (region:any) => {
    return dispatch => {
        dispatch({
            type: SET_REGION,
            payload: {
                region: region
            }
        })
    };
};

export const setCoordinates = (coordinates:any[]) => {
    return dispatch => {
        dispatch({
            type: SET_COORDINATES,
            payload: {
                coordinates
            }
        })
    };
};

export const startWalk = () => {
    return dispatch => {
        dispatch({
            type: START_WALK,
            payload: {}
        })
    };
};

export const stopWalk = (time,distance,points,date,userID,totalTime,totalPoints,totalDistance) => {
    return dispatch => {
        dispatch(app.actions.loading(true));
        var service = new FirebaseService();
        service.saveRun(distance,time,points,date,userID)
            .then((data) => {
                var newTotalTime = sunTimers(totalTime,time);
                var newTotalDitance = sunDistance(totalDistance,distance);
                var newTotalPoints = parseInt(totalPoints+parseInt(points));

                service.updateUserData(userID,newTotalPoints,newTotalDitance,newTotalTime)
                    .then(() => {
                        dispatch({
                            type: STOP_WALK,
                            payload: {}
                        });
                        dispatch(autenticacao.actions.updateUser(newTotalDitance,newTotalPoints,newTotalTime));
                    }).catch(() => console.log("\n EROOOOO \n"));
            }).catch((error) => {
                dispatch({
                    type: STOP_WALK,
                    payload: {}
                });
        }).finally(() => dispatch(app.actions.loading(false)));

    };
};
