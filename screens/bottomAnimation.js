

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomSheet } from "@rneui/base";
import { Header } from "@rneui/base";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";


const AnimatedBottomSheet = () => {
    const navigation = useNavigation()
    const [isVisible, setIsVisible] = useState(false);

    // Animation value (0 = hidden, 1 = visible)
    const sheetHeight = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: withTiming(sheetHeight.value, { duration: 500 }) }],
    }));

    // Function to toggle BottomSheet
    const toggleBottomSheet = () => {
        if (isVisible) {
            sheetHeight.value = 300; // Move down (hide)
            setTimeout(() => setIsVisible(false), 500); // Wait for animation before hiding
        } else {
            setIsVisible(true);
            sheetHeight.value = 0; // Move up (show)
        }
    };

    return (

        <View style={{ flex: 1 }}>
            <Header
                backgroundColor="#f0ebeb"
                centerComponent={{
                    text: "Bottom-Sheet",
                    style: { color: "black", fontSize: 25, fontWeight: 'bold' }
                }}
                containerStyle={{ width: "100%" }}
                leftComponent={{ icon: "home", color: "black", size: 30, onPress: () => { navigation.goBack() } }}
            />

            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={toggleBottomSheet}>
                    <Text style={styles.buttonText}>Toggle BottomSheet</Text>
                </TouchableOpacity>

                {/* Animated BottomSheet */}
                {isVisible && (
                    <BottomSheet isVisible={isVisible} containerStyle={{ backgroundColor: "transperent" }}
                        modalProps={{
                            animationType: "none", // You can change this to 'slide' or 'none'
                            // transparent: true, by default it is true

                        }}
                    // onBackdropPress={() => setIsVisible(false)}
                    >
                        <Animated.View style={[styles.sheetContent, animatedStyle]}>
                            <Text style={styles.sheetText}>Animated BottomSheet!</Text>
                            <TouchableOpacity onPress={toggleBottomSheet}>
                                <Text style={styles.closeButton}>Close</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </BottomSheet>
                )}
            </View>


        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },

    sheetContent: {
        backgroundColor: "white",
        height: 300,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: "center",
        margin: 20
    },
    sheetText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    closeButton: {
        color: "red",
        marginTop: 20,
        fontSize: 16,
    },
});

export default AnimatedBottomSheet;
