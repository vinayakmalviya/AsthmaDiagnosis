import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, ScrollView, Picker, KeyboardAvoidingView, Text, CheckBox } from 'react-native';
import { reduxForm, Field } from "redux-form";

import { CustomCard, RowView } from '../components/Container';
import { CustomInput } from "../components/Input";
import { CustomButton } from "../components/Button";
import { CustomSubTitle } from "../components/Text";
import { ScreenTemplate } from "../components/ScreenTemplate";

import { personalInfoSubmit } from "../actions/infoActions";

const renderInput = props => {
    const { text, width, multiline, numberOfLines } = props;
    return(
      <CustomInput {...props.input} text={text} width={width} multiline={multiline} numberOfLines={numberOfLines}/>
    );
};

const renderPicker = ({ input: { onChange, value, ...inputProps}, children, ...pickerProps}) => {
    return(
        <Picker selectedValue={value} onValueChange={ value => onChange(value)} { ...inputProps} { ...pickerProps}>{children}</Picker>
    );
};

const renderCheckBox = ({ input: { onChange, value } }) => {
    if(value == undefined) {
        value = false;
    }
    return(
        <CheckBox onValueChange={ value => onChange(value)} value={Boolean(value)}/> //Very bad code do not use after demonstration
    );
};

class PersonalInfo extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        dispatch: PropTypes.func,
    }
    handleNext = (values, dispatch) => {
        alert(JSON.stringify(values));
        dispatch(personalInfoSubmit(values));
    };
    render() {
        const { handleSubmit } = this.props;
        return(
            <ScreenTemplate toolbar={{ title: 'New Patient' }}>
                <CustomSubTitle text="Personal Information"/>
                <CustomCard>
                    <Field name="name" text="Name" component={renderInput} />
                    <RowView>
                        <Field name="age" text="Age" width="40%" component={renderInput} />
                        <Field style={{height: 50, width: 150, marginTop: 4}} mode="dropdown" name="gender" component={renderPicker} >
                            <Picker.Item label="Gender" value={""} />
                            <Picker.Item label="1 - Male" value={"Male"} />
                            <Picker.Item label="2 - Female" value={"Female"} />
                        </Field>
                    </RowView>
                </CustomCard>
                <CustomSubTitle text="Occupation and Habits"/>
                <CustomCard>
                    <Field style={{height: 50, width: 'auto', marginTop: 4}} mode="dropdown" name="occupation" component={renderPicker} >
                        <Picker.Item label="Occupational Risk" value={null} />
                        <Picker.Item label="3 - High Risk" value={3} />
                        <Picker.Item label="2 - Medium Risk" value={2} />
                        <Picker.Item label="1 - Low Risk" value={1} />
                        <Picker.Item label="0 - No Risk" value={0} />
                    </Field>
                    <RowView>
                        <Text>Smoker</Text>
                        <Field name="smoker" component={renderCheckBox} />
                        <Text>Diabetic</Text>
                        <Field name="diabetic" component={renderCheckBox} />
                    </RowView>
                    <RowView>
                        <Text>Hypertension</Text>
                        <Field name="hypertension" component={renderCheckBox} />
                        <Text>Obesity</Text>
                        <Field name="obesity" component={renderCheckBox} />
                    </RowView>
                </CustomCard>
                <CustomSubTitle text="More Notes"/>
                <CustomCard>
                    <Field text="Additional Observations" name="observations" multiline={true} numberOfLines={4} component={renderInput}/>
                </CustomCard>
                <CustomButton text="NEXT STEP" onPress={handleSubmit(this.handleNext)} />
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
        props.navigation.navigate("BackgroundInfo");
    }
})(PersonalInfo);