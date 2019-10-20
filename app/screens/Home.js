import React, { Component } from 'react';
import { StatusBar, View, Button } from 'react-native';

import { Container } from "../components/Container";
import { Logo } from '../components/Logo';
import { FullButton } from '../components/Button';

class Home extends Component {
    newPatient() {
        console.log("New Patient Pressed");
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
                    <FullButton text="Button 1" onPress={this.newPatient}/>
                    <FullButton text="Button 2" onPress={this.followUp}/>
                </View>
            </Container>
        );
    }
} 


export default Home;