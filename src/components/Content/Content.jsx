import "./Content.scss";

import Todo from "../Todo/Todo";
import Button from "../Button/Button.jsx";
import Input from "../Input/Input.jsx";

import { useEffect, useState } from "react";

export default function Content() {
  const [activePanel, setActivePanel] = useState("primary");
  const [showError, setShowError] = useState(false);
  const [showMessageListEmpty, setShowMessageListEmpty] = useState(
    localStorage.getItem("showMessageListEmpty") === "false" ? false : true
  );
  const [optionActive, setOptionActive] = useState(
    JSON.parse(localStorage.getItem("todos"))
      ? JSON.parse(localStorage.getItem("todos")).option
      : "All"
  );

  useEffect(() => {
    const selectElement = document.querySelector(".filter__select");
    if (selectElement) {
      document.dispatchEvent(
        new CustomEvent("updateList", {
          bubbles: true,
          detail: {
            selectElement: selectElement,
          },
        })
      );
    }
  }, [activePanel]);

  let json = {
    todos: [],
    option: "All",
  };

  if (JSON.parse(localStorage.getItem("todos"))) {
    json.todos = JSON.parse(localStorage.getItem("todos")).todos;
    json.option = JSON.parse(localStorage.getItem("todos")).option;
  }

  function selectOption(selectElement) {
    for (let i = 0; i < selectElement.children.length; i++) {
      if (selectElement.children[i].selected) {
        json = JSON.parse(localStorage.getItem("todos"));
        json.option = selectElement.children[i].label;
        localStorage.setItem("todos", JSON.stringify(json));

        let needSetShowMessageListEmpty = true;
        for (let k = 0; k < json.todos.length; k++) {
          if (json.todos[k].option === json.option || json.option === "All") {
            needSetShowMessageListEmpty = false;
            messageListEmpty(false);
            break;
          }
        }
        if (needSetShowMessageListEmpty) {
          messageListEmpty(true);
        }

        setOptionActive(selectElement.children[i].label);
        break;
      }
    }
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest(".filter__select")) {
      selectOption(event.target);
    }
  });
  document.addEventListener("updateList", (event) => {
    selectOption(event.detail.selectElement);
  });
  document.addEventListener("renderPanelAdd", () => {
    setActivePanel("primary");
  });

  function renderActivePanel() {
    if (activePanel === "primary") {
      return (
        <div className="filter__primary">
          <div className="filter__button-create">
            <Button
              onClick={() => {
                setActivePanel("add");
              }}
              styleClasses={
                "button button_purple button_create-task button_w100"
              }
            >
              Create task
            </Button>
          </div>
          <div className="filter__div-select">
            <select
              name=""
              id=""
              className="filter__select"
              defaultValue={optionActive}
            >
              <option value="All" className="filter__option">
                All
              </option>
              <option value="Completed" className="filter__option">
                Completed
              </option>
              <option value="Active" className="filter__option">
                Active
              </option>
            </select>
          </div>
        </div>
      );
    } else if (activePanel === "add") {
      return (
        <div className="filter__content">
          <div className="filter__div-select filter__div-select_panel-add">
            <select
              name=""
              id=""
              className="filter__select"
              defaultValue={optionActive}
            >
              <option value="All" className="filter__option">
                All
              </option>
              <option value="Completed" className="filter__option">
                Completed
              </option>
              <option value="Active" className="filter__option">
                Active
              </option>
            </select>
          </div>
          <div className="filter__add">
            <div className="filter__input">
              <Input
                placeholder={"Enter your task"}
                styleClasses={"input input_add-todo"}
              />
            </div>
            <div className="filter__button-add">
              <Button
                onClick={() => {
                  checkError();
                }}
                styleClasses={"button button_purple button_add-task"}
              >
                Add task
              </Button>
            </div>
          </div>
          {showError && (
            <div className="filter__error">
              <p className="filter__message">Введите хотя бы один символ!</p>
            </div>
          )}
        </div>
      );
    }
  }

  function messageListEmpty(boolValue) {
    localStorage.setItem("showMessageListEmpty", boolValue);
    setShowMessageListEmpty(boolValue);
  }

  function checkError() {
    if (document.querySelector(".input_add-todo").value !== "") {
      setShowError(false);
      setActivePanel("primary");
      // messageListEmpty(false);
      addTask();
    } else {
      setShowError(true);
    }
  }

  // кликаем на todo => оно пропадает и генерируем событие
  // подписываемся на собитие из кстом чекбокс
  // если не существует не одной нынешней оптион, то вызываем messageListEmpty(true);

  function addTask() {
    const inputAddToDo = document.querySelector(".input_add-todo");

    const date = `${new Date()
      .toLocaleTimeString()
      .slice(0, 5)} - ${new Date().toLocaleDateString()}`;

    const generateId = `${Math.random()}`.slice(2);

    const newToDo = {
      id: generateId,
      body: inputAddToDo.value,
      data: date,
      checked: false,
      option: "Active",
    };

    json.todos.push(newToDo);
    localStorage.setItem("todos", JSON.stringify(json));

    // console.log(document);
    // const selectElement = document.querySelector(".filter__select");
    // console.log(selectElement);
    // document.dispatchEvent(
    //   new CustomEvent("updateList", {
    //     bubbles: true,
    //     detail: {
    //       selectElement: selectElement,
    //     },
    //   })
    // );
  }

  function renderTodos() {
    if (showMessageListEmpty) {
      return (
        <p className="list__message-empty-list">
          <span className="list__message-empty-list-text">
            Your tasks will be here
          </span>
        </p>
      );
    } else {
      return json.todos.map((todo) => {
        if (optionActive === "All" || optionActive === todo.option) {
          return (
            <Todo
              key={todo.id}
              id={todo.id}
              body={todo.body}
              data={todo.data}
              isChecked={todo.checked}
            />
          );
        }
      });
    }
  }

  document.addEventListener("isEmptyList", () => {
    messageListEmpty(true);
  });

  return (
    <main>
      <div className="filter">
        <div className="filter__inner">{renderActivePanel()}</div>
      </div>
      <div className="list">
        <div className="list__inner">{renderTodos()}</div>
      </div>
      <Button />
    </main>
  );
}
