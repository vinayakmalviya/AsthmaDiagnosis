import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';

import styles from './styles';

const Logo = () => (
    <View style={styles.container}>
        <View style={styles.circleBack}>
            <Image resizeMode="contain" style={styles.image} source={require('./images/asthma.png')} />
        </View>
        <Text style={[styles.text, { marginTop: 7 }]}>Asthma</Text>
        <Text style={styles.text}>Diagnosis</Text>
    </View>
);

export default Logo;    