import "./Filter.scss";

import Button from "../Button/Button.jsx";
import Input from "../Input/Input.jsx";
import { todos } from "../../../Todos.js";

export default function Filter() {
  function toggleHidden() {
    let sectionPrimary = document.querySelector(".filter__primary");
    let sectionAdd = document.querySelector(".filter__add");

    sectionPrimary.classList.toggle("hidden");
    sectionAdd.classList.toggle("hidden");
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
    todos.push(newToDo);
    console.log(todos);
  }

  return (
    <div className="filter">
      <div className="filter__inner">
        <div className="filter__primary hidden">
          <div className="filter__button-create">
            <Button
              onClick={toggleHidden}
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
                // toggleHidden()
                addTask();
              }}
              styleClasses={"button button_purple button_add-task"}
            >
              Add task
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
