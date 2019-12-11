import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

import Home from './screens/Home';
import PersonalInfo from './screens/PersonalInfo';
import Test from './screens/Test';
import BackgroundInfo from './screens/BackgroundInfo';
import Dashboard from './screens/Dashboard';
// import { Navigator } from "./config/routes";

EStyleSheet.build({
    $primaryBckg1: "#48FF7F",
    $primaryBckg2: "#00CCAA",
    $white: "#FFFFFF",
    $grayBg: "#F6F6F6",
    $grayLight: "#F6F6F6",
    $gray: "rgba(0, 0, 0, 0.26)",
});

export default () => <Dashboard />