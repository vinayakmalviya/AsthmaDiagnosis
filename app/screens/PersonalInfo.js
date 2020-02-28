import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from "react-native-extended-stylesheet";
import { View } from 'react-native';
import { reduxForm, Field } from "redux-form";

import { CustomCard, RowView } from '../components/Container';
import { CustomInput } from "../components/Input";
import { CustomPicker } from "../components/Picker";
import { CustomChip } from "../components/Chip";
import { CustomButton } from "../components/Button";
import { CustomSubTitle, CustomOverline } from "../components/Text";
import { ScreenTemplate } from "../components/ScreenTemplate";

import { personalInfoSubmit } from "../actions/infoActions";

const styles = EStyleSheet.create({
    GridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    GridChildren: {
        flex: 1,
        flexBasis: '40%',
    },
});

class PersonalInfo extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        dispatch: PropTypes.func,
    }

    handleNext = (values, dispatch) => {
        dispatch(personalInfoSubmit(values));
    };

    required = v => {
        if(!v || v == '') {
            return "This field is required";
        }
        return undefined;
    }

    render() {
        const { handleSubmit, valid } = this.props;
        return(
            <ScreenTemplate toolbar={{ title: 'New Patient' }}>
                <CustomSubTitle text="Personal Information"/>
                <CustomCard>
                    <Field 
                        name="name"
                        label="Name"
                        autoCompleteType="name"
                        textContentType="name"
                        keyboardType="default"
                        validate={this.required}
                        component={CustomInput}
                    />
                    <View style={styles.GridContainer}>
                        <Field
                            name="age"
                            label="Age"
                            suffix="years"
                            keyboardType="numeric"
                            overrideStyles={[styles.GridChildren]}
                            validate={this.required}
                            component={CustomInput}
                        />
                        <Field
                            mode="dropdown"
                            name="gender"
                            overrideStyles={[styles.GridChildren]}
                            label="Gender"
                            items={[
                                { label: 'Male', value: 'Male' },
                                { label: 'Female', value: 'Female' },
                            ]}
                            validate={this.required}
                            component={CustomPicker}
                        />
                    </View>
                </CustomCard>
                <CustomSubTitle text="Occupation and Habits"/>
                <CustomCard style={styles.GridContainer}>
                    <Field
                        mode="dropdown"
                        name="occupation"
                        label="Occupational Risk"
                        items={[
                            { label: '3 - High Risk', value: "3" },
                            { label: '2 - Medium Risk', value: "2" },
                            { label: '1 - Low Risk', value: "1" },
                            { label: '0 - No Risk', value: "0" },
                        ]}
                        validate={this.required}
                        component={CustomPicker}
                    />
                    <CustomOverline text="Habits" />
                    <RowView style={styles.GridChildren}>
                        <Field name="smoker" component={CustomChip} label="Smoker" />
                        <Field name="diabetic" component={CustomChip} label="Diabetic" />
                        <Field name="obesity" component={CustomChip} label="Obesity" />
                    </RowView>
                    <View style={styles.GridChildren}>
                        <Field name="hypertension" component={CustomChip} label="Hypertension" />
                    </View>
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
                <CustomButton disabled={!valid} text="NEXT STEP" onPress={handleSubmit(this.handleNext)} />
            </ScreenTemplate>
        );
    }
};

export default reduxForm({
    form: 'personalInfo',
    initialValues: {
        smoker: false,
        diabetic: false,
        hypertension: false,
        obesity: false,
        observations: "",
    },
    onSubmitSuccess: (result, dispatch, props) => {
        props.navigation.navigate("BackgroundInfo", { followup: false });
    }
})(PersonalInfo);