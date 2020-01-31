import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { reduxForm, Field } from 'redux-form';

import { ScreenTemplate } from '../components/ScreenTemplate';
import { CustomInput } from '../components/Input';
import { CustomPicker } from '../components/Picker';
// import { CustomDateTimePicker } from '../components/DateTimePicker';
import { CustomCheckBox } from '../components/CheckBox';
import { CustomChip, CustomChipGroup } from '../components/Chip';
import { CustomSubTitle, Title } from '../components/Text';
import { CustomCard } from '../components/Container';
import { CustomButton } from '../components/Button';

import { testSubmit } from '../actions/infoActions';


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
    const { handleSubmit } = this.props;
    return (
      <ScreenTemplate>
        <Title text="Padding Text 1" />
        <CustomSubTitle text="Padding Sub Text 1" />
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
          <View style={styles.GridContainer}>
            <Field
              name="check1"
              component={CustomCheckBox}
              label="Check This"
            />
            <Field
              name="check2"
              component={CustomCheckBox}
              label="And This"
            />
            <Field name="chip1" component={CustomChip} label="A Chip" />
          </View> 
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
      </ScreenTemplate>
    );
  }
}

export default reduxForm({
  form: 'test',
  onSubmitSuccess: (result, dispatch, props) => {
    props.navigation.navigate('Dashboard');
  },
})(Form);
