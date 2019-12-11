import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';

import { ContainerGray, CardWhite } from "../components/Container";
import { Title, CardHeaderText } from "../components/Text";
import { FullButton } from '../components/Button';

class Dashboard extends Component {
    render() {
        return(
            <ContainerGray>
                <CardHeaderText text="Padding Text 1" />
                <Title text="Patient Name Age Gender" />
                <CardHeaderText text="Personal Information" />
                <CardWhite>
                    <View style={{ flexDirection: 'row' }} >
                        <FullButton text="Personal Information" width="50%" onPress={this.handleInfoPress} ></FullButton>
                        <FullButton text="Background Information" width="50%" onPress={this.handleInfoPress} ></FullButton>
                    </View>
                </CardWhite>
                <CardHeaderText text="Diagnosis" />
                <CardWhite>
                    <View style={{ flexDirection: 'row' }} >
                        <FullButton text="Clinical Analysis" width="50%" onPress={this.handleInfoPress} ></FullButton>
                        <FullButton text="Supportive Diagnosis" width="50%" onPress={this.handleInfoPress} ></FullButton>
                    </View>
                </CardWhite>
                <FullButton text="COMPLETE DIAGNOSIS"></FullButton>
            </ContainerGray>
        );
    };
}

export default Dashboard;