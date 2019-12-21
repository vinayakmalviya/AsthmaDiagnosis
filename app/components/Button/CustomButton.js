import React from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { LinearGradient } from 'expo-linear-gradient';

const CustomButton = ({ text, onPress, white = false, large = false, largePadding = null, overrideStyles=null }) => {
    if(largePadding==null)
        largePadding=large;

    const styles = EStyleSheet.create({
        ButtonContainer: {
            margin: 6,
            overflow: 'hidden',
            borderRadius: 8,
            elevation: largePadding ? 4 : 1,
        },
        ButtonBox: {
            padding: largePadding ? 20 : 12,
            borderRadius: largePadding ? 8 : 4,
            backgroundColor: 'rgba(0,0,0,0.1)',
        },
        ButtonText: {
            textTransform: 'uppercase',
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#FFFFFF',
            fontSize: large ? 20 : 16,
        },
    });

    if (white) {
        return (
        <View style={[styles.ButtonContainer, overrideStyles]}>
            <TouchableNativeFeedback onPress={onPress} background={TouchableNativeFeedback.Ripple('rgba(0,0,0,0.08)', true)}>
            <View style={[styles.ButtonBox, { backgroundColor: '#FFFFFF' }]}>
                <Text style={[styles.ButtonText, { color: '#11372E' }]}>
                    {text}
                </Text>
            </View>
            </TouchableNativeFeedback>
        </View>
        );
    } else {
        return (
        <View style={[styles.ButtonContainer, overrideStyles]}>
            <TouchableNativeFeedback
            onPress={onPress}
            useForeground={true}
            background={TouchableNativeFeedback.Ripple('rgba(255,255,255,0.25)', true)}>
            <LinearGradient
                colors={['#48FF7F', '#00CCAA']}
                start={[0, 0]}
                end={[1, 1]}
                style={{ flex: 1 }}>
                <View style={styles.ButtonBox}>
                <Text style={styles.ButtonText}>{text}</Text>
                </View>
            </LinearGradient>
            </TouchableNativeFeedback>
        </View>
        );
    }
};

CustomButton.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    white: PropTypes.bool,
    large: PropTypes.bool,
    largePadding: PropTypes.bool,
    overrideStyles: PropTypes.object
};

export default CustomButton;
