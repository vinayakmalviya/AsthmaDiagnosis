import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView
} from "react-native";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";

import useArray from "../components/useArray";
import { followupSymSubmit } from "../actions/infoActions";
import { CustomCard, RowView, CustomContainer } from "../components/Container";
import { ScreenTemplate } from "../components/ScreenTemplate";
import { CustomPicker } from "../components/Picker";
import { CustomInput } from "../components/Input";
import { CustomButton } from "../components/Button";
import CustomBottomSheet from "../components/BottomSheet/CustomBottomSheet";
import { CustomOverline } from "../components/Text";
import { DataTable } from "react-native-paper";

const FollowupSym = props => {
  const symptoms = useArray([]);

  const [enteredSym, setEnteredSym] = useState("");
  const [enteredVal, setEnteredVal] = useState("");
  const [isAddMode, setIsAddMode] = useState(false);

  useEffect(() => {
    console.log("Here!!!!->", symptoms);
  }, [symptoms]);

  const symInputHandler = enteredText => {
    setEnteredSym(enteredText);
  };

  const valInputHandler = enteredText => {
    setEnteredVal(enteredText);
  };

  const submitFollowupSym = (values, dispatch) => {
    alert(JSON.stringify(values));
    dispatch(followupSymSubmit(values));
  };

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => Keyboard.dismiss()}
    >
      <CustomContainer>
        <StatusBar
          backgroundColor="#ffffff"
          animated={true}
          translucent={false}
          barStyle="dark-content"
        />
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <CustomBottomSheet
                visible={isAddMode}
                label="Add a Symptom"
                onVisibilityChange={() => {}}
                content={
                  <View style={{ paddingTop: StatusBar.currentHeight }}>
                    <RowView>
                      <Field
                        name="symptom"
                        label="Symptom"
                        clearTextOnFocus={true}
                        overrideStyles={[styles.GridChildren]}
                        component={CustomInput}
                        onChange={symInputHandler}
                        value={enteredSym}
                      />
                      <Field
                        mode="dropdown"
                        name="range"
                        label="Range"
                        items={[
                          { label: "0", value: 0 },
                          { label: "1", value: 1 },
                          { label: "2", value: 2 },
                          { label: "3", value: 3 }
                        ]}
                        onChange={valInputHandler}
                        value={enteredVal}
                        overrideStyles={[styles.GridChildren]}
                        component={CustomPicker}
                      />
                    </RowView>
                    <CustomButton
                      text="Add"
                      onPress={() => {
                        symptoms.add(enteredSym.concat(",", enteredVal));
                        setIsAddMode(false);
                      }}
                    />
                  </View>
                }
              />
              <View style={{ paddingTop: StatusBar.currentHeight, flex: 1 }}>
                <CustomCard>
                  <CustomOverline text="Symptoms:" />
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>Symptom</DataTable.Title>
                      <DataTable.Title>Occurence</DataTable.Title>
                    </DataTable.Header>
                    <View style={{ marginBottom: 18 }}>
                      {!symptoms.value.length && (
                        <CustomOverline text="No Symptoms" />
                      )}
                      {!!symptoms.value.length &&
                        symptoms.value.map((symptom, index) => (
                          <>
                            <DataTable.Row>
                              <DataTable.Cell>
                                {symptom.split(",")[0]}
                              </DataTable.Cell>
                              <DataTable.Cell>
                                {symptom.split(",")[1]}
                              </DataTable.Cell>
                            </DataTable.Row>
                          </>
                        ))}
                    </View>
                  </DataTable>
                </CustomCard>
                <View style={styles.addbtn}>
                  <CustomButton text="Add" onPress={() => setIsAddMode(true)} />
                  <CustomButton
                    text="Submit"
                    onPress={props.handleSubmit(
                      submitFollowupSym.bind(this, symptoms, props.dispatch)
                    )}
                  />
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </CustomContainer>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 70
  },
  input: {
    flex: 1,
    // width: '50%',
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%"
  },
  button: {
    width: "40%"
  },
  text: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  GridChildren: {
    flex: 1,
    flexBasis: "5%"
  },
  addbtn: {
    flex: 1,
    justifyContent: "flex-end"
    // position: 'absolute',
  }
});

export default connect()(
  reduxForm({
    form: "followupsym",
    onSubmitSuccess: (result, dispatch, props) => {
      props.navigation.navigate("Dashboard", props.navigation.state.params);
    }
  })(FollowupSym)
);
