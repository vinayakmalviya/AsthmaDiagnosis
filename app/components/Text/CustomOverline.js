import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
	Title: {
		fontSize: 14,
		fontWeight: "bold",
		textTransform: "uppercase",
		marginTop: 6,
		letterSpacing: 1,
		marginHorizontal: 12,
		textAlign: "left",
		color: "#555555",
	},
});

const CustomOverline = ({ text = "" }) => (
	<Text style={styles.Title}>{text}</Text>
);

CustomOverline.propTypes = {
	text: PropTypes.string,
};

export default CustomOverline;
