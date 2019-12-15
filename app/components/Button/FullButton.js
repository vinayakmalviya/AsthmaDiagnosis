import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';

import styles from './styles';

const FullButton = ({ text, onPress }) => {
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.wrapper} onPress={onPress}>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
};

FullButton.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    width: PropTypes.any,
};

export default FullButton;