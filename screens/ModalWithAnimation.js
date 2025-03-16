import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Header } from "@rneui/base";

import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Modal } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from "react-native-reanimated";

const { height } = Dimensions.get("window");

const ReanimatedModal = () => {
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const translateY = useSharedValue(height); // Start from bottom

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));


    const toggleModal = () => {
        if (visible) {

            translateY.value = withSpring(height, { damping: 15 });
            setTimeout(() => setVisible(false), 300);
        } else {

            setVisible(true);
            translateY.value = withSpring(0, { damping: 10 });
        }
    };

    return (
        <View style={{ flex: 1 }}>

            <Header
                backgroundColor="#f0ebeb"
                centerComponent={{
                    text: "Modal Animation",
                    style: { color: "black", fontSize: 25, fontWeight: 'bold' }
                }}
                containerStyle={{ width: "100%" }}
                leftComponent={{ icon: "home", color: "black", size: 30, onPress: () => { navigation.goBack() } }}
            />





            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={toggleModal}>
                    <Text style={styles.buttonText}>Open Modal</Text>
                </TouchableOpacity>


                <Modal transparent visible={visible} animationType="none">
                    <View style={styles.overlay}>
                        <Animated.View style={[styles.modalContent, animatedStyle]}>
                            <Text style={styles.modalText}>Animated Modal!</Text>
                            <TouchableOpacity onPress={toggleModal}>
                                <Text style={styles.closeButton}>Close</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </Modal>
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
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        height: "50%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 20,
        alignItems: "center",
    },
    modalText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    closeButton: {
        color: "red",
        marginTop: 20,
        fontSize: 16,
    },
});

export default ReanimatedModal;