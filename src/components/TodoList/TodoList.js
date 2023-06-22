import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  toggleTodoStatus,
  deleteTodo,
  addTodo,
} from "../../actions/todoActions";
import "./TodoList.css";
import { Link } from "react-router-dom";

const TodoList = ({
  todos,
  toggleTodoStatus,
  deleteTodo,
  addTodo,
  isDone,
  containerClass,
  todoClass,
}) => {
  useEffect(() => {
    if (isDone) return; // "완료" 탭일 경우 기본 todo 생성하지 않음

    const initialTodo = {
      id: 1,
      title: "리액트",
      body: "리액트 어렵다.",
      isDone: false,
    };

    if (todos.length === 0) {
      addTodo(initialTodo);
    }
  }, [todos.length, isDone, addTodo]);

  const handleDeleteTodo = (id) => {
    deleteTodo(id);
  };

  const defaultTodo = todos.find((todo) => todo.id === 1);

  return (
    <div className={containerClass}>
      <h2>{isDone ? "완료" : "진행중"}</h2>
      {defaultTodo && !isDone && (
        <div className={todoClass} key={defaultTodo.id}>
          <Link to={`/todos/${defaultTodo.id}`} className="link-unchanged">
            상세보기
          </Link>
          <h3>{defaultTodo.title}</h3>
          <p>{defaultTodo.body}</p>
          <button onClick={() => toggleTodoStatus(defaultTodo.id)}>
            {defaultTodo.isDone ? "취소" : "완료"}
          </button>
          <button onClick={() => handleDeleteTodo(defaultTodo.id)}>삭제</button>
        </div>
      )}

      {todos
        .filter((todo) => todo.isDone === isDone && todo.id !== 1)
        .map((todo) => (
          <div className={todoClass} key={todo.id}>
            <Link to={`/todos/${todo.id}`} className="link-unchanged">
              상세보기
            </Link>
            <h3>{todo.title}</h3>
            <p>{todo.body}</p>
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
  { toggleTodoStatus, deleteTodo, addTodo }
)(TodoList);
