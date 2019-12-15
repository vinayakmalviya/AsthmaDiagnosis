import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View, Button } from 'react-native';

import { Container } from "../components/Container";
import { Logo } from '../components/Logo';
import { FullButton } from '../components/Button';

class Home extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    };

    newPatient = () => {
        const { navigation } = this.props;
        navigation.push('PersonalInfo');
    }

    followUp = () => {
        const { navigation } = this.props;
        navigation.navigate('Test');
    }
    render() {
        return(
            <Container>
                <StatusBar translucent={true} barStyle="light-content" />
                <Logo />
                <View style={{ bottom: 0, position: 'absolute' }}>
                    <FullButton text="New Patient" onPress={this.newPatient}/>
                    <FullButton text="Follow Up" onPress={this.followUp}/>
                </View>
            </Container>
        );
    };
}

export default Home;