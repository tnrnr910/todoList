import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList/TodoList";
import TodoDetails from "./components/TodoDetails/TodoDetails";
import store from "./store/configureStore";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <h1>Todo List App</h1>
          <Routes>
            <Route
              path="/"
              element={
                <div className="container">
                  <TodoForm />
                  <TodoList
                    isDone={false}
                    containerClass="todos"
                    todoClass="todo"
                  />
                  <TodoList
                    isDone={true}
                    containerClass="todos"
                    todoClass="todo"
                  />
                </div>
              }
            />
            <Route path="/todos/:id" element={<TodoDetails />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
