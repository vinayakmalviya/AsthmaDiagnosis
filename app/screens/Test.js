import React, { Component } from 'react';
import { StatusBar, View, Text } from 'react-native';

import { BorderInput } from "../components/Input";

const Test = () => (
    <View>
       <StatusBar translucent={true} barStyle="light-content" />
        <Text>Personal Information</Text>
        <Text>Personal Information</Text>
        <Text>Personal Information</Text>
        <Text>Personal Information</Text>
        <Text>Personal Information</Text>
        <Text>Personal Information</Text>
        <Text>Personal Information</Text>
        {/* <BorderInput text="Name"></BorderInput> */}
        <View style={ { flexDirection: 'row'} }>
            <BorderInput text="Age" width="50%"></BorderInput>
            <BorderInput text="Gender" width="50%"></BorderInput>
        </View>
    </View>
);

export default Test;