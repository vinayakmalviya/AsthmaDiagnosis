import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { reduxForm, Field } from 'redux-form';

import { ScreenTemplate } from '../components/ScreenTemplate';
import { CustomInput } from '../components/Input';
import { CustomSubTitle } from '../components/Text';
import { CustomCard } from '../components/Container';
import { CustomButton } from '../components/Button';

import { testSubmit } from '../actions/infoActions';
import { loginUser } from '../actions/authActions';
import { connect } from 'react-redux';
import { connectAlert } from '../components/Alert';

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
    //dispatch(testSubmit(values));
    return new Promise((resolve, reject) => {
      dispatch(loginUser(values, resolve, reject));
    })
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <ScreenTemplate>
        <CustomSubTitle text="Testing Login" />
        <CustomCard>
          <Field
            label="Email"
            name="email"
            textContentType="emailAddress"
            autoCompleteType="email"
            keyboardType="email-address"
            component={CustomInput}
          />
          <Field
            label="Password"
            name="password"
            textContentType="password"
            component={CustomInput}
          />
          <CustomButton text="Submit" onPress={handleSubmit(this.onSubmit)} />
        </CustomCard>
      </ScreenTemplate>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.infoReducer,
})

export default connectAlert(
  connect(mapStateToProps)(
    reduxForm({
      form: "test",
      onSubmitSuccess: (result, dispatch, props) => {
        props.navigation.navigate("Dashboard", { followUp: false });
      },
      onSubmitFail: (errors, dispatch, submitError, props) => {
        props.alertWithType(submitError.type, submitError.heading, submitError._error);
      }
    })(Form)
  )
);
