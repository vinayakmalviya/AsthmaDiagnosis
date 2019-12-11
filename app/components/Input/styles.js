import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const styles = EStyleSheet.create({
    $defaultWidth: screenWidth - 52,
    /* container: {
        backgroundColor: 'transparent',
        height: 46,
        flex: 1,
    }, */
    input: {
        fontSize: 18,
        paddingVertical: 6,
        paddingHorizontal: 8,
        marginHorizontal: 6,
        marginVertical: 8,
        backgroundColor: '$grayLight',
        borderColor: '$gray',
        borderWidth: 1,
        borderRadius: 4,
        width: '$defaultWidth',
    },
});

export default styles;