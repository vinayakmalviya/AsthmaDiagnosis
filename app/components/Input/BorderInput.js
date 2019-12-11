import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from "react-native";

import styles from './styles';

const BorderInput = ({ width, text, multiline = false, numberOfLines = 1 }) => {
    const inputStyle = [styles.input];
    if(width) {
        inputStyle.push({ width: width });
    }
    return (
        <TextInput style={inputStyle} placeholder={text} multiline={multiline} numberOfLines={numberOfLines}></TextInput>
    );
};

BorderInput.propTypes = {
    width: PropTypes.any,
    text: PropTypes.string,
    multiline: PropTypes.bool,
    numberOfLines: PropTypes.number,
};

export default BorderInput;