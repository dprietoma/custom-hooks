import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";


export const useTodo = () => {
    const initialState = [];

    const init = () => {
        return JSON.parse(localStorage.getItem('todos')) || [];
    }

    const [todos, dispatch] = useReducer(todoReducer, initialState, init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleNewTodo = (todo) => {
        const action = {
            type: '[Todo] Add',
            payload: todo
        }

        dispatch(action);
    }

    const handleDeleteTodo = (id) => {
        dispatch({
            type: '[Todo] Remove',
            payload: id
        });
    }

    const handleToggleTodo = (id) => {
        dispatch({
            type: '[Todo] Toggle',
            payload: id
        });
    }

    const todosCount = todos.length;
    const pendingTodosCount = todos.filter( todo => !(todo.done)).length

    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        todosCount,
        pendingTodosCount
    }
}
