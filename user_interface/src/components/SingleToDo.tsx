import React, { useState, useEffect, useRef } from "react";
import { Todo } from "../Model";
import "./styles.css";
import api from '../api/todos';

import { FiEdit } from "react-icons/fi";
import { FiDelete } from "react-icons/fi";
import { Draggable } from "react-beautiful-dnd";

type Properties = {
    index: number;
    todo: Todo;
    todos: Array<Todo>;
    setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
};

const SingleToDo: React.FC<Properties> = ({ index, todo, todos, setTodos }) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.content);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);


    const handleDelete = async (_id: number) => {
        try {
            await api.delete(`/Delete/${_id}`);
            const todo_list = todos.filter((todo) => todo.id !== _id);
            setTodos(todo_list);
        } catch (err) {
            console.log(err);
        }
    };

    const handleEditContent = async (event: React.FormEvent, _id: number) => { 
        event.preventDefault();

        try {
            await api.put(`/UpdateContent/${_id}&${editTodo}`);
            setTodos(
                todos.map((todo) => (todo.id === _id ? { ...todo, content: editTodo } : todo))
                );
        } catch (err) {
            console.log(err);
        } 

        setEdit(false);
    };
                
    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided, snapshot) =>
                <form
                    onSubmit={(e) => handleEditContent(e, todo.id)}
                    className={`todo-block ${snapshot.isDragging ? "drag" : ""}`}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {
                        edit ? (
                            <input value={editTodo} ref={inputRef} onChange={(e) => setEditTodo(e.target.value)}
                                className="edit-todo-input" />//what de class
                        ) : (
                            <span className="text">{todo.content}</span>
                        )
                    }
                    <div className="actions">
                        <span className="icon" onClick={() => {
                            if (edit === false) {
                                setEdit(true);
                            }
                        }}>
                            <FiEdit />
                        </span>
                        <span className="icon" onClick={() => handleDelete(todo.id)}>
                            <FiDelete />
                            </span>
                    </div>
                </form>
            }
        </Draggable>
             
    );
};

export default SingleToDo;