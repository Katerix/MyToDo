import React, { useState, useEffect, useRef } from "react";
import { Todo } from "../Model";
import "./styles.css";

import { FiEdit } from "react-icons/fi";
import { FiDelete } from "react-icons/fi";
import { MdDownloadDone } from "react-icons/md";
import { Tooltip } from "react-tooltip";

type Properties = {
    index: number;
    todo: Todo;
    todos: Array<Todo>;
    setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
};

const SingleToDo: React.FC<Properties> = ({ index, todo, todos, setTodos }) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.text);

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);


    const handleStatus = (id: number) => {
        setTodos(todos.map((todo) =>
            todo.id === id && todo.status !== 'Completed' ? { ...todo, status: 'Completed' }
                : todo.id === id && todo.status === 'Completed' ? { ...todo, status: 'In_progress' }
                    : todo));
    };

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleEdit = (event: React.FormEvent, id: number) => {
        event.preventDefault();
        setTodos(
            todos.map((todo) => (todo.id === id ? { ...todo, text: editTodo } : todo))
        );
        setEdit(false);
    };

    const dragStarted = (event: React.DragEvent<HTMLDivElement>, id: number) => {
        event.dataTransfer.setData("todoId", id.toString());
    };
    
    return (
        <form draggable
            onSubmit={(e) => handleEdit(e, todo.id)}
            className="todo-block"
        >
            {
                edit ? (
                    <input value={editTodo} onChange={(e) => setEditTodo(e.target.value)}
                        className="edit-todo-input" />
                ) : todo.status === 'Done' ? (
                    <s className="text">{todo.text}</s>
                ) : (
                    <span className="text">{todo.text}</span>
                )
            }
            <div className="actions">
                    <span className="icon" ref={inputRef} onClick={() => {
                        if (edit == false) {
                            setEdit(true);
                        }
                    }}>
                        <FiEdit />
                    </span>
                    <span className="icon" onClick={() => handleDelete(todo.id)}>
                        <FiDelete />
                    </span>
                    <span className="icon" onClick={() => handleStatus(todo.id)}>
                        <MdDownloadDone />
                    </span>
            </div>
        </form>     
    );
};

export default SingleToDo;