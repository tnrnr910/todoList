import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  toggleTodoStatus,
  deleteTodo,
  addTodo,
} from "../../actions/todoActions";
import "./TodoList.css";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const TodoList = ({
  todos,
  toggleTodoStatus,
  deleteTodo,
  addTodo,
  isDone,
  containerClass,
  todoClass,
}) => {
  const [initialTodoId, setInitialTodoId] = useState(null);

  useEffect(() => {
    if (isDone) return; // "완료" 탭일 경우 기본 todo 생성하지 않음

    const storedInitialTodoId = localStorage.getItem("initialTodoId");
    if (todos.length === 0 && !storedInitialTodoId) {
      const newTodoId = uuidv4(); // UUID로 id 생성
      const newTodo = {
        id: newTodoId,
        title: "리액트",
        body: "리액트 어렵다.",
        isDone: false,
      };
      setInitialTodoId(newTodoId);
      addTodo(newTodo);
      localStorage.setItem("initialTodoId", newTodoId);
    } else {
      setInitialTodoId(storedInitialTodoId);
    }
  }, [todos.length, isDone, addTodo]);

  const handleDeleteTodo = (id) => {
    deleteTodo(id);
    if (id === initialTodoId) {
      setInitialTodoId(null);
      localStorage.removeItem("initialTodoId");
    }
  };

  return (
    <div className={containerClass}>
      <h2>{isDone ? "완료" : "진행중"}</h2>
      {todos
        .filter((todo) => todo.isDone === isDone && todo.id !== initialTodoId)
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
