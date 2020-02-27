import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, KeyboardAvoidingView } from 'react-native';
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
        // return new Promise((resolve, reject) => {
        //     dispatch(searchPatient(values, resolve, reject));
        // });
        const { navigation } = this.props;
        navigation.navigate('Dashboard');
    }

    render() {
        const { handleSubmit } = this.props;
        return(
            <CustomContainer gradient>
                <StatusBar translucent={true} barStyle="light-content" />
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                >
                    <View style={{ flex: 1 }}>
                        <Logo />
                        <View style={{ alignSelf: 'stretch', margin: 6 }}>
                            <CustomCard>
                                <CustomOverline text="Patient Details" />
                                <Field
                                    name="name"
                                    label="Name"
                                    component={CustomInput}
                                />
                                <Field
                                    name="age"
                                    label="Age"
                                    suffix="years"
                                    keyboardType="numeric"
                                    component={CustomInput}
                                />
                            </CustomCard>
                            <CustomButton text="Search Patient" white large onPress={handleSubmit(this.handleNext)} />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </CustomContainer>
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