import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View } from 'react-native';
import { connect } from 'react-redux';

import { CustomContainer } from "../components/Container";
import { Logo } from '../components/Logo';
import { CustomButton } from '../components/Button';

class Home extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    };

    componentDidMount() {
        const { isLoggedIn } = this.props;
        alert(isLoggedIn);
    }

    newPatient = () => {
        const { navigation } = this.props;
        navigation.navigate('PersonalInfo', { followup: false });
    }

    followUp = () => {
        const { navigation } = this.props;
        navigation.navigate('SelectPatient', { followup: true });
    }

    render() {
        return(
            <CustomContainer gradient>
                <StatusBar translucent={true} barStyle="light-content" />
                <Logo />
                <View style={{ alignSelf: 'stretch', margin: 6 }}>
                    <CustomButton text="New Patient" white large onPress={this.newPatient}/>
                    <CustomButton text="Follow Up" white large onPress={this.followUp}/>
                </View>
            </CustomContainer>
        );
    };
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.infoReducer.isLoggedIn,
})

export default connect(mapStateToProps)(Home);