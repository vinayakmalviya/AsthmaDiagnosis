import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import styles from "./styles";

const RowView = ({ children }) => (
	<View style={styles.containerRow}>{children}</View>
);

RowView.propTypes = {
	children: PropTypes.any,
};

export default RowView;
