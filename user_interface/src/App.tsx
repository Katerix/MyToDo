import React, { useEffect, useState } from 'react';
import './App.css';
import InputBar from './components/InputPannel';
import ToDoLIST from './components/TodoList';
import { Todo } from "./Model";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import api from './api/todos';

const App: React.FC = () => {

    const [todo, setTodo] = useState<string>("");
    const [createdTodos, setCreatedTodos] = useState<Array<Todo>>([]);
    const [inprogressTodos, setInprogressTodos] = useState<Array<Todo>>([]);
    const [completedTodos, setCompletedTodos] = useState<Array<Todo>>([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await api.get('/GetAll');
                console.log(response.data);

                const createdGroup = response.data.filter((todo: Todo) => todo.status == '0');
                const inprogressGroup = response.data.filter((todo: Todo) => todo.status == '1');
                const completedGroup = response.data.filter((todo: Todo) => todo.status == '2');

                setCreatedTodos(createdGroup);
                setInprogressTodos(inprogressGroup);
                setCompletedTodos(completedGroup);
                console.log(createdGroup);
                console.log(inprogressGroup);
                console.log(completedGroup);


            } catch (err) {
                console.log(err);
            }
        }
        fetchTodos();
    },[])

    const handleAdd = async (event: React.FormEvent) => {
        event.preventDefault();
        if (todo) {
            try {
                const response = await api.post(`/Create/${todo}`);
                setCreatedTodos([...createdTodos, response.data]);
                setTodo("");
            } catch (err) {
                console.log(err);
            }
        }
    }

    const changeStatus = async (todo: Todo, status: string) => {
        try { 
            const response = await api.put(`/UpdateStatus/${todo.id}&${status}`);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        let add; let destinationGroup;
        let created = createdTodos;
        let inprogress = inprogressTodos;
        let completed = completedTodos;

        if (source.droppableId === "list1") {
            add = created[source.index];
            created.splice(source.index, 1);
        } else if (source.droppableId === "list2") {
            add = inprogress[source.index];
            inprogress.splice(source.index, 1);
        } else {
            add = completed[source.index];
            completed.splice(source.index, 1);
        }

        if (destination.droppableId === "list1") {
            created.splice(destination.index, 0, add);
            destinationGroup = '0';
        } else if (destination.droppableId === "list2") {
            inprogress.splice(destination.index, 0, add);
            destinationGroup = '1';
        } else {
            completed.splice(destination.index, 0, add);
            destinationGroup = '2';
        }
        changeStatus(add, destinationGroup);

        setCompletedTodos(completed);
        setInprogressTodos(inprogress);
        setCreatedTodos(created);

    };
    
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="App">
                <div className="head">
                    <h2>Badass planer</h2>
                    <InputBar todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
                </div>
                <ToDoLIST
                    createdTodos={createdTodos} setCreatedTodos={setCreatedTodos}
                    inprogressTodos={inprogressTodos} setInprogressTodos={setInprogressTodos}
                    completedTodos={completedTodos} setCompletedTodos={setCompletedTodos}
                />
            </div>
        </DragDropContext>  
    );
};

export default App;
