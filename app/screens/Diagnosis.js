import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { connect } from 'react-redux';

import { ScreenTemplate } from "../components/ScreenTemplate";
import { CustomCard } from "../components/Container";
import { CustomSubTitle, CustomOverline } from "../components/Text";

class Diagnosis extends Component {
    static propTypes = {
        tests: PropTypes.object,
        symptoms: PropTypes.object,
        personal: PropTypes.object,
    }
    render() {
        const { tests, symptoms, personal } = this.props;
        return(
            <ScreenTemplate>
                <CustomSubTitle text="Summary" />
                <CustomCard>
                    <CustomOverline text="Symptoms:" />
                    <Text style={{ fontSize: 14, margin: 6, fontWeight: 'bold', }}>Wheezing: {symptoms.wheezing} Shortness of breath: {symptoms.shortness_of_breath}</Text>
                    <Text style={{ fontSize: 14, margin: 6, fontWeight: 'bold', }}>Cough: {symptoms.cough} Chest Tightness: {symptoms.chest_tightness}</Text>
                    <Text style={{ fontSize: 14, margin: 6, fontWeight: 'bold', }}>Night-time Awakening: {symptoms.nighttime} Restriction of activity: {symptoms.restriction}</Text>
                    <CustomOverline text="Spirometry:" />
                    <Text style={{ fontSize: 14, margin: 6, fontWeight: 'bold', }}>Pre-bronchodilator: FEV1 - {tests.spirometry.pre.fev1} -> {tests.spirometry.pre.fev1_range}</Text>
                    <Text style={{ fontSize: 14, margin: 6, fontWeight: 'bold', }}>Post-bronchodilator: FEV1 - {tests.spirometry.post.fev1P} -> {tests.spirometry.post.fev1_rangeP}</Text>
                    <Text style={{ fontSize: 14, margin: 6, fontWeight: 'bold', }}>Pre-bronchodilator: FEV1/FVC - {tests.spirometry.pre.ratio} -> {tests.spirometry.pre.ratio_range}</Text>
                    <Text style={{ fontSize: 14, margin: 6, fontWeight: 'bold', }}>Post-bronchodilator: FEV1/FVC - {tests.spirometry.post.ratioP} -> {tests.spirometry.post.ratio_rangeP}</Text>
                </CustomCard>
                <CustomSubTitle text="Diagnosis" />
                <CustomCard>
                    <CustomOverline text="After analysing the entered details with the help of GINA Guidelines, the following diagnosis can be made:" />
                    <CustomOverline text="The patient should be diagnosed for Mild Persistent Asthma" />
                </CustomCard>
            </ScreenTemplate>
        )
    }
}

const mapStateToProps = (state) => {
    const tests = state.infoReducer.tests;
    const symptoms = state.infoReducer.ini_symptoms;
    const personal = state.infoReducer.personal;
    return {
        tests,
        symptoms,
        personal,
    };
};

export default connect(mapStateToProps)(Diagnosis);