import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

// Redux 상태 관리를 위한 액션 타입 정의
const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO_STATUS = "TOGGLE_TODO_STATUS";
const DELETE_TODO = "DELETE_TODO";

// 액션 생성자 함수 정의
const addTodo = (newTodo) => ({
  type: ADD_TODO,
  payload: newTodo,
});

const toggleTodoStatus = (id) => ({
  type: TOGGLE_TODO_STATUS,
  payload: id,
});

const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id,
});

// 초기 상태와 리듀서 함수 정의
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
        title: "",
        body: "",
      };
    case TOGGLE_TODO_STATUS:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
        ),
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

// 컴포넌트 정의
const TodoForm = ({ title, body, onChangeHandler, onSubmitHandler }) => (
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

const TodoList = ({
  todos,
  toggleTodoStatus,
  deleteTodo,
  isDone,
  containerClass,
  todoClass,
}) => (
  <div className={containerClass}>
    <h2>{isDone ? "완료" : "진행중"}</h2>
    {todos
      .filter((todo) => todo.isDone === isDone)
      .map((todo) => (
        <div className={todoClass} key={todo.id}>
          <h3>{todo.title}</h3>
          <p>{todo.body}</p>
          <button onClick={() => toggleTodoStatus(todo.id)}>
            {todo.isDone ? "취소" : "완료"}
          </button>
          <button onClick={() => deleteTodo(todo.id)}>삭제</button>
        </div>
      ))}
  </div>
);

// 컨테이너 컴포넌트 정의
const ConnectedTodoForm = connect(null, { addTodo })(TodoForm);

const ConnectedTodoList = connect(
  (state) => ({
    todos: state.todos,
  }),
  { toggleTodoStatus, deleteTodo }
)(TodoList);

// 스토어 생성
const store = createStore(rootReducer);

// App 컴포넌트 정의
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <h1>Todo List App</h1>
          <Route
            exact
            path="/"
            render={() => (
              <div className="container">
                <ConnectedTodoForm />
                <ConnectedTodoList
                  isDone={false}
                  containerClass="todos"
                  todoClass="todo"
                />
                <ConnectedTodoList
                  isDone={true}
                  containerClass="todos"
                  todoClass="todo"
                />
              </div>
            )}
          />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
