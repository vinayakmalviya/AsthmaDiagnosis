import React, { Component } from 'react';
import { StatusBar, View, Text, Picker, KeyboardAvoidingView } from 'react-native';

import { ContainerGray, CardWhite } from '../components/Container';
import { BorderInput } from "../components/Input";
import { FullButton } from "../components/Button";
import { CardHeaderText } from "../components/Text";

class PersonalInfo extends Component {
    handleNext() {
        console.log("Next Step Pressed");
    };
    render() {
        return(
            <ContainerGray>
                <KeyboardAvoidingView behavior="position" enabled>
                    <StatusBar translucent={true} barStyle="light-content" />
                    <CardHeaderText text="Temp Padding 1"/>
                    <CardHeaderText text="Temp Padding 2"/>
                    <CardHeaderText text="Personal Information"/>
                    <CardWhite>
                        <BorderInput text="Name"></BorderInput>
                        <View style={ { flexDirection: 'row' } }>
                            <BorderInput text="Age" width="40%"></BorderInput>
                            <Picker style={{height: 50, width: 180, marginTop: 10}} mode="dropdown">
                                <Picker.Item label="Select Gender" value="" />
                                <Picker.Item label="Male" value="male" />
                                <Picker.Item label="Female" value="female" />
                        </Picker>
                        </View>
                    </CardWhite>
                    <CardHeaderText text="Occupation and Habits"/>
                    <CardWhite>
                        <BorderInput text="Occupational Risk"></BorderInput>
                        <View style={ { flexDirection: 'row' } }>
                            <BorderInput text="Smoker" width="44%"></BorderInput>
                            <BorderInput text="Diabetic" width="44%"></BorderInput>
                        </View>
                        <View style={ { flexDirection: 'row' } }>
                            <BorderInput text="Hypertension" width="44%"></BorderInput>
                            <BorderInput text="Obesity" width="44%"></BorderInput>
                        </View>
                    </CardWhite>
                    <CardHeaderText text="More Notes"/>
                    <CardWhite>
                        <BorderInput text="Additional Observations" multiline={true} numberOfLines={4}></BorderInput>
                    </CardWhite>
                    <FullButton text="NEXT STEP" onPress={this.handleNext}></FullButton>
                </KeyboardAvoidingView>
            </ContainerGray>
        );
    }
};

export default PersonalInfo;