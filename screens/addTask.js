import React from "react";
import { Modal, View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";


const { height } = Dimensions.get("window");

const AddTask = ({ isVisible, onClose, onSubmit, taskTitle, setTaskTitle, taskDescription, setTaskDescription }) => {

    const transleX = useSharedValue(height)

    const animate = useAnimatedStyle(() => ({
        translateX: transleX.value
    }))


    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}

        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Add Task</Text>

                    {/* Title Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Enter task title"
                        value={taskTitle} // Directly use the prop
                        onChangeText={setTaskTitle} // Update via parent handler
                    />

                    {/* Description Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Enter task description"
                        value={taskDescription} // Directly use the prop
                        onChangeText={setTaskDescription} // Update via parent handler
                    />

                    {/* Submit Button */}
                    <Button title="Submit" onPress={onSubmit} />

                    {/* Cancel Button */}
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.cancelBtn}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: 300,
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
        borderRadius: 5,
    },
    cancelBtn: {
        color: "blue",
        textAlign: "center",
        marginTop: 10,
    },
});

export default AddTask;