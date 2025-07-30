import Todo from "../Todo/Todo";
import "./List.scss";
import { todos } from "../../../Todos.js";
import { useEffect } from "react";

export default function List() {
  function renderTodos() {
    return todos.map((todo) => {
      return (
        <Todo key={todo.id} id={todo.id} body={todo.body} data={todo.data} />
      );
    });
  }

  useEffect(() => {
    renderTodos();
  }, [todos]);

  return (
    <div className="list">
      <div className="list__inner">{renderTodos()}</div>
    </div>
  );
}
