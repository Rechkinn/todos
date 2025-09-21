import "./CheckboxCustom.scss";
import "../../../src/normalize.css";
import { useState } from "react";
import Loader from "../Loader/Loader";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../myFirebase.js";

export default function CheckboxCustom({
  id,
  body,
  dataCreatedAt,
  dataUpdatedAt,
  isChecked,
  ...props
}) {
  const [loading, setLoading] = useState(false);

  async function updateChecked(idTodo, inputCheked) {
    try {
      setLoading(true);
      const ref = doc(db, "todos", idTodo);
      await updateDoc(ref, {
        completed: inputCheked,
        option: inputCheked ? "Completed" : "Active",
        updatedAt: `${new Date()
          .toLocaleTimeString()
          .slice(0, 5)} - ${new Date().toLocaleDateString()}`,
      });
      createEventUpdateTodos();
    } catch (error) {
      alert("Error update. ", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  function createEventUpdateTodos() {
    document.dispatchEvent(new CustomEvent("updateTodos", { bubbles: true }));
  }
  function completeTask(idTask) {
    const input = document.querySelector(`#input${idTask}`);
    input.checked = !input.checked;
    let parentCheckbox = input.closest(".checkbox");
    parentCheckbox
      .querySelector("label")
      .classList.toggle("checkbox__label_complete");
    updateChecked(idTask, input.checked);
  }

  document.addEventListener("changeTodo", (event) => {
    let str = document.getElementById(
      `label${event.detail.idTodo}`
    ).textContent;

    document.dispatchEvent(
      new CustomEvent("pushLabelValue", {
        bubbles: true,
        detail: {
          // 70 символов - это строки "Date of creation" и "Last updated", а также их значения
          labelValue: str.slice(0, str.length - 70),
        },
      })
    );
  });

  return (
    <>
      {loading && <Loader />}
      <div className="checkbox">
        <div className="checkbox__input">
          <input
            type="checkbox"
            id={"input" + id}
            className="checkbox__input-original hidden"
            checked={isChecked}
            onChange={() => {}}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                completeTask(id);
              }
            }}
          />
          <span
            id={id}
            className="checkbox__input-custom"
            onClick={() => completeTask(id)}
          ></span>
        </div>
        <div className="checkbox__body">
          <label
            htmlFor={"input" + id}
            id={"label" + id}
            className={
              isChecked
                ? "checkbox__label checkbox__label_complete"
                : "checkbox__label"
            }
            onClick={(event) => {
              event.preventDefault();
              completeTask(id);
            }}
          >
            {body}
            <data value="" className="checkbox__data">
              Date of creation: {dataCreatedAt}.
            </data>
            <data value="" className="checkbox__data">
              Last updated: {dataUpdatedAt}.
            </data>
          </label>
        </div>
      </div>
    </>
  );
}
