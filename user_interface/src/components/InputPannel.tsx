import React from 'react';
import './styles.css';

interface Properties {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>
    handleAdd: (event: React.FormEvent) => void;
}

const Input = ({ todo, setTodo, handleAdd }: Properties) => {
    return (
        <form className="input" onSubmit={handleAdd}>
            <input className="input_box"
                type="input"
                value={todo}
                onChange={(x) => setTodo(x.target.value)}
                placeholder="Enter the task baddie">
            </input>
            <button className="input_submit" type="submit">Go!</button>
        </form>
    );
}

export default Input;