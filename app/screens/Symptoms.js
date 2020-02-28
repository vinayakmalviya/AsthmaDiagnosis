import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Text, View } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { reduxForm, Field } from "redux-form";

import { CustomCard } from "../components/Container";
import { CustomSubTitle } from "../components/Text";
import { CustomInput } from "../components/Input";
import { CustomPicker } from "../components/Picker";
import { CustomButton } from "../components/Button";
import { ScreenTemplate } from "../components/ScreenTemplate";

import { symptomsSubmit } from '../actions/infoActions';

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

class Symptoms extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
    };

    submitSymptoms = (values, dispatch) => {
        dispatch(symptomsSubmit(values));
    }

    required = v => {
        if(!v || v == '') {
            return "This field is required";
        }
        return undefined;
    }

    render() {
        const { handleSubmit, valid } = this.props;
        const { followup } = this.props.navigation.state.params;
        return(
            <ScreenTemplate>
                {followup ? <CustomSubTitle text="Select Follow Up Symptoms" /> : <CustomSubTitle text="Select Symptoms" />}
                <CustomCard>
                    <View style={styles.GridContainer}>
                        <Text style={{ marginHorizontal: 12, marginTop: 20, fontWeight: 'bold', fontSize: 16, width: '24%' }}>Wheezing:</Text>
                        <Field
                            mode="dropdown"
                            name="wheezing"
                            component={CustomPicker}
                            label="Select"
                            overrideStyles={[styles.GridChildren]}
                            items={[
                                { label: 'No Occurence', value: '0' },
                                { label: '2 Days a week', value: '1' },
                                { label: 'Daily', value: '2' },
                                { label: 'Multiple times in a day', value: '3' },
                            ]}
                            validate={this.required}
                        />
                    </View>
                    <View style={[styles.GridContainer, ]}>
                        <Text style={{ marginHorizontal: 12, marginTop: 20, fontWeight: 'bold', fontSize: 16, width: '24%' }}>Shortness of Breath:</Text>
                        <Field
                            mode="dropdown"
                            name="shortness_of_breath"
                            component={CustomPicker}
                            label="Select"
                            overrideStyles={[styles.GridChildren]}
                            items={[
                                { label: 'No Occurence', value: '0' },
                                { label: '2 Days a week', value: '1' },
                                { label: 'Daily', value: '2' },
                                { label: 'Multiple times in a day', value: '3' },
                            ]}
                            validate={this.required}
                        />
                    </View>
                    <View style={[styles.GridContainer, ]}>
                        <Text style={{ marginHorizontal: 12, marginTop: 20, fontWeight: 'bold', fontSize: 16, width: '24%' }}>Cough:</Text>
                        <Field
                            mode="dropdown"
                            name="cough"
                            component={CustomPicker}
                            label="Select"
                            overrideStyles={[styles.GridChildren]}
                            items={[
                                { label: 'No Occurence', value: '0' },
                                { label: '2 Days a week', value: '1' },
                                { label: 'Daily', value: '2' },
                                { label: 'Multiple times in a day', value: '3' },
                            ]}
                            validate={this.required}
                        />
                    </View>
                    {followup && 
                        <View style={[styles.GridContainer, ]}>
                            <Text style={{ marginHorizontal: 12, marginTop: 20, fontWeight: 'bold', fontSize: 16, width: '24%' }}>Inhaler Usage:</Text>
                            <Field
                                mode="dropdown"
                                name="inhaler"
                                component={CustomPicker}
                                label="Select"
                                overrideStyles={[styles.GridChildren]}
                                items={[
                                    { label: 'No Occurence', value: '0' },
                                    { label: '2 Days a week', value: '1' },
                                    { label: 'Daily', value: '2' },
                                    { label: 'Multiple times in a day', value: '3' },
                                ]}
                                validate={this.required}
                            />
                        </View>}
                    <View style={[styles.GridContainer]}>
                        <Text style={{ marginHorizontal: 12, marginTop: 20, fontWeight: 'bold', fontSize: 16, width: '24%' }}>Chest Tightness:</Text>
                        <Field
                            mode="dropdown"
                            name="chest_tightness"
                            component={CustomPicker}
                            label="Select"
                            overrideStyles={[styles.GridChildren]}
                            items={[
                                { label: 'No Occurence', value: '0' },
                                { label: '2 Days a week', value: '1' },
                                { label: 'Daily', value: '2' },
                                { label: 'Multiple times in a day', value: '3' },
                            ]}
                            validate={this.required}
                        />
                    </View>
                    <View style={[styles.GridContainer]}>
                        <Text style={{ marginHorizontal: 12, marginTop: 20, fontWeight: 'bold', fontSize: 16, width: '24%' }}>Nightime Awakening:</Text>
                        <Field
                            mode="dropdown"
                            name="nighttime"
                            component={CustomPicker}
                            label="Select"
                            overrideStyles={[styles.GridChildren]}
                            items={[
                                { label: 'No Occurence', value: '0' },
                                { label: '2 Days a week', value: '1' },
                                { label: 'Daily', value: '2' },
                                { label: 'Multiple times in a day', value: '3' },
                            ]}
                            validate={this.required}
                        />
                    </View>
                    <View style={[styles.GridContainer]}>
                        <Text style={{ marginHorizontal: 12, marginTop: 20, fontWeight: 'bold', fontSize: 16, width: '24%' }}>Restriction of Activity:</Text>
                        <Field
                            mode="dropdown"
                            name="restriction"
                            component={CustomPicker}
                            label="Select"
                            overrideStyles={[styles.GridChildren]}
                            items={[
                                { label: 'No Occurence', value: '0' },
                                { label: '2 Days a week', value: '1' },
                                { label: 'Daily', value: '2' },
                                { label: 'Multiple times in a day', value: '3' },
                            ]}
                            validate={this.required}
                        />
                    </View>
                </CustomCard>
                <CustomSubTitle text="Observations" />
                <CustomCard>
                    <Field
                        name="observations"
                        label="Additional Observations"
                        multiline={true}
                        numberOfLines={4}
                        component={CustomInput}
                    />
                </CustomCard>
                <CustomButton disabled={!valid} text="Submit Symptoms" onPress={handleSubmit(this.submitSymptoms)} />
            </ScreenTemplate>
        );
    }
}

export default reduxForm({
    form: 'symptoms',
    onSubmitSuccess: (result, dispatch, props) => {
        props.navigation.navigate("Dashboard", props.navigation.state.params);
    }
})(Symptoms);