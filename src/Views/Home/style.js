import { StyleSheet, Dimensions } from 'react-native';

var {height, width} = Dimensions.get('window');
var margin  = (height*25)/100;

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

    formContent:{
        flex:1,
        marginTop: margin,
        padding: 10
    },
    itemForm:{
        marginBottom: 10,
        color: "#E1ECD6"
    },
    botao:{
        padding: 15,
        fontWeight: 'bold',
        margin: 15,
        marginTop: 50,
        backgroundColor: "#E1ECD6"
    }
});
