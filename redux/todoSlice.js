import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: "1", title: "Task 1", description: "This is the first task", status: "Pending" },
    { id: "2", title: "Task 2", description: "This is the second task", status: "Completed" },
    { id: "3", title: "Task 3", description: "This is the third task", status: "Pending" },
    { id: "4", title: "Task 4", description: "This is the Forth task", status: "Pending" },
    { id: "5", title: "Task 5", description: "This is the Fifth task", status: "Pending" },
    { id: "6", title: "Task 6", description: "This is the Sixth task", status: "Pending" },
];

let taskIdCounter = 0;

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTask: (state, action) => {
            const newTask = {
                id: taskIdCounter++,
                title: action.payload.title,
                description: action.payload.description,
                status: "Pending",
            };
            state.push(newTask);
        },
        removeTask: (state, action) => {
            return state.filter(task => task.id !== action.payload);
        }
    },
});

export const { addTask, removeTask } = todoSlice.actions;
export default todoSlice.reducer;