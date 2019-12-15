import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from "react-native";

import styles from './styles';

const BorderInput = props => {
    console.log(props);
    const { width, text, multiline = false, numberOfLines} = props;
    const inputStyle = [styles.input];
    if(width) {
        inputStyle.push({ width: width });
    }
    return (
        <TextInput {...props} style={inputStyle} placeholder={text} multiline={multiline} numberOfLines={numberOfLines}></TextInput>
    );
};

BorderInput.propTypes = {
    width: PropTypes.any,
    text: PropTypes.string,
    multiline: PropTypes.bool,
    numberOfLines: PropTypes.number,
};

export default BorderInput;