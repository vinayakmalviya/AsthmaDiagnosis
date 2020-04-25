import React from "react";
import {
	View,
	Text,
	Modal,
	TouchableWithoutFeedback,
	ScrollView,
	StatusBar,
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

import useScreenDimensions from "../../hooks/useScreenDimensions";

const styles = EStyleSheet.create({
	BGOverlay: {
		backgroundColor: "rgba(0,0,0,0.25)",
		flex: 1,
	},
	DropBox: {
		width: "100%",
		backgroundColor: "#fff",
		paddingVertical: 8,
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		elevation: 4,
		position: "absolute",
		bottom: 0,
	},
	DropTitle: {
		fontSize: 18,
		paddingHorizontal: 24,
		paddingVertical: 16,
		fontWeight: "bold",
	},
});

const CustomBottomSheet = ({
	label = "",
	visible = false,
	content = <View />,
	onVisibilityChange,
	...props
}) => {
	const { height } = useScreenDimensions();
	// Render
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={visible}
			onRequestClose={onVisibilityChange}
			style={{ flex: 1 }}
		>
			<TouchableWithoutFeedback onPress={onVisibilityChange}>
				<View style={{ flex: 1 }}>
					<StatusBar
						backgroundColor="rgba(0,0,0,0.25)"
						barStyle="dark-content"
					/>
					<View style={styles.BGOverlay}>
						<View style={styles.DropBox}>
							<Text style={styles.DropTitle}>{label}</Text>
							<View
								style={{ maxHeight: Math.round(height * 0.75) }}
							>
								<ScrollView
									style={{ flexGrow: 0 }}
									keyboardShouldPersistTaps="handled"
								>
									{content}
								</ScrollView>
							</View>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

export default CustomBottomSheet;
