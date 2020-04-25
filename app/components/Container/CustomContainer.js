import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import EStyleSheet from "react-native-extended-stylesheet";

const CustomContainer = ({ children, gradient = false }) => {
	const styles = EStyleSheet.create({
		Gray: {
			flex: 1,
			backgroundColor: "$grayBg",
		},
		Flex: {
			flex: 1,
		},
	});

	if (gradient) {
		return (
			<View style={styles.Flex}>
				<LinearGradient
					colors={["#48FF7F", "#00CCAA"]}
					style={styles.Flex}
				>
					<View style={styles.Flex}>{children}</View>
				</LinearGradient>
			</View>
		);
	} else {
		return (
			<View style={[styles.Flex, styles.Gray]}>
				<View style={styles.Flex}>{children}</View>
			</View>
		);
	}
};

CustomContainer.propTypes = {
	children: PropTypes.any,
	gradient: PropTypes.bool,
};

export default CustomContainer;
