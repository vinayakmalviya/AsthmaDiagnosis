import React from "react";
import { View, Text } from "react-native";
import { DataTable } from "react-native-paper";
import { CustomCard, RowView } from "../components/Container";
import { CustomButton } from "../components/Button";
import { ScreenTemplate } from "../components/ScreenTemplate";
import { connect } from "react-redux";
import { Title, CustomSubTitle } from "../components/Text";
import { CustomOverline } from "../components/Text";

const SymptonInfo = (props) => {
	const patientName = props.vals.name || "Name";
	const patientAge = props.vals.age || "Age";
	const patientGender = props.vals.gender || "Gender";
	const name = [
		"No Occurence",
		"2 Days A Week",
		"Daily",
		"Multiple Times In A Day",
	];
	const spiro = ["Normal", "Between 60% to 80%", "Less than 60%"];
	let dns = "";
	let pharyn = "";
	let rhonchi = "";
	let pnd = "";
	let hpt = "";
	let nps = "";
	let ear_dis = "";
	let fungal = "";
	let insect = "";
	let food = "";
	let pollen = "";
	let others = "";
	if (props.vals.comorbidities.urt_findings) {
		dns = props.vals.comorbidities.urt_findings.dns
			? "Deviated Nasal Septum "
			: "";
		pharyn = props.vals.comorbidities.urt_findings.pharyn
			? "Pharyngitis "
			: "";
		rhonchi = props.vals.comorbidities.urt_findings.rhonchi
			? "Rhonchi "
			: "";
		pnd = props.vals.comorbidities.urt_findings.pnd
			? "Post Nasal Drip "
			: "";
		hpt = props.vals.comorbidities.urt_findings.hpt
			? "Hypertrophic Turbinates "
			: "";
		nps = props.vals.comorbidities.urt_findings.nps ? "Nasal Polyps " : "";
		ear_dis = props.vals.comorbidities.urt_findings.ear_dis
			? "Ear Discharge "
			: "";
	}
	if (props.vals.tests.skin_prick) {
		fungal = props.vals.tests.skin_prick.fungal.selected
			? props.vals.tests.skin_prick.fungal.value + " "
			: "";
		insect = props.vals.tests.skin_prick.insect.selected
			? props.vals.tests.skin_prick.insect.value + " "
			: "";
		food = props.vals.tests.skin_prick.food.selected
			? props.vals.tests.skin_prick.food.value + " "
			: "";
		pollen = props.vals.tests.skin_prick.pollen.selected
			? props.vals.tests.skin_prick.pollen.value + " "
			: "";
		others = props.vals.tests.skin_prick.others.selected
			? props.vals.tests.skin_prick.others.value + " "
			: "";
	}

	return (
		<ScreenTemplate>
			<View>
				<Title
					text={patientName + " " + patientAge + " " + patientGender}
				/>
				<CustomSubTitle text="Symptoms" />
				<CustomCard>
					<RowView>
						<CustomOverline text="First Checkup: " />
						<Text style={{ marginTop: 6 }}>
							{props.vals.ini_symptoms.date}
						</Text>
					</RowView>
					<DataTable>
						<DataTable.Header>
							<DataTable.Title>Symptom</DataTable.Title>
							<DataTable.Title>Occurence</DataTable.Title>
						</DataTable.Header>
						<DataTable.Row>
							<DataTable.Cell>Wheezing</DataTable.Cell>
							<DataTable.Cell>
								{name[props.vals.ini_symptoms.wheezing]}
							</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell>Shortness Of Breath</DataTable.Cell>
							<DataTable.Cell>
								{
									name[
										props.vals.ini_symptoms
											.shortness_of_breath
									]
								}
							</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell>Cough</DataTable.Cell>
							<DataTable.Cell>
								{name[props.vals.ini_symptoms.cough]}
							</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell>Chest Tightness</DataTable.Cell>
							<DataTable.Cell>
								{name[props.vals.ini_symptoms.chest_tightness]}{" "}
							</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell>
								Night Time Awakening
							</DataTable.Cell>
							<DataTable.Cell>
								{name[props.vals.ini_symptoms.nighttime]}
							</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell>Restriction</DataTable.Cell>
							<DataTable.Cell>
								{name[props.vals.ini_symptoms.restriction]}
							</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell>Observations</DataTable.Cell>

							{props.vals.ini_symptoms.observations ? (
								<DataTable.Cell>
									{props.vals.ini_symptoms.observations}
								</DataTable.Cell>
							) : (
								<DataTable.Cell>No Observations</DataTable.Cell>
							)}
						</DataTable.Row>
					</DataTable>
				</CustomCard>
				<CustomSubTitle text="Examinations" />
				<CustomCard>
					<DataTable>
						<DataTable.Header>
							<DataTable.Title>Examinations</DataTable.Title>
							<DataTable.Title>Values</DataTable.Title>
						</DataTable.Header>
						<DataTable.Row>
							<DataTable.Cell>Pulse</DataTable.Cell>
							<DataTable.Cell>
								{props.vals.comorbidities.pulse}
							</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell>Saturation</DataTable.Cell>
							<DataTable.Cell>
								{props.vals.comorbidities.saturation}
							</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell>Blood Pressure</DataTable.Cell>
							<DataTable.Cell>
								Sys:{" "}
								{props.vals.comorbidities.blood_pressure_sys}
								{"  "}
								Dia:{" "}
								{props.vals.comorbidities.blood_pressure_dia}
							</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell>Respiratory Rate</DataTable.Cell>
							<DataTable.Cell>
								{props.vals.comorbidities.resp_rate}
							</DataTable.Cell>
						</DataTable.Row>
					</DataTable>
					<RowView>
						<CustomOverline text={"URT Findings: "} />
						{dns + pharyn + rhonchi + pnd + hpt + nps + ear_dis ===
						"" ? (
							<Text style={{ marginTop: 6 }}>
								No URT Findings
							</Text>
						) : (
							<Text style={{ marginTop: 6, flexShrink: 1 }}>
								{dns +
									pharyn +
									rhonchi +
									pnd +
									hpt +
									nps +
									ear_dis}
							</Text>
						)}
					</RowView>
				</CustomCard>
				<CustomSubTitle text="Investigations" />
				<CustomCard>
					<CustomOverline text="CBC" />
					<DataTable>
						<DataTable.Header>
							<DataTable.Title>Record of</DataTable.Title>
							<DataTable.Title>Values</DataTable.Title>
						</DataTable.Header>
						<DataTable.Row>
							<DataTable.Cell>HB</DataTable.Cell>
							<DataTable.Cell>
								{props.vals.tests.cbc.hb}
							</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell>WBC</DataTable.Cell>
							<DataTable.Cell>
								{props.vals.tests.cbc.wbc}
							</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell>Eosinophils</DataTable.Cell>
							<DataTable.Cell>
								{props.vals.tests.cbc.eosin}
							</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell>AEC</DataTable.Cell>
							<DataTable.Cell>
								{props.vals.tests.cbc.aec}
							</DataTable.Cell>
						</DataTable.Row>
					</DataTable>
					<CustomOverline text="Spirometry" />
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
								{props.vals.tests.spirometry.pre.fev1}
							</DataTable.Cell>
							<DataTable.Cell>
								{props.vals.tests.spirometry.post.fev1}
							</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell>FEV1 Range</DataTable.Cell>
							<DataTable.Cell>
								<Text style={{ flex: 1, flexWrap: "wrap" }}>
									{
										spiro[
											props.vals.tests.spirometry.pre
												.fev1_range
										]
									}
								</Text>
							</DataTable.Cell>
							<DataTable.Cell>
								<Text style={{ flex: 1, flexWrap: "wrap" }}>
									{
										spiro[
											props.vals.tests.spirometry.post
												.fev1_range
										]
									}
								</Text>
							</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell>FEV1/FVC</DataTable.Cell>
							<DataTable.Cell>
								{props.vals.tests.spirometry.pre.ratio}
							</DataTable.Cell>
							<DataTable.Cell>
								{props.vals.tests.spirometry.post.ratio}
							</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell>FEV1/FVC Range</DataTable.Cell>
							<DataTable.Cell>
								{
									spiro[
										props.vals.tests.spirometry.pre
											.ratio_range
									]
								}
							</DataTable.Cell>
							<DataTable.Cell>
								{
									spiro[
										props.vals.tests.spirometry.post
											.ratio_range
									]
								}
							</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell>FVC</DataTable.Cell>
							<DataTable.Cell>
								{props.vals.tests.spirometry.pre.fvc}
							</DataTable.Cell>
							<DataTable.Cell>
								{props.vals.tests.spirometry.post.fvc}
							</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell>MMEF</DataTable.Cell>
							<DataTable.Cell>
								{props.vals.tests.spirometry.pre.mmef}
							</DataTable.Cell>
							<DataTable.Cell>
								{props.vals.tests.spirometry.post.mmef}
							</DataTable.Cell>
						</DataTable.Row>
					</DataTable>
					<RowView>
						<CustomOverline text={"X-Ray: "} />
						{props.vals.tests.xray ? (
							<Text style={{ marginTop: 6 }}>
								{props.vals.tests.xray}
							</Text>
						) : (
							<Text style={{ marginTop: 6 }}>
								No Observations
							</Text>
						)}
					</RowView>
					<RowView>
						<CustomOverline text={"PEFR: "} />
						{props.vals.tests.pefr ? (
							<Text style={{ marginTop: 6 }}>
								{props.vals.tests.pefr}
							</Text>
						) : (
							<Text style={{ marginTop: 6 }}>
								No Observations
							</Text>
						)}
					</RowView>
					<RowView>
						<CustomOverline text={"IGE: "} />
						{props.vals.tests.ige ? (
							<Text style={{ marginTop: 6 }}>
								{props.vals.tests.ige}
							</Text>
						) : (
							<Text style={{ marginTop: 6 }}>
								No Observations
							</Text>
						)}
					</RowView>
					<RowView>
						<CustomOverline text={"Observations: "} />
						{props.vals.tests.observations ? (
							<Text style={{ marginTop: 6, flexShrink: 1 }}>
								{props.vals.tests.observations}
							</Text>
						) : (
							<Text style={{ marginTop: 6 }}>
								No Observations
							</Text>
						)}
					</RowView>
					<RowView>
						<CustomOverline text={"Skin Prick: "} />
						{fungal + food + pollen + insect + others === "" ? (
							<Text style={{ marginTop: 6 }}>
								No Observations
							</Text>
						) : (
							<Text style={{ marginTop: 6, flexShrink: 1 }}>
								{fungal + food + pollen + insect + others}
							</Text>
						)}
					</RowView>
				</CustomCard>
			</View>
		</ScreenTemplate>
	);
};

const mapStateToProps = (state) => ({
	vals: { ...state.infoReducer },
});

export default connect(mapStateToProps)(SymptonInfo);
