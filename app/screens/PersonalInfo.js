import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, ScrollView, Picker, KeyboardAvoidingView, Text, CheckBox } from 'react-native';
import { reduxForm, Field } from "redux-form";

import { ContainerGray, CardWhite, RowView } from '../components/Container';
import { BorderInput } from "../components/Input";
import { FullButton } from "../components/Button";
import { CardHeaderText } from "../components/Text";

const renderInput = props => {
    const { text, width } = props;
    return(
      <BorderInput {...props.input} text={text} width={width} />
    );
};

const renderPicker = ({ input: { onChange, value, ...inputProps}, children, ...pickerProps}) => {
    return(
        <Picker selectedValue={value} onValueChange={ value => onChange(value)} { ...inputProps} { ...pickerProps}>{children}</Picker>
    );
};

class PersonalInfo extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        handleSubmit: PropTypes.func,
        dispatch: PropTypes.func,
    }
    handleNext = () => {
        console.log("Next Step Pressed");
        const { navigation } = this.props;
        navigation.navigate("BackgroundInfo");
    };
    render() {
        return(
            <ScrollView>
                <ContainerGray>
                    <KeyboardAvoidingView behavior="height">
                        <StatusBar translucent={true} barStyle="light-content" />
                        <CardHeaderText text="Personal Information"/>
                        <CardWhite>
                            {/* <BorderInput text="Name"></BorderInput> */}
                            <Field name="name" text="Name" component={renderInput} />
                            <RowView>
                                {/* <BorderInput text="Age" width="40%"></BorderInput> */}
                                <Field name="age" text="Age" width="40%" component={renderInput} />
                                {/* <Picker style={{height: 50, width: 'auto', marginTop: 10}}> */}
                                <Field style={{height: 50, width: 200, marginTop: 10}} mode="dropdown" name="gender" component={renderPicker} >
                                    <Picker.Item label="Male" value="male" />
                                    <Picker.Item label="Female" value="female" />
                                </Field>
                            </RowView>
                        </CardWhite>
                        <CardHeaderText text="Occupation and Habits"/>
                        <CardWhite>
                            {/* <Picker style={{height: 50, width: 180, marginTop: 10}}> */}
                            <Field style={{height: 50, width: 'auto', marginTop: 10}} mode="dropdown" name="occupation" component={renderPicker} >
                                <Picker.Item label="3 - High Risk" value={3} />
                                <Picker.Item label="2 - Medium Risk" value={2} />
                                <Picker.Item label="1 - Low Risk" value={1} />
                                <Picker.Item label="0 - No Risk" value={0} />
                            </Field>
                            <RowView>
                                <Text>Smoker</Text>
                                <CheckBox></CheckBox>
                                <Text>Diabetic</Text>
                                <CheckBox></CheckBox>
                            </RowView>
                            <RowView>
                                <Text>Hypertension</Text>
                                <CheckBox></CheckBox>
                                <Text>Obesity</Text>
                                <CheckBox></CheckBox>
                            </RowView>
                        </CardWhite>
                        <CardHeaderText text="More Notes"/>
                        <CardWhite>
                            <BorderInput text="Additional Observations" multiline={true} numberOfLines={4}></BorderInput>
                        </CardWhite>
                        <FullButton text="NEXT STEP" onPress={this.handleNext}></FullButton>
                    </KeyboardAvoidingView>
                </ContainerGray>
            </ScrollView>
        );
    }
};

export default reduxForm({
    form: 'personalInfo',
})(PersonalInfo);