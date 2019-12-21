import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, CheckBox, Text, Picker } from "react-native";
import { reduxForm, Field } from "redux-form";

import { ContainerGray, CardWhite, RowView } from "../components/Container";
import { CardHeaderText } from "../components/Text";
import { BorderInput } from "../components/Input";
import { FullButton } from "../components/Button";
import { ScrollView } from 'react-native-gesture-handler';

import { symptomsSubmit } from '../actions/infoActions';

const renderInput = props => {
    const { text, width, multiline, numberOfLines } = props;
    return(
      <BorderInput {...props.input} text={text} width={width} multiline={multiline} numberOfLines={numberOfLines}/>
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
            <ScrollView>
                <ContainerGray>
                    <CardHeaderText text="Select Symptoms"></CardHeaderText>
                    <CardWhite>
                        <RowView>
                            <Text style={{ margin: 14, marginTop: 22, fontWeight: 'bold'}}>Wheezing:</Text>
                            {/* <Picker style={{height: 50, width: 180, margin: 8, }}> */}
                            <Field style={{height: 50, width: 180, margin: 8, }} mode="dropdown" name="wheezing" component={renderPicker} >
                                <Picker.Item label="Select" value={null} />
                                <Picker.Item label="No Occurence" value={0} />
                                <Picker.Item label="2 Days a week" value={1} />
                                <Picker.Item label="Daily" value={2} />
                                <Picker.Item label="Multiple times in a day" value={3} />
                            </Field>
                        </RowView>
                        <RowView>
                            <Text style={{ margin: 14, marginTop: 22, fontWeight: 'bold' }}>Shortness of Breath:</Text>
                            {/* <Picker style={{height: 50, width: 180, margin: 12, }}> */}
                            <Field style={{height: 50, width: 180, margin: 12, }} mode="dropdown" name="shortness_of_breath" component={renderPicker} >
                                <Picker.Item label="Select" value={null} />
                                <Picker.Item label="No Occurence" value={0} />
                                <Picker.Item label="2 Days a week" value={1} />
                                <Picker.Item label="Daily" value={2} />
                                <Picker.Item label="Multiple times in a day" value={3} />
                            </Field>
                        </RowView>
                        <RowView>
                            <Text style={{ margin: 14, marginTop: 22, fontWeight: 'bold' }}>Cough:</Text>
                            {/* <Picker style={{height: 50, width: 180, margin: 12, }}> */}
                            <Field style={{height: 50, width: 180, margin: 12, }} mode="dropdown" name="cough" component={renderPicker} >
                                <Picker.Item label="Select" value={null} />
                                <Picker.Item label="No Occurence" value={0} />
                                <Picker.Item label="2 Days a week" value={1} />
                                <Picker.Item label="Daily" value={2} />
                                <Picker.Item label="Multiple times in a day" value={3} />
                            </Field>
                        </RowView>
                        <RowView>
                            <Text style={{ margin: 14, marginTop: 22, fontWeight: 'bold' }}>Chest Tightness:</Text>
                            {/* <Picker style={{height: 50, width: 180, margin: 12, }}> */}
                            <Field style={{height: 50, width: 180, margin: 12, }} mode="dropdown" name="chest_tightness" component={renderPicker} >
                                <Picker.Item label="Select" value={null} />
                                <Picker.Item label="No Occurence" value={0} />
                                <Picker.Item label="2 Days a week" value={1} />
                                <Picker.Item label="Daily" value={2} />
                                <Picker.Item label="Multiple times in a day" value={3} />
                            </Field>
                        </RowView>
                        <RowView>
                            <Text style={{ margin: 14, marginTop: 22, fontWeight: 'bold' }}>Nightime Awakening:</Text>
                            {/* <Picker style={{height: 50, width: 180, margin: 12, }}> */}
                            <Field style={{height: 50, width: 180, margin: 12, }} mode="dropdown" name="nighttime" component={renderPicker} >
                                <Picker.Item label="Select" value={null} />
                                <Picker.Item label="No Occurence" value={0} />
                                <Picker.Item label="2 Days a week" value={1} />
                                <Picker.Item label="Daily" value={2} />
                                <Picker.Item label="Multiple times in a day" value={3} />
                            </Field>
                        </RowView>
                        <RowView>
                            <Text style={{ margin: 14, marginTop: 22, fontWeight: 'bold' }}>Restiction of Activity:</Text>
                            {/* <Picker style={{height: 50, width: 180, margin: 12, }}> */}
                            <Field style={{height: 50, width: 180, margin: 12, }} mode="dropdown" name="restriction" component={renderPicker} >
                                <Picker.Item label="Select" value={null} />
                                <Picker.Item label="No Occurence" value={0} />
                                <Picker.Item label="2 Days a week" value={1} />
                                <Picker.Item label="Daily" value={2} />
                                <Picker.Item label="Multiple times in a day" value={3} />
                            </Field>
                        </RowView>
                    </CardWhite>
                    <CardHeaderText text="Observations"></CardHeaderText>
                    <CardWhite>
                        <Field text="Additional Observations" name="observations" multiline={true} numberOfLines={4} component={renderInput}/>
                    </CardWhite>
                    <FullButton text="Submit Symptoms" onPress={handleSubmit(this.submitSymptoms)}></FullButton>
                </ContainerGray>
            </ScrollView>
        );
    }
}

export default reduxForm({
    form: 'symptoms',
    onSubmitSuccess: (result, dispatch, props) => {
        props.navigation.navigate("Dashboard");
    }
})(Symptoms);