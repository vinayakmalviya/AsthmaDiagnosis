import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View, Button } from 'react-native';

import { Container } from "../components/Container";
import { Logo } from '../components/Logo';
import { FullButton } from '../components/Button';

class Home extends Component {
    newPatient() {
        console.log("New Patient Pressed");
        // this.props.navigation.navigate('PersonalInfo');
    }
    followUp() {
        console.log("Follow Up Pressed");
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
    }
}

/* s */

export default Home;