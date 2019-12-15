import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, KeyboardAvoidingView } from 'react-native';

import { ContainerGray, CardWhite } from "../components/Container";
import { BorderInput } from "../components/Input";
import { CardHeaderText } from "../components/Text";
import { FullButton } from "../components/Button";

class BackgroundInfo extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    handleNext = () => {
        const { navigation } = this.props;
        navigation.navigate("Dashboard");
    };
    render() {
        return(
            <ContainerGray>
                <KeyboardAvoidingView behavior="position">
                    <StatusBar translucent={true} barStyle="light-content" />
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