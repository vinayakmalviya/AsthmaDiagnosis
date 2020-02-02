import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, KeyboardAvoidingView } from 'react-native';
import { reduxForm, Field } from "redux-form";

import { CustomContainer } from "../components/Container";
import { Logo } from '../components/Logo';
import { CustomCard } from '../components/Container'
import { CustomInput } from '../components/Input';
import { CustomButton } from '../components/Button';

import { followupRefresh } from "../actions/infoActions";
import { searchPatient } from "../actions/followupActions";
import { CustomOverline } from '../components/Text';

class SelectPatient extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        navigation: PropTypes.object,
    }

    componentDidMount() {
        this.props.dispatch(followupRefresh());
    }

    handleNext = (values, dispatch) => {
        alert(JSON.stringify(values));
        dispatch(searchPatient(values));
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
                                    name="pname"
                                    label="Name"
                                    component={CustomInput}
                                />
                                <Field
                                    name="page"
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

export default reduxForm({
    form: 'selectPatient',
    onSubmitSuccess: (result, dispatch, props) => {
        props.navigation.navigate("Dashboard", props.navigation.state.params);
    }
})(SelectPatient);