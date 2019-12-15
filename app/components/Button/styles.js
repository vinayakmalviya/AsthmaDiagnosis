import { Dimensions } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';

const screenWidth = Dimensions.get('window').width;

const styles = EStyleSheet.create({
    $buttonWidth: screenWidth / 2.28,
    container: {
        alignItems: 'center',
        flex: 1,
        margin: 12,
    },
    variContainer: {
        margin: 4,
        alignItems: 'center',
        borderRadius: 5,
    },
    wrapper: {
        flexDirection: 'row',
        backgroundColor: '$white',
        padding: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15 ,
        shadowOffset : { width: 1, height: 13},
    },
    variWrapper: {
        flexDirection: 'row',
        backgroundColor: '$white',
        padding: 20,
        minWidth: '$buttonWidth',
        borderRadius: 5,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15 ,
        shadowOffset : { width: 1, height: 13},
        justifyContent: 'center',
    },
    variText: {
        fontSize: 16,
        letterSpacing: 1.5,
        textAlign: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
});

export default styles;