import './App.css'
import AddTodo from './components/AddTodo';
import Todos from './components/Todos';
import { addInitial } from './features/todo/todoSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { addComplete } from './features/completedTodo/completedSlice';
import axios from "axios";

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    const getTodos = async ()=>{
      try{
        let todos = (await axios.get("https://friendly-space-rotary-phone-7qvvwxxvq4pfpr4p-5000.app.github.dev/todo")).data.todo;
        dispatch(addInitial(todos));

        let completedTodos = (await axios.get("https://friendly-space-rotary-phone-7qvvwxxvq4pfpr4p-5000.app.github.dev/success")).data.todo;
        dispatch(addComplete(completedTodos));
      }
      catch(e){
        console.log(e);
      }
    }
    getTodos();
  },[])

  return (
    <div className='container'>
      <h4>Todo-List App</h4>
      <AddTodo/>
      <Todos/>
    </div>
  )
}

export default App
