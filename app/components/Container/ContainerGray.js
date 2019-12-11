import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import styles from "./styles";

const ContainerGray = ({ children }) => (
    <View style={styles.containerGray}>
        {children}
    </View>
);

ContainerGray.propTypes = {
    children: PropTypes.any,
};

export default ContainerGray;

