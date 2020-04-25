import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";

import styles from "./styles";

const CardHeaderText = ({ text }) => (
	<Text style={styles.cardHeader}>{text}</Text>
);

CardHeaderText.propTypes = {
	text: PropTypes.string,
};

export default CardHeaderText;
