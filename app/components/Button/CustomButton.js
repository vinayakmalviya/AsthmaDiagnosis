import React from "react";
import { View, Text, TouchableNativeFeedback } from "react-native";
import PropTypes from "prop-types";
import EStyleSheet from "react-native-extended-stylesheet";
import { LinearGradient } from "expo-linear-gradient";

const CustomButton = ({
	text,
	onPress,
	white = false,
	large = false,
	largePadding = null,
	overrideStyles = null,
	disabled = false,
	numberOfLines = 1
}) => {
	if (largePadding == null) largePadding = large;

	const PADDING = largePadding ? 20 : 12;
	const FONT_SIZE = large ? 20 : 16;
	const LINE_HEIGHT = large ? 36 : 28;
	const HEIGHT = 2 * PADDING + numberOfLines * LINE_HEIGHT;

	const styles = EStyleSheet.create({
		ButtonContainer: {
			margin: 6,
			overflow: "hidden",
			height: HEIGHT,
			borderRadius: 8,
			elevation: largePadding ? 4 : 2
		},
		ButtonBox: {
			padding: PADDING,
			height: HEIGHT,
			justifyContent: "center",
			alignItems: "center",
			flex: 1,
			borderRadius: largePadding ? 8 : 4,
			backgroundColor: "rgba(0,0,0,0.1)"
		},
		ButtonText: {
			textTransform: "uppercase",
			textAlign: "center",
			fontWeight: "bold",
			color: "#FFFFFF",
			fontSize: FONT_SIZE,
			lineHeight: LINE_HEIGHT
		}
	});

	if (white) {
		return (
			<View style={[styles.ButtonContainer, overrideStyles]}>
				<TouchableNativeFeedback
					disabled={disabled}
					onPress={onPress}
					background={TouchableNativeFeedback.Ripple(
						"rgba(0,0,0,0.08)",
						true
					)}
				>
					{disabled ? (
						<View
							style={[
								styles.ButtonBox,
								{ backgroundColor: "#eee" }
							]}
						>
							<Text style={styles.ButtonText}>{text}</Text>
						</View>
					) : (
						<View
							style={[
								styles.ButtonBox,
								{ backgroundColor: "#FFFFFF" }
							]}
						>
							<Text
								style={[
									styles.ButtonText,
									{ color: "#11372E" }
								]}
							>
								{text}
							</Text>
						</View>
					)}
				</TouchableNativeFeedback>
			</View>
		);
	} else {
		return (
			<View style={[styles.ButtonContainer, overrideStyles]}>
				<TouchableNativeFeedback
					onPress={onPress}
					useForeground={true}
					disabled={disabled}
					background={TouchableNativeFeedback.Ripple(
						"rgba(255,255,255,0.25)",
						true
					)}
				>
					{disabled ? (
						<View
							style={[
								styles.ButtonBox,
								{ backgroundColor: "#eee" }
							]}
						>
							<Text style={styles.ButtonText}>{text}</Text>
						</View>
					) : (
						<LinearGradient
							colors={["#48FF7F", "#00CCAA"]}
							start={[0, 0]}
							end={[1, 1]}
							style={{ flex: 1 }}
						>
							<View style={styles.ButtonBox}>
								<Text style={styles.ButtonText}>{text}</Text>
							</View>
						</LinearGradient>
					)}
				</TouchableNativeFeedback>
			</View>
		);
	}
};

CustomButton.propTypes = {
	text: PropTypes.string,
	onPress: PropTypes.func,
	white: PropTypes.bool,
	large: PropTypes.bool,
	largePadding: PropTypes.bool,
	overrideStyles: PropTypes.object
};

export default CustomButton;
