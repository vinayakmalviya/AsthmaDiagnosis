import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    SafeAreaView,
    ActivityIndicator
} from "react-native";
import { reduxForm, Field, submit } from "redux-form";

import { CustomContainer } from "../components/Container";
import { Logo } from '../components/Logo';
import { CustomCard } from '../components/Container'
import { CustomInput } from '../components/Input';
import { CustomButton } from '../components/Button';
import { connectAlert } from "../components/Alert";

import { followupRefresh } from "../actions/infoActions";
import { searchPatient } from "../actions/followupActions";
import { CustomOverline } from '../components/Text';
import { ScrollView } from 'react-native-gesture-handler';

class SelectPatient extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        navigation: PropTypes.object,
        alertWithType: PropTypes.func,
    }

    componentDidMount() {
        this.props.dispatch(followupRefresh());
    }

    handleNext = (values, dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(searchPatient(values, resolve, reject));
        });
    }

    required = v => {
        if(!v || v == '') {
            return "This field is required";
        }
        return undefined;
    }

    render() {
        const { handleSubmit, submitting, valid } = this.props;
        return(
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <CustomContainer gradient>
                    <StatusBar translucent={true} barStyle="light-content" />
                    <SafeAreaView style={{ flex: 1 }}>
                        <KeyboardAvoidingView
                            style={{ flex: 1 }}
                            behavior="padding"
                        >
                            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                                <View style={{ flex: 1 }}>
                                    <Logo />
                                    <View style={{ alignSelf: 'stretch', margin: 6 }}>
                                        <CustomCard>
                                            <CustomOverline text="Patient Details" />
                                            <Field
                                                name="name"
                                                label="Name"
                                                validate={this.required}
                                                component={CustomInput}
                                            />
                                            <Field
                                                name="age"
                                                label="Age"
                                                suffix="years"
                                                keyboardType="numeric"
                                                validate={this.required}
                                                component={CustomInput}
                                            />
                                            {submitting ? <ActivityIndicator size="large" color="#0A7B61" /> : <CustomButton disabled={!valid} text="Search Patient" onPress={handleSubmit(this.handleNext)} /> }
                                        </CustomCard>
                                    </View>
                                </View>
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </SafeAreaView>
                </CustomContainer>
            </TouchableWithoutFeedback>
        );
    };
}

export default connectAlert(reduxForm({
    form: 'selectPatient',
    onSubmitSuccess: (result, dispatch, props) => {
        props.navigation.navigate("Dashboard", props.navigation.state.params);
    },
    onSubmitFail: (errors, dispatch, submitError, props) => {
        props.alertWithType(submitError.type, submitError.heading, submitError._error);
    }
})(SelectPatient));