import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

import { ScreenTemplate } from "../components/ScreenTemplate";
import { CustomOverline, CustomSubTitle, Title } from "../components/Text";
import { CustomCard, RowView } from "../components/Container";

const PatientInfo = (props) => {
	const { _id, name, age, gender, phone, personal, background } = props;
	const occpationalRisk = ["No Risk", "Low Risk", "Medium Risk", "High Risk"];
	const allergies = {
		alr: "Allergic Rhinitis",
		adt: "Atopic Dermatitis",
		dust_a: "Dust Allergy",
		drug: "Drug Allergy",
		food_a: "Food Allergy",
		eia: "Exercise Induced Asthma",
		gerd: "GERD",
	};

	let allerg = "";

	for (var allergy in background.allergy_hist) {
		if (background.allergy_hist[allergy] && allergy != "other") {
			allerg = allerg.concat(" ", allergies[allergy]);
		}
	}

	return (
		<ScreenTemplate>
			<Title
				text={name + " " + age + " " + gender}
				style={{ alignSelf: "center" }}
			/>
			<CustomSubTitle text="Personal Information" />
			<CustomCard>
				<View style={{ marginLeft: -4 }}>
					<RowView>
						<CustomOverline text="Patient ID:" />
						<Text style={{ marginTop: 6 }}>{_id}</Text>
					</RowView>
					<RowView>
						<CustomOverline text="Phone Number:" />
						<Text style={{ marginTop: 6 }}>{phone}</Text>
					</RowView>
					<RowView>
						<CustomOverline text="Occupational Risk:" />
						<Text style={{ marginTop: 6 }}>
							{personal.risk
								? occpationalRisk[parseInt(personal.risk)]
								: "No data recorded"}
						</Text>
					</RowView>
					<RowView>
						<CustomOverline text="Habits:" />
						<View style={{ marginTop: 6 }}>
							{personal.smoker ||
							personal.obesity ||
							personal.hypertension ||
							personal.diabetic ? (
								<RowView>
									{personal.smoker && <Text>Smoker </Text>}
									{personal.diabetic && (
										<Text>Diabetic </Text>
									)}
									{personal.hypertension && (
										<Text>Hypertension </Text>
									)}
									{personal.obesity && <Text>Obesity </Text>}
								</RowView>
							) : (
								<Text>None</Text>
							)}
						</View>
					</RowView>
					<View style={{ marginBottom: 6 }}>
						<RowView>
							<CustomOverline text="Observations:" />
							<Text style={{ marginTop: 6 }}>
								{personal.observations
									? personal.observations
									: "No Observations Recorded"}
							</Text>
						</RowView>
					</View>
				</View>
			</CustomCard>
			<CustomSubTitle text="Background Information" />
			<CustomCard>
				<View style={{ marginLeft: -4 }}>
					<RowView>
						<CustomOverline text="Family History:" />
						<Text style={{ marginTop: 6, flexShrink: 1 }}>
							{background.family
								? background.family
								: "No data recorded"}
						</Text>
					</RowView>
					<RowView>
						<CustomOverline text="Childhood History:" />
						<Text style={{ marginTop: 6, flexShrink: 1 }}>
							{background.childhood
								? background.childhood
								: "No data recorded"}
						</Text>
					</RowView>
					<RowView>
						<CustomOverline text="Allergy History:" />
						<Text style={{ marginTop: 6, flexShrink: 1 }}>
							{background.allergy_hist
								? allerg
									? allerg
									: "No allergy history"
								: "No data recorded"}
						</Text>
					</RowView>
					{background.allergy_hist ? (
						background.allergy_hist.other ? (
							<RowView>
								<CustomOverline text="Other Allergies:" />
								<Text style={{ marginTop: 6, flexShrink: 1 }}>
									{" "}
									{background.allergy_hist.other}
								</Text>
							</RowView>
						) : null
					) : null}
					<View style={{ marginBottom: 6 }}>
						<RowView>
							<CustomOverline text="Observations:" />
							<Text style={{ marginTop: 6 }}>
								{background.observations
									? personal.observations
									: "No Observations Recorded"}
							</Text>
						</RowView>
					</View>
				</View>
			</CustomCard>
		</ScreenTemplate>
	);
};

const mapStateToProps = (state) => {
	return {
		_id: state.infoReducer._id,
		name: state.infoReducer.name,
		age: state.infoReducer.age,
		phone: state.infoReducer.phone,
		gender: state.infoReducer.gender,
		personal: state.infoReducer.personal,
		background: state.infoReducer.background,
	};
};

export default connect(mapStateToProps)(PatientInfo);
