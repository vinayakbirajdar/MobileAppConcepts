import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const ProfileScreen = () => {
    const navigation = useNavigation();

    // Fade-in animation for the image
    const fadeIn = useSharedValue(0);

    useEffect(() => {
        fadeIn.value = 0;
        fadeIn.value = withTiming(1, { duration: 2000 });
    }, [navigation]);

    const fadeInStyle = useAnimatedStyle(() => ({
        opacity: fadeIn.value,
    }));

    return (
        <View style={styles.container}>
            {/* Profile Information */}
            <View style={styles.info}>
                <Text style={styles.infoText}>Jane Mile</Text>
                <Text style={styles.infoText}>Software Developer</Text>
                <Text style={styles.infoText}>New York</Text>
            </View>

            {/* Profile Image */}
            <View style={styles.imageContainer}>
                <Animated.Image
                    source={{
                        uri: 'https://www.rate-my-agent.com/upload/Muneeb-Ahmad-Delta-Real-Estate-Agent.webp',
                    }}
                    style={[styles.profileImage, fadeInStyle]}
                />
            </View>

            {/* Sub Information */}
            <View style={styles.subBox}>
                <Text style={styles.subInfo}>Email: jane@example.com</Text>
                <Text style={styles.subInfo}>DOB: 12th July 1990</Text>
                <Text style={styles.subInfo}>Gender: Male</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#AAB5B0',
        paddingTop: 40,
    },
    info: {
        alignItems: 'center',
        marginTop: 20,
        padding: 20,
    },
    infoText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'black',
        padding: 5,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 100,
        height: 200,
        width: 200,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    profileImage: {
        height: 200,
        width: 200,
        borderRadius: 100,
    },
    subBox: {
        padding: 20,
    },
    subInfo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
    },
});

export default ProfileScreen;