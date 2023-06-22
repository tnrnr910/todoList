import { useState } from "react";
import "./App.css";

function App() {
  // 상태변수들
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [todos, setTodos] = useState();
  // 인풋값 변경
  const onChangeHandler = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "body") {
      setBody(e.target.value);
    }
  };
  // 폼제출
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "" || body.trim() === "") {
      return;
    }
    const newTodo = {
      id: todos.length,
      title: title,
      body: body,
      isDone: false,
    };
    setTodos([...todos, newTodo]);
    setTitle("");
    setBody("");
  };
  // 투두 완료
  const toggleTodoStatus = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  // 투두 삭제
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <h1>Todo LIst App</h1>
      <div className="container">
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

        <div className="todos">
          <h2>진행중</h2>
          {todos
            .filter((todo) => !todo.isDone)
            .map((todo) => (
              <div className="todo" key={todo.id}>
                <h3>{todo.title}</h3>
                <p>{todo.body}</p>
                <button onClick={() => toggleTodoStatus(todo.id)}>
                  {todo.isDone ? "취소" : "완료"}
                </button>
                <button onClick={() => deleteTodo(todo.id)}>삭제</button>
              </div>
            ))}
          ;<h2>완료</h2>
          {todos
            .filter((todo) => todo.isDone)
            .map((todo) => (
              <div className="todo" key={todo.id}>
                <h3>{todo.title}</h3>
                <p>{todo.body}</p>
                <button onClick={() => toggleTodoStatus(todo.id)}>
                  {todo.isDone ? "취소" : "완료"}
                </button>
                <button onClick={() => deleteTodo(todo.id)}>삭제</button>
              </div>
            ))}
          ;
        </div>
      </div>
    </div>
  );
}
export default App;
