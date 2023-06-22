export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODO_STATUS = "TOGGLE_TODO_STATUS";
export const DELETE_TODO = "DELETE_TODO";

export const addTodo = (newTodo) => {
  console.log("New Todo:", newTodo); // Todo 객체 출력
  return {
    type: ADD_TODO,
    payload: newTodo,
  };
};

export const toggleTodoStatus = (id) => ({
  type: TOGGLE_TODO_STATUS,
  payload: id,
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id,
});
