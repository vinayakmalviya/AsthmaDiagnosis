import React from 'react';
import PropTypes from 'prop-types';
import { Text } from "react-native";

import styles from './styles';

const Title = ({ text }) => (
    <Text style={styles.title}>{text}</Text>
);

Title.propTypes = {
    text: PropTypes.string,
}

export default Title;