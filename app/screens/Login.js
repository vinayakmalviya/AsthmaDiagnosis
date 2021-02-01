import React, { Component } from "react";
import PropTypes from "prop-types";
import {
	View,
	Text,
	StatusBar,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	ScrollView,
	ActivityIndicator,
	AsyncStorage,
} from "react-native";
import { reduxForm, Field } from "redux-form";
import EStyleSheet from "react-native-extended-stylesheet";

import { CustomContainer } from "../components/Container";
import { Logo } from "../components/Logo";
import { CustomCard } from "../components/Container";
import { CustomInput } from "../components/Input";
import { CustomButton } from "../components/Button";

import { loginUser, authComplete } from "../actions/authActions";
import { connectAlert } from "../components/Alert";

const styles = EStyleSheet.create({
	SignUpText: {
		fontWeight: "bold",
		fontSize: 16,
		margin: 6,
		textAlign: "center",
		color: "#333333",
	},
	SignUpLink: {
		color: "#0A7B61",
	},
	CardTitle: {
		fontWeight: "bold",
		color: "#444444",
		fontSize: 24,
		marginVertical: 6,
		marginHorizontal: 12,
	},
});

class Login extends Component {
	static propTypes = {
		navigation: PropTypes.object,
		handleSubmit: PropTypes.func,
	};

	componentDidMount() {
		AsyncStorage.getItem("loginData").then((data) => {
			if (data) {
				this.props.dispatch(authComplete(data));
				this.props.navigation.replace("Home", { followUp: false });
			}
		});
	}

	submitLogin = (values, dispatch) => {
		return new Promise((resolve, reject) => {
			dispatch(loginUser(values, resolve, reject));
		});
	};

	register = () => {
		const { navigation } = this.props;
		navigation.navigate("Register");
	};

	required = (v) => {
		if (!v || v == "") {
			return "This field is required";
		}
		return undefined;
	};

	render() {
		const { handleSubmit, valid, submitting } = this.props;
		return (
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<CustomContainer gradient>
					<StatusBar
						translucent
						backgroundColor="rgba(0,0,0,0.4)"
						barStyle="light-content"
					/>
					<KeyboardAvoidingView
						style={{
							flex: 1,
							flexDirection: "column",
							justifyContent: "center",
						}}
						behavior="height"
					>
						<ScrollView
							contentContainerStyle={{
								flexGrow: 1,
							}}
							keyboardShouldPersistTaps="handled"
						>
							<Logo small />
							<View style={{ padding: 6 }}>
								<CustomCard>
									<Text style={styles.CardTitle}>Login</Text>
									<Field
										name="email"
										label="Email"
										textContentType="emailAddress"
										autoCompleteType="email"
										keyboardType="email-address"
										autoCapitalize="none"
										validate={this.required}
										component={CustomInput}
									/>
									<Field
										name="password"
										label="Password"
										secureTextEntry
										textContentType="password"
										validate={this.required}
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
											text="Log In"
											onPress={handleSubmit(
												this.submitLogin
											)}
										/>
									)}
									<Text style={styles.SignUpText}>
										{"New User? "}
										<Text
											style={styles.SignUpLink}
											onPress={this.register}
										>
											Sign Up
										</Text>
									</Text>
								</CustomCard>
							</View>
						</ScrollView>
					</KeyboardAvoidingView>
				</CustomContainer>
			</TouchableWithoutFeedback>
		);
	}
}

export default connectAlert(
	reduxForm({
		form: "login",
		onSubmitSuccess: (result, dispatch, props) => {
			props.navigation.replace("Home", { followUp: false });
		},
		onSubmitFail: (errors, dispatch, submitError, props) => {
			props.alertWithType(
				submitError.type,
				submitError.heading,
				submitError._error
			);
		},
	})(Login)
);
