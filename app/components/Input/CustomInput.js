import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const styles = EStyleSheet.create({
    Input: {
        fontSize: 18,
        padding: 8,
        margin: 6,
        backgroundColor: '#FAFAFA',
        borderColor: '#D8D8D8',
        borderWidth: 1,
        borderRadius: 4,
    },
});

class CustomInput extends React.Component {
    state = {
        focused: false
    };
    
    onBlur() {
        this.setState({ focused: false });
    }

    onFocus() {
        this.setState({ focused: true });
    }

    render() {
        const { text, multiline = false, numberOfLines } = this.props;
        if (this.state.focused) {
        return (
            <TextInput
                {...this.props}
                style={[styles.Input, {borderColor:"#00CCAA"}]}
                placeholder={text}
                multiline={multiline}
                numberOfLines={numberOfLines}
                onFocus={()=>this.onFocus()}
                onBlur={()=>this.onBlur()}
            />
        );
        } else {
        return (
            <TextInput
                {...this.props}
                style={[styles.Input]}
                placeholder={text}
                multiline={multiline}
                numberOfLines={numberOfLines}
                onFocus={()=>this.onFocus()}
                onBlur={()=>this.onBlur()}
            />
        );
        }
    }
}

CustomInput.propTypes = {
    text: PropTypes.string,
    multiline: PropTypes.bool,
    numberOfLines: PropTypes.number,
};

export default CustomInput;
