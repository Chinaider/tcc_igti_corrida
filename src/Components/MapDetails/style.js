import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    cardHeader: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
        paddingBottom: 0,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    cardLabel: {
        fontSize: 16,
        color: '#adadad',
        fontWeight: 'bold'
    },
    cardText: {
        fontSize: 30
    },
    cardTextSmall: {
        fontSize: 13
    },
    cardIconSmall: {
        fontSize: 20,
        color: '#adadad'
    },
    buttonRed: {
        backgroundColor: '#ec242e',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    buttonRedText: {
        color: '#fff',
        fontSize: 24
    },
});
