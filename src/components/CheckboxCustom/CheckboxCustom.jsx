import "./CheckboxCustom.scss";
import "../../../src/normalize.css";
import { useState } from "react";

export default function CheckboxCustom({
  id,
  body,
  data,
  isChecked,
  ...props
}) {
  // const [textBody, setTextBody] = useState(body);

  function completeTask(idTask) {
    const input = document.querySelector(`#input${idTask}`);

    // document.dispatchEvent(
    //   new CustomEvent("completeTask", {
    //     bubbles: false,
    //     detail: {
    //       idTodo: id,
    //       disabled: !input.checked,
    //     },
    //   })
    // );

    input.checked = !input.checked;

    let parentCheckbox = input.closest(".checkbox");
    parentCheckbox
      .querySelector("label")
      .classList.toggle("checkbox__label_complete");

    let json = JSON.parse(localStorage.getItem("todos"));
    for (let i = 0; i < json.todos.length; i++) {
      if (json.todos[i].id === idTask) {
        json.todos[i].checked = !json.todos[i].checked;
        if (json.todos[i].checked) {
          json.todos[i].option = "Completed";
        } else {
          json.todos[i].option = "Active";
        }

        break;
      }
    }
    localStorage.setItem("todos", JSON.stringify(json));
    // document.dispatchEvent(
    //   new Event("updateList", {
    //     bubbles: true,
    //     selectElement: document.querySelector(".filter__select"),
    //   })
    // );
  }

  document.addEventListener("changeTodo", (event) => {
    let str = document.getElementById(
      `label${event.detail.idTodo}`
    ).textContent;

    document.dispatchEvent(
      new CustomEvent("pushLabelValue", {
        bubbles: true,
        detail: {
          labelValue: str.slice(0, str.length - 18),
          // 18 символов - это дата и время
        },
      })
    );
  });

  return (
    <div className="checkbox">
      <div className="checkbox__input">
        <input
          type="checkbox"
          id={"input" + id}
          // className="checkbox__input-original"
          className="checkbox__input-original hidden"
          checked={isChecked}
          onChange={() => {}}
        />
        <span
          className="checkbox__input-custom"
          onClick={() => {
            completeTask(id);
          }}
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
            {data}
          </data>
        </label>
      </div>
    </div>
  );
}
