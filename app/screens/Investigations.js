import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View, Text, CheckBox, Picker } from 'react-native';

import { ContainerGray, CardWhite, RowView } from "../components/Container";
import { CardHeaderText } from "../components/Text";
import { FullButton } from '../components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { BorderInput } from '../components/Input';
import { reduxForm, Field } from 'redux-form';
import { investigationsSubmit } from '../actions/infoActions';

const renderInput = props => {
    const { text, width, multiline, numberOfLines } = props;
    return(
      <BorderInput {...props.input} text={text} width={width} multiline={multiline} numberOfLines={numberOfLines}/>
    );
};

const renderPicker = ({ input: { onChange, value, ...inputProps}, children, ...pickerProps}) => {
    return(
        <Picker selectedValue={value} onValueChange={ value => onChange(value)} { ...inputProps} { ...pickerProps}>{children}</Picker>
    );
};

const renderCheckBox = ({ input: { onChange, value } }) => {
    if(value == undefined) {
        value = false;
    }
    return(
        <CheckBox onValueChange={ value => onChange(value)} value={Boolean(value)}/> //Very bad code do not use after demonstration
    );
};

class Investigations extends Component {
    static propTypes = {
        navigate: PropTypes.object,
        handleSubmit: PropTypes.func
    };

    submitInvestigations = (values, dispatch) => {
        alert(JSON.stringify(values));
        dispatch(investigationsSubmit(values));
    }

    render() {
        const { handleSubmit } = this.props;
        return(
            <ScrollView>
                <StatusBar translucent={true} barStyle="light-content" />
                <ContainerGray>
                    <CardHeaderText text="CBC"></CardHeaderText>
                    <CardWhite>
                        <Text style={{ marginBottom: 12 }}>Results</Text>
                        <RowView>
                            <Text>Irregularity Present:</Text>
                            <Field name="cbc" component={renderCheckBox} />
                        </RowView>
                    </CardWhite>
                    <CardHeaderText text="X-Ray"></CardHeaderText>
                    <CardWhite>
                        <Text style={{ marginBottom: 12 }}>Results</Text>
                        <RowView>
                            <Text>Irregularity Present:</Text>
                            <Field name="xray" component={renderCheckBox} />
                        </RowView>
                    </CardWhite>
                    <CardHeaderText text="PEFR"></CardHeaderText>
                    <CardWhite>
                        <Text style={{ marginBottom: 12 }}>Results</Text>
                        <RowView>
                            <Text>PeakFlow:</Text>
                            <Field name="pefr" text="Value" width="40%" component={renderInput} />
                            <Text>L/min</Text>
                        </RowView>
                    </CardWhite>
                    <CardHeaderText text="Spirometry"></CardHeaderText>
                    <CardWhite>
                        <Text style={{ marginBottom: 12 }}>Results</Text>
                        <RowView>
                            <Text>FEV1:</Text>
                            <Field name="fev1"text="Value" width="40%" component={renderInput} />
                            <Field style={{ width: 180, margin: 12, }} name="fev1_range" mode="dropdown" component={renderPicker}>
                                <Picker.Item label="Normal" value={0} />
                                <Picker.Item label="Between 60 to 80%" value={1} />
                                <Picker.Item label="Less than 60%" value={2} />
                            </Field>
                        </RowView>
                        <RowView>
                            <Text>FEV1/FVC:</Text>
                            <Field name="ratio" width="40%" text="Value" component={renderInput}/>
                            <Field style={{ width: 180, margin: 12, }} name="ratio_range" mode="dropdown" component={renderPicker}>
                                <Picker.Item label="Normal" value={0} />
                                <Picker.Item label="Reduced by 5%" value={1} />
                                <Picker.Item label="Reduced by more than 5%" value={2} />
                            </Field>
                        </RowView>
                    </CardWhite>
                    <CardHeaderText text="IgE"></CardHeaderText>
                    <CardWhite>
                        <Text style={{ marginBottom: 12, }}>Results</Text>
                        <RowView>
                            <Text>High:</Text>
                            <Field name="ige" component={renderCheckBox} />
                        </RowView>
                    </CardWhite><CardHeaderText text="Skin Prick"></CardHeaderText>
                    <CardWhite>
                        <Text style={{ marginBottom: 12, }}>Results</Text>
                        <RowView>
                            <Text>Fungal:</Text>
                            <Field name="fungal" component={renderCheckBox} />
                            <Text>Insect:</Text>
                            <Field name="insect" component={renderCheckBox} />
                            <Text>Dust:</Text>
                            <Field name="dust" component={renderCheckBox} />
                            <Text>Pollen:</Text>
                            <Field name="pollen" component={renderCheckBox} />
                            <Text>Food:</Text>
                            <Field name="food" component={renderCheckBox} />
                        </RowView>
                    </CardWhite>
                    <CardHeaderText text="Observations"></CardHeaderText>
                    <CardWhite>
                        <Field text="Additional Observations" multiline={true} numberOfLines={4} name="observations" component={renderInput}/>
                    </CardWhite>
                    <FullButton text="Submit Results" onPress={handleSubmit(this.submitInvestigations)}></FullButton>
                </ContainerGray>
            </ScrollView>
        );
    }
}

export default reduxForm({
    form: 'investigations',
    onSubmitSuccess: (result, dispatch, props) => {
        props.navigation.navigate("Test");
    }
})(Investigations);