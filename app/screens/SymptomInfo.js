import React, { useCallback } from "react";
import { View, Text } from "react-native";
import { DataTable, Divider } from "react-native-paper";

import { CustomCard, RowView } from "../components/Container";
import { ScreenTemplate } from "../components/ScreenTemplate";
import { connect } from "react-redux";
import { Title, CustomSubTitle } from "../components/Text";
import { CustomOverline } from "../components/Text";

const severity = [
	"Intermittent",
	"Persistent: Mild",
	"Persistent: Moderate",
	"Persistent: Severe",
];

const name = [
	"No Occurence",
	"2 Days A Week",
	"Daily",
	"Multiple Times In A Day",
];

const spiro = ["Normal", "Between 60%\nto 80%", "Less than\n60%"];

const treat = ["Continue Same", "Step Up", "Step Down"];

const SymptonInfo = (props) => {
	const patientName = props.vals.name || "Name";
	const patientAge = props.vals.age || "Age";
	const patientGender = props.vals.gender || "Gender";

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

	if (props.vals?.comorbidities?.urt_findings) {
		dns = props.vals.comorbidities?.urt_findings?.dns
			? "Deviated Nasal Septum "
			: "";
		pharyn = props.vals.comorbidities?.urt_findings?.pharyn
			? "Pharyngitis "
			: "";
		rhonchi = props.vals.comorbidities?.urt_findings?.rhonchi
			? "Rhonchi "
			: "";
		pnd = props.vals.comorbidities?.urt_findings?.pnd
			? "Post Nasal Drip "
			: "";
		hpt = props.vals.comorbidities?.urt_findings?.hpt
			? "Hypertrophic Turbinates "
			: "";
		nps = props.vals.comorbidities?.urt_findings?.nps
			? "Nasal Polyps "
			: "";
		ear_dis = props.vals.comorbidities?.urt_findings?.ear_dis
			? "Ear Discharge "
			: "";
	}

	if (props.vals.tests?.skin_prick) {
		fungal = props.vals.tests?.skin_prick?.fungal
			? props.vals.tests?.skin_prick.fungal?.selected
				? props.vals.tests?.skin_prick.fungal?.value + " "
				: ""
			: "";
		insect = props.vals.tests?.skin_prick?.insect
			? props.vals.tests?.skin_prick.insect?.selected
				? props.vals.tests?.skin_prick.insect?.value + " "
				: ""
			: "";
		food = props.vals.tests?.skin_prick?.food
			? props.vals.tests?.skin_prick.food?.selected
				? props.vals.tests?.skin_prick.food?.value + " "
				: ""
			: "";
		pollen = props.vals.tests?.skin_prick?.pollen
			? props.vals.tests?.skin_prick.pollen?.selected
				? props.vals.tests?.skin_prick.pollen?.value + " "
				: ""
			: "";
		others = props.vals.tests?.skin_prick?.others
			? props.vals.tests?.skin_prick.others?.selected
				? props.vals.tests?.skin_prick.others?.value + " "
				: ""
			: "";
	} else {
		others = "No data recorded";
	}

	const renderInhaler = useCallback(() => {
		let inhaler = "";
		if (props.vals.diagnosis?.inhaler?.ics) {
			inhaler = inhaler.concat(" ", "ICS");
		}
		if (props.vals.diagnosis?.inhaler?.laba) {
			inhaler = inhaler.concat(" ", "LABA");
		}
		if (props.vals.diagnosis?.inhaler?.lama) {
			inhaler = inhaler.concat(" ", "LAMA");
		}

		return <Text style={{ marginTop: 6 }}>{inhaler}</Text>;
	}, [props.vals]);

	return (
		<ScreenTemplate>
			<View>
				<Title
					text={patientName + " " + patientAge + " " + patientGender}
				/>
				<CustomSubTitle text="Diagnosis" />
				<CustomCard>
					<View style={{ marginBottom: 6 }}>
						<RowView>
							<CustomOverline text="First Checkup: " />
							<Text style={{ marginTop: 6 }}>
								{props.vals.ini_symptoms.date
									? props.vals.ini_symptoms?.date
									: "No data present"}
							</Text>
						</RowView>
						{props.vals.diagnosis ? (
							<>
								<RowView>
									<CustomOverline text="Diagnosis: " />
									<Text style={{ marginTop: 6 }}>
										{props.vals.diagnosis?.severity
											? severity[
													parseInt(
														props.vals.diagnosis
															?.severity
													)
											  ]
											: "No data present"}
									</Text>
								</RowView>
								<RowView>
									<CustomOverline text="Inhaler: " />

									{props.vals.diagnosis?.inhaler ? (
										renderInhaler()
									) : (
										<Text style={{ marginTop: 6 }}>
											No data present
										</Text>
									)}
								</RowView>
								<RowView>
									<CustomOverline text="Dosage:" />
									<Text style={{ marginTop: 6 }}>
										{props.vals.diagnosis?.dosage
											? props.vals.diagnosis?.dosage
											: "No data present"}
									</Text>
								</RowView>
								<RowView>
									<CustomOverline text="Immunotherapy:" />
									<Text style={{ marginTop: 6 }}>
										{props.vals.diagnosis?.immuno
											? props.vals.diagnosis?.immuno
											: "Not prescribed"}
									</Text>
								</RowView>
								<RowView>
									<CustomOverline text="Oral Medications:" />
									<Text style={{ marginTop: 6 }}>
										{props.vals.diagnosis?.oral_m
											? props.vals.diagnosis?.oral_m
											: "Not prescribed"}
									</Text>
								</RowView>
								<RowView>
									<CustomOverline text="Biological Medications:" />
									<Text style={{ marginTop: 6 }}>
										{props.vals.diagnosis?.bio_m
											? props.vals.diagnosis?.bio_m
											: "Not prescribed"}
									</Text>
								</RowView>
								<RowView>
									<CustomOverline text="Supportive Therapy:" />
									<Text style={{ marginTop: 6 }}>
										{props.vals.diagnosis?.supp
											? props.vals.diagnosis?.supp
											: "Not prescribed"}
									</Text>
								</RowView>
								<RowView>
									<CustomOverline text="Other Specifications:" />
									<Text style={{ marginTop: 6 }}>
										{props.vals.diagnosis?.specs
											? props.vals.diagnosis?.specs
											: "None"}
									</Text>
								</RowView>
							</>
						) : (
							<CustomOverline text="No medication data recorded" />
						)}
					</View>
				</CustomCard>
				<CustomSubTitle text="Symptoms" />
				<CustomCard>
					<RowView>
						<CustomOverline text="First Checkup: " />
						<Text style={{ marginTop: 6 }}>
							{props.vals.ini_symptoms?.date
								? props.vals.ini_symptoms?.date
								: "No data recorded"}
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
								{name[props.vals.ini_symptoms?.wheezing]}
							</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell>Shortness Of Breath</DataTable.Cell>
							<DataTable.Cell>
								{
									name[
										props.vals.ini_symptoms
											?.shortness_of_breath
									]
								}
							</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell>Cough</DataTable.Cell>
							<DataTable.Cell>
								{name[props.vals.ini_symptoms?.cough]}
							</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell>Chest Tightness</DataTable.Cell>
							<DataTable.Cell>
								{name[props.vals.ini_symptoms?.chest_tightness]}{" "}
							</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell>
								Night Time Awakening
							</DataTable.Cell>
							<DataTable.Cell>
								{name[props.vals.ini_symptoms?.nighttime]}
							</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell>Restriction</DataTable.Cell>
							<DataTable.Cell>
								{name[props.vals.ini_symptoms?.restriction]}
							</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell>Observations</DataTable.Cell>

							{props.vals.ini_symptoms?.observations ? (
								<DataTable.Cell>
									{props.vals.ini_symptoms?.observations}
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
								{props.vals.comorbidities?.pulse}
							</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell>Saturation</DataTable.Cell>
							<DataTable.Cell>
								{props.vals.comorbidities?.saturation}
							</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell>Blood Pressure</DataTable.Cell>
							<DataTable.Cell>
								Sys:{" "}
								{props.vals.comorbidities?.blood_pressure_sys}
								{"  "}
								Dia:{" "}
								{props.vals.comorbidities?.blood_pressure_dia}
							</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell>Respiratory Rate</DataTable.Cell>
							<DataTable.Cell>
								{props.vals.comorbidities?.resp_rate}
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
								{props.vals.tests?.cbc?.hb}
							</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell>WBC</DataTable.Cell>
							<DataTable.Cell>
								{props.vals.tests?.cbc?.wbc}
							</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell>Eosinophils</DataTable.Cell>
							<DataTable.Cell>
								{props.vals.tests?.cbc?.eosin}
							</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell>AEC</DataTable.Cell>
							<DataTable.Cell>
								{props.vals.tests?.cbc?.aec}
							</DataTable.Cell>
						</DataTable.Row>
					</DataTable>
					<CustomOverline text="Spirometry" />
					{props.vals.tests.spirometry ? (
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
									{props.vals.tests?.spirometry?.pre
										? props.vals.tests?.spirometry?.pre
												?.fev1
										: "No data recorded"}
								</DataTable.Cell>
								<DataTable.Cell>
									{props.vals.tests?.spirometry?.post
										? props.vals.tests?.spirometry?.post
												?.fev1
										: "No data recorded"}
								</DataTable.Cell>
							</DataTable.Row>
							<DataTable.Row>
								<DataTable.Cell>FEV1 Range</DataTable.Cell>
								<DataTable.Cell>
									<Text style={{ flex: 1, flexWrap: "wrap" }}>
										{props.vals.tests?.spirometry?.pre
											? spiro[
													props.vals.tests?.spirometry
														?.pre?.fev1_range
											  ]
											: "No data recorded"}
									</Text>
								</DataTable.Cell>
								<DataTable.Cell>
									<Text style={{ flex: 1, flexWrap: "wrap" }}>
										{props.vals.tests?.spirometry?.post
											? spiro[
													props.vals.tests?.spirometry
														?.post?.fev1_range
											  ]
											: "No data recorded"}
									</Text>
								</DataTable.Cell>
							</DataTable.Row>
							<DataTable.Row>
								<DataTable.Cell>FEV1/FVC</DataTable.Cell>
								<DataTable.Cell>
									{props.vals.tests?.spirometry?.pre
										? props.vals.tests?.spirometry?.pre
												?.ratio
										: "No data recorded"}
								</DataTable.Cell>
								<DataTable.Cell>
									{props.vals.tests?.spirometry?.post
										? props.vals.tests?.spirometry?.post
												?.ratio
										: "No data recorded"}
								</DataTable.Cell>
							</DataTable.Row>
							<DataTable.Row>
								<DataTable.Cell>FEV1/FVC Range</DataTable.Cell>
								<DataTable.Cell>
									{props.vals.tests?.spirometry?.pre
										? spiro[
												props.vals.tests?.spirometry
													?.pre?.ratio_range
										  ]
										: "No data recorded"}
								</DataTable.Cell>
								<DataTable.Cell>
									{props.vals.tests?.spirometry?.post
										? spiro[
												props.vals.tests?.spirometry
													?.post?.ratio_range
										  ]
										: "No data recorded"}
								</DataTable.Cell>
							</DataTable.Row>
							<DataTable.Row>
								<DataTable.Cell>FVC</DataTable.Cell>
								<DataTable.Cell>
									{props.vals.tests?.spirometry?.pre
										? props.vals.tests?.spirometry?.pre?.fvc
										: "No data recorded"}
								</DataTable.Cell>
								<DataTable.Cell>
									{props.vals.tests?.spirometry?.post
										? props.vals.tests?.spirometry?.post
												?.fvc
										: "No data recorded"}
								</DataTable.Cell>
							</DataTable.Row>
							<DataTable.Row>
								<DataTable.Cell>MMEF</DataTable.Cell>
								<DataTable.Cell>
									{props.vals.tests?.spirometry?.pre
										? props.vals.tests?.spirometry?.pre
												?.mmef
										: "No data recorded"}
								</DataTable.Cell>
								<DataTable.Cell>
									{props.vals.tests?.spirometry?.post
										? props.vals.tests?.spirometry?.post
												?.mmef
										: "No data recorded"}
								</DataTable.Cell>
							</DataTable.Row>
						</DataTable>
					) : (
						<Text style={{ marginTop: 6, marginLeft: 12 }}>
							No data recorded
						</Text>
					)}
					<RowView>
						<CustomOverline text={"X-Ray: "} />
						{props.vals.tests?.xray ? (
							<Text style={{ marginTop: 6 }}>
								{props.vals.tests?.xray}
							</Text>
						) : (
							<Text style={{ marginTop: 6 }}>
								No Observations
							</Text>
						)}
					</RowView>
					<RowView>
						<CustomOverline text={"PEFR: "} />
						{props.vals.tests?.pefr ? (
							<Text style={{ marginTop: 6 }}>
								{props.vals.tests?.pefr}
							</Text>
						) : (
							<Text style={{ marginTop: 6 }}>
								No data recorded
							</Text>
						)}
					</RowView>
					<RowView>
						<CustomOverline text={"IGE: "} />
						{props.vals.tests?.ige ? (
							<Text style={{ marginTop: 6 }}>
								{props.vals.tests?.ige}
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
					<RowView>
						<CustomOverline text={"Observations: "} />
						{props.vals.tests?.observations ? (
							<Text style={{ marginTop: 6, flexShrink: 1 }}>
								{props.vals.tests?.observations}
							</Text>
						) : (
							<Text style={{ marginTop: 6 }}>
								No Observations
							</Text>
						)}
					</RowView>
				</CustomCard>
				{props.vals.follow_up ? (
					props.vals.follow_up.length > 0 ? (
						<>
							<CustomSubTitle text="Follow Ups" />
							<CustomCard>
								{props.vals.follow_up?.map((f, i) => {
									return (
										<React.Fragment key={i}>
											<Text
												style={{
													fontSize: 16,
													fontWeight: "bold",
													textTransform: "uppercase",
													marginTop: 6,
													letterSpacing: 1,
													marginHorizontal: 12,
													textAlign: "left",
													color: "#000000",
												}}
												children={i + 1 + "."}
											/>
											<RowView>
												<CustomOverline text="Follow Up Date:" />
												<Text style={{ marginTop: 6 }}>
													{f.date}
												</Text>
											</RowView>
											<RowView>
												<CustomOverline text="Pefr:" />
												<Text style={{ marginTop: 6 }}>
													{f.pefr
														? f.pefr + " L/min"
														: "No data present"}
												</Text>
											</RowView>
											<RowView>
												<CustomOverline text="Control:" />
												<Text style={{ marginTop: 6 }}>
													{f.control
														? f.control
														: "No data present"}
												</Text>
											</RowView>
											<RowView>
												<CustomOverline text="Treatment:" />
												<Text style={{ marginTop: 6 }}>
													{treat[
														parseInt(f.treatment)
													]
														? treat[
																parseInt(
																	f.treatment
																)
														  ]
														: "No data present"}
												</Text>
											</RowView>
											{f.specs ? (
												<RowView>
													<CustomOverline text="Other Specifications:" />
													<Text
														style={{ marginTop: 6 }}
													>
														{f.specs
															? f.specs
															: "No data present"}
													</Text>
												</RowView>
											) : null}
											<View>
												<CustomOverline text="Symptoms:" />
												{f.symptom &&
												f.symptom.length > 0 ? (
													<DataTable>
														<DataTable.Header>
															<DataTable.Title>
																Symptom
															</DataTable.Title>
															<DataTable.Title>
																Occurence
															</DataTable.Title>
														</DataTable.Header>
														{f.symptom?.map(
															(sym, index) => {
																return (
																	<DataTable.Row
																		key={
																			index
																		}
																	>
																		<DataTable.Cell>
																			{
																				sym.split(
																					","
																				)[0]
																			}
																		</DataTable.Cell>
																		<DataTable.Cell>
																			{name[
																				parseInt(
																					sym.split(
																						","
																					)[1]
																				)
																			]
																				? name[
																						parseInt(
																							sym.split(
																								","
																							)[1]
																						)
																				  ]
																				: "No data present"}
																		</DataTable.Cell>
																	</DataTable.Row>
																);
															}
														)}
													</DataTable>
												) : (
													<Text
														style={{
															marginLeft: 12,
															marginTop: 6,
														}}
													>
														No symptoms recorded
													</Text>
												)}
											</View>
											<Divider
												style={{
													marginVertical: 6,
													marginHorizontal: -8,
												}}
											/>
										</React.Fragment>
									);
								})}
							</CustomCard>
						</>
					) : null
				) : null}
			</View>
		</ScreenTemplate>
	);
};

const mapStateToProps = (state) => ({
	vals: { ...state.infoReducer },
});

export default connect(mapStateToProps)(SymptonInfo);
