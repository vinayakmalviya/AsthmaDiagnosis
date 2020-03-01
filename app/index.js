import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider } from "react-redux";
import axios from 'axios';

import { AlertProvider } from './components/Alert';
import AppContainer from "./config/routes";
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

    componentDidMount() {
        axios.get("https://guarded-mountain-30437.herokuapp.com/guds");
    }

    render() {
        return(
            <Provider store={store}>
                <AlertProvider>
                    <AppContainer />
                </AlertProvider>
            </Provider>
        )
    }
};  