import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Text, Picker } from "react-native";
import { reduxForm, Field } from "redux-form";

import { CustomCard, RowView } from "../components/Container";
import { CustomSubTitle } from "../components/Text";
import { CustomInput } from "../components/Input";
import { CustomButton } from "../components/Button";
import { ScreenTemplate } from "../components/ScreenTemplate";

import { symptomsSubmit } from '../actions/infoActions';

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

class Symptoms extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
    };

    submitSymptoms = (values, dispatch, props) => {
        alert(JSON.stringify(values));
        props.navigation.navigate("Dashboard");
    }

    render() {
        const { handleSubmit } = this.props;
        return(
            <ScreenTemplate>
                <CustomSubTitle text="Select Symptoms" />
                <CustomCard>
                    <RowView style={{ marginVertical: 24 }}>
                        <Text style={{ margin: 12, fontWeight: 'bold'}}>Wheezing:</Text>
                        <Field style={{height: 50, width: 180 }} mode="dropdown" name="wheezing" component={renderPicker} >
                            <Picker.Item label="Select" value={null} />
                            <Picker.Item label="No Occurence" value={0} />
                            <Picker.Item label="2 Days a week" value={1} />
                            <Picker.Item label="Daily" value={2} />
                            <Picker.Item label="Multiple times in a day" value={3} />
                        </Field>
                    </RowView>
                    <RowView style={{ marginVertical: 24 }}>
                        <Text style={{ margin: 12, fontWeight: 'bold' }}>Shortness of Breath:</Text>
                        <Field style={{height: 50, width: 180, }} mode="dropdown" name="shortness_of_breath" component={renderPicker} >
                            <Picker.Item label="Select" value={null} />
                            <Picker.Item label="No Occurence" value={0} />
                            <Picker.Item label="2 Days a week" value={1} />
                            <Picker.Item label="Daily" value={2} />
                            <Picker.Item label="Multiple times in a day" value={3} />
                        </Field>
                    </RowView>
                    <RowView style={{ marginVertical: 24 }}>
                        <Text style={{ margin: 12, fontWeight: 'bold' }}>Cough:</Text>
                        <Field style={{height: 50, width: 180, }} mode="dropdown" name="cough" component={renderPicker} >
                            <Picker.Item label="Select" value={null} />
                            <Picker.Item label="No Occurence" value={0} />
                            <Picker.Item label="2 Days a week" value={1} />
                            <Picker.Item label="Daily" value={2} />
                            <Picker.Item label="Multiple times in a day" value={3} />
                        </Field>
                    </RowView>
                    <RowView style={{ marginVertical: 24 }}>
                        <Text style={{ margin: 12, fontWeight: 'bold' }}>Chest Tightness:</Text>
                        <Field style={{height: 50, width: 180, }} mode="dropdown" name="chest_tightness" component={renderPicker} >
                            <Picker.Item label="Select" value={null} />
                            <Picker.Item label="No Occurence" value={0} />
                            <Picker.Item label="2 Days a week" value={1} />
                            <Picker.Item label="Daily" value={2} />
                            <Picker.Item label="Multiple times in a day" value={3} />
                        </Field>
                    </RowView>
                    <RowView style={{ marginVertical: 24 }}>
                        <Text style={{ margin: 12, fontWeight: 'bold' }}>Nightime Awakening:</Text>
                        <Field style={{height: 50, width: 180, }} mode="dropdown" name="nighttime" component={renderPicker} >
                            <Picker.Item label="Select" value={null} />
                            <Picker.Item label="No Occurence" value={0} />
                            <Picker.Item label="2 Days a week" value={1} />
                            <Picker.Item label="Daily" value={2} />
                            <Picker.Item label="Multiple times in a day" value={3} />
                        </Field>
                    </RowView>
                    <RowView style={{ marginVertical: 24 }}>
                        <Text style={{ margin: 12, fontWeight: 'bold' }}>Restiction of Activity:</Text>
                        <Field style={{height: 50, width: 180, }} mode="dropdown" name="restriction" component={renderPicker} >
                            <Picker.Item label="Select" value={null} />
                            <Picker.Item label="No Occurence" value={0} />
                            <Picker.Item label="2 Days a week" value={1} />
                            <Picker.Item label="Daily" value={2} />
                            <Picker.Item label="Multiple times in a day" value={3} />
                        </Field>
                    </RowView>
                </CustomCard>
                <CustomSubTitle text="Observations" />
                <CustomCard>
                    <Field text="Additional Observations" name="observations" multiline={true} numberOfLines={4} component={renderInput}/>
                </CustomCard>
                <CustomButton text="Submit Symptoms" onPress={handleSubmit(this.submitSymptoms)} />
            </ScreenTemplate>
        );
    }
}

export default reduxForm({
    form: 'symptoms',
    onSubmitSuccess: (result, dispatch, props) => {
        props.navigation.navigate("Dashboard");
    }
})(Symptoms);