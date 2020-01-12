import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    TouchableNativeFeedback,
    Animated,
    StatusBar,
    Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

import DateTimePicker from 'react-native-modal-datetime-picker';

import { CustomIcon } from '../Icon';

const styles = EStyleSheet.create({
    Wrapper: {
        margin: 6,
        backgroundColor: '#F6F6F6',
        borderColor: '#AAAAAA',
        borderBottomWidth: 2,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    Container: {
        flexDirection: 'row',
    },
    Label: {
        position: 'absolute',
        top: 16,
        left: 12,
        color: '#AAAAAA',
        fontSize: 16,
        // fontWeight: 'bold',
    },
    Value: {
        flex: 1,
        fontSize: 18,
        height: 54,
        paddingTop: 22,
        paddingBottom: 4,
        paddingHorizontal: 12,
        textAlignVertical: 'top',
    },
    Icon: {
        marginRight: 12,
        alignSelf: 'center',
    },
    IconInner: {
        width: 24,
        height: 24,
        // fill: '#555555',
    },
});

const CustomDateTimePicker = ({
    input = {},
    meta = {},
    mode = 'date',
    label = '',
    overrideStyles = {},
    ...props
}) => {
    // Initialize States
    const [pickerVisible, setPickerVisible] = useState(false);
    const [value, setValue] = useState(
        typeof input.value === typeof Date?
        input.value : new Date()
    );

    // Handle Modal Changes
    const handlePickerClose = useCallback(() => setPickerVisible(false), [
        pickerVisible,
    ]);

    const handlePickerOpen = useCallback(() => {
        setPickerVisible(true);
    }, [pickerVisible]);

    // Handle Events
    const handlePress = useCallback(() => {
        setPickerVisible(true);
    }, [pickerVisible]);

    const handleDateChange = useCallback(newVal => {
        setPickerVisible(false);
        setValue(newVal);
    }, []);

    useEffect(() => {
        if (input.onChange) input.onChange(value);
    }, [value]);

    // Handle Animations
    const _animatedFocused = useRef(new Animated.Value(0)).current;
    const _animatedValued = useRef(new Animated.Value(!(value === '') ? 1 : 0))
        .current;

    useEffect(() => {
        Animated.parallel([
        Animated.timing(_animatedFocused, {
            toValue: pickerVisible ? 1 : 0,
            duration: 150,
        }),
        Animated.timing(_animatedValued, {
            toValue: pickerVisible || !(value === null) ? 1 : 0,
            duration: 150,
        }),
        ]).start();
    }, [pickerVisible, value]);

    const animatedStyles = {
        Wrapper: {
        borderColor: _animatedFocused.interpolate({
            inputRange: [0, 1],
            outputRange: ['#AAAAAA', '#0A7B61'],
        }),
        },
        Label: {
        color: _animatedFocused.interpolate({
            inputRange: [0, 1],
            outputRange: ['#AAAAAA', '#0A7B61'],
        }),
        top: _animatedValued.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 6],
        }),
        fontSize: _animatedValued.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 12],
        }),
        },
    };

    // Render
    return (
        <Animated.View
        style={[styles.Wrapper, animatedStyles.Wrapper, overrideStyles]}>
            <TouchableNativeFeedback
                onPress={handlePress}
                background={TouchableNativeFeedback.Ripple('rgba( 10, 123, 97, 0.15)')}>
                <View style={[styles.Container]}>
                <Animated.Text style={[styles.Label, animatedStyles.Label]}>
                    {label}
                </Animated.Text>
                <Text style={[styles.Value]}>{value ? value.getDate()+"/"+value.getMonth()+"/"+value.getFullYear() : ''}</Text>
                <View style={[styles.Icon, animatedStyles.Icon]}>
                    <CustomIcon icon="calendar_today" {...styles.IconInner} />
                </View>
                </View>
            </TouchableNativeFeedback>
            <DateTimePicker
                date={value}
                mode={mode}
                isVisible={pickerVisible}
                onConfirm={handleDateChange}
                onCancel={handlePickerClose}
            />
        </Animated.View>
    );
};

export default CustomDateTimePicker;
