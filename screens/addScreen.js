import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const AddScreen = ({ visible, onClose, addTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        if (title && description) {
            const newTask = {
                title,
                description,
                status: 'pending',
            };
            addTask(newTask);
            onClose();
        } else {
            alert('Please fill out both title and description.');
        }
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Add Task</Text>
                    <TextInput
                        placeholder="Enter Task Title"
                        value={title}
                        onChangeText={setTitle}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Enter Task Description"
                        value={description}
                        onChangeText={setDescription}
                        style={styles.input}
                    />
                    <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '90%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 2,
        borderColor: 'black',
        padding: 10,
        margin: 10,
        width: '90%',
        borderRadius: 10,
    },
    submitButton: {
        backgroundColor: 'powderblue',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    closeButton: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
    },
});

export default AddScreen;