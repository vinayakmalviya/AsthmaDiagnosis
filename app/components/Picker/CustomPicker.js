import React, { useState, useRef, useEffect, useCallback } from "react";
import {
	View,
	Text,
	Modal,
	FlatList,
	TouchableWithoutFeedback,
	TouchableNativeFeedback,
	Animated,
	StatusBar,
	Dimensions,
} from "react-native";
import PropTypes from "prop-types";
import EStyleSheet from "react-native-extended-stylesheet";

import { CustomIcon } from "../Icon";

const styles = EStyleSheet.create({
	Wrapper: {
		margin: 6,
		backgroundColor: "#F6F6F6",
		borderColor: "#AAAAAA",
		borderBottomWidth: 2,
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4,
	},
	Container: {
		flexDirection: "row",
	},
	Label: {
		position: "absolute",
		top: 16,
		left: 12,
		color: "#AAAAAA",
		fontSize: 16,
	},
	Value: {
		flex: 1,
		fontSize: 18,
		height: 54,
		paddingTop: 22,
		paddingBottom: 4,
		paddingHorizontal: 12,
		textAlignVertical: "top",
	},
	Icon: {
		marginRight: 12,
		alignSelf: "center",
	},
	IconInner: {
		width: 24,
		height: 24,
	},
	DropBox: {
		backgroundColor: "#fff",
		paddingVertical: 8,
		borderBottomLeftRadius: 4,
		borderBottomRightRadius: 4,
		elevation: 4,
		position: "absolute",
	},
	DropItem: {
		height: 48,
		margin: 0,
		paddingHorizontal: 16,
		justifyContent: "center",
	},
	DropText: {
		justifyContent: "center",
		fontSize: 16,
		color: "#555555",
	},
});

const CustomPicker = ({
	input = {},
	meta = {},
	items = [],
	label = "",
	suffix = "",
	overrideStyles = {},
	...props
}) => {
	// Initialize States
	const [modalVisible, setModalVisible] = useState(false);
	const [value, setValue] = useState(
		typeof input.value === "undefined" || input.value === null
			? ""
			: input.value
	);

	// Initialize Variables
	const _dropPosition = useRef({});
	const _button = useRef(null);

	// Handle Modal Changes
	const handleModalClose = useCallback(() => setModalVisible(false), [
		modalVisible,
	]);

	const handleModalOpen = useCallback(() => {
		calcDropPosition(() => setModalVisible(true));
	}, [modalVisible]);

	// Handle Events
	const handlePress = useCallback(() => {
		handleModalOpen();
	}, []);

	const handleSelection = useCallback((newVal) => {
		handleModalClose();
		setValue(newVal);
	}, []);

	useEffect(() => {
		if (input.onChange) input.onChange(value);
	}, [value]);

	// Handle Animations
	const _animatedFocused = useRef(new Animated.Value(0)).current;
	const _animatedValued = useRef(new Animated.Value(!(value === "") ? 1 : 0))
		.current;

	useEffect(() => {
		Animated.parallel([
			Animated.timing(_animatedFocused, {
				toValue: modalVisible ? 1 : 0,
				duration: 150,
			}),
			Animated.timing(_animatedValued, {
				toValue: modalVisible || !(value === "") ? 1 : 0,
				duration: 150,
			}),
		]).start();
	}, [modalVisible, value]);

	const animatedStyles = {
		Wrapper: {
			borderColor: _animatedFocused.interpolate({
				inputRange: [0, 1],
				outputRange: ["#AAAAAA", "#0A7B61"],
			}),
		},
		Label: {
			color: _animatedFocused.interpolate({
				inputRange: [0, 1],
				outputRange: ["#AAAAAA", "#0A7B61"],
			}),
			top: _animatedValued.interpolate({
				inputRange: [0, 1],
				outputRange: [16, 6],
			}),
			fontSize: _animatedValued.interpolate({
				inputRange: [0, 1],
				outputRange: [16, 12],
			}),
		},
		Icon: {
			transform: [
				{
					rotateX: _animatedFocused.interpolate({
						inputRange: [0, 1],
						outputRange: ["0deg", "180deg"],
					}),
				},
			],
		},
	};

	// Helper Functions
	const calcDropPosition = useCallback(
		(callback) => {
			const dimensions = Dimensions.get("window");
			const windowWidth = dimensions.width;
			const windowHeight = dimensions.height;

			if (_button.current && _button.current.measure) {
				_button.current.measure((fx, fy, width, height, px, py) => {
					const btnBottom = py + height;
					const dropHeight = 16 + 48 * Math.min(items.length, 4.5);

					const showInBottom =
						windowHeight - btnBottom >= dropHeight + 24;

					const top = showInBottom
						? btnBottom - StatusBar.currentHeight + 2
						: windowHeight -
						  dropHeight -
						  StatusBar.currentHeight -
						  24;

					_dropPosition.current = {
						top: top,
						left: px,
						width: width,
						height: dropHeight,
						borderRadius: showInBottom ? 0 : 4,
					};
					callback && callback();
				});
			}
		},
		[modalVisible]
	);

	// Render
	const currItem = items.find((item) => item.value === value);
	return (
		<Animated.View
			style={[styles.Wrapper, animatedStyles.Wrapper, overrideStyles]}
		>
			<TouchableNativeFeedback
				onPress={handlePress}
				background={TouchableNativeFeedback.Ripple(
					"rgba( 10, 123, 97, 0.15)"
				)}
			>
				<View style={[styles.Container]} ref={_button}>
					<Animated.Text style={[styles.Label, animatedStyles.Label]}>
						{label}
					</Animated.Text>
					<Text style={[styles.Value]}>
						{typeof currItem === "undefined" ? "" : currItem.label}
					</Text>
					<Animated.View style={[styles.Icon, animatedStyles.Icon]}>
						<CustomIcon
							icon="arrow_drop_down"
							{...styles.IconInner}
						/>
					</Animated.View>
				</View>
			</TouchableNativeFeedback>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={handleModalClose}
				style={{ flex: 1 }}
			>
				<StatusBar
					backgroundColor="rgba(0, 0, 0, 0.25)"
					barStyle="default"
				/>
				<TouchableWithoutFeedback
					onPress={handleModalClose}
					style={{ flex: 1 }}
				>
					<View style={{ flex: 1 }}>
						<View style={[styles.DropBox, _dropPosition.current]}>
							<FlatList
								data={items}
								keyExtractor={(item) => item.value}
								renderItem={({ item }) => (
									<TouchableNativeFeedback
										onPress={() =>
											handleSelection(item.value)
										}
										background={TouchableNativeFeedback.Ripple(
											"rgba( 10, 123, 97, 0.15)"
										)}
									>
										<View style={[styles.DropItem]}>
											<Text style={[styles.DropText]}>
												{item.label}
											</Text>
										</View>
									</TouchableNativeFeedback>
								)}
							/>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</Animated.View>
	);
};

CustomPicker.propTypes = {
	input: PropTypes.object,
	meta: PropTypes.object,
	items: PropTypes.array,
	label: PropTypes.string,
	suffix: PropTypes.string,
	overrideStyles: PropTypes.any,
};

export default CustomPicker;
