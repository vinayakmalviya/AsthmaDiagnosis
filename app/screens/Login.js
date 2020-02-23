import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, SafeAreaView, ScrollView } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import EStyleSheet from 'react-native-extended-stylesheet';

import { CustomContainer } from "../components/Container";
import { CustomCard } from "../components/Container";
import { CustomInput } from '../components/Input';
import { CustomButton } from '../components/Button';

import { loginUser } from "../actions/authActions";

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
    }
});

class Login extends Component {

    static propTypes = {
        navigation: PropTypes.object,
        handleSubmit: PropTypes.func
    };

    submitLogin = (values, dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(loginUser(values, resolve, reject));
        });
    }

    register = () => {
        const { navigation } = this.props;
        navigation.navigate('Register');
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
                <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss() }>
                            <KeyboardAvoidingView
                                style={{ flex: 1 }}
                                behavior="padding"
                            >
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <CustomCard>
                                        <View>
                                            <Text style={styles.ButtonText}>
                                                Login
                                            </Text>
                                            <View style={styles.LogoImage}>
                                                <Image
                                                    style={styles.imageStyles}
                                                    resizeMode="contain"
                                                    source={require('../components/Logo/images/lungs_logo.png')}
                                                />
                                            </View>
                                            <View style={styles.bottomBar}></View>
                                            <Field 
                                                name="email"
                                                label="Email ID"
                                                validate={this.required}
                                                component={CustomInput}
                                            />
                                        </View>
                                        <View style={{marginVertical: 3}}>
                                            <Field 
                                                name="password"
                                                label="Password"
                                                textContentType="password"
                                                validate={this.required}
                                                component={CustomInput}
                                            />
                                        </View>
                                        <CustomButton disabled={!valid} text="Login" white onPress={handleSubmit(this.submitLogin)} />
                                        <Text style={styles.text}>New User? <Text style={styles.innerText} onPress={this.register}>Sign Up!</Text></Text> 
                                    </CustomCard>
                                </View>
                                
                            </KeyboardAvoidingView>
                        </TouchableWithoutFeedback>
                    </SafeAreaView>
                </ScrollView>
            </CustomContainer>
        );
    };
}

export default reduxForm({
    form: 'login',
    onSubmitSuccess: (result, dispatch, props) => {
        props.navigation.navigate("Home");
    }
})(Login);