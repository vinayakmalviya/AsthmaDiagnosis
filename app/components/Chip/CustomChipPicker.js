import React, { useState, useEffect, useCallback } from "react";
import { View } from "react-native";

import CustomChip from "./CustomChip";
import CustomBottomSheetPicker from "../BottomSheet/CustomBottomSheetPicker";

const CustomChipPicker = ({
	input = {},
	meta = {},
	label = "",
	pickerLabel = "",
	pickerItems = [],
	overrideStyles = null,
	...props
}) => {
	// Initialize States
	const [value, setValue] = useState(
		input.value && input.value.selected && input.value.value != ""
			? input.value
			: { selected: false }
	);
	const [sheetVisible, setSheetVisible] = useState(false);

	// Handle Chip Click
	const handleSelect = useCallback(() => {
		if (value.selected) setValue({ selected: false });
		else setSheetVisible(true);
	});

	// Handle Dropdown Select
	const handleChange = useCallback((newVal) => {
		setSheetVisible(false);
		if (newVal != "") setValue({ selected: true, value: newVal });
	});

	useEffect(() => {
		if (input.onChange) input.onChange(value);
	}, [value]);

	label = value.selected ? label + " - " + value.value : label;

	// Render
	return (
		<View>
			<CustomChip
				label={label}
				controlled={true}
				onPress={handleSelect}
				{...props}
				input={{ value: value.selected }}
			/>
			{sheetVisible && (
				<CustomBottomSheetPicker
					visible={sheetVisible}
					items={pickerItems}
					label={pickerLabel}
					onSelect={handleChange}
				/>
			)}
		</View>
	);
};

export default CustomChipPicker;
