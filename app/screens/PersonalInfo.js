import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View, Text, Picker, KeyboardAvoidingView } from 'react-native';

import { ContainerGray, CardWhite, RowView } from '../components/Container';
import { BorderInput } from "../components/Input";
import { FullButton } from "../components/Button";
import { CardHeaderText } from "../components/Text";

const renderInput = props => {
    const { text, width } = props;
    return(
      <BorderInput {...props.input} text={text} width={width} />
    );
}

class PersonalInfo extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    handleNext = () => {
        console.log("Next Step Pressed");
        const { navigation } = this.props;
        navigation.navigate("BackgroundInfo");
    };
    render() {
        return(
            <ContainerGray>
                <KeyboardAvoidingView behavior="position" enabled>
                    <StatusBar translucent={true} barStyle="light-content" />
                    <CardHeaderText text="Personal Information"/>
                    <CardWhite>
                        <BorderInput text="Name"></BorderInput>
                        <RowView>
                            <BorderInput text="Age" width="40%"></BorderInput>
                            <Picker style={{height: 50, width: 180, marginTop: 10}}>
                                <Picker.Item label="Male" value="male" />
                                <Picker.Item label="Female" value="female" />
                            </Picker>
                        </RowView>
                    </CardWhite>
                    <CardHeaderText text="Occupation and Habits"/>
                    <CardWhite>
                        <Picker style={{height: 50, width: 'auto', marginTop: 10}}>
                            <Picker.Item label="Male" value="male" />
                            <Picker.Item label="Female" value="female" />
                        </Picker>
                        <RowView>
                            <BorderInput text="Smoker" width="44%"></BorderInput>
                            <BorderInput text="Diabetic" width="44%"></BorderInput>
                        </RowView>
                        <RowView>
                            <BorderInput text="Hypertension" width="44%"></BorderInput>
                            <BorderInput text="Obesity" width="44%"></BorderInput>
                        </RowView>
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