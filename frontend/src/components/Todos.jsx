import { useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { TiTick } from 'react-icons/ti'
import { useDispatch } from "react-redux";
import { removeTodo } from "../features/todo/todoSlice";
import { completedTodo,removeCompleted } from "../features/completedTodo/completedSlice";
import axios from "axios";
import { useState } from "react";

const Todos = () => {
  const [pending, setPending] = useState(false);
  const todos = useSelector((state) => state.todos.todos);
  const completedTodos = useSelector((state) => state.completed.completed);
  const dispatch = useDispatch();

  const copy = (e) => {
    navigator.clipboard.writeText(e.target.innerHTML);
  }

  const validate = async (id) => {
    try {
      let del = await axios.delete("https://friendly-space-rotary-phone-7qvvwxxvq4pfpr4p-5000.app.github.dev/todo", {
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          id: id
        }
      });
      if (del.data.msg) {
        dispatch(removeTodo(id));
      }
      else {
        console.log("error occured");
      }

    }
    catch (e) {
      console.log(e);
    }
  }

  const validate2 = async (id) => {
    try {
      let del = await axios.delete("https://friendly-space-rotary-phone-7qvvwxxvq4pfpr4p-5000.app.github.dev/success", {
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          id: id
        }
      });
      console.log(del.data.msg);
      if (del.data.msg) {
        dispatch(removeCompleted(id));
      }
      else {
        console.log("error occured");
      }

    }
    catch (e) {
      console.log(e);
    }
  }

  const completed = async (todo) => {
    try {
      let addTodo = await axios.post("https://friendly-space-rotary-phone-7qvvwxxvq4pfpr4p-5000.app.github.dev/success", {
        text: todo.text
      });
      validate(todo.id);
      console.log(addTodo.data.todo);
      if (addTodo.data.todo) {
        dispatch(completedTodo(addTodo.data.todo));
      }
    }
    catch (e) {
      console.log(e)
    }
  }

  const pen = ()=>{
    setPending(true);
  }

  const com = ()=>{
    setPending(false);
  }
  if (pending) {
    if (todos.length > 0) {
      return (
        <div className="todos">
          <ul className="menu">
            <li style={{ backgroundColor: "white", color: "purple" }} onClick={pen}>Pending</li>
            <li onClick={com}>Completed</li>
          </ul>
          {
            todos.map((todo) => (
              <div key={todo.id} className="todo">
                <p className="text" onClick={e => copy(e)}>
                  {todo.text}
                </p>
                <AiFillDelete className="img" onClick={() => validate(todo.id)} size={30} />
                <TiTick className="tick" size={30} onClick={() => completed(todo)} />
              </div>
            ))
          }
        </div>

      )
    }
    else {
      return (
        <div>
          <div className="todos">
            <ul className="menu">
              <li style={{ backgroundColor: "white", color: "purple" } } onClick={pen}>Pending</li>
              <li onClick={com}>Completed</li>
            </ul>
            <div className="todo">
              <p className="text" >
                empty
              </p>
            </div>
          </div>
        </div>
      )
    }
  }
  else {
    if (completedTodos.length > 0) {
      return (
        <div className="todos">
          <ul className="menu">
            <li onClick={pen} >Pending</li>
            <li onClick={com} style={{ backgroundColor: "white", color: "purple" }}>Completed</li>
          </ul>
          {
            completedTodos.map((todo) => (
              <div key={todo.id} className="todo">
                <p className="text" onClick={e => copy(e)}>
                  {todo.text}
                </p>
                <AiFillDelete className="img" onClick={() => validate2(todo.id)} size={30} />
              </div>
            ))
          }
        </div>

      )
    }
    else {
      return (
        <div>
          <div className="todos">
            <ul className="menu">
              <li onClick={pen}>Pending</li>
              <li style={{ backgroundColor: "white", color: "purple" }} onClick={com}>Completed</li>
            </ul>
            <div className="todo">
              <p className="text" >
                empty
              </p>
            </div>
          </div>
        </div>
      )
    }
  }


}

export default Todos
