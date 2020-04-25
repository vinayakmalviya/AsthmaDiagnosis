import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Defs, LinearGradient, Stop, Circle } from "react-native-svg";
import { LineChart, Grid, YAxis, XAxis } from "react-native-svg-charts";
import moment from "moment";

const CustomChart = (props) => {
	const axesSvg = { fontSize: 10, fill: "grey" };
	const chartContentInset = { top: 10, bottom: 10, left: 7, right: 8 };
	const xAxisHeight = 30;

	const Gradient = () => (
		<Defs key="gradient">
			<LinearGradient id="gradient" x1="0" y="0%" x2="100%" y2="0%">
				<Stop offset="0%" stopColor="#48FF7F" />
				<Stop offset="100%" stopColor="#00CCAA" />
			</LinearGradient>
		</Defs>
	);

	const ChartPoints = ({ x, y, color }) =>
		props.data.map((item, index) => (
			<Circle
				key={index}
				cx={x(moment(item.date, "DD/MM/YYYY"))}
				cy={y(item.value)}
				r={6}
				stroke={color}
				strokeWidth={2}
				fill="white"
			/>
		));

	return (
		<View
			style={[
				{
					flexDirection: "row",
					height: props.height ? props.height : 200,
				},
				props.containerStyle,
			]}
		>
			<YAxis
				data={props.data}
				yAccessor={({ item }) => item.value}
				style={{
					marginBottom: xAxisHeight,
					borderRightColor: "rgb(128, 128, 128)",
					borderRightWidth: 1,
					paddingRight: 8,
				}}
				contentInset={chartContentInset}
				svg={axesSvg}
			/>
			<View style={{ flex: 1, marginLeft: 10 }}>
				<LineChart
					style={[{ flex: 1 }, props.chartStyle]}
					data={props.data}
					contentInset={chartContentInset}
					svg={{
						strokeWidth: 2,
						stroke: "url(#gradient)",
					}}
					xAccessor={({ item }) => item.date}
					yAccessor={({ item }) => parseFloat(item.value)}
					{...props}
				>
					<Grid />
					<Gradient />
					<ChartPoints color="#00CCAA" />
				</LineChart>
				<XAxis
					style={{
						marginHorizontal: -10,
						height: xAxisHeight,
						paddingTop: 8,
						borderTopColor: "rgb(128, 128, 128)",
						borderTopWidth: 1,
					}}
					data={props.data}
					formatLabel={(value) => {
						return value ? moment(value).format("DD - MMM") : null;
					}}
					contentInset={{ left: 18, right: 22 }}
					svg={{
						fontSize: 10,
						fill: "grey",
					}}
					xAccessor={({ item }) => new Date(item.date)}
				/>
			</View>
		</View>
	);
};

CustomChart.propTypes = {
	chartStyle: PropTypes.object,
	containerStyle: PropTypes.object,
	height: PropTypes.number,
	data: PropTypes.array || PropTypes.object,
};

export default CustomChart;
