import React, { useState, useRef, useEffect, useCallback } from "react";
import { View, TouchableWithoutFeedback, Animated } from "react-native";
import { CustomIcon } from "../Icon";
import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
	Wrapper: {
		alignSelf: "flex-start",
		margin: 6,
		backgroundColor: "#F6F6F6",
		borderRadius: 100,
	},
	Container: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		flexDirection: "row",
		alignItems: "center",
	},
	Icon: {
		opacity: 0,
		width: 0,
	},
	IconInner: {
		height: 18,
		width: 18,
		color: "#FFFFFF",
	},
	Label: {
		marginHorizontal: 6,
		color: "#555",
		fontSize: 16,
	},
});

const CustomChip = ({
	input = {},
	meta = {},
	label = "",
	overrideStyles = null,
	controlled = false,
	onPress = () => {},
	...props
}) => {
	// Initialize States
	const [value, setValue] = useState(input.value ? true : false);

	// Handle State Changes
	const handlePress = useCallback(() => {
		if (controlled) onPress();
		else setValue((value) => !value);
	});

	useEffect(() => {
		if (controlled) setValue(input.value);
	}, [input.value]);

	useEffect(() => {
		if (input.value !== value) setValue(input.value);
	}, [input.value]);

	useEffect(() => {
		if (input.value !== value && input.onChange) input.onChange(value);
	}, [value]);

	// Handle Animations
	const _animatedChecked = useRef(new Animated.Value(value ? 1 : 0)).current;

	useEffect(() => {
		Animated.timing(_animatedChecked, {
			toValue: value ? 1 : 0,
			duration: 150,
		}).start();
	}, [value]);

	const animatedStyles = {
		Wrapper: {
			backgroundColor: _animatedChecked.interpolate({
				inputRange: [0, 1],
				outputRange: ["#F6F6F6", "#0A7B61"],
			}),
		},
		Icon: {
			width: _animatedChecked.interpolate({
				inputRange: [0, 1],
				outputRange: [0, 18],
			}),
			opacity: _animatedChecked.interpolate({
				inputRange: [0.2, 1],
				outputRange: [0, 1],
			}),
		},
		Label: {
			color: _animatedChecked.interpolate({
				inputRange: [0, 1],
				outputRange: ["#555555", "#ffffff"],
			}),
		},
	};

	// Render
	return (
		<Animated.View
			style={[styles.Wrapper, animatedStyles.Wrapper, overrideStyles]}
		>
			<TouchableWithoutFeedback onPress={handlePress}>
				<View style={styles.Container}>
					<Animated.View style={[styles.Icon, animatedStyles.Icon]}>
						<CustomIcon
							icon="check"
							fill="#FFFFFF"
							{...styles.IconInner}
						/>
					</Animated.View>
					<Animated.Text style={[styles.Label, animatedStyles.Label]}>
						{label}
					</Animated.Text>
				</View>
			</TouchableWithoutFeedback>
		</Animated.View>
	);
};

export default CustomChip;
