import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from "redux-form";

import { CustomCard } from "../components/Container";
import { CustomChipGroup } from "../components/Chip";
import { CustomInput } from "../components/Input";
import { CustomSubTitle } from "../components/Text";
import { CustomButton } from "../components/Button";
import { ScreenTemplate } from "../components/ScreenTemplate";

import { backgroundInfoSubmit } from '../actions/infoActions';

class BackgroundInfo extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        dispatch: PropTypes.func,
    }
    handleNext = (values, dispatch) => {
        dispatch(backgroundInfoSubmit(values));
    };
    
    render() {
        const { handleSubmit, valid } = this.props;
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
                    <Field 
                        name="childhood"
                        label="Childhood History"
                        autoCompleteType="name"
                        textContentType="name"
                        keyboardType="default"
                        component={CustomInput}
                    />
                </CustomCard>
                <CustomSubTitle text="Allergy History" />
                <CustomCard>
                    <Field
                        name="allergy_hist"
                        label="Select which are present:"
                        component={CustomChipGroup}
                        data={[
                            { name: 'alr', label: 'Allergic Rhinitis'},
                            { name: 'adt', label: 'Atopic Dermatitis'},
                            { name: 'dust_a', label: 'Dust Allergy'},
                            { name: 'drug', label: 'Drug Allergy'},
                            { name: 'food_a', label: 'Food Allergy'},
                            { name: 'eia', label: 'Exercise Induced Asthma'},
                            { name: 'gerd', label: 'GERD'},
                        ]}
                    />
                    <Field
                        name="other_allergs"
                        label="Other Allergies"
                        component={CustomInput}
                    />
                </CustomCard>
                <CustomSubTitle text="More Notes"/>
                <CustomCard>
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
        props.navigation.navigate("Dashboard", { followup: false });
    }
})(BackgroundInfo);