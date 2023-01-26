import React from "react";
import { Todo } from "../Model";
import SingleToDo from "./SingleToDo";
import "./styles.css";


interface Properties {
    todos: Array<Todo>;
    setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
    inprogressTodos: Array<Todo>;
    setInprogressTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
    completedTodos: Array<Todo>;
    setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}

const ToDoLIST: React.FC<Properties> = ({
    todos, setTodos,
    inprogressTodos, setInprogressTodos,
    completedTodos, setCompletedTodos
}) => {
    const draggingOver = (event: React.DragEvent<HTMLDivElement>) => {

    };

    return (
        <div className="container">
            <div className="created todos"
                
            >
                <span className="subheading">Created</span>
                {
                    todos?.map((todo, index) => (
                        <SingleToDo
                            index={index}
                            todo={todo}
                            todos={todos}
                            key={todo.id}
                            setTodos={setTodos} />
                    ))
                }
            </div>
            <div className="inprogress todos"
                 onDragOver={(event) => draggingOver(event)}
            >
                <span className="subheading">In progress</span>
                {
                    inprogressTodos?.map((todo, index) => (
                        <SingleToDo
                            index={index}
                            todo={todo}
                            todos={inprogressTodos}
                            key={todo.id}
                            setTodos={setInprogressTodos} />
                    ))
                }
            </div>
            <div className="completed todos">
                <span className="subheading">Completed</span>
                {
                    completedTodos?.map((todo, index) => (
                        <SingleToDo
                            index={index}
                            todo={todo}
                            todos={completedTodos}
                            key={todo.id}
                            setTodos={setCompletedTodos} />
                    ))
                }
            </div>
        </div>
    );
};

export default ToDoLIST;