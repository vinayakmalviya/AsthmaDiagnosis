import { Dimensions } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';

const screenWidth = Dimensions.get('window').width;

const styles = EStyleSheet.create({
    $buttonWidth: screenWidth - 20,
    container: {
        alignItems: 'center',
        paddingBottom: 15,
    },
    wrapper: {
        backgroundColor: '$white',
        padding: 20,
        borderRadius: 5,
        width: '$buttonWidth',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15 ,
        shadowOffset : { width: 1, height: 13},
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
});

export default styles;