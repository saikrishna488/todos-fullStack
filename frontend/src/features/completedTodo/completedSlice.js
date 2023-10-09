import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    completed : []
}

export const completedSlice = createSlice({
    name : "completed",
    initialState,
    reducers : {
        addComplete : (state,action)=>{
            state.completed = action.payload
        },
        completedTodo : (state,action)=>{
            const todo = {
                id: action.payload.id,
                text: action.payload.text
            }
            state.completed.push(todo);
        },
        removeCompleted : (state,action)=>{
            state.completed = state.completed.filter((todo)=>todo.id !== action.payload)
        }
    }
})

export const {completedTodo,addComplete,removeCompleted} = completedSlice.actions;
export default completedSlice.reducer;