import React, { useState } from 'react';
import './App.css';
import InputBar from './components/InputPannel';
import ToDoLIST from './components/TodoList';
import { Todo } from "./Model";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

/*import axios from "axios";

const api = axios.create({
    baseURL: `http://localhost:3000/todos`
})*/

const App: React.FC = () => {
    const [todo, setTodo] = useState<string>("");
    const [todos, setTodos] = useState<Array<Todo>>([]);
    const [inprogressTodos, setInprogressTodos] = useState<Array<Todo>>([]);
    const [completedTodos, setCompletedTodos] = useState<Array<Todo>>([]);

    const handleAdd = (event: React.FormEvent) => {
        event.preventDefault();

        if (todo) {
            setTodos([...todos, { id: Date.now(), text: todo, status: "Created" }]);
            setTodo("");
        }
    }

    /*const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;

        console.log(result);

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        let add;
        let created = createdTodos
        let inprogress = inprogressTodos;
        let complete = completedTodos;

        if (source.droppableId === "list1") {
            add = created[source.index];
            created.splice(source.index, 1);
        } else if (source.droppableId === "list2") {
            add = inprogress[source.index];
            inprogress.splice(source.index, 1);
        } else {
            add = complete[source.index];
            complete.splice(source.index, 1);
        }

        if (destination.droppableId === "list1") {
            created.splice(destination.index, 0, add);
        } else if (destination.droppableId === "list2") {
            inprogress.splice(destination.index, 0, add);
        } else {
            complete.splice(destination.index, 0, add);
        }

        setCompletedTodos(complete);
        setInprogressTodos(inprogress);
        setCreatedTodos(created);
    };
    */
    return (
            <div className="App">
                <div className="head">
                    <h2>Badass planer</h2>
                    <InputBar todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
                </div>
                <ToDoLIST
                    todos={todos} setTodos={setTodos}
                    inprogressTodos={inprogressTodos} setInprogressTodos={setInprogressTodos}
                    completedTodos={completedTodos} setCompletedTodos={setCompletedTodos}
                />
            </div>
    );
};

export default App;
