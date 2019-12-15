import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, CheckBox, Text, Picker } from "react-native";

import { ContainerGray, CardWhite, RowView } from "../components/Container";
import { CardHeaderText } from "../components/Text";
import { BorderInput } from "../components/Input";
import { FullButton } from "../components/Button";
import { ScrollView } from 'react-native-gesture-handler';

class Symptoms extends Component {
    render() {
        return(
            <ScrollView>
                <ContainerGray>
                    <CardHeaderText text="Select Symptoms"></CardHeaderText>
                    <CardWhite>
                        <RowView>
                            <Text style={{ margin: 12, }}>Wheezing</Text>
                            <Picker style={{height: 50, width: 180, margin: 12, }}>
                                <Picker.Item label="2 Days a week" value="0" />
                                <Picker.Item label="Daily" value="1" />
                                <Picker.Item label="Multiple times in a day" value="2" />
                            </Picker>
                        </RowView>
                        <RowView>
                            <Text style={{ margin: 12, }}>Shortness of Breath</Text>
                            <Picker style={{height: 50, width: 180, margin: 12, }}>
                                <Picker.Item label="2 Days a week" value="0" />
                                <Picker.Item label="Daily" value="1" />
                                <Picker.Item label="Multiple times in a day" value="2" />
                            </Picker>
                        </RowView>
                        <RowView>
                            <Text style={{ margin: 12, }}>Cough</Text>
                            <Picker style={{height: 50, width: 180, margin: 12, }}>
                                <Picker.Item label="2 Days a week" value="0" />
                                <Picker.Item label="Daily" value="1" />
                                <Picker.Item label="Multiple times in a day" value="2" />
                            </Picker>
                        </RowView>
                        <RowView>
                            <Text style={{ margin: 12, }}>Chest Tightness</Text>
                            <Picker style={{height: 50, width: 180, margin: 12, }}>
                                <Picker.Item label="2 Days a week" value="0" />
                                <Picker.Item label="Daily" value="1" />
                                <Picker.Item label="Multiple times in a day" value="2" />
                            </Picker>
                        </RowView>
                        <RowView>
                            <Text style={{ margin: 12, }}>Nightime Awakening</Text>
                            <Picker style={{height: 50, width: 180, margin: 12, }}>
                                <Picker.Item label="2 Days a week" value="0" />
                                <Picker.Item label="Daily" value="1" />
                                <Picker.Item label="Multiple times in a day" value="2" />
                            </Picker>
                        </RowView>
                        <RowView>
                            <Text style={{ margin: 12, }}>Restiction of Activity</Text>
                            <Picker style={{height: 50, width: 180, margin: 12, }}>
                                <Picker.Item label="2 Days a week" value="0" />
                                <Picker.Item label="Daily" value="1" />
                                <Picker.Item label="Multiple times in a day" value="2" />
                            </Picker>
                        </RowView>
                    </CardWhite>
                    <CardHeaderText text="Observations"></CardHeaderText>
                    <CardWhite>
                        <BorderInput text="Additional Observations" multiline={true} numberOfLines={4}></BorderInput>
                    </CardWhite>
                    <FullButton text="Submit Symptoms" onPress={this.handleComplete}></FullButton>
                </ContainerGray>
            </ScrollView>
        );
    }
}

export default Symptoms;