import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { DataTable } from 'react-native-paper';
import { reduxForm, Field } from 'redux-form';

import { ScreenTemplate } from '../components/ScreenTemplate';
import { CustomInput } from '../components/Input';
import { CustomPicker } from '../components/Picker';
<<<<<<< HEAD
// import { CustomDateTimePicker } from '../components/DateTimePicker';
import { CustomCheckBox } from '../components/CheckBox';
=======
import { CustomDateTimePicker } from '../components/DateTimePicker';
>>>>>>> upstream/master
import { CustomChip, CustomChipGroup } from '../components/Chip';
import { CustomSubTitle, CustomOverline } from '../components/Text';
import { CustomCard } from '../components/Container';
import { CustomButton } from '../components/Button';

import { testSubmit } from '../actions/infoActions';
import { connect } from 'react-redux';


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

class Form extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    dispatch: PropTypes.func,
  };
  onSubmit = (values, dispatch) => {
    alert(JSON.stringify(values));
    dispatch(testSubmit(values));
  };

  render() {
    const { handleSubmit, abcd } = this.props;
    return (
      <ScreenTemplate>
        <CustomSubTitle text="Testing Components" />
        <CustomCard>
          <Field label="Name" name="name" component={CustomInput} />
          <Field
            label="Email"
            name="email"
            suffix="@somaiya.edu"
            textContentType="emailAddress"
            autoCompleteType="email"
            keyboardType="email-address"
            component={CustomInput}
          />
          {/* <Field label="Date of Birth" name="dob" mode="date" component={CustomDateTimePicker} /> */}
          <Field
            mode="dropdown"
            name="gender"
            component={CustomPicker}
            label="Gender"
            items={[
              { label: 'Male', value: 'M' },
              { label: 'Female', value: 'F' },
            ]}
          />
          <CustomOverline text="Single Chip" />
          <Field name="chip1" component={CustomChip} label="A Chip" />
          <Field
            name="chipgroup1"
            component={CustomChipGroup}
            label="Chip Group"
            data={[
              { name: 'listchip1', label: 'Chip One' },
              { name: 'listchip2', label: 'Chip Two' },
              { name: 'listchip3', label: 'Chip Three' },
            ]}
          />
          <CustomButton text="Submit" onPress={handleSubmit(this.onSubmit)} />
        </CustomCard>
        <CustomSubTitle text="Table Test" />
        <CustomCard>
          <CustomOverline text="Here is table" />
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Column 1</DataTable.Title>
              <DataTable.Title>Column 2</DataTable.Title>
              <DataTable.Title>Column 3</DataTable.Title>
            </DataTable.Header>
            <DataTable.Row>
              <DataTable.Cell>Hello 1</DataTable.Cell>
              <DataTable.Cell>Hello 2</DataTable.Cell>
              <DataTable.Cell>Hello 3</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Hello 4</DataTable.Cell>
              <DataTable.Cell>Hello 5</DataTable.Cell>
              <DataTable.Cell>Hello 6</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </CustomCard>
      </ScreenTemplate>
    );
  }
}

const mapStateToProps = (state) => ({
  abcd: state.infoReducer,
})

export default connect(mapStateToProps)(reduxForm({
  form: 'test',
  onSubmitSuccess: (result, dispatch, props) => {
    props.navigation.navigate('Dashboard');
  },
})(Form));
