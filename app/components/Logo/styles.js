import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const imageWidth = Dimensions.get("window").width / 2;

const styles = EStyleSheet.create({
	$circleSize: imageWidth,
	$circleSizeBorder: imageWidth / 2,
	$imageSize: imageWidth / 1.7,
	$imageBorderSize: imageWidth / 4,
	container: {
		flex: 1,
		marginTop: "20%",
		alignSelf: "center",
	},
	text: {
		fontSize: 48,
		fontWeight: "700",
		color: "$white",
		textShadowColor: "$gray",
		textShadowOffset: { width: 0, height: 0 },
		textShadowRadius: 8,
		letterSpacing: 1,
		textAlign: "center",
	},
	circleBack: {
		width: "$circleSize",
		height: "$circleSize",
		borderRadius: "$circleSizeBorder",
		backgroundColor: "$white",
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		width: "$imageSize",
		height: "$imageSize",
		borderRadius: "$imageBorderSize",
	},
});

export default styles;
