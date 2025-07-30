import "./CheckboxCustom.scss";
import "../../../src/normalize.css";

export default function CheckboxCustom({ id, body, data, ...props }) {
  function completeTask(idTask) {
    const input = document.querySelector(`#input${idTask}`);
    input.checked = !input.checked;

    let parentCheckbox = input.closest(".checkbox");
    parentCheckbox
      .querySelector("label")
      .classList.toggle("checkbox__label_complete");
  }

  return (
    <div className="checkbox">
      <div className="checkbox__input">
        <input
          type="checkbox"
          id={"input" + id}
          className="checkbox__input-original hidden"
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
          className="checkbox__label"
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
