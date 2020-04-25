import React, { useState, useEffect, useCallback } from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

import CustomChip from "./CustomChip";
import { CustomOverline } from "../Text";

const styles = EStyleSheet.create({
	Wrapper: {},
	Title: {
		margin: 6,
	},
	Container: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
	Chips: {
		margin: 4,
	},
});

const CustomChipGroup = ({
	input = {},
	meta = {},
	label = "",
	data = [],
	overrideStyles = null,
	...props
}) => {
	// Initialize States
	const [value, setValue] = useState({});

	// Handle State Changes
	const handleChange = useCallback(
		(name, newVal) => {
			setValue((value) => ({ ...value, [name]: newVal }));
		},
		[value]
	);

	useEffect(() => {
		if (input.onChange) input.onChange(value);
	}, [value]);

	// Render
	return (
		<View style={[styles.Wrapper, overrideStyles]}>
			<CustomOverline text={label} />
			<View style={styles.Container}>
				{data.map((item) => (
					<CustomChip
						key={item.label}
						label={item.label}
						overrideStyles={styles.Chips}
						input={{
							name: item.name,
							value: value[item.name] ? true : false,
							onChange: (value) => {
								handleChange(item.name, value);
							},
						}}
					/>
				))}
			</View>
		</View>
	);
};

export default CustomChipGroup;
