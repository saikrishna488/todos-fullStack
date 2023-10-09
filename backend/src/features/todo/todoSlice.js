import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addInitial: (state, action) => {
            state.todos = action.payload;
        },
        addTodo: (state, action) => {
            const todo = {
                id: action.payload.id,
                text: action.payload.text
            }
            state.todos.push(todo);
        },

        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) =>todo.id !== action.payload)
        }

        
    }
})

export const { addTodo, removeTodo, addInitial } = todoSlice.actions;

export default todoSlice.reducer;