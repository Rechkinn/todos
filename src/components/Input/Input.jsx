import "./Input.scss";
import { useState } from "react";

export default function Input({ styleClasses, placeholder, ...props }) {
  const [valueInput, setValueInput] = useState("");

  return (
    <input
      type="text"
      className={styleClasses}
      placeholder={placeholder}
      onChange={(event) => {
        setValueInput(event.target.value);
      }}
      value={valueInput}
    />
  );
}
