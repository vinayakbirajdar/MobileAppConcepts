import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import { Header } from "@rneui/base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const FeedBack = () => {
    const navigation = useNavigation();

    const [feed1, setFeed1] = useState("");
    const [feed2, setFeed2] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const width1 = useSharedValue(250);
    const width2 = useSharedValue(250);
    const buttonWidth = useSharedValue(150);

    const onFocus1 = () => { width1.value = withSpring(350); };
    const onFocus2 = () => { width2.value = withSpring(350); };
    const onBlur1 = () => { width1.value = withSpring(250); };
    const onBlur2 = () => { width2.value = withSpring(250); };

    const animation1 = useAnimatedStyle(() => ({ width: width1.value }));
    const animation2 = useAnimatedStyle(() => ({ width: width2.value }));

    const buttonAnimation = useAnimatedStyle(() => ({
        width: buttonWidth.value
    }));

    const handleSubmit = () => {
        if (feed1.trim() === "" & feed2.trim() === "") {
            Alert.alert("Feedback Required", "Please enter your feedback before submitting.");
        } else {
            buttonWidth.value = withSpring(300);
            setSubmitted(true);
            setFeed1("");
            setFeed2("");

            setTimeout(() => {
                buttonWidth.value = withSpring(150);
                setSubmitted(false)
            }, 500);
        }
    };

    const handleChangeFeed1 = (text) => {
        setFeed1(text);

    };

    const handleChangeFeed2 = (text) => {
        setFeed2(text);

    };

    return (
        <SafeAreaProvider>
            <View>
                <Header
                    backgroundColor="black"
                    centerComponent={{
                        text: "Feed Back",
                        style: { color: "#fff", fontSize: 25, fontWeight: 'bold' }
                    }}
                    containerStyle={{ width: "100%" }}
                    leftComponent={{ icon: "home", color: "#fff", size: 30, onPress: () => { navigation.goBack() } }}
                />
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
                <Animated.View style={[styles.container, animation1]}>
                    <TextInput
                        placeholder="Enter your experience"
                        style={styles.input}
                        onFocus={onFocus1}
                        onBlur={onBlur1}
                        value={feed1}
                        onChangeText={handleChangeFeed1}
                    />
                </Animated.View>
                <Animated.View style={[styles.container, animation2]}>
                    <TextInput
                        placeholder="Enter your suggestions"
                        style={styles.input}
                        onFocus={onFocus2}
                        onBlur={onBlur2}
                        value={feed2}
                        onChangeText={handleChangeFeed2}
                    />
                </Animated.View>

                <Animated.View style={[styles.buttonContainer, buttonAnimation]}>
                    <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                        <Text style={styles.buttonText}>{submitted ? "Submitted!" : "Submit"}</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        margin: 15,
        borderRadius: 20,
        padding: 10,
        borderColor: 'lightgrey',
    },
    input: {
        width: 250,
        borderRadius: 10,
        fontSize: 18
    },
    buttonContainer: {
        marginTop: 20,
        borderRadius: 25,
        overflow: "hidden",
    },
    button: {
        backgroundColor: "black",
        paddingVertical: 15,
        alignItems: "center",
        borderRadius: 25,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    }
});
export default FeedBack;