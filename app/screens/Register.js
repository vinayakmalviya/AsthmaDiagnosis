import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    ScrollView,
    StatusBar,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    ActivityIndicator
} from "react-native";
import { reduxForm, Field } from 'redux-form';
import EStyleSheet from 'react-native-extended-stylesheet';

import { CustomContainer } from "../components/Container";
import { Logo } from "../components/Logo";
import { CustomCard } from "../components/Container";
import { CustomInput } from '../components/Input';
import { CustomButton } from '../components/Button';

import { registerUser } from '../actions/authActions';
import { connectAlert } from '../components/Alert';

const styles = EStyleSheet.create({
	CardTitle: {
		fontWeight: "bold",
		color: "#444444",
		fontSize: 24,
		marginVertical: 6,
		marginHorizontal: 12
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
					<KeyboardAvoidingView
						style={{
							flex: 1,
							flexDirection: "column",
							justifyContent: "center"
						}}
						behavior="padding"
						enabled
					>
						<ScrollView
							contentContainerStyle={{
								flexGrow: 1
							}}
						>
							<Logo small />
							<View style={{ padding: 6 }}>
								<CustomCard>
									<Text style={styles.CardTitle}>
										Sign Up
									</Text>
									<Field
										name="name"
										label="Name"
										ref={this.name}
										validate={this.required}
										returnKeyType="next"
										blurOnSubmit={false}
										component={CustomInput}
									/>
									<Field
										name="hospital"
										label="Hospital Name"
										ref={this.hospital}
										validate={this.required}
										returnKeyType="next"
										blurOnSubmit={false}
										component={CustomInput}
									/>
									<Field
										name="email"
										label="Email"
										ref={this.email}
										validate={this.required}
										returnKeyType="next"
										blurOnSubmit={false}
										component={CustomInput}
									/>
									<Field
										name="phone"
										label="Phone Number"
										keyboardType="numeric"
										ref={this.phone}
										validate={this.required}
										returnKeyType="next"
										blurOnSubmit={false}
										component={CustomInput}
									/>
									<Field
										name="password"
										label="Password"
										ref={this.password}
										secureTextEntry={true}
										validate={[this.required, this.validatePassword]}
										returnKeyType="next"
										blurOnSubmit={false}
										component={CustomInput}
									/>
									<Field
										name="confirmpass"
										label="Confirm Password"
										ref={this.confirmpass}
										secureTextEntry={true}
										validate={[this.required, this.validatePassword]}
										returnKeyType="done"
										component={CustomInput}
									/>
									{submitting ? (
										<ActivityIndicator
											size="large"
											color="#0A7B61"
										/>
									) : (
										<CustomButton
											disabled={!valid}
											text="Sign Up"
											onPress={handleSubmit(
												this.submitRegister
											)}
										/>
									)}
								</CustomCard>
							</View>
						</ScrollView>
					</KeyboardAvoidingView>
				</CustomContainer>
			</TouchableWithoutFeedback>
		);
    };
}

export default connectAlert(
    reduxForm({
        form: 'register',
        onSubmitSuccess: (result, dispatch, props) => {
            props.navigation.replace("Home", { followUp: false });
        },
        onSubmitFail: (errors, dispatch, submitError, props) => {
            props.alertWithType(submitError.type, submitError.heading, submitError._error);
        }
    })(Register)
);