import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Animated } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    Wrapper: {
        margin: 6,
    },
    Container: {
        flexDirection: 'row',
        backgroundColor: '#F6F6F6',
        borderColor: '#AAAAAA',
        borderBottomWidth: 2,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    Label: {
        position: 'absolute',
        top: 16,
        left: 12,
        color: '#AAAAAA',
        fontSize: 16,
        // fontWeight: 'bold',
    },
    Input: {
        flex: 1,
        fontSize: 18,
        paddingTop: 22,
        paddingBottom: 4,
        paddingHorizontal: 12,
        textAlignVertical: 'top',
    },
    Suffix: {
        fontSize: 16,
        paddingTop: 16,
        paddingBottom: 8,
        paddingRight: 16,
        color: '#AAAAAA',
    },
    SuffixIcon: {
        marginRight: 12,
        alignSelf: 'center',
    },
    ErrorText: {
        fontSize: 14,
        marginHorizontal: 6,
        marginVertical: 2,
        fontWeight: 'bold',
        color: '#D32F2F',
        alignSelf: 'flex-end',
    },
});

const CustomInput = ({
    input = {},
    meta = {},
    label = '',
    suffix = '',
    overrideStyles = {},
    ...props
}) => {
    // Initialize States
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState(input.value ? input.value : '');

    // Handle Focus Changes
    const handleBlur = useCallback(() => setIsFocused(false), [isFocused]);
    const handleFocus = useCallback(() => setIsFocused(true), [isFocused]);

    // Handle Value Changes
    const handleChangeText = useCallback(
        value => {
            setValue(value);
        },
        [value]
    );

    const isError = meta.error && meta.touched;
    const themeColor = isError ? '#D32F2F' : '#0A7B61';

    useEffect(() => {
        if (input.onChange) input.onChange(value);
    }, [value]);

    // Handle Animations
    const _animatedFocused = useRef(new Animated.Value(0)).current;
    const _animatedValued = useRef(new Animated.Value(input.value ? 1 : 0))
        .current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(_animatedFocused, {
                toValue: isFocused || isError ? 1 : 0,
                duration: 150,
            }),
            Animated.timing(_animatedValued, {
                toValue: isFocused || value ? 1 : 0,
                duration: 150,
            }),
        ]).start();
    }, [isFocused, value]);

    const animatedStyles = {
        Container: {
            borderColor: _animatedFocused.interpolate({
                inputRange: [0, 1],
                outputRange: ['#AAAAAA', themeColor],
            }),
        },
        Label: {
            color: _animatedFocused.interpolate({
                inputRange: [0, 1],
                outputRange: ['#AAAAAA', themeColor],
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
        Suffix: {
            color: _animatedFocused.interpolate({
                inputRange: [0, 1],
                outputRange: ['#AAAAAA', themeColor],
            }),
            paddingTop: _animatedValued.interpolate({
                inputRange: [0, 1],
                outputRange: [16, 20],
            }),
            paddingBottom: _animatedValued.interpolate({
                inputRange: [0, 1],
                outputRange: [8, 4],
            }),
            paddingRight: _animatedValued.interpolate({
                inputRange: [0, 1],
                outputRange: [16, 12],
            }),
        },
    };

    // Render
    return (
        <View style={[styles.Wrapper, overrideStyles]}>
            <Animated.View
                style={[styles.Container, animatedStyles.Container]}>
                <Animated.Text style={[styles.Label, animatedStyles.Label]}>
                    {label}
                </Animated.Text>
                <TextInput
                    {...input}
                    {...props}
                    style={[styles.Input]}
                    value={value}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChangeText={handleChangeText}
                    placeholder=""
                />
                {typeof suffix == 'string' ? (
                    suffix ? (
                        <Animated.Text style={[styles.Suffix, animatedStyles.Suffix]}>
                            {suffix}
                        </Animated.Text>
                    ) : null
                ) : (
                        <View style={styles.SuffixIcon}>{suffix}</View>
                    )}
            </Animated.View>
            {isError && <Text style={styles.ErrorText}>{meta.error}</Text>}
        </View>
    );
};

export default CustomInput;
