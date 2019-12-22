import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View, Text } from 'react-native';
import { reduxForm, Field } from "redux-form";

import { BorderInput } from "../components/Input";
import { CardHeaderText, Title } from '../components/Text';
import { ContainerGray, RowView, CardWhite } from '../components/Container';
import { FullButton } from '../components/Button';
import { testSubmit } from "../actions/infoActions";
import { connect } from 'react-redux';

const renderInput = props => {
    const { text, width } = props;
    return(
      <BorderInput {...props.input} text={text} width={width} />
    );
}

class Form extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        dispatch: PropTypes.func,
        test: PropTypes.object,
    }
    onSubmit = () => {
        const { navigation } = this.props;
        navigation.navigate("Dashboard");
    }
    render() {
        const { test } = this.props;
        return(
            <ContainerGray>
                <StatusBar translucent={true} barStyle="light-content" />
                <Title text="Padding Text 1"></Title>
                <Title text="Padding Text 2"></Title>
                <CardHeaderText text="Padding Sub Text 1"></CardHeaderText>
                <CardHeaderText text="Padding Sub Text 2"></CardHeaderText>
                <CardWhite>
                    <Text>
                        {JSON.stringify(test)}
                    </Text>
                </CardWhite>
                <FullButton text="Submit" onPress={this.onSubmit} />
            </ContainerGray>
        )
    }
};

const renderPicker = ({ input: { onChange, value, ...inputProps}, children, ...pickerProps}) => {
    return(
        <Picker selectedValue={value} onValueChange={ value => onChange(value)} { ...inputProps} { ...pickerProps}>{children}</Picker>
    );
};

const mapStateToProps = (state) => {
    const test = state.infoReducer.tests;
    return {
        test,
    }
}

export default connect(mapStateToProps)(Form);