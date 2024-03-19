export const todoReducer = ( initialState, action) => {

    switch (action.type) {
        case '[Todo] Add': 
            return [...initialState, action.payload];
        
        case '[Todo] Remove':  
            return initialState.filter(todo => todo.id !== action.payload);
        
        case '[Todo] Toggle':
            return initialState.map( todo => {
                if (todo.id === action.payload) {
                    return {
                        ...todo,
                        done: !todo.done
                    }
                }
                return todo;
            });
    
        default:
            return initialState;
    }
} 