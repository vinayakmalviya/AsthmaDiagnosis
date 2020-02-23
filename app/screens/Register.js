import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, ScrollView, StatusBar, SafeAreaView, Keyboard, KeyboardAvoidingView } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import EStyleSheet from 'react-native-extended-stylesheet';

import { CustomContainer } from "../components/Container";
import { CustomCard } from "../components/Container";
import { CustomInput } from '../components/Input';
import { CustomButton } from '../components/Button';
import { registerSubmit } from '../actions/infoActions';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

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
        top: -80,
        position: 'absolute',
        alignSelf: 'center',
        margin: 10,
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
    LogoTitle: {
        top: 50,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 48,
        lineHeight: 48,
        textShadowColor: 'rgba(0,0,0,0.25)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 6,
        color: '#ffffff',
    }
});

class Register extends Component {

    static propTypes = {
        navigation: PropTypes.object,
        handleSubmit: PropTypes.func
    };

    submitRegister = (values, dispatch) => {
        alert(JSON.stringify(values));
        dispatch(registerSubmit(values));
    }

    required = v => {
        if(!v || v == '') {
            return "This field is required";
        }
        return undefined;
    }

    render() {
        const { handleSubmit, valid } = this.props;
        return (
            <CustomContainer gradient>
                <StatusBar translucent={true} barStyle="light-content" />
                    <SafeAreaView style={{ flex: 1 }}>
                        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
                                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                                    <Text style={styles.LogoTitle}>Asthma{'\n'}Diagnosis</Text>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <CustomCard>
                                            <View>
                                                <Text style={styles.ButtonText}>
                                                    Register
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
                                                    name="hosname"
                                                    label="Hospital Name"
                                                    validate={this.required}
                                                    component={CustomInput}
                                                />
                                                <Field 
                                                    name="eid"
                                                    label="Email id"
                                                    validate={this.required}
                                                    component={CustomInput}
                                                />
                                                <Field 
                                                    name="number"
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
                                                    validate={this.required}
                                                    component={CustomInput}
                                                />
                                                <Field 
                                                    name="confirm_password"
                                                    label="Confirm Password"
                                                    validate={this.required}
                                                    component={CustomInput}
                                                />
                                            </View>
                                            <CustomButton disabled={!valid} text="Register" white onPress={handleSubmit(this.submitRegister)} />
                                        </CustomCard>
                                    </View>
                                </KeyboardAvoidingView>
                        </ScrollView>
                    </SafeAreaView>
            </CustomContainer>
        );
    };
}

export default reduxForm({
    form: 'register',
    onSubmitSuccess: (result, dispatch, props) => {
        props.navigation.navigate("Home");
    }
})(Register);