import React from "react";
import { Text } from "react-native";
import Svg, { Path } from "react-native-svg";

const icons = {
	check: [{ d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" }],
	arrow_drop_down: [{ d: "M7 10l5 5 5-5H7z" }],
	calendar_today: [
		{
			d:
				"M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V10h16v11zm0-13H4V5h16v3z",
		},
	],
};

const CustomIcon = ({ icon, width = 24, height = 24, fill = "#000" }) => {
	return (
		<Svg viewBox="0 0 24 24" width={width} height={height} fill={fill}>
			{icons[icon].map((path, i) => (
				<Path
					key={path}
					fill={path.fill ? path.fill : fill}
					d={path.d}
				/>
			))}
		</Svg>
	);
};

export default CustomIcon;
