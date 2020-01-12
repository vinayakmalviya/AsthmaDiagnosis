import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from "redux-form";

import { CustomCard } from "../components/Container";
import { CustomInput } from "../components/Input";
import { CustomSubTitle } from "../components/Text";
import { CustomButton } from "../components/Button";
import { ScreenTemplate } from "../components/ScreenTemplate";

import { backgroundlInfoSubmit } from '../actions/infoActions';

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
                    <Field 
                        name="family"
                        label="Family History"
                        autoCompleteType="name"
                        textContentType="name"
                        keyboardType="default"
                        component={CustomInput}
                    />
                </CustomCard>
                <CustomCard>
                    <Field 
                        name="childhood"
                        label="Childhood History"
                        autoCompleteType="name"
                        textContentType="name"
                        keyboardType="default"
                        component={CustomInput}
                    />
                    <Field
                        name="observations"
                        label="Additional Observations"
                        multiline={true}
                        numberOfLines={4}
                        component={CustomInput}
                    />
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