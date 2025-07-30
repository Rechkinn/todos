import "./Todo.scss";

import CheckboxCustom from "../CheckboxCustom/CheckboxCustom.jsx";
import Button from "../Button/Button.jsx";

export default function Todo({ id, body, data, ...props }) {
  return (
    <div className="todo">
      <div className="todo__inner">
        <CheckboxCustom id={id} body={body} data={data} />

        <div className="todo__buttons">
          <Button styleClasses={"button button_for-todo"}>
            <img src="../../../public/edit.png" alt="" />
          </Button>
          <Button styleClasses={"button button_for-todo"}>
            <img src="../../../public/trash.png" alt="" />
          </Button>
        </div>
      </div>
    </div>
  );
}
