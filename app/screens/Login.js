import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import EStyleSheet from 'react-native-extended-stylesheet';

import { CustomContainer } from "../components/Container";
import { CustomCard } from "../components/Container";
import { CustomInput } from '../components/Input';
import { CustomButton } from '../components/Button';
import { loginSubmit } from '../actions/infoActions';

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
    },
});

class Login extends Component {

    static propTypes = {
        navigation: PropTypes.object,
        handleSubmit: PropTypes.func
    };

    submitLogin = (values, dispatch) => {
        alert(JSON.stringify(values));
        dispatch(loginSubmit(values));
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
                <CustomCard>
                    <View style={styles.LogoImage}>
                        <Image source={require('../components/Logo/images/loginimg.png')}/>
                    </View>
                    <View>
                        <Text style={styles.ButtonText}>
                            Login
                        </Text>
                        <Field 
                            name="eid"
                            label="Email id"
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
                    </View>
                    <CustomButton disabled={!valid} text="Login" white='false' onPress={handleSubmit(this.submitLogin)} />
                    <Text style={styles.text}>New User? <Text style={styles.innerText} onPress={this.register}>Sign Up!</Text></Text> 
                </CustomCard>
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