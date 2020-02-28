import React from "react";
import { View, Image, Text, StatusBar, Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import useScreenDimensions from "../../hooks/useScreenDimensions";

const Logo = ({ small = false }) => {
	const { height, width, aspectRatio } = useScreenDimensions();

	let logoWidth = small ? Math.round(width / 2) : Math.round(width / 1.5);

	if (height <= 700 && aspectRatio < 1.78) {
		logoWidth = Math.round(logoWidth / 1.25);
	}

	const styles = EStyleSheet.create({
		LogoContainer: {
			flex: 1,
			margin: 12,
			marginTop: 12 + StatusBar.currentHeight,
			justifyContent: "center"
		},
		LogoImage: {
			alignSelf: "center",
			width: logoWidth,
			height: logoWidth
		},
		LogoTitle: {
			alignSelf: "center",
			padding: 8,
			fontWeight: "bold",
			textAlign: "center",
			fontSize: small ? 36 : 48,
			lineHeight: small ? 36 : 48,
			textShadowColor: "rgba(0,0,0,0.25)",
			textShadowOffset: { width: 0, height: 2 },
			textShadowRadius: 6,
			color: "#ffffff"
		}
	});

	return (
		<View style={styles.LogoContainer}>
			<Image
				resizeMode="contain"
				style={styles.LogoImage}
				source={require("./images/lungs_logo.png")}
			/>
			<Text style={styles.LogoTitle}>Asthma{"\n"}Diagnosis</Text>
		</View>
	);
};

export default Logo;
