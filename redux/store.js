import { configureStore } from "@reduxjs/toolkit";
import reducer from "./counterSlice";
import todoReducer from './todoSlice'

const store = configureStore({
    reducer: {
        counter: reducer,
        todo: todoReducer
    }

})

export default store;

