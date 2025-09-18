import "./Todo.scss";

import CheckboxCustom from "../CheckboxCustom/CheckboxCustom.jsx";
import Button from "../Button/Button.jsx";
import Input from "../Input/Input.jsx";
import { useState } from "react";
import Priority from "../Priority/Priority.jsx";

export default function Todo({
  id,
  body,
  data,
  todos,
  isChecked,
  priority,
  ...props
}) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isChangeActive, setIsChangeActive] = useState(false);
  const [initialInputValue, setInitialInputValue] = useState("");
  const [bodyValue, setBodyValue] = useState(body);
  // const [isButtonDisabled, setIsButtonDisabled] = useState(isChecked);

  function deleteTodo(idTodo) {
    // document.dispatchEvent(new Event("renderPanelAdd", { bubbles: true }));

    let json = {
      todos: JSON.parse(localStorage.getItem("todos")).todos,
    };
    json.todos = [...json.todos.filter((todo) => todo.id !== idTodo)];
    localStorage.setItem("todos", JSON.stringify(json));

    if (json.todos.length === 0) {
      document.dispatchEvent(new Event("isEmptyList", { bubbles: true }));
    }

    setIsRemoving(true);

    document.dispatchEvent(
      new CustomEvent("updateList", {
        bubbles: true,
        detail: {
          selectElement: document.querySelector(".filter__select"),
        },
      })
    );
  }

  function changeTodo(idTodo) {
    document.dispatchEvent(
      new CustomEvent("changeTodo", {
        bubbles: true,
        detail: {
          idTodo: idTodo,
        },
      })
    );

    document
      .getElementById(`todo__inner${idTodo}`)
      .classList.add("todo__inner_for-change-todo");

    setIsChangeActive(true);
    // _for-change-todo
  }

  document.addEventListener("pushLabelValue", (event) => {
    setInitialInputValue(event.detail.labelValue);
  });

  function closePanelChange() {
    document
      .getElementById(`todo__inner${id}`)
      .classList.remove("todo__inner_for-change-todo");
    setIsChangeActive(false);
  }

  function successChange(idInput) {
    const newValue = document.getElementById(
      `input-for-change-${idInput}`
    ).value;

    let json = JSON.parse(localStorage.getItem("todos"));

    for (let i = 0; i < json.todos.length; i++) {
      if (json.todos[i].id === idInput) {
        if (newValue === "") {
          json.todos = [
            ...json.todos.slice(0, i),
            ...json.todos.slice(i + 1, json.todos.length),
          ];

          setIsRemoving(true);
        } else {
          json.todos[i].body = newValue;
          setBodyValue(newValue);
        }
        break;
      }
    }

    if (json.todos.length === 0) {
      document.dispatchEvent(new Event("isEmptyList", { bubbles: true }));
    }

    localStorage.setItem("todos", JSON.stringify(json));

    closePanelChange();
  }

  function renderTodo() {
    if (isChangeActive) {
      return (
        <>
          <Input
            id={"input-for-change-" + id}
            initialValue={initialInputValue}
            placeholder={"Введите новое значение"}
            styleClasses={"input input_change-todo"}
          />
          <div className="todo__buttons-change">
            <Button
              styleClasses={"button button_for-todo button_for-todo_success"}
              onClick={() => {
                successChange(id);
              }}
            >
              <img src="/edit.png" alt="change todo" />
            </Button>
            <Button
              styleClasses={"button button_for-todo button_for-todo_cancel"}
              onClick={() => {
                closePanelChange();
              }}
            >
              <img src="/trash.png" alt="delete todo" />
            </Button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <CheckboxCustom
            id={id}
            body={bodyValue}
            data={data}
            isChecked={isChecked}
          />
          <Priority priorityId={id} modifierInitial={priority} />

          <div className="todo__buttons">
            <Button
              id={id}
              styleClasses={"button button_for-todo"}
              onClick={() => {
                changeTodo(id);
              }}
              // disabled={isButtonDisabled}
            >
              <img src="/edit.png" alt="" />
            </Button>
            <Button
              styleClasses={"button button_for-todo"}
              onClick={() => {
                deleteTodo(id);
              }}
            >
              <img src="/trash.png" alt="" />
            </Button>
          </div>
        </>
      );
    }
  }

  // document.addEventListener("completeTask", (event) => {
  // const todoInner = document.getElementById(
  //   `todo__inner${event.detail.idTodo}`
  // );
  // for (let i = 0; i < todoInner.children.length; i++) {
  //   if (todoInner.children[i].classList.contains("todo__buttons")) {
  //     todoInner.children[i].children[0].disabled = event.detail.disabled;
  //     // todoInner.children[i].children[1].disabled = event.detail.disabled;
  //     break;
  //   }
  // }
  // if (event.detail.idTodo === id) {
  //   setIsButtonDisabled(event.detail.disabled);
  // }
  // });

  return (
    <>
      {!isRemoving && (
        <div className="todo">
          <div className="todo__inner " id={"todo__inner" + id}>
            {renderTodo()}
          </div>
        </div>
      )}
    </>
  );
}
