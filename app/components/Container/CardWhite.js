import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import styles from "./styles";

const CardWhite = ({ children }) => (
    <View style={styles.cardWhite}>
        {children}
    </View>
);

CardWhite.propTypes = {
    children: PropTypes.any,
};

export default CardWhite;

