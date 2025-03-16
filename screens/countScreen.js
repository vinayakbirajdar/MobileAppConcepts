import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withSequence, withTiming } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

const CountScreen = () => {
    const navigation = useNavigation();
    const [count, setCount] = useState(0);

    const scale = useSharedValue(1)

    const animate = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]



    }))

    // reset button animation
    const rotate = useSharedValue(0);

    const onPress = () => {
        rotate.value = withSequence(
            withTiming(10, { duration: 100 }),  // Tilt right fast
            withTiming(-10, { duration: 100 }), // Tilt left fast
            withTiming(7, { duration: 100 }),  // Back to right fast
            withTiming(-7, { duration: 100 }), // Back to left fast
            withTiming(0, { duration: 100 })   // Return to original position
        );
    };

    const shaking = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotate.value}deg` }],
    }));

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Icon name='arrow-back' size={30} color='black' />
                </TouchableOpacity>
                <Text style={styles.headerText}>Counter Application</Text>
            </View>

            <Animated.View style={[styles.subContainer, animate]}
                onTouchStart={() => (scale.value = withSpring(1.06))}
                onTouchEnd={() => (scale.value = withSpring(1))}
            >
                <View >
                    <Text style={styles.counterText}>Counter Value: {count}</Text>

                    <TouchableOpacity style={styles.button} onPress={() => setCount(count + 1)}>
                        <Text style={styles.btnText}>Increment</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => count > 0 && setCount(count - 1)}>
                        <Text style={styles.btnText}>Decrement</Text>
                    </TouchableOpacity>
                    {/* animation for the reset button */}

                    <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={() => {
                        setCount(0);
                        onPress();
                    }}>
                        <Animated.View style={shaking}>
                            <Text style={styles.btnText}>Reset</Text>
                        </Animated.View>

                    </TouchableOpacity>


                </View>

            </Animated.View >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? 30 : 30
    },

    // Header Bar
    header: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    backBtn: {
        marginRight: 15,
    },
    headerText: {
        fontSize: 22,
        color: 'black',
        fontWeight: 'bold',
        marginLeft: 50,

    },

    // Counter Display
    subContainer: {
        marginTop: 50,
        alignItems: 'center',
        padding: 50,
        height: '50%',
        borderRadius: 20,

        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,

        // Shadow for Android
        elevation: 3,


    },
    counterText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        fontFamily: 'Poppins-SemiBold'
    },

    // Buttons
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginVertical: 10,
        width: 200,
        alignItems: 'center',
    },
    resetButton: {
        backgroundColor: '#FF3B30',
    },
    btnText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',

    },
});

export default CountScreen;