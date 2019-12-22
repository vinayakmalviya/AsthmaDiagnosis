import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View, Text, CheckBox, Picker } from 'react-native';
import { reduxForm, Field } from "redux-form";

import { ContainerGray, CardWhite, RowView } from "../components/Container";
import { Title, CardHeaderText } from "../components/Text";
import { FullButton, VariButton } from '../components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { BorderInput } from '../components/Input';
import { comorbiditiesSubmit } from '../actions/infoActions';

const renderInput = props => {
    const { text, width, multiline, numberOfLines } = props;
    return(
      <BorderInput {...props.input} text={text} width={width} multiline={multiline} numberOfLines={numberOfLines}/>
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

class Comorbidities extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
    };

    submitComorbidities = (values, dispatch, props) => {
        alert(JSON.stringify(values));
        dispatch(comorbiditiesSubmit(values));
    }

    render() {
        const { handleSubmit } = this.props;
        return(
            <ContainerGray>
                <CardHeaderText text="Findings"></CardHeaderText>
                <CardWhite>
                    <RowView>
                        <Text>Pulse:</Text>
                        {/* <BorderInput text="Value" width="40%"></BorderInput> */}
                        <Field name="pulse" text="Value" width="40%" component={renderInput} />
                        <Text>per min</Text>
                    </RowView>
                    <RowView>
                        <Text>Saturation:</Text>
                        {/* <BorderInput text="Value" width="40%"></BorderInput> */}
                        <Field name="saturation" text="Value" width="40%" component={renderInput} />
                        <Text>%</Text>
                    </RowView>
                    <RowView>
                        <Text>Blood Pressure:</Text>
                        {/* <BorderInput text="Value" width="40%"></BorderInput> */}
                        <Field name="blood_pressure" text="Value" width="40%" component={renderInput} />
                        <Text>mm of Hg</Text>
                    </RowView>
                    <RowView>
                        <Text>Deviated Nasal Septum:</Text>
                        <Text>Yes:</Text>
                        <Field name="dns" component={renderCheckBox} />
                        {/* <CheckBox></CheckBox> */}
                        <Text>No:</Text>
                        {/* <CheckBox></CheckBox> */}
                        <Field name="dns1" component={renderCheckBox} />
                    </RowView>
                    <RowView>
                        <Text>Faringitis:</Text>
                        <Text>Yes:</Text>
                        {/* <CheckBox></CheckBox> */}
                        <Field name="fag" component={renderCheckBox} />
                        <Text>No:</Text>
                        {/* <CheckBox></CheckBox> */}
                        <Field name="fag1" component={renderCheckBox} />
                    </RowView>
                    <Text>Post Nasal Drip</Text>
                    <RowView>
                        <Text>Breath Sounds:</Text>
                        <Text>Yes:</Text>
                        {/* <CheckBox></CheckBox> */}
                        <Field name="bs" component={renderCheckBox} />
                        <Text>No:</Text>
                        {/* <CheckBox></CheckBox> */}
                        <Field name="bs1" component={renderCheckBox} />
                    </RowView>
                    <RowView>
                        <Text>Rhonchi:</Text>
                        <Text>Yes:</Text>
                        {/* <CheckBox></CheckBox> */}
                        <Field name="rhonchi" component={renderCheckBox} />
                        <Text>No:</Text>
                        {/* <CheckBox></CheckBox> */}
                        <Field name="rhonchi1" component={renderCheckBox} />
                    </RowView>
                </CardWhite>
                <FullButton text="Submit Results" onPress={handleSubmit(this.submitComorbidities)}></FullButton>
            </ContainerGray>
        );
    }
}

export default reduxForm({
    form: 'comorbidities',
    onSubmitSuccess: (result, dispatch, props) => {
        props.navigation.navigate("Dashboard");
    }
})(Comorbidities);