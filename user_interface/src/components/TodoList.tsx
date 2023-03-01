import React from "react";
import { Todo } from "../Model";
import SingleToDo from "./SingleToDo";
import { Droppable } from "react-beautiful-dnd";


interface Properties {
    createdTodos: Array<Todo>;
    setCreatedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
    inprogressTodos: Array<Todo>;
    setInprogressTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
    completedTodos: Array<Todo>;
    setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}

const ToDoLIST: React.FC<Properties> = ({
    createdTodos, setCreatedTodos,
    inprogressTodos, setInprogressTodos,
    completedTodos, setCompletedTodos
}) => {
    return (
        <div className="container">
            <Droppable droppableId="list1">
                {
                    (provided, snapshot) => (
                        <div className={`todos ${snapshot.isDraggingOver ? "dragactive" : "created"}`}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <span className="subheading">Created</span>
                            {
                                createdTodos?.map((todo, index) => (
                                    <SingleToDo
                                        index={index}
                                        todo={todo}
                                        todos={createdTodos}
                                        key={todo.id}
                                        setTodos={setCreatedTodos}
                                    />
                                ))}
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
            <Droppable droppableId="list2">
                {
                    (provided, snapshot) => (
                        <div className={ `todos ${snapshot.isDraggingOver ? "dragcomplete": "inprogress"}`}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
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
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
            <Droppable droppableId="list3">
                {
                    (provided, snapshot) => (
                        <div className={`todos ${snapshot.isDraggingOver ? "dragcomplete" : "completed"}`}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
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
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
            
        </div>
    );
};

export default ToDoLIST;