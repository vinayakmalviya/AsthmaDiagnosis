import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider } from "react-redux";

import AppContainer from "./config/routes";
import Dashboard from './screens/Dashboard';
import Symptoms from './screens/Symptoms';
import Investigations from './screens/Investigations';
import Comorbidities from './screens/Comorbidities';
import PersonalInfo from './screens/PersonalInfo';
import BackgroundInfo from './screens/BackgroundInfo';
import Test from './screens/Test';
import store from './config/store';

EStyleSheet.build({
    $primaryBckg1: "#48FF7F",
    $primaryBckg2: "#00CCAA",
    $white: "#FFFFFF",
    $grayBg: "#F6F6F6",
    $grayLight: "#F6F6F6",
    $gray: "rgba(0, 0, 0, 0.26)",
});

export default class App extends Component {
    render() {
        return(
            <Provider store={store}>
                <AppContainer />
            </Provider>
        )
    }
};  