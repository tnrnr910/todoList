import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./TodoDetails.css";

const TodoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const todo = useSelector((state) =>
    state.todos.find((todo) => todo.id === parseInt(id))
  );

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!todo) {
    return <div>Todo를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="todo-details-container">
      <div className="todo-details">
        <h2>Todo 상세 페이지</h2>
        <div className="todo-info">
          <div className="todo-id">ID: {todo.id}</div>
          <h3 className="todo-title">{todo.title}</h3>
          <p className="todo-body">{todo.body}</p>
        </div>
        <div className="go-back-button">
          <button onClick={handleGoBack}>이전으로</button>
        </div>
      </div>
    </div>
  );
};

export default TodoDetails;
