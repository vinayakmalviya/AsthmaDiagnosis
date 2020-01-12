import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View } from "react-native";
import { connect } from "react-redux";

import { Title, CustomSubTitle } from "../components/Text";
import { CustomButton } from '../components/Button';
import { ScreenTemplate } from "../components/ScreenTemplate";

const butt1 = "Personal\nInformation";
const butt2 = "Background\nInformation";
const butt3 = "Symptoms";
const butt4 = "Investigations";

const styles = EStyleSheet.create({
    GridContainer: {
        flexDirection:'row', 
        flexWrap:'wrap'
    },
    GridChildren: {
        flex:1,
        flexBasis: '40%',
    }
});

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
            <ScreenTemplate>
                <Title text={patientName + " " + patientAge + " " + patientGender} />
                <CustomSubTitle text="Personal Information" />
                <View style={styles.GridContainer}>
                    <CustomButton
                        white
                        largePadding
                        overrideStyles={styles.GridChildren}
                        text={butt1}
                        onPress={this.handlePersonal}
                    />
                    <CustomButton
                        white
                        largePadding
                        overrideStyles={styles.GridChildren}
                        text={butt2}
                        onPress={this.handleBackground}
                    />
                </View>
                <CustomSubTitle text="Diagnosis" />
                    <View style={styles.GridContainer}>
                        <CustomButton
                            white
                            largePadding
                            overrideStyles={styles.GridChildren}
                            text={butt3}
                            onPress={this.handleSymptoms}
                        />
                        <CustomButton
                            largePadding
                            white
                            overrideStyles={styles.GridChildren}
                            text="Comorbidities"
                            onPress={this.handleComorbidities}
                        />
                        <CustomButton
                            largePadding
                            white
                            overrideStyles={styles.GridChildren}
                            text={butt4}
                            onPress={this.handleInvestigations}
                        />
                    </View>
                    <CustomSubTitle text="Results" />
                <CustomButton large text="COMPLETE DIAGNOSIS" onPress={this.handleComplete} />
            </ScreenTemplate>
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