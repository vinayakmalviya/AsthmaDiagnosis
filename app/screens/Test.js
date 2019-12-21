import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View, Text } from 'react-native';
import { reduxForm, Field } from "redux-form";

import { BorderInput } from "../components/Input";
import { CardHeaderText, Title } from '../components/Text';
import { ContainerGray, RowView, CardWhite } from '../components/Container';
import { FullButton } from '../components/Button';
import { testSubmit } from "../actions/infoActions";

const renderInput = props => {
    const { text, width } = props;
    return(
      <BorderInput {...props.input} text={text} width={width} />
    );
}

class Form extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        dispatch: PropTypes.func,
    }
    onSubmit = (values, dispatch) => {
        alert(JSON.stringify(values));
        dispatch(testSubmit(values));
    }
    render() {
        const { handleSubmit } = this.props;
        return(
            <ContainerGray>
                <StatusBar translucent={true} barStyle="light-content" />
                <Title text="Padding Text 1"></Title>
                <Title text="Padding Text 2"></Title>
                <CardHeaderText text="Padding Sub Text 1"></CardHeaderText>
                <CardHeaderText text="Padding Sub Text 2"></CardHeaderText>
                <CardWhite>
                    <RowView>
                        <Field width="47%" text="Name" name="name" component={renderInput} />
                        <Field width="47%" text="Email" name="email" component={renderInput} />
                    </RowView>
                </CardWhite>
                <FullButton text="Submit" onPress={handleSubmit(this.onSubmit)} />
            </ContainerGray>
        )
    }
};

export default reduxForm({
    form: 'test',
    onSubmitSuccess: (result, dispatch, props) => {
        props.navigation.navigate("Dashboard");
    }
})(Form);