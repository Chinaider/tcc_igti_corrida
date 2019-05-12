import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyCTzQ29v6ZcBvrCvclYyC5TgCAhVr3R3o4",
    authDomain: "app-corrida-64365.firebaseapp.com",
    databaseURL: "https://app-corrida-64365.firebaseio.com",
    projectId: "app-corrida-64365",
    storageBucket: "app-corrida-64365.appspot.com",
    messagingSenderId: "193666225509"
};
const initializeAppFirebase = () => {
    firebase.initializeApp(config);
    firebase.auth().useDeviceLanguage();
};
export default initializeAppFirebase;
