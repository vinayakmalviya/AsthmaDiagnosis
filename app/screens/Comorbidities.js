import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { reduxForm, Field } from "redux-form";

import { CustomCard, RowView } from "../components/Container";
import { CustomSubTitle, CustomOverline } from "../components/Text";
import { CustomButton } from "../components/Button";
import { CustomInput } from "../components/Input";
import { CustomChipGroup } from "../components/Chip";
import { ScreenTemplate } from "../components/ScreenTemplate";

import { comorbiditiesSubmit } from "../actions/infoActions";

const styles = EStyleSheet.create({
	GridContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
	GridChildren: {
		flex: 1,
		flexBasis: "40%",
	},
});

class Comorbidities extends Component {
	static propTypes = {
		handleSubmit: PropTypes.func,
	};

	submitComorbidities = (values, dispatch, props) => {
		dispatch(comorbiditiesSubmit(values));
	};

	render() {
		const { handleSubmit } = this.props;
		return (
			<ScreenTemplate>
				<CustomSubTitle text="Examinations" />
				<CustomCard>
					<RowView>
						<Text
							style={{
								marginHorizontal: 12,
								marginTop: 22,
								fontWeight: "bold",
								fontSize: 16,
								width: "28%",
							}}
						>
							Pulse:
						</Text>
						<Field
							name="pulse"
							label="Value"
							suffix="per min"
							keyboardType="numeric"
							overrideStyles={[styles.GridChildren]}
							component={CustomInput}
						/>
					</RowView>
					<RowView>
						<Text
							style={{
								marginHorizontal: 12,
								marginTop: 22,
								fontWeight: "bold",
								fontSize: 16,
								width: "28%",
							}}
						>
							Saturation:
						</Text>
						<Field
							name="saturation"
							label="Value"
							suffix="%"
							keyboardType="numeric"
							overrideStyles={[styles.GridChildren]}
							component={CustomInput}
						/>
					</RowView>
					<RowView>
						<Text
							style={{
								marginHorizontal: 12,
								fontWeight: "bold",
								fontSize: 16,
								alignSelf: "center",
								width: "28%",
							}}
						>
							Blood Pressure:
						</Text>
						<View style={{ flex: 1 }}>
							<Field
								name="blood_pressure_sys"
								label="Systolic"
								suffix="mm of Hg"
								keyboardType="numeric"
								overrideStyles={{ flex: 1 }}
								component={CustomInput}
							/>
							<Field
								name="blood_pressure_dia"
								label="Diastolic"
								suffix="mm of Hg"
								keyboardType="numeric"
								overrideStyles={{ flex: 1 }}
								component={CustomInput}
							/>
						</View>
					</RowView>
					<RowView>
						<Text
							style={{
								marginHorizontal: 12,
								marginTop: 22,
								fontWeight: "bold",
								fontSize: 16,
								width: "28%",
							}}
						>
							Respiratory Rate:
						</Text>
						<Field
							name="resp_rate"
							label="Value"
							suffix="breaths per min"
							keyboardType="numeric"
							overrideStyles={[styles.GridChildren]}
							component={CustomInput}
						/>
					</RowView>
				</CustomCard>
				<CustomSubTitle text="URT Findings" />
				<CustomCard>
					<Field
						name="urt_findings"
						label="Select Findings Shown"
						data={[
							{ name: "dns", label: "Deviated Nasal Septum" },
							{ name: "pharyn", label: "Pharyngitis" },
							{ name: "pnd", label: "Post Nasal Drip" },
							{ name: "nps", label: "Nasal Polyps" },
							{ name: "hpt", label: "Hypertrophic Turbinates" },
							{ name: "ear_dis", label: "Ear Discharge" },
						]}
						component={CustomChipGroup}
					/>
				</CustomCard>
				<CustomButton
					text="Submit Results"
					onPress={handleSubmit(this.submitComorbidities)}
				/>
			</ScreenTemplate>
		);
	}
}

export default reduxForm({
	form: "comorbidities",
	onSubmitSuccess: (result, dispatch, props) => {
		props.navigation.navigate("Dashboard", props.navigation.state.params);
	},
})(Comorbidities);
