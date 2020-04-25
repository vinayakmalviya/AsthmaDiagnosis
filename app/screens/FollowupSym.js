import React, { useState } from "react";
import {
	View,
	StatusBar,
	StyleSheet,
	Keyboard,
	TouchableWithoutFeedback,
	ScrollView,
	SafeAreaView,
	KeyboardAvoidingView,
} from "react-native";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import moment from "moment";

import useArray from "../components/useArray";
import { followupSymSubmit } from "../actions/infoActions";
import { CustomCard, RowView, CustomContainer } from "../components/Container";
import { CustomPicker } from "../components/Picker";
import { CustomInput } from "../components/Input";
import { CustomButton } from "../components/Button";
import CustomBottomSheet from "../components/BottomSheet/CustomBottomSheet";
import { CustomOverline } from "../components/Text";
import { DataTable } from "react-native-paper";

const FollowupSym = (props) => {
	const symptoms = useArray([]);

	const [enteredSym, setEnteredSym] = useState("");
	const [enteredVal, setEnteredVal] = useState("");
	const [isAddMode, setIsAddMode] = useState(false);

	const symInputHandler = (enteredText) => {
		setEnteredSym(enteredText);
	};

	const valInputHandler = (enteredText) => {
		setEnteredVal(enteredText);
	};

	const submitFollowupSym = (values, dispatch) => {
		const followUp = props.followUp;
		let indexToSend = followUp.length;
		const date = moment(new Date()).format("DD/MM/YYYY");

		followUp.map((f, i) => {
			if (f.date == date) indexToSend = i;
		});

		dispatch(followupSymSubmit(values, indexToSend));
	};

	const symMap = [
		"No Occurence",
		"2 Days A Week",
		"Daily",
		"Multiple Times In A Day",
	];

	return (
		<TouchableWithoutFeedback
			style={{ flex: 1 }}
			onPress={() => Keyboard.dismiss()}
		>
			<CustomContainer>
				<StatusBar
					backgroundColor="#ffffff"
					animated={true}
					translucent={false}
					barStyle="dark-content"
				/>
				<SafeAreaView style={{ flex: 1 }}>
					<KeyboardAvoidingView
						style={{ flex: 1 }}
						behavior="padding"
					>
						<ScrollView
							style={{ flex: 1 }}
							contentContainerStyle={{ flexGrow: 1 }}
						>
							<CustomBottomSheet
								visible={isAddMode}
								label="Add a Symptom"
								onVisibilityChange={() => setIsAddMode(false)}
								content={
									<View
										style={{
											paddingTop: StatusBar.currentHeight,
										}}
									>
										<RowView>
											<Field
												name="symptom"
												label="Symptom"
												clearTextOnFocus={true}
												overrideStyles={[
													styles.GridChildren,
												]}
												component={CustomInput}
												onChange={symInputHandler}
												value={enteredSym}
											/>
											<Field
												mode="dropdown"
												name="range"
												label="Range"
												items={[
													{
														label: "No Occurence",
														value: "0",
													},
													{
														label: "2 Days a week",
														value: "1",
													},
													{
														label: "Daily",
														value: "2",
													},
													{
														label:
															"Multiple times in a day",
														value: "3",
													},
												]}
												onChange={valInputHandler}
												value={enteredVal}
												overrideStyles={[
													styles.GridChildren,
												]}
												component={CustomPicker}
											/>
										</RowView>
										<CustomButton
											text="Add"
											onPress={() => {
												symptoms.add(
													enteredSym.concat(
														",",
														enteredVal
													)
												);
												setIsAddMode(false);
											}}
										/>
									</View>
								}
							/>
							<View
								style={{
									paddingTop: StatusBar.currentHeight,
									flex: 1,
								}}
							>
								<CustomCard>
									<CustomOverline text="Symptoms:" />
									<DataTable>
										<DataTable.Header>
											<DataTable.Title>
												Symptom
											</DataTable.Title>
											<DataTable.Title>
												Occurence
											</DataTable.Title>
										</DataTable.Header>
										<View style={{ marginBottom: 18 }}>
											{!symptoms.value.length && (
												<CustomOverline text="No Symptoms Entered" />
											)}
											{!!symptoms.value.length &&
												symptoms.value.map(
													(symptom, index) => (
														<>
															<DataTable.Row>
																<DataTable.Cell>
																	{
																		symptom.split(
																			","
																		)[0]
																	}
																</DataTable.Cell>
																<DataTable.Cell>
																	{symMap[
																		parseInt(
																			symptom.split(
																				","
																			)[1]
																		)
																	]
																		? symMap[
																				parseInt(
																					symptom.split(
																						","
																					)[1]
																				)
																		  ]
																		: symptom.split(
																				","
																		  )[1]}
																</DataTable.Cell>
															</DataTable.Row>
														</>
													)
												)}
										</View>
									</DataTable>
								</CustomCard>
								<View style={styles.addbtn}>
									<CustomButton
										text="Add"
										onPress={() => setIsAddMode(true)}
									/>
									<CustomButton
										text="Submit"
										onPress={props.handleSubmit(
											submitFollowupSym.bind(
												this,
												symptoms,
												props.dispatch
											)
										)}
									/>
								</View>
							</View>
						</ScrollView>
					</KeyboardAvoidingView>
				</SafeAreaView>
			</CustomContainer>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 10,
		marginTop: 70,
	},
	input: {
		flex: 1,
		borderColor: "black",
		borderWidth: 1,
		padding: 10,
		marginBottom: 10,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "60%",
	},
	button: {
		width: "40%",
	},
	text: {
		fontSize: 24,
		color: "black",
		fontWeight: "bold",
		textAlign: "center",
	},
	GridChildren: {
		flex: 1,
		flexBasis: "5%",
	},
	addbtn: {
		flex: 1,
		justifyContent: "flex-end",
	},
});

const mapStateToProps = (state) => {
	const followUp = state.infoReducer.follow_up;
	return {
		followUp,
	};
};

export default connect(mapStateToProps)(
	reduxForm({
		form: "followupsym",
		onSubmitSuccess: (result, dispatch, props) => {
			props.navigation.navigate(
				"Dashboard",
				props.navigation.state.params
			);
		},
	})(FollowupSym)
);
