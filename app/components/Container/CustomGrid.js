import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    GridContainer: {
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'stretch',
    },
});
const CustomGrid = ({ children }) => (
    <View style={styles.GridContainer}>
        {children}
    </View>
);

CustomGrid.propTypes = {
    children: PropTypes.any,
};

export default CustomGrid;

