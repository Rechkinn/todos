import Todo from "../Todo/Todo";
import "./List.scss";
// import { todos } from "../../../Todos.js";
import todosData from "../../../Todos.json";
import { useEffect } from "react";
// import activePanel from "../Filter/Filter.jsx";

export default function List() {
  // setInterval(() => {
  //   renderTodos();
  // }, 1000);
  function renderTodos() {
    let { todos } = todosData;

    return todos.map((todo) => {
      return (
        <Todo
          key={todo.id}
          id={todo.id}
          body={todo.body}
          data={todo.data}
          priority={todo.priority}
        />
      );
    });
  }

  // useEffect(() => {
  //   renderTodos();
  // }, [todosData]);

  return (
    <div className="list">
      <div className="list__inner">{renderTodos()}</div>
    </div>
  );
}
