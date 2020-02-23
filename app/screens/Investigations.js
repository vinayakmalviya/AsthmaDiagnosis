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
import { CustomChipGroup, CustomChipPicker } from "../components/Chip";
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
        navigation: PropTypes.object,
        handleSubmit: PropTypes.func
    };

    submitInvestigations = (values, dispatch) => {
        alert(JSON.stringify(values));
        dispatch(investigationsSubmit(values));
    }

    render() {
        const { change, handleSubmit, dispatch } = this.props;
        const { followup } = this.props.navigation.state.params;
        let wbcVal = 0;
        let eos = 0;
        let aecVal = 0;

        const calculateAEC = (event, value) => {
            wbcVal = value;
            aecVal = wbcVal * eos;
            change('aec', aecVal);
        }

        const calc = (event, value) => {
            eos = value;
            aecVal = wbcVal * eos;
            alert(aecVal);
            change('aec', aecVal);
        }


        if(followup) {
            return(
                <ScreenTemplate>
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
                </ScreenTemplate>
            );
        } else {
            return(
                <ScreenTemplate>
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
                                onChange = {calculateAEC}
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
                                onChange = {calc}
                            />
                            <Field
                                name="aec"
                                label="AEC"
                                editable={false}
                                keyboardType="numeric"
                                overrideStyles={[styles.GridChildren]}
                                component={CustomInput}
                            />
                        </RowView>
                    </CustomCard>
                    <CustomSubTitle text="X-Ray" />
                    <CustomCard>
                        <Field
                            name="xray"
                            label="Observations"
                            component={CustomInput}
                        />
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
                        <CustomOverline text="FVC:" />
                        <RowView>
                            <Field
                                name="fvc"
                                label="Value"
                                overrideStyles={[styles.GridChildren]}
                                component={CustomInput} />
                            <Field
                                mode="dropdown"
                                name="fvc_range"
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
                        <CustomOverline text="MMEF:" />
                        <RowView>
                            <Field
                                name="mmef"
                                label="Value"
                                overrideStyles={[styles.GridChildren]}
                                component={CustomInput} />
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
                        <CustomOverline text="FVC:" />
                        <RowView>
                            <Field
                                name="fvcP"
                                label="Value"
                                overrideStyles={[styles.GridChildren]}
                                component={CustomInput} />
                            <Field
                                mode="dropdown"
                                name="fvc_rangeP"
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
                        <CustomOverline text="MMEF:" />
                        <RowView>
                            <Field
                                name="mmefP"
                                label="Value"
                                overrideStyles={[styles.GridChildren]}
                                component={CustomInput} />
                        </RowView>
                    </CustomCard>
                    <CustomSubTitle text="IgE" />
                    <CustomCard>
                        <Field
                            name="ige"
                            label="Value"
                            component={CustomInput}
                        />
                    </CustomCard>
                    <CustomSubTitle text="Skin Prick" />
                    <CustomCard>
                        <CustomOverline text="Findings" />
                        <RowView>
                            {/* <Field
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
                            /> */}
                            <Field
                                name="fungal"
                                component={CustomChipPicker}
                                label="Fungal"
                                pickerLabel="Select"
                                pickerItems={[
                                    { value: 'Alternaria alternata', label: 'Alternaria alternata' },
                                    { value: 'Aspergillus fumigatus', label: 'Aspergillus fumigatus' },
                                    { value: 'Cladosporium herbarum', label: 'Cladosporium herbarum' },
                                    { value: 'Curvularia lunata', label: 'Curvularia lunata' },
                                    { value: 'Fusarium moniliforme', label: 'Fusarium moniliforme' },
                                    { value: 'Helminthosporium halodes', label: 'Helminthosporium halodes' },
                                    { value: 'Mucor mucedo', label: 'Mucor mucedo' },
                                    { value: 'Penicilium notatum', label: 'Penicilium notatum' },
                                    { value: 'Rhizopus nigricans', label: 'Rhizopus nigricans' },
                                ]}
                            />
                        </RowView>
                        <Field
                            name="insect"
                            component={CustomChipPicker}
                            label="Insect"
                            pickerLabel="Select"
                            pickerItems={[
                                { value: 'Dermatophagoides farinae', label: 'Dermatophagoides farinae' },
                                { value: 'Dermatophagoides pteronyssinus', label: 'Dermatophagoides pteronyssinus' },
                                { value: 'Blomia tropicalis', label: 'Blomia tropicalis' },
                                { value: 'Tyrophagus putrescentiae', label: 'Tyrophagus putrescentiae' },
                                { value: 'Dog Epithelia', label: 'Dog Epithelia' },
                                { value: 'Cat Epithelia', label: 'Cat Epithelia' },
                                { value: 'Mosquito', label: 'Mosquito' },
                            
                            ]}
                        />

                        <Field
                            name="pollen"
                            component={CustomChipPicker}
                            label="Pollen"
                            pickerLabel="Select"
                            pickerItems={[
                                { value: 'Cynodon dactylon (Bermuda Grass)', label: 'Cynodon dactylon (Bermuda Grass)' },
                                { value: 'Lolium perenne (Rye Grass)', label: 'Lolium perenne (Rye Grass)' },
                                { value: 'Poa pratensis (Kentucky Blue Grass)', label: 'Poa pratensis (Kentucky Blue Grass)' },
                                { value: 'Avena sativa (Oat)', label: 'Avena sativa (Oat)' },
                                { value: 'Triticum sativum (Wheat)', label: 'Triticum sativum (Wheat)' },
                                { value: 'Zea mays (Corn)', label: 'Zea mays (Corn)' },
                                { value: 'Ambrosia artemisifolia (Ragweed)', label: 'Ambrosia artemisifolia (Ragweed)' },
                                { value: 'Ricinus communis (Castor)', label: 'Ricinus communis (Castor)' },
                                { value: 'Urtica dioica (Nettle)', label: 'Urtica dioica (Nettle)' },                            
                            ]}
                        />

                        <Field
                            name="food"
                            component={CustomChipPicker}
                            label="Food"
                            pickerLabel="Select"
                            pickerItems={[
                                { value: 'Hens Egg (White)', label: 'Hens Egg (White)' },
                                { value: 'Rice', label: 'Rice' },
                                { value: 'Wheat Flour', label: 'Wheat Flour' },
                                { value: 'Corn Flour', label: 'Corn Flour' },
                                { value: 'Soy Flour', label: 'Soy Flour' },
                                { value: 'Chicken', label: 'Chicken' },
                                { value: 'Mutton', label: 'Mutton' },
                                { value: 'Shrimp (Prawn)', label: 'Shrimp (Prawn)' },
                                { value: 'Crab', label: 'Crab' },
                                { value: 'Salmon', label: 'Salmon' },                            
                                { value: 'Peanut', label: 'Peanut' },
                                { value: 'Walnut', label: 'Walnut' },                            
                                { value: 'Orange', label: 'Orange' },                            
                                { value: 'Banana', label: 'Banana' },
                                { value: 'Pea', label: 'Pea' },                            
                                { value: 'Spinach', label: 'Spinach' },                            
                                { value: 'Black Lentil (Urad)', label: 'Black Lentil (Urad)' },                            
                                { value: 'Green Lentil (Moong)', label: 'Green Lentil (Moong)' },
                                { value: 'Bengal Gram (Chickpea)', label: 'Bengal Gram (Chickpea)' },                            
                                { value: 'Toor Dal (Arhar)', label: 'Toor Dal (Arhar)' },                            
                            ]}
                        />
                        <Field
                            name="others"
                            component={CustomChipPicker}
                            label="Others"
                            pickerLabel="Select"
                            pickerItems={[
                                { value: 'Latex', label: 'Latex' },
                            ]}
                        />

                        {/* <Field
                            name="skin_prick"
                            component={CustomChipGroup}
                            data={[
                                { name: 'dust', label: 'Dust'},
                                { name: 'pollen', label: 'Pollen'},
                                { name: 'food', label: 'Food'},
                            ]}
                        /> */}
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
                </ScreenTemplate>
            );
        }
    }
}

export default reduxForm({
    form: 'investigations',
    onSubmitSuccess: (result, dispatch, props) => {
        props.navigation.navigate("Dashboard", props.navigation.state.params);
    }
})(Investigations);


// const form = 'investigations';

// const Investigations = reduxForm({
//   form
// })(Investigations);

// const selector = formValueSelector(form);

// export default connect(state => ({
//   wbcVal: selector(state, 'aec')
// }))(Investigations);