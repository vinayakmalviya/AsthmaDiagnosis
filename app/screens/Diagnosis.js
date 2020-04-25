import React, { Component } from "react";
import PropTypes from "prop-types";
import { DataTable } from "react-native-paper";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import EStyleSheet from "react-native-extended-stylesheet";
import { View, Text } from "react-native";

import { ScreenTemplate } from "../components/ScreenTemplate";
import { CustomCard } from "../components/Container";
import { CustomPicker } from "../components/Picker";
import { CustomSubTitle, CustomOverline } from "../components/Text";

const styles = EStyleSheet.create({
	GridChildren: {
		flex: 1,
		flexBasis: "40%",
	},
});

class Diagnosis extends Component {
	static propTypes = {
		tests: PropTypes.object,
		symptoms: PropTypes.object,
		personal: PropTypes.object,
	};
	render() {
		const { followup } = this.props.navigation.state.params;
		const name = [
			"No Occurence",
			"2 Days A Week",
			"Daily",
			"Multiple Times In A Day",
		];
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
										{
											name[
												this.props.vals.ini_symptoms
													.wheezing
											]
										}
									</DataTable.Cell>
								</DataTable.Row>
								<DataTable.Row>
									<DataTable.Cell>
										Shortness of breath
									</DataTable.Cell>
									<DataTable.Cell>
										{
											name[
												this.props.vals.ini_symptoms
													.shortness_of_breath
											]
										}
									</DataTable.Cell>
								</DataTable.Row>
								<DataTable.Row>
									<DataTable.Cell>Cough</DataTable.Cell>
									<DataTable.Cell>
										{
											name[
												this.props.vals.ini_symptoms
													.cough
											]
										}
									</DataTable.Cell>
								</DataTable.Row>
								<DataTable.Row>
									<DataTable.Cell>
										Chest Tightness
									</DataTable.Cell>
									<DataTable.Cell>
										{
											name[
												this.props.vals.ini_symptoms
													.chest_tightness
											]
										}
									</DataTable.Cell>
								</DataTable.Row>
								<DataTable.Row>
									<DataTable.Cell>
										Night-time Awakening
									</DataTable.Cell>
									<DataTable.Cell>
										{
											name[
												this.props.vals.ini_symptoms
													.nighttime
											]
										}
									</DataTable.Cell>
								</DataTable.Row>
								<DataTable.Row>
									<DataTable.Cell>
										Restriction of activity
									</DataTable.Cell>
									<DataTable.Cell>
										{
											name[
												this.props.vals.ini_symptoms
													.restriction
											]
										}
									</DataTable.Cell>
								</DataTable.Row>
							</DataTable>
							<CustomOverline text="Spirometry:" />
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
									<DataTable.Cell>5</DataTable.Cell>
									<DataTable.Cell>4</DataTable.Cell>
								</DataTable.Row>
								<DataTable.Row>
									<DataTable.Cell>FEV1/FVC</DataTable.Cell>
									<DataTable.Cell>2</DataTable.Cell>
									<DataTable.Cell>3</DataTable.Cell>
								</DataTable.Row>
							</DataTable>
						</CustomCard>
						<CustomSubTitle text="Diagnosis" />
						<CustomCard>
							<Field
								mode="dropdown"
								name="severity"
								label="Severity"
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
					</View>
				) : (
					<View>
						<CustomSubTitle text="Follow Up Summary" />
						<CustomCard>
							<DataTable>
								<DataTable.Header>
									<DataTable.Title>Symptom</DataTable.Title>
									<DataTable.Title>Occurence</DataTable.Title>
								</DataTable.Header>
								<DataTable.Row>
									<DataTable.Cell>Wheezing</DataTable.Cell>
									<DataTable.Cell>Daily</DataTable.Cell>
								</DataTable.Row>
							</DataTable>
						</CustomCard>
						<CustomSubTitle text="Follow Up Summary" />
						<CustomCard>
							<CustomOverline text="Asthma Control and Treatment Step Up/Step Down" />
						</CustomCard>
					</View>
				)}
			</ScreenTemplate>
		);
	}
}

const mapStateToProps = (state) => ({
	vals: { ...state.infoReducer },
});

export default connect(mapStateToProps)(
	reduxForm({
		form: "investigations",
	})(Diagnosis)
);
