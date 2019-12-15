import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View, Text, CheckBox, Picker } from 'react-native';

import { ContainerGray, CardWhite, RowView } from "../components/Container";
import { Title, CardHeaderText } from "../components/Text";
import { FullButton, VariButton } from '../components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { BorderInput } from '../components/Input';

class Comorbidities extends Component {
    render() {
        return(
            <ContainerGray>
                <CardHeaderText text="Findings"></CardHeaderText>
                <CardWhite>
                    <RowView>
                        <Text>Pulse:</Text>
                        <BorderInput text="Value" width="40%"></BorderInput>
                        <Text>per min</Text>
                    </RowView>
                    <RowView>
                        <Text>Saturation:</Text>
                        <BorderInput text="Value" width="40%"></BorderInput>
                        <Text>%</Text>
                    </RowView>
                    <RowView>
                        <Text>Blood Pressure:</Text>
                        <BorderInput text="Value" width="40%"></BorderInput>
                        <Text>mm of Hg</Text>
                    </RowView>
                    <RowView>
                        <Text>Deviated Nasal Septum:</Text>
                        <Text>Yes:</Text>
                        <CheckBox></CheckBox>
                        <Text>No:</Text>
                        <CheckBox></CheckBox>
                    </RowView>
                    <RowView>
                        <Text>Faringitis:</Text>
                        <Text>Yes:</Text>
                        <CheckBox></CheckBox>
                        <Text>No:</Text>
                        <CheckBox></CheckBox>
                    </RowView>
                    <Text>Post Nasal Drip</Text>
                    <RowView>
                        <Text>Breath Sounds:</Text>
                        <Text>Yes:</Text>
                        <CheckBox></CheckBox>
                        <Text>No:</Text>
                        <CheckBox></CheckBox>
                    </RowView>
                    <RowView>
                        <Text>Rhonchi:</Text>
                        <Text>Yes:</Text>
                        <CheckBox></CheckBox>
                        <Text>No:</Text>
                        <CheckBox></CheckBox>
                    </RowView>
                </CardWhite>
                <FullButton text="Submit Results" onPress={this.handleComplete}></FullButton>
            </ContainerGray>
        );
    }
}

export default Comorbidities;