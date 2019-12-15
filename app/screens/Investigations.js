import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View, Text, CheckBox, Picker } from 'react-native';

import { ContainerGray, CardWhite, RowView } from "../components/Container";
import { CardHeaderText } from "../components/Text";
import { FullButton } from '../components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { BorderInput } from '../components/Input';

class Investigations extends Component {
    render() {
        return(
            <ScrollView>
                <ContainerGray>
                    <CardHeaderText text="CBC"></CardHeaderText>
                    <CardWhite>
                        <Text style={{ marginBottom: 12, }}>Results</Text>
                        <RowView>
                            <Text>Normal:</Text>
                            <CheckBox></CheckBox>
                            <Text>Irregularity Present:</Text>
                            <CheckBox></CheckBox>
                        </RowView>
                    </CardWhite>
                    <CardHeaderText text="X-Ray"></CardHeaderText>
                    <CardWhite>
                        <Text style={{ marginBottom: 12, }}>Results</Text>
                        <RowView>
                            <Text>Normal:</Text>
                            <CheckBox></CheckBox>
                            <Text>Irregularity Present:</Text>
                            <CheckBox></CheckBox>
                        </RowView>
                    </CardWhite>
                    <CardHeaderText text="PEFR"></CardHeaderText>
                    <CardWhite>
                        <Text style={{ marginBottom: 12, }}>Results</Text>
                        <RowView>
                            <Text>PeakFlow:</Text>
                            <BorderInput text="Value" width="40%"></BorderInput>
                            <Text>L/min</Text>
                        </RowView>
                    </CardWhite>
                    <CardHeaderText text="Spirometry"></CardHeaderText>
                    <CardWhite>
                        <Text style={{ marginBottom: 12, }}>Results</Text>
                        <RowView>
                            <Text>FEV1:</Text>
                            <BorderInput text="Value" width="40%"></BorderInput>
                            <Picker style={{ width: 180, margin: 12, }}>
                                <Picker.Item label="Normal" value="0" />
                                <Picker.Item label="Between 60 to 80%" value="1" />
                                <Picker.Item label="Less than 60%" value="2" />
                            </Picker>
                        </RowView>
                        <RowView>
                            <Text>FEV1/FVC:</Text>
                            <BorderInput text="Value" width="40%"></BorderInput>
                            <Picker style={{ width: 180, margin: 12, }}>
                                <Picker.Item label="Normal" value="0" />
                                <Picker.Item label="Reduced by 5%" value="1" />
                                <Picker.Item label="Reduced by more than 5%" value="2" />
                            </Picker>
                        </RowView>
                    </CardWhite>
                    <CardHeaderText text="IgE"></CardHeaderText>
                    <CardWhite>
                        <Text style={{ marginBottom: 12, }}>Results</Text>
                        <RowView>
                            <Text>High:</Text>
                            <CheckBox></CheckBox>
                            <Text>Normal:</Text>
                            <CheckBox></CheckBox>
                        </RowView>
                    </CardWhite><CardHeaderText text="Skin Prick"></CardHeaderText>
                    <CardWhite>
                        <Text style={{ marginBottom: 12, }}>Results</Text>
                        <RowView>
                            <Text>Fungal:</Text>
                            <CheckBox></CheckBox>
                            <Text>Insect:</Text>
                            <CheckBox></CheckBox>
                            <Text>Dust:</Text>
                            <CheckBox></CheckBox>
                            <Text>Pollen:</Text>
                            <CheckBox></CheckBox>
                            <Text>Food:</Text>
                            <CheckBox></CheckBox>
                        </RowView>
                    </CardWhite>
                    <CardHeaderText text="Observations"></CardHeaderText>
                    <CardWhite>
                        <BorderInput text="Additional Observations" multiline={true} numberOfLines={4}></BorderInput>
                    </CardWhite>
                    <FullButton text="Submit Results" onPress={this.handleComplete}></FullButton>
                </ContainerGray>
            </ScrollView>
        );
    }
}

export default Investigations;