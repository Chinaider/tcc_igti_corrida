import firebase, {User} from 'firebase';



export default class FirebaseService{

     saveRun(distance,time,points,date,userID):Promise<any> {
       return firebase.database().ref(`Run/${userID}/`).push({
            distance,
            time,
            points,
            date
        });
    };

     checkExistsAndCreateUser(uid):Promise<any>{
         return new Promise((resolve,reject) => {
             this.getUserData(uid).then(snapshot => {
                 if(!snapshot.exists()){
                     this.setUserData(uid)
                         .then(() => resolve({type:1,data:null}))
                         .catch(() => reject());
                 }else{
                     resolve({type:2,data:snapshot.val()});
                 }
             }).catch(() =>reject());
         })
     }


     getUserData(userID){
        return firebase.database()
             .ref(`Users/${userID}`)
             .once('value');
     }

    setUserData(userID){
        return firebase.database()
            .ref(`Users/${userID}`).set({
                totalDistance:0,
                totalPoints: 0,
                totalTime:0
            });
    }

    updateUserData(userID,totalPoints,totalDistance,totalTime):Promise<any>{
       return firebase.database()
             .ref(`Users/${userID}`)
             .update({
                 totalPoints,
                 totalDistance,
                 totalTime
             });
    }
}
