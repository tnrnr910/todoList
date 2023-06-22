import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodo } from "../../actions/todoActions";
import "./TodoForm.css";
import { v4 as uuidv4 } from "uuid";

const TodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onChangeHandler = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "body") {
      setBody(e.target.value);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "" || body.trim() === "") {
      // 입력값이 비어있을 경우 처리
      return;
    }
    const newTodo = {
      id: uuidv4(),
      title,
      body,
      isDone: false,
    };
    addTodo(newTodo); // addTodo 액션 디스패치
    setTitle(""); // 제목 초기화
    setBody(""); // 내용 초기화
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <input
        type="text"
        name="title"
        placeholder="제목"
        value={title}
        onChange={onChangeHandler}
      />
      <textarea
        name="body"
        placeholder="내용"
        value={body}
        onChange={onChangeHandler}
      />
      <button type="submit">추가하기</button>
    </form>
  );
};

export default connect(null, { addTodo })(TodoForm);
