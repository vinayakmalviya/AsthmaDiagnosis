import React from 'react';
import { View, Image, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const Logo = () => {
    const styles = EStyleSheet.create({
        LogoContainer: {
            marginTop: 24,
            flex: 1,
            justifyContent: 'center',
        },
        LogoImage: {
            alignSelf: 'center',
            width: 250,
            height: 250,
        },
        LogoTitle: {
            padding: 8,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 48,
            lineHeight: 48,
            textShadowColor: 'rgba(0,0,0,0.25)',
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 6,
            color: '#ffffff',
        },
    });

    return (
        <View style={styles.LogoContainer}>
            <Image
                resizeMode="contain"
                style={styles.LogoImage}
                source={require('./images/lungs_logo.png')}
            />
            <Text style={styles.LogoTitle}>Asthma{'\n'}Diagnosis</Text>
        </View>
    );
};

export default Logo;
