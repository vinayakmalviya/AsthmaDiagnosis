import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';

import styles from './styles';

const VariButton = ({ text, onPress }) => (
    <View style={styles.variContainer}>
        <TouchableOpacity style={styles.variWrapper} onPress={onPress}>
            <Text style={styles.variText}>{text}</Text>
        </TouchableOpacity>
    </View>
);

VariButton.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
};

export default VariButton;