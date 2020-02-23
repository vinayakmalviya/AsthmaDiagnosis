import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, ScrollView } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import EStyleSheet from 'react-native-extended-stylesheet';

import { CustomContainer } from "../components/Container";
import { CustomCard } from "../components/Container";
import { CustomInput } from '../components/Input';
import { CustomButton } from '../components/Button';
import { registerSubmit } from '../actions/infoActions';

const styles = EStyleSheet.create({
    ButtonText: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 20,
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
        alignItems: 'center',
        justifyContent: 'center',
        // position: 'absolute',
        // top: 10,
        // // left: 125,
    },
    card: {
        //alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
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
                    <ScrollView>
                    <View style={styles.card}>
                        <CustomCard>
                            <View style={styles.LogoImage}>
                                <Image source={require('../components/Logo/images/loginimg.png')}/>
                            </View>
                            <View>
                                <Text style={styles.ButtonText}>
                                    Register
                                </Text>
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
                            <CustomButton disabled={!valid} text="Register" white='false' onPress={handleSubmit(this.submitRegister)} />
                        </CustomCard>
                    </View>
                    </ScrollView>
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