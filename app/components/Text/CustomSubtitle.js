import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
	cardHeader: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 12,
		marginBottom: 0,
		textAlign: "center",
		color: "#0A7B61",
	},
});

const CustomSubTitle = ({ text }) => (
	<Text style={styles.cardHeader}>{text}</Text>
);

CustomSubTitle.propTypes = {
	text: PropTypes.string,
};

export default CustomSubTitle;
