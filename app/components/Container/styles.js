import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "$primaryBckg1",
	},
	containerFront: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	containerGray: {
		flex: 1,
		backgroundColor: "$grayBg",
	},
	containerRow: {
		flexDirection: "row",
	},
	cardWhite: {
		marginHorizontal: 10,
		marginVertical: 5,
		borderRadius: 4,
		padding: 10,
		backgroundColor: "$white",
	},
});

export default styles;
