import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, KeyboardAvoidingView } from 'react-native';
import { reduxForm, Field } from "redux-form";

import { ContainerGray, CustomCard } from "../components/Container";
import { CustomInput } from "../components/Input";
import { CustomSubTitle } from "../components/Text";
import { CustomButton } from "../components/Button";
import { ScreenTemplate } from "../components/ScreenTemplate";

import { backgroundlInfoSubmit } from '../actions/infoActions';

const renderInput = props => {
    const { text, width, multiline, numberOfLines } = props;
    return(
      <CustomInput {...props.input} text={text} width={width} multiline={multiline} numberOfLines={numberOfLines}/>
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
            <ScreenTemplate>
                <CustomSubTitle text="Background Information" />
                <CustomCard>
                    <Field name="family" text="Family History" component={renderInput}/>
                </CustomCard>
                <CustomCard>
                    <Field name="childhood" text="Childhood History" component={renderInput}/>
                    <Field text="Additional Observations" name="observations" multiline={true} numberOfLines={4} component={renderInput}/>
                </CustomCard>
                <CustomButton text="ADD PATIENT" onPress={handleSubmit(this.handleNext)} />
            </ScreenTemplate>
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