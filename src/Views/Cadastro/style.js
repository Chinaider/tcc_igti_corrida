import { StyleSheet, Dimensions } from 'react-native';

var {height, width} = Dimensions.get('window');
var margin  = (height*10)/100;



export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    viewOpacity:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    imageBg:{
      flex: 1,
      width: "100%",
      height: "100%",
    },
    title:{
        color: "#E1ECD6"
    },
    icon:{
        color: "#E1ECD6",
        fontSize: 22,
        marginLeft: 5
    },
    titleContent:{
        alignItems: 'center',
        marginTop: margin,
        marginBottom: 5,
    },
    formContent:{
        flex:1,
        padding: 10
    },
    itemForm:{
        marginBottom: 10,
        color: "#E1ECD6"
    },
    label:{
        position: "relative",
        color: "#E1ECD6",
        top: 0.5
    },
    input:{
        color: "#E1ECD6"
    },
    botao:{
        backgroundColor: "#E1ECD6",
        fontWeight: 'bold',
        margin: 15,
        marginTop: 50
    },
    labelError:{
        position: "relative",
        color: "#f00",
        top: 0.5
    },
    textError:{
        color: "#f00",
        marginBottom: 10,
    },
    iconError:{
        fontSize: 22,
        marginLeft: 5,
        color: "#f00"
    },
    inputError:{
        color: "#f00"
    },
});
