import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";

import styles from "./styles";

const Title = ({ text, style }) => (
	<Text style={[styles.title, style]}>{text}</Text>
);

Title.propTypes = {
	text: PropTypes.string,
	style: PropTypes.object,
};

export default Title;
