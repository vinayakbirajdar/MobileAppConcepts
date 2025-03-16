import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Button, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AddTask from "./addTask";

const TaskListScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState([
        { id: "1", title: "Task 1", description: "This is the first task", status: "Pending" },
        { id: "2", title: "Task 2", description: "This is the second task", status: "Completed" },
        { id: "3", title: "Task 3", description: "This is the third task", status: "Pending" },
        { id: "4", title: "Task 4", description: "This is the Forth task", status: "Pending" },
        { id: "5", title: "Task 5", description: "This is the Fifth task", status: "Pending" },
        { id: "6", title: "Task 6", description: "This is the Sixth task", status: "Pending" },
    ]);
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);//popover 
    const [taskTitle, setTaskTitle] = useState("");//task title set
    const [taskDescription, setTaskDescription] = useState("");//

    const handleAddTask = () => {
        if (!taskTitle.trim() || !taskDescription.trim()) {
            alert("Please fill out both fields.");
            return;
        }
        const newTask = {
            id: (tasks.length + 1).toString(),
            title: taskTitle,
            description: taskDescription,
            status: "Pending",
        };

        setTasks([...tasks, newTask]);
        setIsPopoverVisible(false);
        setTaskTitle("");
        setTaskDescription("");
    };

    const closePopover = () => {
        setIsPopoverVisible(false);
        setTaskTitle("");
        setTaskDescription("");
    };

    const renderTask = ({ item }) => (
        <View style={styles.taskItem}>
            <View style={styles.textContainer}>
                {/* <Text>{item.id}</Text> */}
                <Text>{item.title}</Text>
                <Text>{item.description}</Text>
            </View>
            <View style={styles.status}>
                <TouchableOpacity onPress={() => handleStatusChange(item.id)}>
                    <Text>{item.status}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const handleStatusChange = (taskId) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, status: "Completed" } : task
            )
        );
    };

    const sortTasksAsc = () => {
        const sortedTasks = [...tasks].sort((a, b) => a.title.localeCompare(b.title));
        setTasks(sortedTasks);
    };

    const sortTasksDesc = () => {
        const sortedTasks = [...tasks].sort((a, b) => b.title.localeCompare(a.title));
        setTasks(sortedTasks);
    };

    return (
        <View style={styles.container}>
            <View style={styles.task}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Tasks</Text>
                <TouchableOpacity style={styles.addCon} onPress={() => setIsPopoverVisible(true)}>
                    <Text style={styles.addBtn}>Add </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.sort}>
                <Text>Sort</Text>
                <TouchableOpacity onPress={sortTasksAsc}>
                    <Text style={styles.sortText}>Title-Asc</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={sortTasksDesc}>
                    <Text>Title-Dec</Text>
                </TouchableOpacity>
            </View>

            <FlatList data={tasks} renderItem={renderTask} keyExtractor={(item) => item.id} />

            <AddTask
                isVisible={isPopoverVisible}
                onClose={closePopover}
                onSubmit={handleAddTask}
                taskTitle={taskTitle}
                setTaskTitle={setTaskTitle}
                taskDescription={taskDescription}
                setTaskDescription={setTaskDescription}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 60,
        marginTop: Platform.OS === 'ios' ? 50 : 0
    },
    task: {
        // borderWidth: 2,
        borderColor: 'black',
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        // backgroundColor: '#fffaf0',

    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 5,
    },
    headerText: {
        fontSize: 26,
        fontWeight: 'bold',
        marginLeft: 160,
    },
    addBtn: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    addCon: {
        borderWidth: 1,
        borderRadius: 10,
        width: 60,
        alignItems: 'center',
    },
    sort: {
        width: '95%',
        borderWidth: 1,
        borderColor: 'black',
        marginTop: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,

    },
    listCon: {
        width: '95%',
        marginTop: 10,
        padding: 5
    },
    taskItem: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        width: 370,
        borderWidth: 1,
        borderColor: 'grey',
        alignItems: 'flex-start',
        flexDirection: 'row',
        position: 'relative',
    },

    textContiner: {
        flex: 1,
    },
    status: {
        borderColor: 'black',
        borderRadius: 3,
        marginLeft: 110,
        position: 'absolute',
        top: 10,
        right: 10,
    },
});

export default TaskListScreen;