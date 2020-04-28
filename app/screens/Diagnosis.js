import React, { Component } from "react";
import { View, Text } from "react-native";
import { DataTable } from "react-native-paper";
import { reduxForm, Field } from "redux-form";
import EStyleSheet from "react-native-extended-stylesheet";
import { connect } from "react-redux";
import moment from "moment";

import { ScreenTemplate } from "../components/ScreenTemplate";
import { CustomCard, RowView } from "../components/Container";
import { CustomPicker } from "../components/Picker";
import { CustomSubTitle, CustomOverline } from "../components/Text";
import { CustomButton } from "../components/Button";
import { connectAlert } from "../components/Alert";

import { diagnosisSubmit } from "../actions/infoActions";
import { controlSubmit } from "../actions/followupActions";
import { CustomChipGroup, CustomChip } from "../components/Chip";
import { CustomInput } from "../components/Input";

const styles = EStyleSheet.create({
	GridChildren: {
		flex: 1,
		flexBasis: "40%",
	},
});

class Diagnosis extends Component {
	constructor(props) {
		super(props);

		this.state = {
			count: null,
			index: null,
		};
	}

	componentDidMount() {
		const { followup } = this.props.navigation.state.params;
		const { vals } = this.props;
		const date = moment(new Date()).format("DD/MM/YYYY");

		let count = 0;
		let indexT = 0;
		let flag = 0;

		if (followup) {
			vals.follow_up.map((value, index) => {
				if (value.date == date) {
					if (value.symptom) {
						count = value.symptom.length;
						indexT = index;
						flag = 1;
					}
				}
			});

			if (flag == 1) {
				this.setState({ count: count, index: indexT });
			} else {
				this.props.alertWithType(
					"warn",
					"Warning",
					"Please fill the patient symptoms to asses Asthma control"
				);
			}
		}
	}

	required = (v) => {
		if (!v || v == "") {
			return "This field is required";
		}
		return undefined;
	};

	generateSymptomTable = () => {
		const { vals } = this.props;
		const date = moment(new Date()).format("DD/MM/YYYY");
		const symMap = [
			"No Occurence",
			"2 Days A Week",
			"Daily",
			"Multiple Times In A Day",
		];

		if (vals.follow_up) {
			return vals.follow_up.map((value, index) => {
				if (value.date == date) {
					if (value.symptom) {
						return value.symptom.map((sym, index) => {
							return (
								<DataTable.Row key={index}>
									<DataTable.Cell>
										{sym.split(",")[0]
											? sym.split(",")[0]
											: "No data present"}
									</DataTable.Cell>
									<DataTable.Cell>
										{symMap[parseInt(sym.split(",")[1])]
											? symMap[
													parseInt(sym.split(",")[1])
											  ]
											: "No data present"}
									</DataTable.Cell>
								</DataTable.Row>
							);
						});
					} else {
						return null;
					}
				} else {
					return null;
				}
			});
		}
	};

	generatePefrData = () => {
		const { vals } = this.props;
		const date = moment(new Date()).format("DD/MM/YYYY");

		if (vals.follow_up) {
			return vals.follow_up.map((value, index) => {
				if (value.date == date) {
					if (value.pefr) {
						return (
							<>
								<CustomOverline text="PEFR" />
								<Text
									style={{
										fontSize: 14,
										marginTop: 6,
										marginLeft: 12,
									}}
								>
									Value: {value.pefr} L/min
								</Text>
							</>
						);
					}
				}
			});
		}
	};

	assesControl = () => {
		const { count } = this.state;

		if (count != null) {
			if (count == 0) {
				return <CustomOverline text="Asthma Well Controlled" />;
			} else if (count >= 1 && count <= 2) {
				return <CustomOverline text="Asthma Partly Controlled" />;
			} else if (count >= 3 && count <= 4) {
				return <CustomOverline text="Asthma Uncontrolled" />;
			} else if (count > 4) {
				return <CustomOverline text="Asthma Uncontrolled" />;
			}
		}
	};

	submitDiagnosis = (values, dispatch) => {
		dispatch(diagnosisSubmit(values));
	};

	submitControl = (values, dispatch) => {
		const { count, index } = this.state;
		let control = "";

		if (count == 0) {
			control = "Well Controlled";
		} else if (count >= 1 && count <= 2) {
			control = "Partly Controlled";
		} else if (count >= 3 && count <= 4) {
			control = "Uncontrolled";
		} else if (count > 4) {
			control = "Uncontrolled";
		}

		values.control = control;
		values.index = index;

		dispatch(controlSubmit(values));
	};

	render() {
		const { followup } = this.props.navigation.state.params;
		const { handleSubmit, valid } = this.props;
		const name = [
			"No Occurence",
			"2 Days A Week",
			"Daily",
			"Multiple Times In A Day",
		];
		const spiro = ["Normal", "Between 60%\nto 80%", "Less than\n60%"];

		return (
			<ScreenTemplate>
				<CustomSubTitle text="Summary" />
				{!followup ? (
					<View>
						<CustomCard>
							<CustomOverline text="Symptoms:" />
							<DataTable>
								<DataTable.Header>
									<DataTable.Title>Symptom</DataTable.Title>
									<DataTable.Title>Occurence</DataTable.Title>
								</DataTable.Header>
								<DataTable.Row>
									<DataTable.Cell>Wheezing</DataTable.Cell>
									<DataTable.Cell>
										{name[
											this.props.vals.ini_symptoms
												.wheezing
										]
											? name[
													this.props.vals.ini_symptoms
														.wheezing
											  ]
											: null}
									</DataTable.Cell>
								</DataTable.Row>
								<DataTable.Row>
									<DataTable.Cell>
										Shortness of breath
									</DataTable.Cell>
									<DataTable.Cell>
										{name[
											this.props.vals.ini_symptoms
												.shortness_of_breath
										]
											? name[
													this.props.vals.ini_symptoms
														.shortness_of_breath
											  ]
											: null}
									</DataTable.Cell>
								</DataTable.Row>
								<DataTable.Row>
									<DataTable.Cell>Cough</DataTable.Cell>
									<DataTable.Cell>
										{name[
											this.props.vals.ini_symptoms.cough
										]
											? name[
													this.props.vals.ini_symptoms
														.cough
											  ]
											: null}
									</DataTable.Cell>
								</DataTable.Row>
								<DataTable.Row>
									<DataTable.Cell>
										Chest Tightness
									</DataTable.Cell>
									<DataTable.Cell>
										{name[
											this.props.vals.ini_symptoms
												.chest_tightness
										]
											? name[
													this.props.vals.ini_symptoms
														.chest_tightness
											  ]
											: null}
									</DataTable.Cell>
								</DataTable.Row>
								<DataTable.Row>
									<DataTable.Cell>
										Night-time Awakening
									</DataTable.Cell>
									<DataTable.Cell>
										{name[
											this.props.vals.ini_symptoms
												.nighttime
										]
											? name[
													this.props.vals.ini_symptoms
														.nighttime
											  ]
											: null}
									</DataTable.Cell>
								</DataTable.Row>
								<DataTable.Row>
									<DataTable.Cell>
										Restriction of activity
									</DataTable.Cell>
									<DataTable.Cell>
										{name[
											this.props.vals.ini_symptoms
												.restriction
										]
											? name[
													this.props.vals.ini_symptoms
														.restriction
											  ]
											: null}
									</DataTable.Cell>
								</DataTable.Row>
							</DataTable>
							<CustomOverline text="Spirometry:" />
							{this.props.vals.tests.spirometry != {} ? (
								<DataTable>
									<DataTable.Header>
										<DataTable.Title>Label</DataTable.Title>
										<DataTable.Title>
											Pre-Bronchodilator
										</DataTable.Title>
										<DataTable.Title>
											Post-Bronchodilator
										</DataTable.Title>
									</DataTable.Header>
									<DataTable.Row>
										<DataTable.Cell>FEV1</DataTable.Cell>
										<DataTable.Cell>
											{this.props.vals.tests.spirometry
												.pre
												? this.props.vals.tests
														.spirometry.pre.fev1
												: null}
										</DataTable.Cell>
										<DataTable.Cell>
											{this.props.vals.tests.spirometry
												.post
												? this.props.vals.tests
														.spirometry.post.fev1
												: null}
										</DataTable.Cell>
									</DataTable.Row>
									<DataTable.Row>
										<DataTable.Cell>
											FEV1 Range
										</DataTable.Cell>
										<DataTable.Cell>
											<Text
												style={{
													flex: 1,
													flexWrap: "wrap",
												}}
											>
												{this.props.vals.tests
													.spirometry.pre
													? spiro[
															this.props.vals
																.tests
																.spirometry.pre
																.fev1_range
													  ]
													: null}
											</Text>
										</DataTable.Cell>
										<DataTable.Cell>
											<Text
												style={{
													flex: 1,
													flexWrap: "wrap",
												}}
											>
												{this.props.vals.tests
													.spirometry.post
													? spiro[
															this.props.vals
																.tests
																.spirometry.post
																.fev1_range
													  ]
													: null}
											</Text>
										</DataTable.Cell>
									</DataTable.Row>
									<DataTable.Row>
										<DataTable.Cell>
											FEV1/FVC
										</DataTable.Cell>
										<DataTable.Cell>
											{this.props.vals.tests.spirometry
												.pre
												? this.props.vals.tests
														.spirometry.pre.ratio
												: null}
										</DataTable.Cell>
										<DataTable.Cell>
											{this.props.vals.tests.spirometry
												.post
												? this.props.vals.tests
														.spirometry.post.ratio
												: null}
										</DataTable.Cell>
									</DataTable.Row>
									<DataTable.Row>
										<DataTable.Cell>
											FEV1/FVC Range
										</DataTable.Cell>
										<DataTable.Cell>
											{this.props.vals.tests.spirometry
												.pre
												? spiro[
														this.props.vals.tests
															.spirometry.pre
															.ratio_range
												  ]
												: null}
										</DataTable.Cell>
										<DataTable.Cell>
											{this.props.vals.tests.spirometry
												.post
												? spiro[
														this.props.vals.tests
															.spirometry.post
															.ratio_range
												  ]
												: null}
										</DataTable.Cell>
									</DataTable.Row>
									<DataTable.Row>
										<DataTable.Cell>FVC</DataTable.Cell>
										<DataTable.Cell>
											{this.props.vals.tests.spirometry
												.pre
												? this.props.vals.tests
														.spirometry.pre.fvc
												: null}
										</DataTable.Cell>
										<DataTable.Cell>
											{this.props.vals.tests.spirometry
												.post
												? this.props.vals.tests
														.spirometry.post.fvc
												: null}
										</DataTable.Cell>
									</DataTable.Row>
									<DataTable.Row>
										<DataTable.Cell>MMEF</DataTable.Cell>
										<DataTable.Cell>
											{this.props.vals.tests.spirometry
												.pre
												? this.props.vals.tests
														.spirometry.pre.mmef
												: null}
										</DataTable.Cell>
										<DataTable.Cell>
											{this.props.vals.tests.spirometry
												.post
												? this.props.vals.tests
														.spirometry.post.mmef
												: null}
										</DataTable.Cell>
									</DataTable.Row>
								</DataTable>
							) : (
								<Text style={{ marginTop: 6 }}>
									No data entered
								</Text>
							)}
						</CustomCard>
						<CustomSubTitle text="Diagnosis" />
						<CustomCard>
							<Field
								mode="dropdown"
								name="severity"
								label="Severity"
								validate={this.required}
								items={[
									{ label: "Intermittent", value: "0" },
									{ label: "Persistent: Mild", value: "1" },
									{
										label: "Persistent: Moderate",
										value: "2",
									},
									{ label: "Persistent: Severe", value: "3" },
								]}
								overrideStyles={[styles.GridChildren]}
								component={CustomPicker}
							/>
						</CustomCard>
						<CustomSubTitle text="Medication" />
						<CustomCard>
							<Field
								name="inhaler"
								label="Inhaler"
								data={[
									{ name: "ics", label: "ICS" },
									{ name: "laba", label: "LABA" },
									{ name: "lama", label: "LAMA" },
								]}
								component={CustomChipGroup}
							/>
							<Field
								name="dosage"
								label="Dosage"
								keyboardType="numeric"
								component={CustomInput}
							/>
							<CustomOverline text="Immunotherapy (Select if yes)" />
							<Field
								name="immuno"
								label="Immunotherapy"
								component={CustomChip}
							/>
							<Field
								name="oral_m"
								label="Oral Medications If any"
								component={CustomInput}
							/>
							<Field
								name="bio_m"
								label="Biological Medications If any"
								component={CustomInput}
							/>

							<Field
								name="supp"
								label="Supportive Therapy"
								component={CustomInput}
							/>
							<Field
								name="specs"
								label="Other Specifications"
								multiline={true}
								numberOfLines={4}
								component={CustomInput}
							/>
						</CustomCard>
						<CustomButton
							text="Done"
							disabled={!valid}
							onPress={handleSubmit(this.submitDiagnosis)}
						/>
					</View>
				) : (
					<View>
						<CustomSubTitle text="Follow Up Summary" />
						<CustomCard>
							<View style={{ marginBottom: 6 }}>
								<CustomOverline text="Symptoms" />
								<DataTable>
									<DataTable.Header>
										<DataTable.Title>
											Symptom
										</DataTable.Title>
										<DataTable.Title>
											Occurence
										</DataTable.Title>
									</DataTable.Header>
									{this.generateSymptomTable()}
								</DataTable>
								{this.generatePefrData()}
							</View>
						</CustomCard>
						<CustomSubTitle text="Asthma Control" />
						<CustomCard>
							<View style={{ marginBottom: 6 }}>
								{this.assesControl()}
							</View>
						</CustomCard>
						<CustomSubTitle text="Treatment" />
						<CustomCard>
							<Field
								mode="dropdown"
								name="treatment"
								label="Treatment"
								validate={this.required}
								items={[
									{ label: "Continue Same", value: "0" },
									{ label: "Step Up", value: "1" },
									{
										label: "Step Down",
										value: "2",
									},
								]}
								overrideStyles={[styles.GridChildren]}
								component={CustomPicker}
							/>
							<Field
								name="specs"
								label="Other Specifications"
								multiline={true}
								numberOfLines={4}
								component={CustomInput}
							/>
						</CustomCard>
						<CustomButton
							text="Done"
							disabled={!valid}
							onPress={handleSubmit(this.submitControl)}
						/>
					</View>
				)}
			</ScreenTemplate>
		);
	}
}

const mapStateToProps = (state) => ({
	vals: { ...state.infoReducer },
});

export default connectAlert(
	connect(mapStateToProps)(
		reduxForm({
			form: "diagnosis",
			onSubmitSuccess: (result, dispatch, props) => {
				props.navigation.goBack(null);
			},
		})(Diagnosis)
	)
);
