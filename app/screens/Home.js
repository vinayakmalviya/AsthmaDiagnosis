import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { NavigationActions, StackActions } from "react-navigation";

import { CustomContainer } from "../components/Container";
import { Logo } from '../components/Logo';
import { CustomButton } from '../components/Button';
import { logoutUser } from '../actions/authActions';

const styles = EStyleSheet.create({
	logoutContainer: {
		alignSelf: 'flex-end',
	},
	logout: {
		padding: 8,
		paddingBottom: 12,
		marginTop: StatusBar.currentHeight + 4,
		padding: 4,
		marginHorizontal: 8,
		right: 0
	},
	text: {
		fontSize: 16,
		fontWeight: "bold",
		textShadowColor: "rgba(0,0,0,0.25)",
		textShadowOffset: { width: 0, height: 2 },
		textShadowRadius: 6,
		color: "#ffffff"
	}
});

class Home extends Component {
	static propTypes = {
		navigation: PropTypes.object
	};

	componentDidMount() {
		if(!this.props.isLoggedIn) {
			this.props.navigation.replace("Login");
		}
	}

	newPatient = () => {
		const { navigation } = this.props;
		navigation.navigate("PersonalInfo", { followup: false });
	};

	followUp = () => {
		const { navigation } = this.props;
		navigation.navigate("SelectPatient", { followup: true });
	};

	handleLogout = () => {
		const { navigation, dispatch } = this.props;
		dispatch(logoutUser());
		navigation.dispatch(StackActions.reset({
			index: 0,
			key: null,
			actions: [NavigationActions.navigate({ routeName: 'Login' })]
		}))
	};

	render() {
		return (
			<CustomContainer gradient>
				<StatusBar translucent={true} barStyle="light-content" />
				<View style={styles.logoutContainer}>
					<TouchableOpacity onPress={this.handleLogout}>
						<View style={styles.logout}>
							<Text style={styles.text}>Logout</Text>
						</View>
					</TouchableOpacity>
				</View>
				<Logo />
				<View style={{ alignSelf: "stretch", margin: 6 }}>
					<CustomButton
						text="New Patient"
						white
						large
						onPress={this.newPatient}
					/>
					<CustomButton
						text="Follow Up"
						white
						large
						onPress={this.followUp}
					/>
				</View>
			</CustomContainer>
		);
	}
}

const mapStateToProps = state => ({
	isLoggedIn: state.infoReducer.isLoggedIn
});

export default connect(mapStateToProps)(Home);
