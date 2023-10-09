import { configureStore, combineReducers } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice";
import completedTodo from "../features/completedTodo/completedSlice"

const rootReducer = combineReducers({
    todos: todoReducer,
    completed: completedTodo,
  });

export const store = configureStore({
    reducer : rootReducer
})