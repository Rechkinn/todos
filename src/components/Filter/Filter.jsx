import "./Filter.scss";

import Button from "../Button/Button.jsx";
import Input from "../Input/Input.jsx";
import { useState } from "react";

export default function Filter() {
  const [activePanel, setActivePanel] = useState("add");

  function getElementsActivePanel() {
    if (activePanel === "primary") {
      return (
        <div className="filter__primary">
          <div className="filter__button-create">
            <Button
              onClick={() => {
                setActivePanel("add");
              }}
              styleClasses={"button button_purple button_create-task"}
            >
              Create task
            </Button>
          </div>
          <div className="filter__select">
            <select name="" id="">
              <option value="Completed">Completed</option>
              <option value="All">All</option>
              <option value="Active">Active</option>
            </select>
          </div>
        </div>
      );
    } else if (activePanel === "add") {
      return (
        <div className="filter__add">
          <div className="filter__input">
            <Input
              placeholder={"to do..."}
              styleClasses={"input input_add-to-do"}
            />
          </div>
          <div className="filter__button-add">
            <Button
              onClick={() => {
                addTask();
                setActivePanel("primary");
              }}
              styleClasses={"button button_purple button_add-task"}
            >
              Add task
            </Button>
          </div>
        </div>
      );
    }
  }

  function addTask() {
    const inputAddToDo = document.querySelector(".input_add-to-do");

    const date = `${new Date()
      .toLocaleTimeString()
      .slice(0, 5)} - ${new Date().toLocaleDateString()}`;

    const generateId = `${Math.random()}`.slice(2);

    const newToDo = {
      id: generateId,
      body: inputAddToDo.value,
      data: date,
    };
    const { todos } = todosData;
    todos.push(newToDo);
    console.log(todos);
    console.log(todosData);
  }

  return (
    <main>
      <div className="filter">
        <div className="filter__inner">{getElementsActivePanel()}</div>
      </div>
    </main>
  );
}
