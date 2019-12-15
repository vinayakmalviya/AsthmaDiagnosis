import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View } from 'react-native';

import { ContainerGray, CardWhite, RowView } from "../components/Container";
import { Title, CardHeaderText } from "../components/Text";
import { FullButton, VariButton } from '../components/Button';

const butt1 = "Personal\nInformation";
const butt2 = "Background\nInformation";
const butt3 = "Symptoms";
const butt4 = "Investigations";

class Dashboard extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    handlePersonal = () => {
        console.log("Personal pressed");
    };
    handleBackground = () => {
        console.log("Background pressed");
    };
    handleSymptoms = () => {
        const { navigation } = this.props;
        navigation.navigate("Symptoms");
    };
    handleComorbidities = () => {
        const { navigation } = this.props;
        navigation.navigate("Comorbidities");
    };
    handleInvestigations = () => {
        const { navigation } = this.props;
        navigation.navigate("Investigations");
    };
    handleComplete = () => {
        console.log("Complete Diagnosis");
    }
    render() {
        return(
            <ContainerGray>
                <Title text="Patient Name Age Gender" />
                <CardHeaderText text="Personal Information" />
                <CardWhite>
                    <RowView>
                        <VariButton text={butt1} onPress={this.handlePersonal} ></VariButton>
                        <VariButton text={butt2} onPress={this.handleBackground} ></VariButton>
                    </RowView>
                </CardWhite>
                <CardHeaderText text="Diagnosis" />
                <CardWhite>
                    <RowView>
                        <VariButton text={butt3} onPress={this.handleSymptoms} ></VariButton>
                        <VariButton text="Comorbidities" onPress={this.handleComorbidities} ></VariButton>
                    </RowView>
                    <VariButton text={butt4} onPress={this.handleInvestigations} ></VariButton>
                </CardWhite>
                <FullButton text="COMPLETE DIAGNOSIS" onPress={this.handleComplete}></FullButton>
            </ContainerGray>
        );
    };
}

export default Dashboard;