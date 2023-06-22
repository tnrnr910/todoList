import {
  ADD_TODO,
  TOGGLE_TODO_STATUS,
  DELETE_TODO,
} from "../actions/todoActions";

const initialState = {
  title: "",
  body: "",
  todos: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case TOGGLE_TODO_STATUS:
      const toggledTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }
        return todo;
      });
      return {
        ...state,
        todos: toggledTodos,
      };
    case DELETE_TODO:
      const filteredTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      return {
        ...state,
        todos: filteredTodos,
      };
    default:
      return state;
  }
};

export default rootReducer;
