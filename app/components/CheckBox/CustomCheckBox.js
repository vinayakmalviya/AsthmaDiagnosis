import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    CheckBox,
    TouchableWithoutFeedback,
    Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    Wrapper: {
        alignSelf: 'flex-start',
        margin: 6,
        backgroundColor: '#F6F6F6',
        borderColor: '#AAAAAA',
        borderBottomWidth: 2,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    Container: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    Label: {
        marginRight: 6,
        color: '#555',
        fontSize: 16,
        // fontWeight: 'bold',
    },
});

const CustomCheckBox = ({
    input = {},
    meta = {},
    label = '',
    overrideStyles = null,
    ...props
}) => {
    // Initilaze States
    const [value, setValue] = useState(input.value ? true : false);

    // Handle State Changes
    const handlePress = useCallback(() => {
        setValue(value => !value);
    }, [value]);

    useEffect(() => {
        if (input.onChange) input.onChange(value);
    }, [value]);

    const handleValueChange = useCallback(
        value => {
            setValue(value ? true : false);
            if (input.onChange) input.onChange(value);
        },
        [value]
    );

    // Handle Animations
    const _animatedChecked = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(_animatedChecked, {
            toValue: value ? 1 : 0,
            duration: 150,
        }).start();
    }, [value]);

    const animatedStyles = {
        Wrapper: {
            borderColor: _animatedChecked.interpolate({
                inputRange: [0, 1],
                outputRange: ['#AAAAAA', '#0A7B61'],
            }),
        },
    };

    // Render
    return (
        <Animated.View
        style={[styles.Wrapper, animatedStyles.Wrapper, overrideStyles]}>
            <TouchableWithoutFeedback onPress={handlePress}>
                <View style={styles.Container}>
                    <CheckBox
                        style={[styles.CheckBox]}
                        {...input}
                        value={value}
                        onValueChange={handleValueChange}
                    />
                    <Text style={styles.Label}>{label}</Text>
                </View>
            </TouchableWithoutFeedback>
        </Animated.View>
    );
};

export default CustomCheckBox;
