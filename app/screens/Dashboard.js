import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

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
        const { patientName, patientAge, patientGender, ini_symptoms } = this.props;
        return(
            <ContainerGray>
                <Title text={patientName + " " + patientAge + " " + patientGender} />
                {/* <Title text={JSON.stringify(ini_symptoms)} /> */}
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

const mapStateToProps = (state) => {
    const patientName = state.infoReducer.name;
    const patientAge = state.infoReducer.age;
    const patientGender = state.infoReducer.gender;
    const ini_symptoms = state.infoReducer.ini_symptoms;
    return {
        patientName,
        patientGender,
        patientAge,
        ini_symptoms,
    };
};

export default connect(mapStateToProps)(Dashboard);