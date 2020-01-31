import React from 'react';
import PropTypes from 'prop-types';
import {
    StatusBar,
    View,
    ScrollView,
    Keyboard,
    KeyboardAvoidingView,
    Text,
    SafeAreaView,
    TouchableWithoutFeedback,
} from 'react-native';
import { Header } from 'react-navigation-stack';

import { CustomContainer } from '../Container';

const ScreenTemplate = ({ children, toolbar }) => {

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="height"
            keyboardVerticalOffset={Header.HEIGHT+StatusBar.currentHeight}
        >
            <StatusBar backgroundColor="#ffffff" animated={true} translucent={false} barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <CustomContainer style={{ flex: 1 }}>
                        <ScrollView styles={{ flex: 1 }}>
                            <View style={{margin: 6}}>{children}</View>
                        </ScrollView>
                    </CustomContainer>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

ScreenTemplate.propTypes = {
    children: PropTypes.any,
};

export default ScreenTemplate;
