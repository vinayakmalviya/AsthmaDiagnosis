import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

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
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
        };
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    onBlur() {
        this.setState({ focused: false });
    }

    onFocus() {
        this.setState({ focused: true });
    }

    render() {
        const { text, multiline = false, numberOfLines } = this.props;
        return (
        <TextInput
            {...this.props.input}
            style={[
                styles.Input,
                this.state.focused ? { borderColor: '#00CCAA' } : null,
            ]}
            placeholder={text}
            multiline={multiline}
            numberOfLines={numberOfLines}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
        />
        );
    }
}

CustomInput.propTypes = {
    text: PropTypes.string,
    multiline: PropTypes.bool,
    numberOfLines: PropTypes.number,
};

const CustomInputAdapter = props => {
    const input = props.input;
    delete props.input;

    return <CustomInput {...input} {...props} />;
};

export { CustomInput, CustomInputAdapter };
