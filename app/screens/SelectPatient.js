import React, { Component } from "react";
import PropTypes from "prop-types";
import {
	View,
	StatusBar,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	SafeAreaView,
	ActivityIndicator,
	Text,
} from "react-native";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { TouchableRipple } from "react-native-paper";
import { NavigationEvents } from "react-navigation";

import { CustomContainer } from "../components/Container";
import { Logo } from "../components/Logo";
import { CustomCard } from "../components/Container";
import { CustomInput } from "../components/Input";
import { CustomButton } from "../components/Button";
import { connectAlert } from "../components/Alert";
import CustomBottomSheet from "../components/BottomSheet/CustomBottomSheet";

import { followupRefresh } from "../actions/infoActions";
import { searchPatient, selectComplete } from "../actions/followupActions";
import { CustomOverline } from "../components/Text";
import { ScrollView } from "react-native-gesture-handler";

class SelectPatient extends Component {
	static propTypes = {
		handleSubmit: PropTypes.func,
		navigation: PropTypes.object,
		alertWithType: PropTypes.func,
	};

	constructor(props) {
		super(props);

		this.state = {
			modalVisible: false,
		};
	}

	componentDidMount() {
		this.props.dispatch(followupRefresh());
	}

	componentDidUpdate() {
		const { searchResult, dispatch } = this.props;
		if (searchResult.patients.length == 1) {
			dispatch(selectComplete(searchResult.patients[0]));
			searchResult.resolve();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.searchResult != this.props.searchResult) {
			if (
				nextProps.searchResult.patients.length > 1 &&
				nextProps.searchResult.patients !=
					this.props.searchResult.patients
			) {
				this.setState((prevstate) => ({
					modalVisible: !prevstate.modalVisible,
				}));
			}
		}
	}

	handleRefresh = () => {
		this.props.dispatch(followupRefresh());
	};

	handleNext = (values, dispatch) => {
		return new Promise((resolve, reject) => {
			dispatch(searchPatient(values, resolve, reject));
		});
	};

	handleSelectPatient = (index) => {
		const { dispatch, searchResult } = this.props;
		dispatch(selectComplete(searchResult.patients[index]));
		searchResult.resolve();
	};

	required = (v) => {
		if (!v || v == "") {
			return "This field is required";
		}
		return undefined;
	};

	render() {
		const { handleSubmit, submitting, valid } = this.props;
		return (
			<TouchableWithoutFeedback
				onPress={() => {
					Keyboard.dismiss();
					this.setState({ modalVisible: false });
				}}
			>
				<CustomContainer gradient>
					<NavigationEvents onDidFocus={this.handleRefresh} />
					<StatusBar translucent={true} barStyle="light-content" />
					<SafeAreaView style={{ flex: 1 }}>
						<KeyboardAvoidingView
							style={{ flex: 1 }}
							behavior="height"
						>
							<ScrollView
								style={{ flex: 1 }}
								contentContainerStyle={{ flexGrow: 1 }}
								keyboardShouldPersistTaps="handled"
							>
								<View style={{ flex: 1 }}>
									<Logo />
									<View
										style={{
											alignSelf: "stretch",
											margin: 6,
										}}
									>
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
											{submitting ? (
												<ActivityIndicator
													size="large"
													color="#0A7B61"
												/>
											) : (
												<CustomButton
													disabled={!valid}
													text="Search Patient"
													onPress={handleSubmit(
														this.handleNext
													)}
												/>
											)}
										</CustomCard>
									</View>
								</View>
							</ScrollView>
						</KeyboardAvoidingView>
					</SafeAreaView>
					<CustomBottomSheet
						onVisibilityChange={() =>
							this.setState({ modalVisible: false })
						}
						label="Select Patient"
						visible={this.state.modalVisible}
						content={
							<View style={{ flex: 1 }}>
								{this.props.searchResult.patients.map(
									(patient, index) => {
										return (
											<CustomCard key={index}>
												<TouchableRipple
													style={{ margin: -8 }}
													onPress={() => {
														this.setState({
															modalVisible: false,
														});
														this.handleSelectPatient(
															index
														);
													}}
												>
													<View
														style={{ padding: 8 }}
													>
														<View
															style={{
																flexDirection:
																	"row",
																flex: 1,
															}}
														>
															<Text
																style={{
																	alignSelf:
																		"flex-start",
																	marginRight: 4,
																	fontWeight:
																		"bold",
																}}
															>
																Name:
															</Text>
															<Text>
																{patient.name}
															</Text>
														</View>
														<View
															style={{
																flexDirection:
																	"row",
																flex: 1,
																marginTop: 6,
															}}
														>
															<Text
																style={{
																	alignSelf:
																		"flex-start",
																	marginRight: 4,
																	fontWeight:
																		"bold",
																}}
															>
																Age:
															</Text>
															<Text>
																{patient.age}
															</Text>
														</View>
														<View
															style={{
																flexDirection:
																	"row",
																flex: 1,
																marginTop: 6,
															}}
														>
															<Text
																style={{
																	alignSelf:
																		"flex-start",
																	marginRight: 4,
																	fontWeight:
																		"bold",
																}}
															>
																Phone Number:
															</Text>
															<Text>
																{patient.phone}
															</Text>
														</View>
														<View
															style={{
																flexDirection:
																	"row",
																flex: 1,
																marginTop: 6,
															}}
														>
															<Text
																style={{
																	alignSelf:
																		"flex-start",
																	marginRight: 4,
																	fontWeight:
																		"bold",
																}}
															>
																First checkup:
															</Text>
															<Text>
																{
																	patient
																		.ini_symptoms
																		.date
																}
															</Text>
														</View>
														<View
															style={{
																flexDirection:
																	"row",
																flex: 1,
																marginTop: 6,
															}}
														>
															<Text
																style={{
																	alignSelf:
																		"flex-start",
																	marginRight: 4,
																	fontWeight:
																		"bold",
																}}
															>
																Last checkup:
															</Text>
															<Text>
																{patient
																	.follow_up
																	.length > 0
																	? patient
																			.follow_up[
																			patient
																				.follow_up
																				.length -
																				1
																	  ].date
																	: "Only 1 checkup done"}
															</Text>
														</View>
													</View>
												</TouchableRipple>
											</CustomCard>
										);
									}
								)}
							</View>
						}
					/>
				</CustomContainer>
			</TouchableWithoutFeedback>
		);
	}
}

const mapStateToProps = (state) => ({
	searchResult: { ...state.selectReducer },
});

export default connectAlert(
	connect(mapStateToProps)(
		reduxForm({
			form: "selectPatient",
			onSubmitSuccess: (result, dispatch, props) => {
				props.navigation.navigate(
					"Dashboard",
					props.navigation.state.params
				);
			},
			onSubmitFail: (errors, dispatch, submitError, props) => {
				props.alertWithType(
					submitError.type,
					submitError.heading,
					submitError._error
				);
			},
		})(SelectPatient)
	)
);
