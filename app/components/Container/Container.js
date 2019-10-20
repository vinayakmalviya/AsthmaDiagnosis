import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import styles from './styles';

const Container = ({ children }) => (
    <View style={styles.container}>
        <LinearGradient
            colors={['#48FF7F', '#00CCAA']}
            style={{ flex: 1 }}
        >
            <View style={styles.containerFront} >
                {children}
            </View>
        </LinearGradient>
    </View>
);

Container.propTypes = {
    children: PropTypes.any,
};

export default Container;