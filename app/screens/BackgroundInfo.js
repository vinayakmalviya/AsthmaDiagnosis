import React, { Component } from 'react';
import { StatusBar, KeyboardAvoidingView } from 'react-native';

import { ContainerGray, CardWhite } from "../components/Container";
import { BorderInput } from "../components/Input";
import { CardHeaderText } from "../components/Text";
import { FullButton } from "../components/Button";

class BackgroundInfo extends Component {
    handleNext() {
        console.log("Patient Added");
    };
    render() {
        return(
            <ContainerGray>
                <KeyboardAvoidingView behavior="position">
                    <StatusBar translucent={true} barStyle="light-content" />
                    <CardHeaderText text="Padding Text 1" />
                    <CardHeaderText text="Padding Text 2" />
                    <CardHeaderText text="Background Information" />
                    <CardWhite>
                        <BorderInput text="Family History" />
                    </CardWhite>
                    <CardWhite>
                        <BorderInput text="Childhood History" />
                        <BorderInput text="Additional Observations" multiline={true} numberOfLines={4}></BorderInput>
                    </CardWhite>
                    <FullButton text="ADD PATIENT" onPress={this.handleNext} />
                </KeyboardAvoidingView>
            </ContainerGray>
        );
    };
}

export default BackgroundInfo;