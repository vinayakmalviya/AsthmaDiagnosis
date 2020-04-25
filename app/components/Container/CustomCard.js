import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
	CardBG: {
		margin: 6,
		borderRadius: 8,
		padding: 8,
		backgroundColor: "#ffffff",
		elevation: 1,
		borderColor: "#f6f6f6",
		borderWidth: 1,
	},
	BorderCard: {
		borderColor: "#dddddd",
		elevation: 0,
	},
});

const CustomCard = ({ children, border = false }) => (
	<View style={[styles.CardBG, border ? styles.BorderCard : {}]}>
		{children}
	</View>
);

CustomCard.propTypes = {
	children: PropTypes.any,
};

export default CustomCard;
