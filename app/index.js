import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

import Home from './screens/Home';

EStyleSheet.build({
    $primaryBckg1: "#48FF7F",
    $primaryBckg2: "#00CCAA",
    $white: "#FFFFFF",
    $gray: "rgba(0, 0, 0, 0.26)",
});

export default () => <Home />;