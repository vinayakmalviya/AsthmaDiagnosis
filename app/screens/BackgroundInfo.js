import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, KeyboardAvoidingView } from 'react-native';
import { reduxForm, Field } from "redux-form";

import { ContainerGray, CardWhite } from "../components/Container";
import { BorderInput } from "../components/Input";
import { CardHeaderText } from "../components/Text";
import { FullButton } from "../components/Button";

import { backgroundlInfoSubmit } from '../actions/infoActions';

const renderInput = props => {
    const { text, width, multiline, numberOfLines } = props;
    return(
      <BorderInput {...props.input} text={text} width={width} multiline={multiline} numberOfLines={numberOfLines}/>
    );
};

class BackgroundInfo extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        dispatch: PropTypes.func,
    }
    handleNext = (values, dispatch) => {
        alert(JSON.stringify(values));
        dispatch(backgroundlInfoSubmit(values));
    };
    render() {
        const { handleSubmit } = this.props;
        return(
            <ContainerGray>
                <KeyboardAvoidingView behavior="position">
                    <StatusBar translucent={true} barStyle="light-content" />
                    <CardHeaderText text="Background Information" />
                    <CardWhite>
                        <Field name="family" text="Family History" component={renderInput}/>
                    </CardWhite>
                    <CardWhite>
                        <Field name="childhood" text="Childhood History" component={renderInput}/>
                        <Field text="Additional Observations" name="observations" multiline={true} numberOfLines={4} component={renderInput}/>
                    </CardWhite>
                    <FullButton text="ADD PATIENT" onPress={handleSubmit(this.handleNext)} />
                </KeyboardAvoidingView>
            </ContainerGray>
        );
    };
}

export default reduxForm({
    form: 'backgroundInfo',
    initialValues: {
        family: "",
        childhood: "",
        observations: "",
    },
    onSubmitSuccess: (result, dispatch, props) => {
        props.navigation.navigate("Dashboard");
    }
})(BackgroundInfo);