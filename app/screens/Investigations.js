import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { reduxForm, Field } from 'redux-form';

import { CustomCard, RowView } from "../components/Container";
import { CustomSubTitle, CustomOverline } from "../components/Text";
import { CustomButton } from '../components/Button';
import { CustomInput } from '../components/Input';
import { CustomPicker } from "../components/Picker";
import { CustomChip, CustomChipGroup } from "../components/Chip";
import { ScreenTemplate } from "../components/ScreenTemplate";

import { investigationsSubmit } from '../actions/infoActions';

const styles = EStyleSheet.create({
    GridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    GridChildren: {
        flex: 1,
        flexBasis: '40%',
    },
});

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
        const followup = this.props.navigation.getParam('followup');
        return(
            <ScreenTemplate>
                {followup ? <View><CustomSubTitle text="PEFR" />
                            <CustomCard>
                                <View>
                                    <CustomOverline text="Peakflow:" />
                                    <Field 
                                        name="pefr"
                                        label="Value"
                                        suffix="L/min"
                                        keyboardType="numeric"
                                        component={CustomInput}
                                    />
                                </View>
                            </CustomCard></View> : ( <React.Fragment>
                    <CustomSubTitle text="CBC" />
                    <CustomCard>
                        <RowView>
                            <Field
                                name="hb"
                                label="HB"
                                suffix="g/dL"
                                keyboardType="numeric"
                                overrideStyles={[styles.GridChildren]}
                                component={CustomInput}
                            />
                            <Field
                                name="wbc"
                                label="WBC"
                                suffix="K/mcL"
                                keyboardType="numeric"
                                overrideStyles={[styles.GridChildren]}
                                component={CustomInput}
                            />
                        </RowView>
                        <RowView>
                            <Field
                                name="eosin"
                                label="Eosinophils"
                                suffix="%"
                                keyboardType="numeric"
                                overrideStyles={[styles.GridChildren]}
                                component={CustomInput}
                            />
                            <Field
                                name="aec"
                                label="AEC"
                                keyboardType="numeric"
                                overrideStyles={[styles.GridChildren]}
                                component={CustomInput}
                            />
                        </RowView>
                    </CustomCard>
                    <CustomSubTitle text="PEFR" />
                            <CustomCard>
                                <View>
                                    <CustomOverline text="Peakflow:" />
                                    <Field 
                                        name="pefr"
                                        label="Value"
                                        suffix="L/min"
                                        keyboardType="numeric"
                                        component={CustomInput}
                                    />
                                </View>
                            </CustomCard>
                    <CustomSubTitle text="X-Ray" />
                    <CustomCard>
                        <Field
                            name="xray"
                            label="Observations"
                            component={CustomInput}
                        />
                    </CustomCard>
                    <CustomSubTitle text="Spirometry" />
                    <CustomCard>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Pre-Bronchodilator</Text>
                        <CustomOverline text="FEV1:" />
                        <RowView>
                            <Field
                                name="fev1"
                                label="Value"
                                overrideStyles={[styles.GridChildren]}
                                component={CustomInput} />
                            <Field
                                mode="dropdown"
                                name="fev1_range"
                                label="Range"
                                items={[
                                    { label: 'Normal', value: 0 },
                                    { label: 'Between 60% to 80%', value: 1 },
                                    { label: 'Less than 60%', value: 2 },
                                ]}
                                overrideStyles={[styles.GridChildren]}
                                component={CustomPicker}
                            />
                        </RowView>
                        <CustomOverline text="FEV1/FVC:" />
                        <RowView>
                            <Field
                                name="ratio"
                                label="Value"
                                overrideStyles={[styles.GridChildren]}
                                component={CustomInput} />
                            <Field
                                mode="dropdown"
                                name="ratio_range"
                                label="Range"
                                items={[
                                    { label: 'Normal', value: 0 },
                                    { label: 'Reduced by 5%', value: 1 },
                                    { label: 'Reduced by more than 5%', value: 2 },
                                ]}
                                overrideStyles={[styles.GridChildren]}
                                component={CustomPicker}
                            />
                        </RowView>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Post-Bronchodilator</Text>
                        <CustomOverline text="FEV1:" />
                        <RowView>
                            <Field
                                name="fev1P"
                                label="Value"
                                overrideStyles={[styles.GridChildren]}
                                component={CustomInput} />
                            <Field
                                mode="dropdown"
                                name="fev1_rangeP"
                                label="Range"
                                items={[
                                    { label: 'Normal', value: 0 },
                                    { label: 'Between 60% to 80%', value: 1 },
                                    { label: 'Less than 60%', value: 2 },
                                ]}
                                overrideStyles={[styles.GridChildren]}
                                component={CustomPicker}
                            />
                        </RowView>
                        <CustomOverline text="FEV1/FVC:" />
                        <RowView>
                            <Field
                                name="ratioP"
                                label="Value"
                                overrideStyles={[styles.GridChildren]}
                                component={CustomInput} />
                            <Field
                                mode="dropdown"
                                name="ratio_rangeP"
                                label="Range"
                                items={[
                                    { label: 'Normal', value: 0 },
                                    { label: 'Reduced by 5%', value: 1 },
                                    { label: 'Reduced by more than 5%', value: 2 },
                                ]}
                                overrideStyles={[styles.GridChildren]}
                                component={CustomPicker}
                            />
                        </RowView>
                    </CustomCard>
                    <CustomSubTitle text="IgE" />
                    <CustomCard>
                        <CustomOverline text="Select if High" />
                        <RowView>
                            <Field name="ige" label="High" component={CustomChip} />
                        </RowView>
                    </CustomCard>
                    <CustomSubTitle text="Skin Prick" />
                    <CustomCard>
                        <RowView>
                            <Field
                                name="skin_prick"
                                label="Findings:"
                                component={CustomChipGroup}
                                data={[
                                    { name: 'fungal', label: 'Fungal'},
                                    { name: 'insect', label: 'Insect'},
                                    { name: 'dust', label: 'Dust'},
                                    { name: 'pollen', label: 'Pollen'},
                                    { name: 'food', label: 'Food'},
                                ]}
                            />
                        </RowView>
                    </CustomCard>
                    <CustomSubTitle text="Observations" />
                    <CustomCard>
                        <Field
                            name="observations"
                            label="Additional Observations"
                            multiline={true}
                            numberOfLines={4}
                            component={CustomInput}
                        />
                    </CustomCard>
                    <CustomButton text="Submit Results" onPress={handleSubmit(this.submitInvestigations)} />
                    </React.Fragment> )}
                
            </ScreenTemplate>
        );
    }
}

export default reduxForm({
    form: 'investigations',
    onSubmitSuccess: (result, dispatch, props) => {
        props.navigation.navigate("Dashboard");
    }
})(Investigations);