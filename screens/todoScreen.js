import React, { useState } from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import AddScreen from './addScreen';
import { addTask } from "../redux/todoSlice";
import { removeTask } from "../redux/todoSlice";


const TodoScreen = () => {
    const navigation = useNavigation();
    const tasks = useSelector((state) => state.todo);
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);

    const handleAddTask = (newTask) => {
        dispatch(addTask(newTask));
        closeModal();
    };

    const handleRemoveTask = (id) => {
        dispatch(removeTask(id));
    };

    const openModal = () => {
        setVisible(true);
    };

    const closeModal = () => {
        setVisible(false);
    };

    const renderItem = ({ item }) => (
        <View style={styles.tasks}>
            <View style={styles.taskTitle}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{item.title}</Text>
                <Text style={{ fontSize: 15 }}>{item.description}</Text>
            </View>
            <View style={styles.taskStatus}>
                <Text>{item.status}</Text>

                <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleRemoveTask(item.id)}
                >
                    <Text style={{ color: 'red' }}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.main}>
            <View style={styles.head}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.headText}>Tasks</Text>
                <TouchableOpacity style={styles.addBtn} onPress={openModal}>
                    <Text style={styles.addText}>Add +</Text>
                </TouchableOpacity>
                <AddScreen visible={visible} onClose={closeModal} addTask={handleAddTask} />
            </View>

            <View style={styles.taskCon}>
                <FlatList
                    data={tasks}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        // marginTop: 60,
        marginTop: Platform.OS === 'ios' ? 50 : 1,
        alignItems: 'center',
    },
    head: {
        width: '100%',
        flexDirection: 'row',
        padding: 10,

    },
    headText: {
        fontSize: 27,
        marginLeft: 130,
        fontWeight: 'bold'
    },
    addBtn: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
        marginLeft: 90,
    },
    addText: {
        fontWeight: 'bold',
    },
    taskCon: {
        width: '90%',
        flex: 1,
    },
    tasks: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 7,
        borderRadius: 10,
        margin: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    taskTitle: {
        flex: 1,
    },
    deleteBtn: {
        marginTop: 10,
        alignItems: 'flex-end'


    },
});

export default TodoScreen;