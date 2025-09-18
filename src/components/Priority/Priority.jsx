import { useState } from "react";
import "./Priority.scss";

export default function Priority({ priorityId, modifierInitial = "high" }) {
  const [modifier, setModifier] = useState(modifierInitial);

  function setValueInLocalStorage(currentPriority) {
    let json = {
      todos: JSON.parse(localStorage.getItem("todos")).todos,
    };
    json.todos = [
      ...json.todos.filter((todo) => {
        if (todo.id == priorityId) {
          todo.priority = currentPriority;
          console.log(todo);
        }
        return todo;
      }),
    ];
    localStorage.setItem("todos", JSON.stringify(json));
  }

  document.addEventListener("click", (event) => {
    if (
      event.target.closest(".priority") &&
      event.target.dataset.todoId == priorityId
    ) {
      console.log(event.target);

      if (modifier === "high") {
        setModifier("medium");
        setValueInLocalStorage("medium");
      } else if (modifier === "medium") {
        setModifier("low");
        setValueInLocalStorage("low");
      } else if (modifier === "low") {
        setModifier("high");
        setValueInLocalStorage("high");
      }
    }
  });

  return (
    <>
      <div className="priority">
        <div
          data-todo-id={priorityId}
          className={"priority__inner priority_" + modifier}
        >
          {modifier}
        </div>
      </div>
    </>
  );
}
