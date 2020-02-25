import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    ScrollView,
    StatusBar,
    SafeAreaView,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    ActivityIndicator
} from "react-native";
import { reduxForm, Field } from 'redux-form';
import EStyleSheet from 'react-native-extended-stylesheet';

import { CustomContainer } from "../components/Container";
import { CustomCard } from "../components/Container";
import { CustomInput } from '../components/Input';
import { CustomButton } from '../components/Button';

import { registerUser } from '../actions/authActions';
import { connectAlert } from '../components/Alert';

const styles = EStyleSheet.create({
    ButtonText: {
        fontWeight: 'bold',
        color: '#444444',
        fontSize: 32,
        margin: 6,
    },
    innerText: {
        color: '#008000',
        fontWeight: 'bold',
        fontSize: 15, 
        margin: 6,
        textAlign: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        margin: 6,
        textAlign: 'center',
    },
    LogoImage: {
        backgroundColor: '#FFFFFF',
        padding: 8,
        borderRadius: 120,
        top: -76,
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 2
    },
    imageStyles: {
        width: 120,
        height: 120
    },
    bottomBar: {
        marginLeft: 6,
        width: 80,
        height: 4,
        backgroundColor: '#48FF7F'
    },
    textLogo: {
        marginTop: StatusBar.currentHeight + 8,
        marginBottom: 74
    },
    LogoTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 48,
        lineHeight: 48,
        textShadowColor: 'rgba(0,0,0,0.25)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 6,
        color: '#ffffff',
    },
    innerText: {
        color: '#008000',
        fontWeight: 'bold',
        fontSize: 15, 
        margin: 6,
        textAlign: 'left',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        margin: 6,
        textAlign: 'left',
    }
});

class Register extends Component {

    static propTypes = {
        navigation: PropTypes.object,
        handleSubmit: PropTypes.func
    };

    submitRegister = (values, dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(registerUser(values, resolve, reject));
        });
    }

    login = () => {
        const { navigation } = this.props;
        navigation.navigate("Login");
    }

    required = v => {
        if(!v || v == '') {
            return "This field is required";
        }
        return undefined;
    }

    validatePassword = (value, allValues) => {
        if(value != allValues.password || value != allValues.confirmpass) {
            return "Passwords do not match";
        }
        return undefined;
    }

    render() {
        const { handleSubmit, valid, submitting } = this.props;
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <CustomContainer gradient>
                    <StatusBar translucent={true} barStyle="light-content" />
                    <SafeAreaView style={{ flex: 1 }}>
                        <KeyboardAvoidingView
                            style={{ flex: 1 }}
                            behavior="padding"
                            >
                            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                                <View style={{ flex: 1, justifyContent: 'flex-end', margin: 6 }}>
                                    <View style={styles.textLogo}>
                                        <Text style={styles.LogoTitle}>Asthma{'\n'}Diagnosis</Text>
                                    </View>
                                    <View>
                                        <CustomCard>
                                            <View>
                                                <Text style={styles.ButtonText}>
                                                    Sign Up
                                                </Text>
                                                <View style={styles.LogoImage}>
                                                    <Image
                                                        style={styles.imageStyles}
                                                        resizeMode="contain"
                                                        source={require('../components/Logo/images/lungs_logo.png')}
                                                    />
                                                </View>
                                                <View style={styles.bottomBar}></View>
                                            </View>
                                            <View>
                                                <Field 
                                                    name="name"
                                                    label="Name"
                                                    validate={this.required}
                                                    component={CustomInput}
                                                />
                                                <Field 
                                                    name="hospital"
                                                    label="Hospital Name"
                                                    validate={this.required}
                                                    component={CustomInput}
                                                />
                                                <Field 
                                                    name="email"
                                                    label="Email id"
                                                    textContentType="emailAddress"
                                                    autoCompleteType="email"
                                                    keyboardType="email-address"
                                                    validate={this.required}
                                                    component={CustomInput}
                                                />
                                                <Field 
                                                    name="phone"
                                                    label="Phone Number"
                                                    keyboardType="numeric"
                                                    validate={this.required}
                                                    component={CustomInput}
                                                />

                                            </View>
                                            <View style={{marginVertical: 3}}>
                                                <Field 
                                                    name="password"
                                                    label="Password"
                                                    textContentType="password"
                                                    secureTextEntry={true}
                                                    validate={[this.required, this.validatePassword]}
                                                    component={CustomInput}
                                                />
                                                <Field 
                                                    name="confirmpass"
                                                    label="Confirm Password"
                                                    textContentType="password"
                                                    secureTextEntry={true}
                                                    validate={[this.required, this.validatePassword]}
                                                    component={CustomInput}
                                                />
                                            </View>
                                            {submitting ? <ActivityIndicator size="large" color="#48FF7F" /> : <CustomButton disabled={!valid} text="Sign Up" onPress={handleSubmit(this.submitRegister)} /> }
                                            <Text style={styles.text}>Already have an Account? <Text style={styles.innerText} onPress={this.login}>Login!</Text></Text> 
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

export default connectAlert(
    reduxForm({
        form: 'register',
        onSubmitSuccess: (result, dispatch, props) => {
            props.navigation.navigate("Home", { followUp: false });
        },
        onSubmitFail: (errors, dispatch, submitError, props) => {
            props.alertWithType(submitError.type, submitError.heading, submitError._error);
        }
    })(Register)
);