import { Colors } from '../constants';

export default {
    loader: {
        marginTop: 20,
    },
    noData: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Poppins-Regular'
    },
    listContainer:{
        paddingHorizontal: 20,
    },
    listItem:{
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 20,
        marginBottom: 20,
        borderLeftWidth: 5,
        borderLeftColor: Colors.first,
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.quarternary,
        borderStyle: 'solid',
        fontFamily: 'Poppins-Light',
        fontSize: 20,
        lineHeight: 28,
        marginBottom: 30,
        padding: 5,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 30,
    },
    switchText: {
        fontSize: 18,
        fontFamily: "Poppins-Regular"
    }
};