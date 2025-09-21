import "./Todo.scss";
import CheckboxCustom from "../CheckboxCustom/CheckboxCustom.jsx";
import Button from "../Button/Button.jsx";
import Input from "../Input/Input.jsx";
import Priority from "../Priority/Priority.jsx";
import Loader from "../Loader/Loader.jsx";
import Notification from "../Notification/Notification.jsx";
import { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../myFirebase.js";

export default function Todo({
  id,
  body,
  dataCreatedAt = "--:-- - --.--.----",
  dataUpdatedAt = "--:-- - --.--.----",
  todos,
  isChecked,
  priority,
  ...props
}) {
  const [loading, setLoading] = useState(false);
  const [isChangeActive, setIsChangeActive] = useState(false);
  const [initialInputValue, setInitialInputValue] = useState("");
  const [bodyValue, setBodyValue] = useState(body);
  const [notification, setNotification] = useState("");

  async function deleteTodo(idTodo) {
    try {
      setLoading(true);
      await deleteDoc(doc(db, "todos", idTodo));
      createEventUpdateTodos();
      setNotification("success");
    } catch (error) {
      setNotification(`${error}`);
    } finally {
      setTimeout(() => {
        setNotification("");
      }, 5000);
      setLoading(false);
    }
  }
  async function updateTodo(idTodo, newDescription) {
    try {
      setLoading(true);
      const ref = doc(db, "todos", idTodo);
      await updateDoc(ref, {
        description: newDescription,
        updatedAt: `${new Date()
          .toLocaleTimeString()
          .slice(0, 5)} - ${new Date().toLocaleDateString()}`,
      });
      createEventUpdateTodos();
      setNotification("success");
    } catch (error) {
      setNotification(`${error}`);
    } finally {
      setTimeout(() => {
        setNotification("");
      }, 5000);
      setLoading(false);
    }
  }

  function createEventUpdateTodos() {
    document.dispatchEvent(new CustomEvent("updateTodos", { bubbles: true }));
  }
  function createEventChangeTodo(idTodo) {
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
  }
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

    if (newValue === "") {
      deleteTodo(idInput);
      return;
    }

    updateTodo(idInput, newValue);
    setBodyValue(newValue);
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
              <img src="/approve.png" alt="Approve changing todo" />
            </Button>
            <Button
              styleClasses={"button button_for-todo button_for-todo_cancel"}
              onClick={() => {
                closePanelChange();
              }}
            >
              <img src="/cancel.png" alt="Cancel changing todo" />
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
            dataCreatedAt={dataCreatedAt}
            dataUpdatedAt={dataUpdatedAt}
            isChecked={isChecked}
          />
          <Priority priorityId={id} modifierInitial={priority} />

          <div className="todo__buttons">
            <Button
              id={id}
              styleClasses={"button button_for-todo"}
              onClick={() => {
                createEventChangeTodo(id);
              }}
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

  document.addEventListener("pushLabelValue", (event) => {
    setInitialInputValue(event.detail.labelValue);
  });

  return (
    <>
      {loading && <Loader />}
      {notification === "success" && (
        <Notification
          modifier={notification}
          text={"The operation was completed successfully!"}
        />
      )}
      {notification !== "success" && notification !== "" && (
        <Notification
          modifier={"fall"}
          text={"An error occurred while performing the operation!"}
        />
      )}
      <div className="todo">
        <div className="todo__inner " id={"todo__inner" + id}>
          {renderTodo()}
        </div>
      </div>
    </>
  );
}
