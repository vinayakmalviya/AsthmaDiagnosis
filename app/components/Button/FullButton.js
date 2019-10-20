import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';

import styles from './styles';

const FullButton = ({ text, onPress }) => (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.wrapper}>
            <Text style={styles.text}>{text}</Text>
        </View>
    </TouchableOpacity>
);

FullButton.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
};

export default FullButton;