import React, { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addTodo = () => {
    if (title.trim() !== "" && body.trim() !== "") {
      const newTodo = { title, body };
      setTodos([...todos, newTodo]);
      setTitle("");
      setBody("");
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "body") {
      setBody(value);
    }
  };

  return (
    <div>
      todoList
      <form>
        <input
          type="text"
          name="title"
          placeholder="제목"
          value={title}
          onChange={onChangeHandler}
        />
        <input
          type="text"
          name="body"
          placeholder="내용"
          value={body}
          onChange={onChangeHandler}
        />
        <button type="button" onClick={addTodo}>
          추가하기
        </button>
      </form>
      <h3>진행중</h3>
      <div>
        {todos.map((todo, index) => (
          <div key={index}>
            <h4>{todo.title}</h4>
            <p>{todo.body}</p>
            <button type="button" onClick={remove}>
              완료
            </button>
            <button type="button" onClick={del}>
              삭제
            </button>
          </div>
        ))}
      </div>
      <h3>완료</h3>
      <div></div>
    </div>
  );
}

export default App;
