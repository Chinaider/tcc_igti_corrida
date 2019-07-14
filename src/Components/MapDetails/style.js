import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:{
        backgroundColor: "#fff",
        height: 150,
        position: 'absolute',
        width: '100%',
        bottom: 0,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10
    },
    botao:{
        position: 'relative',
        marginBottom: 0,
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
    }
});
