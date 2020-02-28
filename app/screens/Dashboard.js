import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View } from "react-native";
import { connect } from "react-redux";
import { NavigationEvents } from "react-navigation";

import { Title, CustomSubTitle } from "../components/Text";
import { CustomButton } from '../components/Button';
import { ScreenTemplate } from "../components/ScreenTemplate";
import { midwaySubmit, updatePSubmit } from '../actions/infoActions';

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

    componentDidMount() {
        const { followup } = this.props.navigation.state.params;
        const { track, dispatch } = this.props;
        if(!followup) {
            if(!track.new.midway && track.new.personal && track.new.background) {
                console.log("Mount Midway");
                dispatch(midwaySubmit());
            }
        }
    }

    submitTracker = () => {
        const { followup } = this.props.navigation.state.params;
        const { track, dispatch } = this.props;
        if(!followup) {
            if(track.new.symptoms && track.new.investigations && track.new.comorbidities) {
                if(track.new.midway) {
                    console.log("Update submit");
                    dispatch(updatePSubmit());
                } else {
                    console.log("Update midway submit");
                    dispatch(midwaySubmit());
                }
            }
        }
    }

    handlePersonal = () => {
        console.log("Personal pressed");
    };

    handleBackground = () => {
        console.log("Background pressed");
    };

    handleSymptoms = () => {
        const { navigation } = this.props;
        const { followup } = this.props.navigation.state.params;
        if (!followup) {
            navigation.navigate("Symptoms", this.props.navigation.state.params);
        } else {
            navigation.navigate("FollowupSym", this.props.navigation.state.params);
        }
    };

    handleComorbidities = () => {
        const { navigation } = this.props;
        navigation.navigate("Comorbidities", this.props.navigation.state.params);
    };

    handleInvestigations = () => {
        const { navigation } = this.props;
        navigation.navigate("Investigations", this.props.navigation.state.params);
    };

    handleComplete = () => {
        const { navigation } = this.props;
        navigation.navigate("Diagnosis", this.props.navigation.state.params);
    }
    
    render() {
        const { patientName, patientAge, patientGender } = this.props;
        const { followup } = this.props.navigation.state.params;
        return(
            <ScreenTemplate>
                <NavigationEvents onDidFocus={this.submitTracker} />
                <Title text={patientName + " " + patientAge + " " + patientGender} />
                <CustomSubTitle text="Personal Information" />
                <View style={styles.GridContainer}>
                    <CustomButton
                        white
                        largePadding
                        overrideStyles={styles.GridChildren}
                        text={butt1}
                        numberOfLines={2}
                        onPress={this.handlePersonal}
                    />
                    <CustomButton
                        white
                        largePadding
                        overrideStyles={styles.GridChildren}
                        text={butt2}
                        numberOfLines={2}
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
                        
                        {!followup && 
                            <CustomButton
                                largePadding
                                white
                                overrideStyles={styles.GridChildren}
                                text="Comorbidities"
                                onPress={this.handleComorbidities}
                            />}
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
    const patientName = state.infoReducer.name || "Name";
    const patientAge = state.infoReducer.age || "Age";
    const patientGender = state.infoReducer.gender || "Gender";
    const tracking = state.trackReducer;
    return {
        patientName,
        patientGender,
        patientAge,
        track: tracking
    };
};

export default connect(mapStateToProps)(Dashboard);