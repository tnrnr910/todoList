import React from "react";
import { connect } from "react-redux";
import { toggleTodoStatus, deleteTodo } from "../../actions/todoActions";
import "./TodoList.css";
import { Link } from "react-router-dom";

const TodoList = ({
  todos,
  toggleTodoStatus,
  deleteTodo,
  isDone,
  containerClass,
  todoClass,
}) => {
  const handleDeleteTodo = (id) => {
    deleteTodo(id);
  };

  return (
    <div className={containerClass}>
      <h2>{isDone ? "완료" : "진행중"}</h2>
      {todos
        .filter((todo) => todo.isDone === isDone)
        .map((todo) => (
          <div className={todoClass} key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.body}</p>
            <Link to={`/todos/${todo.id}`}>상세보기</Link>
            <button onClick={() => toggleTodoStatus(todo.id)}>
              {todo.isDone ? "취소" : "완료"}
            </button>
            <button onClick={() => handleDeleteTodo(todo.id)}>삭제</button>
          </div>
        ))}
    </div>
  );
};

export default connect(
  (state) => ({
    todos: state.todos,
  }),
  { toggleTodoStatus, deleteTodo }
)(TodoList);
